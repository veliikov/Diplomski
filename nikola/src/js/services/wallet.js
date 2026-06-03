import {
  MARKETPLACE_WALLET,
  SEPOLIA_CHAIN_ID_HEX,
  isMarketplaceConfigured,
} from "../config.js";

let cachedAddress = null;

export const shortenAddress = (address) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const isWalletInstalled = () => typeof window.ethereum !== "undefined";

export const getCachedAddress = () => cachedAddress;

export const ensureSepoliaNetwork = async () => {
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  if (chainId === SEPOLIA_CHAIN_ID_HEX) return;

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: SEPOLIA_CHAIN_ID_HEX }],
    });
  } catch (err) {
    if (err?.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: SEPOLIA_CHAIN_ID_HEX,
            chainName: "Sepolia",
            nativeCurrency: { name: "Sepolia ETH", symbol: "ETH", decimals: 18 },
            rpcUrls: ["https://rpc.sepolia.org"],
            blockExplorerUrls: ["https://sepolia.etherscan.io"],
          },
        ],
      });
    } else {
      throw err;
    }
  }
};

export const connectWallet = async () => {
  if (!isWalletInstalled()) {
    throw new Error("NO_WALLET");
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  if (!accounts?.length) {
    throw new Error("NO_ACCOUNT");
  }

  cachedAddress = accounts[0];
  localStorage.setItem("walletAddress", cachedAddress);
  await ensureSepoliaNetwork();
  return cachedAddress;
};

export const getConnectedAddress = async () => {
  if (!isWalletInstalled()) return null;

  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  if (accounts?.length) {
    cachedAddress = accounts[0];
    localStorage.setItem("walletAddress", cachedAddress);
    return cachedAddress;
  }

  cachedAddress = null;
  localStorage.removeItem("walletAddress");
  return null;
};

export const disconnectWallet = () => {
  cachedAddress = null;
  localStorage.removeItem("walletAddress");
};

export const sendEthPayment = async (amountEth) => {
  if (!isMarketplaceConfigured()) {
    throw new Error("MARKETPLACE_NOT_CONFIGURED");
  }

  const address = cachedAddress || (await getConnectedAddress());
  if (!address) {
    throw new Error("NOT_CONNECTED");
  }

  await ensureSepoliaNetwork();

  const { BrowserProvider, parseEther } = await import(
    "https://cdn.jsdelivr.net/npm/ethers@6.13.5/+esm"
  );

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const tx = await signer.sendTransaction({
    to: MARKETPLACE_WALLET,
    value: parseEther(String(amountEth)),
  });

  const receipt = await tx.wait();
  return {
    hash: receipt.hash,
    from: address,
    to: MARKETPLACE_WALLET,
    amountEth: String(amountEth),
  };
};

export const setupWalletListeners = (onAccountsChanged) => {
  if (!isWalletInstalled()) return;

  window.ethereum.on("accountsChanged", (accounts) => {
    cachedAddress = accounts[0] || null;
    if (!accounts?.length) {
      localStorage.removeItem("walletAddress");
    } else {
      localStorage.setItem("walletAddress", accounts[0]);
    }
    onAccountsChanged?.(cachedAddress);
  });

  window.ethereum.on("chainChanged", () => {
    window.location.reload();
  });
};
