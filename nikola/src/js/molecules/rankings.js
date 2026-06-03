import { API_BASE } from "../config.js";
import { FALLBACK_PRODUCTS } from "../data/fallback-products.js";
import { showNoticeModal } from "./modalNotice.js";

const modal = document.querySelector(".js-modal-rankings");
const form = document.querySelector(".js-rankings-form");
const nftSelect = document.querySelector(".js-rankings-nft");
const openLinks = document.querySelectorAll(".js-rankings-link");

const loadNftOptions = async () => {
  if (!nftSelect) return;

  let products = FALLBACK_PRODUCTS;
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (res.ok) products = await res.json();
  } catch {
    /* use fallback */
  }

  nftSelect.innerHTML =
    '<option value="" disabled selected>Select an NFT...</option>' +
    products
      .map(
        (p) =>
          `<option value="${p.id}">${p.title} — ${p.author.name} (${p.price} ETH)</option>`
      )
      .join("");
};

const openRankingsModal = async (e) => {
  e.preventDefault();
  if (!modal || !form) return;

  await loadNftOptions();
  form.reset();
  modal.classList.add("modal__wrapper--visible");
  modal.showModal();
};

const closeRankingsModal = () => {
  if (!modal) return;
  modal.classList.remove("modal__wrapper--visible");
  modal.close();
};

openLinks.forEach((link) => link.addEventListener("click", openRankingsModal));

document.querySelector(".js-rankings-cancel")?.addEventListener("click", () => {
  closeRankingsModal();
});

modal?.addEventListener("cancel", (e) => {
  e.preventDefault();
  closeRankingsModal();
});

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.querySelector(".js-rankings-name")?.value.trim();
  const nftId = form.querySelector(".js-rankings-nft")?.value;
  const score = Number(form.querySelector(".js-rankings-score")?.value);
  const comment = form.querySelector(".js-rankings-comment")?.value.trim();
  const nftTitle =
    form.querySelector(".js-rankings-nft")?.selectedOptions[0]?.textContent ||
    "";

  if (!name || !nftId || score < 1 || score > 10) {
    showNoticeModal({
      title: "Incomplete ranking",
      message: "Fill in your name, pick an NFT, and enter a score from 1 to 10.",
    });
    return;
  }

  const payload = {
    voterName: name,
    nftId,
    nftTitle,
    score,
    comment: comment || "",
    createdAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(`${API_BASE}/rankings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to save ranking");

    closeRankingsModal();
    showNoticeModal({
      title: "Ranking submitted",
      message: `Thanks ${name}! Your score of ${score}/10 for "${nftTitle.split(" — ")[0]}" has been saved.`,
    });
  } catch (err) {
    console.error(err);
    showNoticeModal({
      title: "Could not save ranking",
      message:
        "Make sure json-server is running (npm run json-server), then try again.",
      primaryLabel: "Retry",
      onPrimary: () => form.requestSubmit(),
    });
  }
});
