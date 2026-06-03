const cardsOnPage = document.querySelectorAll(".js-product-card");
const bought = JSON.parse(localStorage.getItem("bought") || "[]");

cardsOnPage.forEach((card) => {
  const productId = card.getAttribute("data-id");
  if (!productId) return;

  if (bought.some((p) => String(p.id) === String(productId))) {
    const buynow = card.querySelector(".js-card-buy-now");
    if (!buynow) return;
    buynow.classList.add("btn--disabled");
    const btnText = buynow.querySelector(".btn__text");
    if (btnText) btnText.textContent = "Bought";
  }
});
