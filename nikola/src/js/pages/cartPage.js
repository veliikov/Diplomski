import { initQuantityControls } from "../atoms/quantity.js";

const normalizeAssetPath = (src) => {
  if (!src) return "";
  const rel = src.indexOf("../../assets/");
  if (rel >= 0) return src.slice(rel);
  const abs = src.indexOf("/assets/");
  if (abs >= 0) return `../..${src.slice(abs)}`;
  return src;
};

class CartCard {
  constructor(wrapper, data) {
    this.wrapper = wrapper;
    this.data = data;
    this.section = this.build();
    const modalForm = wrapper.querySelector(".js-modalForm");
    if (modalForm) {
      wrapper.insertBefore(this.section, modalForm);
    } else {
      wrapper.appendChild(this.section);
    }
  }

  build() {
    const data = this.data;
    const section = document.createElement("section");
    section.className = "card js-product-card";
    section.dataset.id = data.id;

    const imageWrap = document.createElement("div");
    imageWrap.className = "card__image";

    const img = document.createElement("img");
    img.className = "card__picture";
    img.src = normalizeAssetPath(data.image?.src);
    img.alt = data.image?.alt || data.title;

    const bin = document.createElement("div");
    bin.className = "bin";
    const binBtn = document.createElement("button");
    binBtn.type = "button";
    binBtn.className = "btn--delete";
    binBtn.innerHTML = `<svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 0.5C30.7696 0.5 39.5 9.23045 39.5 20V31.5H0.5V0.5H20Z" fill="#1F2937"/>
<path d="M20 0.5C30.7696 0.5 39.5 9.23045 39.5 20V31.5H0.5V0.5H20Z" stroke="white"/>
<path d="M29.3333 9.33333L28.1769 25.5233C28.0772 26.9188 26.916 28 25.517 28H14.483C13.0839 28 11.9228 26.9188 11.8231 25.5233L10.6666 9.33333M17.3333 14.6667V22.6667M22.6666 14.6667V22.6667M24 9.33333V5.33333C24 4.59695 23.403 4 22.6666 4H17.3333C16.5969 4 16 4.59695 16 5.33333V9.33333M9.33331 9.33333H30.6666" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    binBtn.addEventListener("click", () => openRemoveModal(data, section));
    bin.appendChild(binBtn);
    imageWrap.appendChild(img);
    imageWrap.appendChild(bin);

    const info = document.createElement("div");
    info.className = "card__info";

    const pac = document.createElement("div");
    pac.className = "card__product-and-creator";
    const hw = document.createElement("div");
    hw.className = "card__heading-wrapper";
    const h2 = document.createElement("h2");
    h2.className = "card__header";
    h2.textContent = data.title;
    hw.appendChild(h2);

    const creator = document.createElement("div");
    creator.className = "card__creator";
    const logo = document.createElement("img");
    logo.className = "card__logo";
    logo.src = normalizeAssetPath(data.author?.avatar?.src);
    logo.alt = data.author?.avatar?.alt || data.author?.name || "";
    const user = document.createElement("span");
    user.className = "card__username";
    user.textContent = data.author?.name || "";
    creator.appendChild(logo);
    creator.appendChild(user);
    pac.appendChild(hw);
    pac.appendChild(creator);
    info.appendChild(pac);

    const pt = document.createElement("div");
    pt.className = "card__price-total";
    const priceBox = document.createElement("div");
    priceBox.className = "card__price";
    priceBox.innerHTML = `<p class="card__price-text">Price</p><p class="card__price-value">${data.price}</p>`;
    const totalBox = document.createElement("div");
    totalBox.className = "card__total";
    totalBox.innerHTML = `<p class="card__total-text">Total</p><p class="card__total-value">0</p>`;
    pt.appendChild(priceBox);
    pt.appendChild(totalBox);
    info.appendChild(pt);

    const qtyWrap = document.createElement("div");
    qtyWrap.className = "card__quantity";
    const qty = document.createElement("div");
    qty.className = "number-input js-quantity";
    qty.innerHTML = `
      <button type="button" class="number-input__decrement"><svg width="7" height="3" viewBox="0 0 7 3" fill="none"><path d="M6.5696 0.639914V2.29545H0.765625V0.639914H6.5696Z" fill="#374151"/></svg></button>
      <input type="text" class="number-input__quantity" placeholder="Quantity" />
      <button type="button" class="number-input__increment"><svg width="9" height="10" viewBox="0 0 9 10" fill="none"><path d="M3.63281 9.16903V0.526988H5.35227V9.16903H3.63281ZM0.174716 5.70455V3.98509H8.81676V5.70455H0.174716Z" fill="#374151"/></svg></button>`;

    qtyWrap.appendChild(qty);
    section.appendChild(imageWrap);
    section.appendChild(info);
    section.appendChild(qtyWrap);
    return section;
  }
}

let pendingRemove = null;

function openRemoveModal(data, section) {
  const modal = document.querySelector(".js-modalForm .js-modal");
  if (!modal) return;
  pendingRemove = { data, section };
  modal.classList.add("modal__wrapper--visible");
  modal.showModal();
}

function setupRemoveModal() {
  const modal = document.querySelector(".js-modalForm .js-modal");
  if (!modal) return;

  modal.querySelector(".js-cancel")?.addEventListener("click", () => {
    modal.classList.remove("modal__wrapper--visible");
    modal.close();
    pendingRemove = null;
  });

  modal.querySelector(".js-remove")?.addEventListener("click", () => {
    if (!pendingRemove) return;

    const { data, section } = pendingRemove;
    const bought = JSON.parse(localStorage.getItem("bought") || "[]").filter(
      (item) => String(item.id) !== String(data.id)
    );
    const quantities = JSON.parse(localStorage.getItem("quantities") || "{}");
    delete quantities[String(data.id)];

    localStorage.setItem("bought", JSON.stringify(bought));
    localStorage.setItem("quantities", JSON.stringify(quantities));
    localStorage.setItem("numOfProducts", String(bought.length));
    localStorage.setItem("totalPrice", "0");

    section.remove();
    pendingRemove = null;
    modal.classList.remove("modal__wrapper--visible");
    modal.close();

    initQuantityControls();
    updateCartChrome();

    if (bought.length === 0) {
      showEmptyCart();
    }
  });
}

function updateCartChrome() {
  const count = Number(localStorage.getItem("numOfProducts") || 0);
  const burger = document.querySelector(".burger-menu");
  const cartLink = burger?.querySelector(".js-cart-link");
  const cartBtn = document.querySelector(".js-cart-page-link");
  const cardsNumber = cartBtn?.querySelector(".js-number-of-cards");
  const statusNumber = document.querySelector(".js-status");

  if (count > 0) {
    if (cartLink) cartLink.textContent = `Cart(${count})`;
    if (cardsNumber) {
      cardsNumber.textContent = count;
      cardsNumber.classList.add("number-of-cards--active");
    }
    if (statusNumber) statusNumber.textContent = `(${count} items)`;
  } else {
    if (cartLink) cartLink.textContent = "Cart";
    if (cardsNumber) {
      cardsNumber.textContent = "";
      cardsNumber.classList.remove("number-of-cards--active");
    }
    if (statusNumber) statusNumber.textContent = "";
  }
}

function showEmptyCart() {
  const backBtn = document.querySelector(".js-back-btn");
  const statusText = document.querySelector(".js-title");
  const buyWrapper = document.querySelector(".js-buy-wrapper");
  const accordions = document.querySelector(".js-accordions");

  if (statusText) statusText.textContent = "Your Cart Is Empty";
  if (backBtn) backBtn.style.display = "";
  if (buyWrapper) buyWrapper.style.display = "none";
  if (accordions) accordions.style.display = "";
  updateCartChrome();
}

function showFilledCart() {
  const backBtn = document.querySelector(".js-back-btn");
  const statusText = document.querySelector(".js-title");
  const buyWrapper = document.querySelector(".js-buy-wrapper");
  const accordions = document.querySelector(".js-accordions");

  if (statusText) statusText.textContent = "Your Cart";
  if (backBtn) backBtn.style.display = "none";
  if (buyWrapper) buyWrapper.style.display = "";
  if (accordions) accordions.style.display = "none";
  updateCartChrome();
}

function initCartPage() {
  const wrapper = document.querySelector(".cartMain .js-product-card-wrapper");
  if (!wrapper) return;

  let bought = [];
  try {
    bought = JSON.parse(localStorage.getItem("bought") || "[]");
  } catch {
    bought = [];
  }

  if (!bought.length) {
    showEmptyCart();
    return;
  }

  showFilledCart();

  wrapper.querySelectorAll(".js-product-card").forEach((el) => el.remove());

  bought.forEach((item) => {
    new CartCard(wrapper, item);
  });

  initQuantityControls();
  setupRemoveModal();
}

initCartPage();
