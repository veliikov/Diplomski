const btn = document.querySelector(".js-filter-btn");
const filterWrapper = document.querySelector(".filter__wrapper");

btn.addEventListener("click", () => {
  filterWrapper.classList.toggle("open");
  const accordionGroup = document.querySelector(".js-accordion");
  const accordionsOfGroup = Array.from(
    accordionGroup.querySelectorAll(".js-accordion-item")
  );

  const filterValues = {
    creators: [],
    prices: [],
    categories: [],
  };

  accordionsOfGroup.forEach((acc, index) => {
    const checks = acc.querySelectorAll(".js-checkbox");
    checks.forEach((ch) => {
      if (ch.getAttribute("aria-checked") === "true") {
        const value = ch.getAttribute("value");
        if (index === 0) filterValues.creators.push(value);
        if (index === 1) filterValues.prices.push(value);
        if (index === 2) filterValues.categories.push(value);
      }
    });
  });

  const cardsOnPage = document.querySelectorAll(".js-product-card");

  cardsOnPage.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");
    const cardPrice = parseFloat(card.getAttribute("data-price"));
    const cardAuthor = card.getAttribute("data-author");

    let matchesCategory =
      filterValues.categories.length === 0 ||
      filterValues.categories.includes(cardCategory);
    let matchesAuthor =
      filterValues.creators.length === 0 ||
      filterValues.creators.includes(cardAuthor);

    let matchesPrice = false;
    if (filterValues.prices.length === 0) {
      matchesPrice = true;
    } else {
      for (let range of filterValues.prices) {
        const [min, max] = range.split("-");
        if (cardPrice > min && cardPrice <= max) {
          matchesPrice = true;
          break;
        }
      }
    }

    const toDisplay = matchesCategory && matchesAuthor && matchesPrice;

    card.style.display = toDisplay ? "" : "none";
  });
});

const shortcut = document.querySelector(".js-filter-shortcut");
shortcut.addEventListener("click", () => {
  filterWrapper.classList.toggle("open");
});
