import { SEPOLIA_EXPLORER_TX } from "../config.js";

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
    link.href = `${SEPOLIA_EXPLORER_TX}${hash}`;
    link.textContent = `View transaction ${hash.slice(0, 10)}...`;
  }

  onCloseCallback = onClose || null;
  modal.classList.add("modal__wrapper--visible");
  modal.showModal();
};

document.querySelector(".js-close-tx")?.addEventListener("click", () => {
  if (!modal) return;
  modal.classList.remove("modal__wrapper--visible");
  modal.close();
  onCloseCallback?.();
  onCloseCallback = null;
});

modal?.addEventListener("cancel", (e) => {
  e.preventDefault();
  modal.classList.remove("modal__wrapper--visible");
  modal.close();
  onCloseCallback?.();
  onCloseCallback = null;
});
