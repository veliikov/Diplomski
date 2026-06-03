export function initQuantityControls() {
  const cards = document.querySelectorAll(".cartMain .js-product-card");
  const totalValue = document.querySelector(".cartMain .js-total-value");

  if (!cards.length || !totalValue) return;

  const parsePrice = (text) => parseFloat(String(text).replace(/[^\d.]/g, "")) || 0;

  const setTotalPriceValue = () => {
    let sum = 0;
    cards.forEach((card) => {
      const total = card.querySelector(".card__total-value");
      sum += parsePrice(total?.textContent);
    });
    const rounded = parseFloat(sum.toFixed(2));
    localStorage.setItem("totalPrice", String(rounded));
    totalValue.textContent = `${rounded.toFixed(2)} ETH`;
    return rounded;
  };

  const saveQuantities = () => {
    const quantities = {};
    document.querySelectorAll(".cartMain .js-product-card").forEach((card) => {
      const id = card.dataset.id;
      const input = card.querySelector(".number-input__quantity");
      if (id && input) quantities[id] = Number(input.value) || 0;
    });
    localStorage.setItem("quantities", JSON.stringify(quantities));
  };

  const updateCardTotal = (card, qty) => {
    const price = card.querySelector(".card__price-value");
    const total = card.querySelector(".card__total-value");
    const value = parsePrice(price?.textContent) * qty;
    if (total) {
      total.textContent = value > 0 ? `${value.toFixed(2)} ETH` : "0";
    }
  };

  cards.forEach((card) => {
    const quantity = card.querySelector(".js-quantity");
    if (!quantity) return;

    const minus = quantity.querySelector(".number-input__decrement");
    const input = quantity.querySelector(".number-input__quantity");
    const plus = quantity.querySelector(".number-input__increment");
    if (!minus || !input || !plus) return;

    const onChange = () => {
      setTotalPriceValue();
      saveQuantities();
    };

    minus.addEventListener("click", () => {
      const current = Number(input.value) || 0;
      if (current > 0) {
        input.value = String(current - 1);
        updateCardTotal(card, current - 1);
      } else {
        input.value = "";
        updateCardTotal(card, 0);
      }
      onChange();
    });

    plus.addEventListener("click", () => {
      const current = Number(input.value) || 0;
      input.value = String(current + 1);
      updateCardTotal(card, current + 1);
      onChange();
    });
  });

  const storedQuantities = JSON.parse(localStorage.getItem("quantities") || "null");
  if (storedQuantities) {
    document.querySelectorAll(".cartMain .js-product-card").forEach((card) => {
      const id = card.dataset.id;
      const input = card.querySelector(".number-input__quantity");
      const qty = storedQuantities[id] || 0;
      if (!input) return;

      if (qty > 0) {
        input.value = String(qty);
        updateCardTotal(card, qty);
      } else {
        input.value = "";
        input.placeholder = "Quantity";
      }
    });
  }

  setTotalPriceValue();
}
