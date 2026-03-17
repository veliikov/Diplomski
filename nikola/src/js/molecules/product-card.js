const fetchData = async () => {
  const url = "http://localhost:3000/products";

  const response = await fetch(url);
  const data = await response.json();
  return data;
};
const wrapper = document.querySelector(".js-product-card-wrapper");
const cards = wrapper.querySelectorAll(".js-product-card");
export const updateCards = async () => {
  const products = await fetchData();

  cards.forEach((card, index) => {
    const product = products[index];

    card.setAttribute("data-id", product.id);
    card.setAttribute("data-category", product.category);
    card.setAttribute("data-price", product.price);
    card.setAttribute("data-author", product.author.name);
    card.setAttribute("data-title", product.title);
    const img = card.querySelector(".card__picture");
    const title = card.querySelector(".card__header");
    const logo = card.querySelector(".card__logo");
    const username = card.querySelector(".card__username");
    const price = card.querySelector(".card__price-value");
    const hb = card.querySelector(".card__highest-bid-value");

    if (img && product.image && product.image.src) {
      img.src = product.image.src;
      img.alt = product.image.alt || "";
      img.title = product.image.title || "";
    }
    if (title && product.title) {
      title.textContent = product.title;
    }
    if (username && product.author) {
      username.textContent = product.author.name;
    }
    if (price && product.price) {
      price.textContent = product.price + " ETH";
    }
    if (hb && product.highestBid) {
      hb.textContent = product.highestBid + " ETH";
    }
    if (
      logo &&
      product.author &&
      product.author.avatar &&
      product.author.avatar.src
    ) {
      logo.src = product.author.avatar.src;
      logo.alt = product.author.avatar.alt || "";
      logo.title = product.author.avatar.title || "";
    }
  });
};

updateCards();
let numberOfCards = localStorage.getItem("numOfProducts")
  ? localStorage.getItem("numOfProducts")
  : 0;
const boughtCards = [];
const burger = document.querySelector(".burger-menu");
const cartLink = burger.querySelector(".js-cart-link");
const cartBtn = document.querySelector(".js-cart-page-link");
const cardsNumber = cartBtn.querySelector(".js-number-of-cards");
if (localStorage.getItem("numOfProducts") > 0) {
  cartLink.textContent = `Cart(${localStorage.getItem("numOfProducts")})`;
  cardsNumber.classList.add("number-of-cards--active");
  cardsNumber.textContent = localStorage.getItem("numOfProducts");
} else {
  cartLink.textContent = `Cart`;
  cardsNumber.classList.remove("number-of-cards--active");
}

cards.forEach((card, index) => {
  const buynow = card.querySelector(".js-card-buy-now");
  buynow.addEventListener("click", (e) => {
    e.preventDefault();
    numberOfCards++;
    buynow.classList.add("btn--disabled");
    const btnText = buynow.querySelector(".btn__text");
    btnText.textContent = "Bought";
    cartLink.textContent = `Cart(${numberOfCards})`;
    boughtCards.push(card);
    cardsNumber.textContent = numberOfCards;
    cardsNumber.classList.add("number-of-cards--active");
    const productData = {
      id: index + 1,
      image: {
        src: card.querySelector(".card__picture")?.src || "",
        alt: card.querySelector(".card__picture")?.alt || "",
        title: card.querySelector(".card__picture")?.title || "",
      },
      title: card.querySelector(".card__header")?.textContent || "",
      author: {
        name: card.querySelector(".card__username")?.textContent || "",
        avatar: {
          src: card.querySelector(".card__logo")?.src || "",
          alt: card.querySelector(".card__logo")?.alt || "",
          title: card.querySelector(".card__logo")?.title || "",
        },
      },
      price: card.querySelector(".card__price-value")?.textContent || "",
    };

    let stored = [];
    try {
      const raw = localStorage.getItem("bought");
      stored = raw ? JSON.parse(raw) : [];
    } catch (err) {
      stored = [];
    }
    stored.push(productData);
    localStorage.setItem("bought", JSON.stringify(stored));
    localStorage.setItem("numOfProducts", numberOfCards);
  });
});
