const button = document.querySelector(".js-burger-btn");
const burgerMenu = document.querySelector(".burger-menu__wrapper");
button.addEventListener("click", () => {
  if (burgerMenu.classList.contains("visible")) {
    burgerMenu.classList.remove("visible");
    burgerMenu.classList.add("hidden");
  } else {
    burgerMenu.classList.remove("hidden");
    burgerMenu.classList.add("visible");
  }
});
