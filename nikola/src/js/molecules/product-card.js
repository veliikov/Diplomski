import { API_BASE } from "../config.js";
import { FALLBACK_PRODUCTS } from "../data/fallback-products.js";

const fetchData = async () => {
  const response = await fetch(`${API_BASE}/products`);
  if (!response.ok) throw new Error("Failed to load products");
  return response.json();
};

const wrapper = document.querySelector(".js-product-card-wrapper");
const cards = wrapper?.querySelectorAll(".js-product-card") ?? [];

const getStoredBought = () => {
  try {
    const raw = localStorage.getItem("bought");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const normalizeAssetPath = (src) => {
  if (!src) return "";
  const rel = src.indexOf("../../assets/");
  if (rel >= 0) return src.slice(rel);
  const abs = src.indexOf("/assets/");
  if (abs >= 0) return `../..${src.slice(abs)}`;
  return src;
};

const getProductDataFromCard = (card) => {
  const priceAttr = card.getAttribute("data-price");
  const price =
    priceAttr != null && priceAttr !== ""
      ? `${priceAttr} ETH`
      : card.querySelector(".card__price-value")?.textContent?.trim() || "0 ETH";

  const imageSrc =
    card.dataset.imageSrc ||
    normalizeAssetPath(card.querySelector(".card__picture")?.src);

  const avatarSrc =
    card.dataset.avatarSrc ||
    normalizeAssetPath(card.querySelector(".card__logo")?.src);

  return {
    id: card.getAttribute("data-id"),
    title:
      card.getAttribute("data-title") ||
      card.querySelector(".card__header")?.textContent?.trim() ||
      "",
    category: card.getAttribute("data-category") || "",
    price,
    image: {
      src: imageSrc,
      alt: card.querySelector(".card__picture")?.alt || "",
      title: card.querySelector(".card__picture")?.title || "",
    },
    author: {
      name:
        card.getAttribute("data-author") ||
        card.querySelector(".card__username")?.textContent?.trim() ||
        "",
      avatar: {
        src: avatarSrc,
        alt: card.querySelector(".card__logo")?.alt || "",
        title: card.querySelector(".card__logo")?.title || "",
      },
    },
  };
};

const markCardAsBought = (card, buynow) => {
  buynow.classList.add("btn--disabled");
  const btnText = buynow.querySelector(".btn__text");
  if (btnText) btnText.textContent = "Bought";
};

const applyBoughtState = (card) => {
  const productId = card.getAttribute("data-id");
  const stored = getStoredBought();
  const buynow = card.querySelector(".js-card-buy-now");
  if (!buynow || !productId) return;

  if (stored.some((p) => String(p.id) === String(productId))) {
    markCardAsBought(card, buynow);
  }
};

export const updateCards = async () => {
  let products = FALLBACK_PRODUCTS;

  try {
    products = await fetchData();
  } catch (err) {
    console.warn("Using local product catalog — start json-server for live API.", err);
  }

  cards.forEach((card, index) => {
    const product = products[index];
    if (!product) {
      card.style.display = "none";
      return;
    }

    card.style.display = "";

    card.setAttribute("data-id", product.id);
    card.setAttribute("data-category", product.category);
    card.setAttribute("data-price", product.price);
    card.setAttribute("data-author", product.author.name);
    card.setAttribute("data-title", product.title);
    card.dataset.imageSrc = product.image.src;
    card.dataset.avatarSrc = product.author.avatar.src;

    const img = card.querySelector(".card__picture");
    const title = card.querySelector(".card__header");
    const logo = card.querySelector(".card__logo");
    const username = card.querySelector(".card__username");
    const price = card.querySelector(".card__price-value");
    const hb = card.querySelector(".card__highest-bid-value");

    if (img && product.image?.src) {
      img.src = product.image.src;
      img.alt = product.image.alt || "";
      img.title = product.image.title || "";
    }
    if (title && product.title) title.textContent = product.title;
    if (username && product.author) username.textContent = product.author.name;
    if (price && product.price != null) price.textContent = `${product.price} ETH`;
    if (hb && product.highestBid != null) hb.textContent = `${product.highestBid} ETH`;
    if (logo && product.author?.avatar?.src) {
      logo.src = product.author.avatar.src;
      logo.alt = product.author.avatar.alt || "";
      logo.title = product.author.avatar.title || "";
    }

    applyBoughtState(card);
  });
};

const burger = document.querySelector(".burger-menu");
const cartLink = burger?.querySelector(".js-cart-link");
const cartBtn = document.querySelector(".js-cart-page-link");
const cardsNumber = cartBtn?.querySelector(".js-number-of-cards");

const syncCartBadge = () => {
  const count = Number(localStorage.getItem("numOfProducts") || 0);
  if (count > 0) {
    if (cartLink) cartLink.textContent = `Cart(${count})`;
    if (cardsNumber) {
      cardsNumber.classList.add("number-of-cards--active");
      cardsNumber.textContent = count;
    }
  } else {
    if (cartLink) cartLink.textContent = "Cart";
    if (cardsNumber) {
      cardsNumber.classList.remove("number-of-cards--active");
      cardsNumber.textContent = "";
    }
  }
};

syncCartBadge();

const addToCartStorage = (productData) => {
  if (!productData.id) return;

  const stored = getStoredBought();
  if (stored.some((p) => String(p.id) === String(productData.id))) return;

  stored.push(productData);
  localStorage.setItem("bought", JSON.stringify(stored));
  localStorage.setItem("numOfProducts", String(stored.length));
  syncCartBadge();
};

cards.forEach((card) => {
  const buynow = card.querySelector(".js-card-buy-now");
  if (!buynow) return;

  buynow.addEventListener("click", (e) => {
    e.preventDefault();
    if (buynow.classList.contains("btn--disabled")) return;

    const productId = card.getAttribute("data-id");
    if (!productId) return;

    markCardAsBought(card, buynow);
    addToCartStorage(getProductDataFromCard(card));
  });
});

updateCards().catch((err) => {
  console.error("Failed to render product cards:", err);
});
