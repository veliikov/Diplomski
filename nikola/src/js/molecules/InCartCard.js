import { setSelectedItemToRemove } from "./modalRemove.js";
class inCartCard {
  constructor(domNode, data, index) {
    this.rootEl = domNode;
    this.data = data;
    this.index = index;
    this.initCard();
  }

  initCard() {
    const section = this.createSection(this.data, this.index);
    this.rootEl.appendChild(section);
  }

  createSection(data, index) {
    const section = document.createElement("section");
    section.setAttribute("data-id", data.id);
    section.classList.add("card", "js-product-card");
    const cardImage = this.createCardImage(data, section);
    section.appendChild(cardImage);
    const cardInfo = this.createCardInfo(data);
    section.appendChild(cardInfo);
    const cardQuantity = this.createQuantity(data);
    section.appendChild(cardQuantity);
    return section;
  }

  createCardImage(data, card) {
    const cardImageWrapper = document.createElement("div");
    cardImageWrapper.classList.add("card__image");
    const image = document.createElement("img");
    image.setAttribute("src", data.image.src);
    image.setAttribute("alt", data.image.alt);
    image.classList.add("card__picture");
    const bin = document.createElement("div");
    bin.classList.add("bin");
    const binBtn = document.createElement("button");
    binBtn.classList.add("btn--delete");
    binBtn.innerHTML = `<svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 0.5C30.7696 0.5 39.5 9.23045 39.5 20V31.5H0.5V0.5H20Z" fill="#1F2937"/>
<path d="M20 0.5C30.7696 0.5 39.5 9.23045 39.5 20V31.5H0.5V0.5H20Z" stroke="white"/>
<path d="M29.3333 9.33333L28.1769 25.5233C28.0772 26.9188 26.916 28 25.517 28H14.483C13.0839 28 11.9228 26.9188 11.8231 25.5233L10.6666 9.33333M17.3333 14.6667V22.6667M22.6666 14.6667V22.6667M24 9.33333V5.33333C24 4.59695 23.403 4 22.6666 4H17.3333C16.5969 4 16 4.59695 16 5.33333V9.33333M9.33331 9.33333H30.6666" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

    binBtn.addEventListener("click", () => {
      const modalForm = document.querySelector(".js-modalForm");
      const modalDelete = modalForm.querySelector(".js-modal");
      modalDelete.classList.add("modal__wrapper--visible");
      modalDelete.showModal();
      const section = Array.from(document.querySelectorAll(".js-product-card"));
      const id = section.indexOf(card);
      setSelectedItemToRemove(data, id);
    });

    bin.appendChild(binBtn);
    cardImageWrapper.appendChild(image);
    cardImageWrapper.appendChild(bin);
    return cardImageWrapper;
  }

  createCardInfo(data) {
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card__info");
    const cardProductAndCreator = document.createElement("div");
    cardProductAndCreator.classList.add("card__product-and-creator");
    const cardHeadingWrapper = document.createElement("div");
    cardHeadingWrapper.classList.add("card__heading-wrapper");
    const cardHeading = document.createElement("h2");
    cardHeading.classList.add("card__header");
    cardHeading.textContent = data.title;
    cardHeadingWrapper.appendChild(cardHeading);
    const cardCreator = document.createElement("div");
    cardCreator.classList.add("card__creator");
    const logo = document.createElement("img");
    logo.setAttribute("src", data.author.avatar.src);
    logo.setAttribute("alt", data.author.avatar.alt);
    logo.classList.add("card__logo");
    const cardUsername = document.createElement("span");
    cardUsername.classList.add("card__username");
    cardUsername.textContent = data.author.name;
    cardCreator.appendChild(logo);
    cardCreator.appendChild(cardUsername);
    cardProductAndCreator.appendChild(cardHeadingWrapper);
    cardProductAndCreator.appendChild(cardCreator);
    cardInfo.appendChild(cardProductAndCreator);
    const cardPriceAndTotal = document.createElement("div");
    cardPriceAndTotal.classList.add("card__price-total");
    const cardPrice = document.createElement("div");
    cardPrice.classList.add("card__price");
    const priceText = document.createElement("p");
    priceText.classList.add("card__price-text");
    priceText.textContent = "Price";
    const priceValue = document.createElement("p");
    priceValue.classList.add("card__price-value");
    priceValue.textContent = data.price;
    cardPrice.appendChild(priceText);
    cardPrice.appendChild(priceValue);
    cardPriceAndTotal.appendChild(cardPrice);

    const cardTotal = document.createElement("div");
    cardTotal.classList.add("card__total");
    const totalText = document.createElement("p");
    totalText.classList.add("card__total-text");
    totalText.textContent = "Total";
    const totalValue = document.createElement("p");
    totalValue.classList.add("card__total-value");
    totalValue.textContent = 0;
    cardTotal.appendChild(totalText);
    cardTotal.appendChild(totalValue);
    cardPriceAndTotal.appendChild(cardTotal);
    cardInfo.appendChild(cardPriceAndTotal);
    return cardInfo;
  }

  createQuantity(data) {
    const quantityWrapper = document.createElement("div");
    quantityWrapper.classList.add("card__quantity");
    const quantity = this.createQuantityElement();
    quantityWrapper.appendChild(quantity);
    return quantityWrapper;
  }

  createQuantityElement() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("number-input", "js-quantity");
    const minus = document.createElement("button");
    minus.classList.add("number-input__decrement");
    minus.innerHTML = `<svg width="7" height="3" viewBox="0 0 7 3" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5696 0.639914V2.29545H0.765625V0.639914H6.5696Z" fill="#374151"/>
</svg>
`;
    wrapper.appendChild(minus);
    const input = document.createElement("input");
    input.classList.add("number-input__quantity");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Quantity");
    wrapper.appendChild(input);
    const plus = document.createElement("button");
    plus.classList.add("number-input__increment");
    plus.innerHTML = `<svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.63281 9.16903V0.526988H5.35227V9.16903H3.63281ZM0.174716 5.70455V3.98509H8.81676V5.70455H0.174716Z" fill="#374151"/>
</svg>
`;
    wrapper.appendChild(plus);
    return wrapper;
  }
}
const backBtn = document.querySelector(".js-back-btn");
const statusText = document.querySelector(".js-title");
const statusNumber = document.querySelector(".js-status");
const burger__Menu = document.querySelector(".burger-menu");
const cart__Link = burger__Menu.querySelector(".js-cart-link");
const cart__Btn = document.querySelector(".js-cart-page-link");
const cards__Number = cart__Btn.querySelector(".js-number-of-cards");
if (localStorage.getItem("numOfProducts") > 0) {
  statusText.textContent = "Your Cart";
  backBtn.style.display = "none";
  cart__Link.textContent = `Cart(${localStorage.getItem("numOfProducts")})`;
}
const database = localStorage.getItem("bought");
const wrapper = document.querySelector(".js-product-card-wrapper");
const data = JSON.parse(database);
data.forEach((d, index) => {
  const card = new inCartCard(wrapper, d, index);
});
