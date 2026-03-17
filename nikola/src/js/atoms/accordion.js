class Accordion {
  constructor(domNode, allowMultipleOpen = false) {
    this.rootEl = domNode;
    this.allowMultipleOpen = allowMultipleOpen;
    this.sections = [];
    this.initAccordion();
  }

  initAccordion() {
    this.rootEl.setAttribute("role", "region");

    const items = this.rootEl.querySelectorAll(".js-accordion-item");

    items.forEach((item) => {
      const button = item.querySelector(".js-accordion__button");
      const panel = item.querySelector(".js-accordion-panel");

      button.addEventListener("click", () => this.toggleSection(button, panel));
      this.sections.push({ button, panel });
    });
  }

  toggleSection(button, panel) {
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    if (this.allowMultipleOpen) {
      this.toggleSingleSection(button, panel, !isExpanded);
    } else {
      this.closeAllSections();
      if (!isExpanded) this.toggleSingleSection(button, panel, true);
    }
  }

  toggleSingleSection(button, panel, open) {
    button.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      panel.removeAttribute("hidden");
      panel.classList.add("open");
    } else {
      panel.setAttribute("hidden", "");
      panel.classList.remove("open");
    }
  }

  closeAllSections() {
    this.sections.forEach(({ button, panel }) => {
      this.toggleSingleSection(button, panel, false);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const accordionEl = document.querySelector(".js-accordion");
  if (accordionEl) new Accordion(accordionEl, true);
});
