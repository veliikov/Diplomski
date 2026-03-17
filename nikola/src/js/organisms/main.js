const cardsOnPage = document.querySelectorAll(".js-product-card");
if (localStorage.getItem("numOfProducts") > 0) {
  cardsOnPage.forEach((card, index) => {
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
    const arr = JSON.parse(localStorage.getItem("bought"));

    if (arr.some((p) => p.id === productData.id)) {
      const buynow = card.querySelector(".js-card-buy-now");
      buynow.classList.add("btn--disabled");
      const btnText = buynow.querySelector(".btn__text");
      btnText.textContent = "Bought";
    }
  });
}
