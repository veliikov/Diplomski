document
  .querySelectorAll(
    ".js-modal-success:not(.js-modal-subscribe-duplicate):not(.js-modal-subscribe-success):not(.js-modal-subscribe-confirm)"
  )
  .forEach((modal) => {
    const closeBtn = modal.querySelector(".js-close");
    if (!closeBtn) return;

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("modal__wrapper--visible");
      modal.close();
    });
  });
