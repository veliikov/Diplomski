import {
  connectWallet,
  disconnectWallet,
  getConnectedAddress,
  shortenAddress,
  isWalletInstalled,
  setupWalletListeners,
} from "../services/wallet.js";
import { showNoticeModal } from "../molecules/modalNotice.js";

const footerLink = document.querySelector(".js-wallet-footer-link");

const setFooterWalletUI = (address) => {
  if (!footerLink) return;

  if (address) {
    footerLink.textContent = shortenAddress(address);
    footerLink.title = `${address} — click to manage wallet`;
    footerLink.classList.add("footer__wallet-link--connected");
    footerLink.setAttribute("aria-label", `Wallet connected: ${address}`);
  } else {
    footerLink.textContent = "Connect a wallet";
    footerLink.title = "Connect your MetaMask wallet";
    footerLink.classList.remove("footer__wallet-link--connected");
    footerLink.setAttribute("aria-label", "Connect a wallet");
  }
};

export const promptConnectWallet = async ({ silent = false } = {}) => {
  if (!isWalletInstalled()) {
    showNoticeModal({
      title: "MetaMask is required",
      message:
        "Install the MetaMask browser extension, then use “Connect a wallet” in the footer to continue.",
      primaryLabel: "Get MetaMask",
      onPrimary: () => window.open("https://metamask.io/download/", "_blank", "noopener"),
    });
    return null;
  }

  try {
    const address = await connectWallet();
    setFooterWalletUI(address);
    if (!silent) {
      showNoticeModal({
        title: "Wallet connected",
        message: `You are connected as ${shortenAddress(address)}. You can now purchase NFTs on Sepolia testnet.`,
      });
    }
    return address;
  } catch (err) {
    if (err?.code === 4001) {
      showNoticeModal({
        title: "Connection cancelled",
        message:
          "No worries — when you are ready, click “Connect a wallet” in the footer again.",
      });
      return null;
    }

    console.error(err);
    showNoticeModal({
      title: "Could not connect",
      message:
        "Unlock MetaMask, approve the connection request, and make sure Sepolia test network is available.",
      primaryLabel: "Try again",
      onPrimary: () => promptConnectWallet(),
    });
    return null;
  }
};

const showWalletManageModal = (address) => {
  showNoticeModal({
    title: "Wallet connected",
    message: `Active account: ${address}`,
    primaryLabel: "Disconnect",
    onPrimary: async () => {
      await disconnectWallet();
      setFooterWalletUI(null);
    },
  });
};

const handleFooterWalletClick = async (e) => {
  e.preventDefault();

  const current = await getConnectedAddress();

  if (current) {
    showWalletManageModal(current);
    return;
  }

  await promptConnectWallet();
};

const initWalletUI = async () => {
  if (!footerLink) return;

  const existing = await getConnectedAddress();
  setFooterWalletUI(existing);

  footerLink.addEventListener("click", handleFooterWalletClick);

  setupWalletListeners((address) => setFooterWalletUI(address));
};

initWalletUI();

export { setFooterWalletUI, getConnectedAddress };
