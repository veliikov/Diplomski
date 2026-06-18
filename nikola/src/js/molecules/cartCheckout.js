import { API_BASE, isMarketplaceConfigured } from "../config.js";
import { showNoticeModal } from "./modalNotice.js";
import { showTransactionModal } from "./modalTransaction.js";

const clearCart = () => {
  localStorage.setItem("numOfProducts", "0");
  localStorage.setItem("bought", "[]");
  localStorage.setItem("quantities", "{}");
  localStorage.setItem("totalPrice", "0");
};

const goToHomepage = () => {
  window.location.href = new URL("index.html", window.location.href).href;
};

const getPaymentErrorNotice = (err) => {
  const code = err?.code;
  const message = (
    err?.shortMessage ||
    err?.reason ||
    err?.message ||
    ""
  ).toLowerCase();

  if (
    code === 4001 ||
    code === "ACTION_REJECTED" ||
    message.includes("user rejected") ||
    message.includes("user denied")
  ) {
    return {
      title: "Payment cancelled",
      message:
        "You declined the transaction in MetaMask. Nothing was charged — your cart is still here when you want to try again.",
    };
  }

  if (
    code === "INSUFFICIENT_FUNDS" ||
    message.includes("insufficient funds") ||
    message.includes("insufficient balance") ||
    message.includes("exceeds balance")
  ) {
    return {
      title: "Not enough Sepolia ETH",
      message:
        "Your wallet doesn't have enough test ETH for this order. Top up with free Sepolia ETH from a faucet, then try again.",
      primaryLabel: "Get test ETH",
      onPrimary: () =>
        window.open("https://sepoliafaucet.com/", "_blank", "noopener"),
    };
  }

  if (
    code === 4902 ||
    message.includes("wrong network") ||
    message.includes("chain")
  ) {
    return {
      title: "Wrong network",
      message:
        "Switch MetaMask to the Sepolia test network, then place your order again.",
    };
  }

  if (err?.message === "NOT_CONNECTED") {
    return {
      title: "Wallet disconnected",
      message:
        "Your wallet is no longer connected. Use “Connect a wallet” in the footer and try again.",
    };
  }

  return {
    title: "Payment failed",
    message:
      "We couldn't complete the payment. Make sure MetaMask is on Sepolia, you have enough test ETH, and try again.",
  };
};

export const processCartCheckout = async ({ userData, submitBtn, registerUser }) => {
  const total = parseFloat(localStorage.getItem("totalPrice") || "0");
  const bought = JSON.parse(localStorage.getItem("bought") || "[]");

  if (!bought.length) {
    showNoticeModal({
      title: "Cart is empty",
      message: "Add NFTs from the marketplace before checking out.",
    });
    return;
  }

  if (!total || total <= 0) {
    showNoticeModal({
      title: "Choose quantity",
      message: "Set a quantity for at least one item in your cart, then try again.",
    });
    return;
  }

  const { getConnectedAddress, sendEthPayment, isWalletInstalled } =
    await import("../services/wallet.js");

  if (!isWalletInstalled()) {
    showNoticeModal({
      title: "MetaMask is required",
      message:
        "Install MetaMask to complete your order. Connect your wallet using the footer link “Connect a wallet”.",
      primaryLabel: "Get MetaMask",
      onPrimary: () =>
        window.open("https://metamask.io/download/", "_blank", "noopener"),
    });
    return;
  }

  const address = await getConnectedAddress();
  if (!address) {
    showNoticeModal({
      title: "Wallet not connected",
      message:
        "Scroll to the footer and click “Connect a wallet” before placing your order.",
    });
    return;
  }

  if (!isMarketplaceConfigured()) {
    showNoticeModal({
      title: "Marketplace not configured",
      message:
        "Set your Sepolia address in MARKETPLACE_WALLET inside src/js/config.js, then reload.",
    });
    return;
  }

  const btnText = submitBtn?.querySelector(".btn__text");
  const originalText = btnText?.textContent || "Buy now";
  if (submitBtn) submitBtn.disabled = true;
  if (btnText) btnText.textContent = "Processing...";

  try {
    const receipt = await sendEthPayment(total);

    await fetch(`${API_BASE}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        buyerWallet: receipt.from,
        txHash: receipt.hash,
        amountEth: total,
        status: "confirmed",
        items: bought,
        customer: userData,
        createdAt: new Date().toISOString(),
      }),
    });

    if (registerUser) await registerUser(userData);

    clearCart();

    showTransactionModal({
      hash: receipt.hash,
      productTitle: `Your cart (${bought.length} item${bought.length > 1 ? "s" : ""})`,
      amountEth: total,
      onClose: goToHomepage,
    });
  } catch (err) {
    console.error(err);
    showNoticeModal(getPaymentErrorNotice(err));

    if (submitBtn) submitBtn.disabled = false;
    if (btnText) btnText.textContent = originalText;
  }
};
