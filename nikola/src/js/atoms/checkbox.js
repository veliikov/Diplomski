document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".js-checkbox");
  const labels = document.querySelectorAll(".js-checkbox-label");

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      const isChecked = box.getAttribute("aria-checked") === "true";
      box.setAttribute("aria-checked", String(!isChecked));
    });
  });

  labels.forEach((label) => {
    label.addEventListener("click", () => {
      const targetId = label.getAttribute("data-target");
      if (!targetId) return;
      const box = document.getElementById(targetId);
      if (box) box.click();
    });
  });
});
