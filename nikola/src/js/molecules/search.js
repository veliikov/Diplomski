import { updateCards } from "./product-card.js";

const searchArea = document.querySelector(".js-search-wrapper");
const searchWrapper = searchArea.querySelector(".input-wrapper");

const searchInput = searchWrapper.querySelector(".js-search-input");
const searchResult = document.createElement("ul");
searchResult.classList.add("search-result");
searchWrapper.appendChild(searchResult);
const titles = [];
const authors = [];
window.addEventListener("load", async (e) => {
  await updateCards();
  e.preventDefault();

  const cardsList = document.querySelectorAll(".js-product-card");

  cardsList.forEach((card) => {
    const cardTitle = card.getAttribute("data-title");
    const cardAuthor = card.getAttribute("data-author");

    if (cardTitle && !titles.includes(cardTitle)) {
      titles.push(cardTitle);
    }

    if (cardAuthor && !authors.includes(cardAuthor)) {
      authors.push(cardAuthor);
    }
  });
  searchInput.addEventListener("input", (e) => {
    e.preventDefault();
    const searchQuery = e.target.value;
    searchResult.innerHTML = "";

    if (!searchInput.value) {
      cardsList.forEach((card) => {
        card.style.display = "block";
      });
      searchResult.classList.remove("search-result--visible");

      return;
    }
    if (searchQuery.length === 1) {
      const isUpperCase =
        searchQuery === searchQuery.toUpperCase() &&
        !Number.isInteger(Number(searchQuery));

      titles.forEach((t) => {
        searchResult.classList.add("search-result--visible");
        if (isUpperCase) {
          if (t.toLowerCase().startsWith(searchQuery.toLowerCase())) {
            createTitleElement(t);
          }
        } else {
          if (t.toLowerCase().includes(searchQuery.toLowerCase())) {
            createTitleElement(t);
          }
        }
      });

      authors.forEach((a) => {
        searchResult.classList.add("search-result--visible");
        if (isUpperCase) {
          if (a.toLowerCase().startsWith(searchQuery.toLowerCase())) {
            createAuthorElement(a);
          }
        } else {
          if (a.toLowerCase().includes(searchQuery.toLowerCase())) {
            createAuthorElement(a);
          }
        }
      });
    } else {
      titles.forEach((t) => {
        searchResult.classList.add("search-result--visible");
        if (t.toLowerCase().includes(searchQuery.toLowerCase())) {
          createTitleElement(t);
        }
      });
      authors.forEach((a) => {
        searchResult.classList.add("search-result--visible");
        if (a.toLowerCase().includes(searchQuery.toLowerCase())) {
          createAuthorElement(a);
        }
      });
    }
  });
});

function createTitleElement(t) {
  const searchElement = document.createElement("li");
  searchElement.classList.add("search-element");
  const btnDisplay = document.createElement("button");
  btnDisplay.classList.add("search-display-btn");
  btnDisplay.addEventListener("click", (title) => {
    searchInput.value = t;
    title = t;
    const cardsList = document.querySelectorAll(".js-product-card");
    cardsList.forEach((card) => {
      if (card.getAttribute("data-title") !== title) {
        card.style.display = "none";
      }
    });
    searchResult.classList.remove("search-result--visible");
  });
  const arrowImg = document.createElement("img");
  arrowImg.setAttribute("src", "../../assets/icons/cheveron-right.svg");
  btnDisplay.appendChild(arrowImg);
  const elemTitle = document.createElement("span");
  elemTitle.classList.add("search-element__text");
  elemTitle.textContent = t;
  btnDisplay.appendChild(elemTitle);
  searchElement.appendChild(btnDisplay);
  searchResult.appendChild(searchElement);
}

function createAuthorElement(a) {
  const searchElement = document.createElement("li");
  searchElement.classList.add("search-element");
  const btnDisplay = document.createElement("button");
  btnDisplay.classList.add("search-display-btn");
  btnDisplay.addEventListener("click", (author) => {
    searchInput.value = a;
    author = a;
    const cardsList = document.querySelectorAll(".js-product-card");
    cardsList.forEach((card) => {
      if (card.getAttribute("data-author") !== author) {
        card.style.display = "none";
      }
    });
    searchResult.classList.remove("search-result--visible");
  });
  const arrowImg = document.createElement("img");
  arrowImg.setAttribute("src", "../../assets/icons/cheveron-right.svg");
  btnDisplay.appendChild(arrowImg);
  const elemTitle = document.createElement("span");
  elemTitle.classList.add("search-element__text");
  elemTitle.textContent = a;
  btnDisplay.appendChild(elemTitle);
  searchElement.appendChild(btnDisplay);
  searchResult.appendChild(searchElement);
}
