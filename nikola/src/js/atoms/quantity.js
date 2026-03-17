const cards = document.querySelectorAll(".js-product-card");
const totalValue = document.querySelector(".js-total-value");
totalValue.textContent = localStorage.getItem("totalPrice")
  ? localStorage.getItem("totalPrice") + " ETH"
  : "";
let totalPriceValue = 0;
const totalPrices = [];
const valuesToDisplay = [];

cards.forEach((card, index) => {
  const price = card.querySelector(".card__price-value");
  const total = card.querySelector(".card__total-value");
  const quantity = card.querySelector(".js-quantity");
  const minus = quantity.querySelector(".number-input__decrement");
  const input = quantity.querySelector(".number-input__quantity");
  const plus = quantity.querySelector(".number-input__increment");
  minus.addEventListener("click", () => {
    if (input.value > 0) {
      input.value--;
      input.textContent = input.value;
      let value = parseFloat(price.textContent) * Number(input.value);
      totalPrices[index] = value;

      if (value > 0) {
        total.textContent = value.toFixed(2) + " ETH";
      } else {
        total.textContent = "0";
      }
    } else {
      input.textContent = "0";
      total.textContent = "0";
    }
    totalPriceValue = setTotalPriceValue(totalPrices);

    totalValue.textContent = ` ${totalPriceValue.toFixed(2)} ETH`;
    saveQuantities();
  });

  plus.addEventListener("click", () => {
    input.value++;
    input.textContent = input.value;
    let value = parseFloat(price.textContent) * Number(input.value);
    totalPrices[index] = value;

    total.textContent = value.toFixed(2) + " ETH";
    totalPriceValue = setTotalPriceValue(totalPrices);

    totalValue.textContent = ` ${totalPriceValue.toFixed(2)} ETH`;
    saveQuantities();
  });
});

function setTotalPriceValue() {
  const displayedCards = document.querySelectorAll(".js-product-card");
  let sum = 0;
  displayedCards.forEach((card) => {
    const total = card.querySelector(".card__total-value");
    sum += parseFloat(total.textContent);
  });
  localStorage.setItem("totalPrice", sum);
  sum = parseFloat(sum.toFixed(2));
  localStorage.setItem("totalPrice", sum);
  return sum;
}

function saveQuantities() {
  const quantities = {};

  cards.forEach((card) => {
    const id = card.getAttribute("data-id");
    const input = card.querySelector(".number-input__quantity");
    quantities[id] = Number(input.value);
  });

  localStorage.setItem("quantities", JSON.stringify(quantities));
}

function loadQuantities() {
  const quantities = JSON.parse(localStorage.getItem("quantities"));

  if (quantities) {
    cards.forEach((card) => {
      const id = card.getAttribute("data-id");
      const input = card.querySelector(".number-input__quantity");
      const price = card.querySelector(".card__price-value");
      const total = card.querySelector(".card__total-value");

      const qty = quantities[id] || 0;
      if (qty > 0) {
        input.value = qty;
      } else {
        input.value = "";
        input.placeholder = "Quantity";
      }

      const val = parseFloat(price.textContent) * qty;
      total.textContent = val > 0 ? val.toFixed(2) + " ETH" : "0";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadQuantities();
});
