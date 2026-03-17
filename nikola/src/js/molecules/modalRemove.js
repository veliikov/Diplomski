const modalRemove = document.querySelector(".modal__wrapper");
const closeBtn = modalRemove.querySelector(".js-cancel");
const removeBtn = modalRemove.querySelector(".js-remove");

closeBtn.addEventListener("click", () => {
  modalRemove.classList.remove("modal__wrapper--visible");
  modalRemove.close();
});

let selectedItemToRemove = null;

function setSelectedItemToRemove(data, index) {
  selectedItemToRemove = { data, index };
}

function removeCard() {
  if (!selectedItemToRemove) return;

  const { data, index } = selectedItemToRemove;

  localStorage.setItem(
    "numOfProducts",
    localStorage.getItem("numOfProducts") - 1
  );

  let newData = JSON.parse(localStorage.getItem("bought")).filter(
    (el) => el.id !== data.id
  );
  localStorage.setItem("bought", JSON.stringify(newData));

  const section = document.querySelectorAll(".js-product-card");

  const totalValue = document.querySelector(".js-total-value");
  let totalPriceValue = parseFloat(totalValue.textContent);

  const price = section[index].querySelector(".card__total-value");
  const priceToRemove = parseFloat(price.textContent);
  const newTotal = parseFloat((totalPriceValue - priceToRemove).toFixed(2));

  totalValue.textContent = ` ${newTotal.toFixed(2)} ETH`;
  localStorage.setItem("totalPrice", newTotal);

  const quantitiyValues = JSON.parse(localStorage.getItem("quantities"));
  quantitiyValues[String(data.id)] = 0;
  localStorage.setItem("quantities", JSON.stringify(quantitiyValues));

  section[index].remove();

  if (section.length === 1) {
    localStorage.setItem("totalPrice", 0);
    localStorage.setItem("quantities", "{}");
  }

  modalRemove.classList.remove("modal__wrapper--visible");
  modalRemove.close();
  const burger__Menu = document.querySelector(".burger-menu");
  const cart__Link = burger__Menu.querySelector(".js-cart-link");
  const cart__Btn = document.querySelector(".js-cart-page-link");
  const cards__Number = cart__Btn.querySelector(".js-number-of-cards");
  const buyWrapper = document.querySelector(".js-buy-wrapper");
  const accordions = document.querySelector(".js-accordions");

  const statusNumber = document.querySelector(".js-status");
  const statusText = document.querySelector(".js-title");
  const backBtn = document.querySelector(".js-back-btn");
  if (localStorage.getItem("numOfProducts") > 0) {
    backBtn.style.display = "none";
    statusText.textContent = `Your Cart`;
    statusNumber.textContent = `(${localStorage.getItem(
      "numOfProducts"
    )} items)`;
    cart__Link.textContent = `Cart(${localStorage.getItem("numOfProducts")})`;
    cards__Number.textContent = localStorage.getItem("numOfProducts");
  } else {
    accordions.style.display = "block";
    buyWrapper.style.display = "none";
    backBtn.style.display = "block";
    statusText.textContent = `Your Cart Is Empty`;
    statusNumber.textContent = "";
    cards__Number.classList.remove("number-of-cards--active");
    cart__Link.textContent = `Cart`;
  }
  selectedItemToRemove = null;
}

removeBtn.addEventListener("click", removeCard);

export { setSelectedItemToRemove };
