document.querySelectorAll(".js-modal-success").forEach((modal) => {
  const closeBtn = modal.querySelector(".js-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document
        .querySelector(".js-subscribe-submit")
        .classList.remove("btn--subscribe--disabled");
      modal.classList.remove("modal__wrapper--visible");
      modal.close();
    });
  }
});
