const burger_Menu = document.querySelector(".burger-menu");
const cart_Link = burger_Menu.querySelector(".js-cart-link");
const cart_Btn = document.querySelector(".js-cart-page-link");
const cards_Number = cart_Btn.querySelector(".js-number-of-cards");
const statusNumber = document.querySelector(".js-status");
const buyWrapper = document.querySelector(".js-buy-wrapper");
const accordions = document.querySelector(".js-accordions");
if (localStorage.getItem("numOfProducts") > 0) {
  accordions.style.display = "none";
  cart_Link.textContent = `Cart(${localStorage.getItem("numOfProducts")})`;
  cards_Number.textContent = localStorage.getItem("numOfProducts");
  cards_Number.classList.add("number-of-cards--active");
  statusNumber.textContent = `(${localStorage.getItem("numOfProducts")} items)`;
} else {
  localStorage.setItem("totalPrice", 0);
  buyWrapper.style.display = "none";
  const cardsDisplayed = document.querySelectorAll(".js-product-card");
  cardsDisplayed.forEach((card) => {
    card.style.display = "none";
  });
}
