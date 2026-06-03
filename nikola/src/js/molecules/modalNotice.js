const modal = document.querySelector(".js-modal-notice");
const titleEl = modal?.querySelector(".js-notice-title");
const messageEl = modal?.querySelector(".js-notice-message");
const primaryBtn = modal?.querySelector(".js-notice-primary");
const closeBtn = modal?.querySelector(".js-notice-close");

let primaryHandler = null;

const hidePrimary = () => {
  primaryBtn?.classList.add("notice-modal__primary--hidden");
  primaryHandler = null;
};

const showPrimary = (label, handler) => {
  if (!primaryBtn) return;
  const text = primaryBtn.querySelector(".btn__text");
  if (text) text.textContent = label;
  primaryBtn.classList.remove("notice-modal__primary--hidden");
  primaryHandler = handler;
};

export const showNoticeModal = ({
  title,
  message,
  primaryLabel,
  onPrimary,
}) => {
  if (!modal) return;

  if (titleEl) titleEl.textContent = title;
  if (messageEl) messageEl.textContent = message;

  hidePrimary();
  if (primaryLabel && onPrimary) {
    showPrimary(primaryLabel, onPrimary);
  }

  modal.classList.add("modal__wrapper--visible");
  modal.showModal();
};

export const closeNoticeModal = () => {
  if (!modal) return;
  modal.classList.remove("modal__wrapper--visible");
  modal.close();
  hidePrimary();
};

primaryBtn?.addEventListener("click", async () => {
  if (primaryHandler) {
    await primaryHandler();
  }
  closeNoticeModal();
});

closeBtn?.addEventListener("click", closeNoticeModal);

modal?.addEventListener("cancel", (e) => {
  e.preventDefault();
  closeNoticeModal();
});
