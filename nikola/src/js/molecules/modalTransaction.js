import {
  getTransactionExplorerUrl,
  shortenAddress,
} from "../../../node_modules/wallet-toolkit/dist/wallet-toolkit.browser.js";

const modal = document.querySelector(".js-modal-transaction");
let onCloseCallback = null;

export const showTransactionModal = ({
  hash,
  productTitle,
  amountEth,
  onClose,
}) => {
  if (!modal) return;

  const message = modal.querySelector(".js-tx-message");
  const link = modal.querySelector(".js-tx-link");

  if (message) {
    message.textContent = `You purchased "${productTitle}" for ${amountEth} ETH. Transaction confirmed on Sepolia.`;
  }

  if (link && hash) {
    link.href = getTransactionExplorerUrl(hash, "sepolia");
    link.textContent = `View transaction ${shortenAddress(hash, 8, 6)}`;
  }

  onCloseCallback = onClose || null;
  modal.classList.add("modal__wrapper--visible");
  modal.showModal();
};

const closeTransactionModal = () => {
  if (!modal) return;
  modal.classList.remove("modal__wrapper--visible");
  modal.close();
  onCloseCallback?.();
  onCloseCallback = null;
};

modal?.addEventListener("click", (e) => {
  if (e.target.closest(".js-close-tx")) {
    closeTransactionModal();
  }
});

modal?.addEventListener("cancel", (e) => {
  e.preventDefault();
  closeTransactionModal();
});
