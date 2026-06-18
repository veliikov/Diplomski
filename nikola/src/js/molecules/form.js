const form = document.querySelector(".js-cart-form");
const subscribeForm = document.querySelector(".js-subscribe-form");
const subscribeInput = subscribeForm?.querySelector(".js-subscribe-input");
const subscribeBtn = subscribeForm?.querySelector(".js-subscribe-submit");

const validatedFields = [false, false, false, false];
let subsValidatedField = false;
const userData = {};
const url = "http://localhost:3000/users";
const urlSub = "http://localhost:3000/subscribers";

const fetchUsers = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
const fetchSubscribers = async () => {
  const response = await fetch(urlSub);
  const data = await response.json();
  return data;
};
fetchUsers();
fetchSubscribers();

if (form) {
  const nameInput = form.querySelector(".js-name");
  const nameInputLbl = form.querySelector(".js-name-label");
  const usernameInput = form.querySelector(".js-username");
  const usernameInputLbl = form.querySelector(".js-username-label");
  const emailInput = form.querySelector(".js-email");
  const emailInputLbl = form.querySelector(".js-email-label");
  const checkbox = form.querySelector(".js-checkbox");
  const checkboxLbl = form.querySelector(".js-checkbox-label");
  const submit = form.querySelector(".js-submit");
  nameInput.addEventListener("input", (e) => {
    e.preventDefault();
    submit.classList.remove("btn--disabled");
    const format = /^[A-Za-z]+$/;
    if (!e.target.value) {
      nameInputLbl.textContent = `Name (Name field cannot be empty)`;
      nameInput.classList.add("form-input-text--disabled");
      nameInputLbl.classList.add("form-input-label--disabled");
      validatedFields[0] = false;
    } else if (/\d/.test(e.target.value) || !format.test(e.target.value)) {
      nameInputLbl.textContent = `Name (Name cannot contain special characters or numbers.)`;
      nameInputLbl.classList.add("form-input-label--disabled");
      nameInput.classList.add("form-input-text--disabled");
      validatedFields[0] = false;
    } else if (e.target.value.length < 2 || e.target.value.length > 50) {
      nameInputLbl.textContent = `Name (Name must be between 2 and 50 characters)`;
      nameInputLbl.classList.add("form-input-label--disabled");
      nameInput.classList.add("form-input-text--disabled");
      validatedFields[0] = false;
    } else {
      nameInputLbl.textContent = `Name`;
      nameInput.classList.remove("form-input-text--disabled");
      nameInputLbl.classList.remove("form-input-label--disabled");
      userData.fname = e.target.value;
      validatedFields[0] = true;
    }
  });

  usernameInput.addEventListener("input", (e) => {
    e.preventDefault();
    submit.classList.remove("btn--disabled");
    const format = /[!@#$%^&*(),.?":{}|<>_\-+=~`\\/\[\];']/;
    if (!e.target.value) {
      usernameInputLbl.textContent = `Username (Username field cannot be empty)`;
      usernameInput.classList.add("form-input-text--disabled");
      usernameInputLbl.classList.add("form-input-label--disabled");
      validatedFields[1] = false;
    } else if (!format.test(e.target.value)) {
      usernameInputLbl.textContent = `Username (Username must contain special characters)`;
      usernameInputLbl.classList.add("form-input-label--disabled");
      usernameInput.classList.add("form-input-text--disabled");
      validatedFields[1] = false;
    } else {
      usernameInputLbl.textContent = `Username`;
      usernameInput.classList.remove("form-input-text--disabled");
      usernameInputLbl.classList.remove("form-input-label--disabled");
      userData.username = e.target.value;
      validatedFields[1] = true;
    }
  });

  emailInput.addEventListener("input", (e) => {
    e.preventDefault();
    submit.classList.remove("btn--disabled");
    const format = /^[A-Za-z][A-Za-z0-9._%+-]*@[^\s@]+\.[^\s@]+$/;
    if (!e.target.value) {
      emailInputLbl.textContent = `E-mail (E-mail field cannot be empty)`;
      emailInput.classList.add("form-input-text--disabled");
      emailInputLbl.classList.add("form-input-label--disabled");
      validatedFields[2] = false;
    } else if (!format.test(e.target.value)) {
      emailInputLbl.textContent = `E-mail (E-mail address must be valid.)`;
      emailInputLbl.classList.add("form-input-label--disabled");
      emailInput.classList.add("form-input-text--disabled");
      validatedFields[2] = false;
    } else {
      emailInputLbl.textContent = `E-mail`;
      emailInput.classList.remove("form-input-text--disabled");
      emailInputLbl.classList.remove("form-input-label--disabled");
      userData.email = e.target.value;
      validatedFields[2] = true;
    }
  });

  checkbox.addEventListener("click", () => {
    submit.classList.remove("btn--disabled");
    if (checkbox.getAttribute("aria-checked") === "false") {
      checkbox.classList.remove("checkbox-box--disabled");
      checkboxLbl.classList.remove("checkbox-label--disabled");
      validatedFields[3] = true;
      userData.isChecked = true;
    } else {
      checkbox.classList.add("checkbox-box--disabled");
      checkboxLbl.classList.add("checkbox-label--disabled");
      validatedFields[3] = false;
    }
  });

  function isFormValid() {
    let valid = true;
    validatedFields.forEach((field, index) => {
      if (!field) {
        submit.classList.add("btn--disabled");
        valid = false;
        switch (index) {
          case 0:
            if (!nameInput.value) {
              nameInputLbl.textContent = `Name (Name field cannot be empty)`;
            }
            nameInput.classList.add("form-input-text--disabled");
            nameInputLbl.classList.add("form-input-label--disabled");
            break;
          case 1:
            if (!usernameInput.value) {
              usernameInputLbl.textContent = `Username (Username field cannot be empty)`;
            }
            usernameInput.classList.add("form-input-text--disabled");
            usernameInputLbl.classList.add("form-input-label--disabled");
            break;
          case 2:
            if (!emailInput.value) {
              emailInputLbl.textContent = `E-mail (E-mail field cannot be empty)`;
            }
            emailInput.classList.add("form-input-text--disabled");
            emailInputLbl.classList.add("form-input-label--disabled");
            break;
          case 3:
            checkbox.classList.add("checkbox-box--disabled");
            checkboxLbl.classList.add("checkbox-label--disabled");
            break;

          default:
            break;
        }
      }
    });
    if (valid) {
      submit.classList.remove("btn--disabled");
      nameInput.classList.remove("form-input-text--disabled");
      nameInputLbl.classList.remove("form-input-label--disabled");
      usernameInput.classList.remove("form-input-text--disabled");
      usernameInputLbl.classList.remove("form-input-label--disabled");
      emailInput.classList.remove("form-input-text--disabled");
      emailInputLbl.classList.remove("form-input-label--disabled");
      checkbox.classList.remove("checkbox-box--disabled");
      checkboxLbl.classList.remove("checkbox-label--disabled");
    }
    return valid;
  }

  async function register(user) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname: user.fname,
          username: user.username,
          email: user.email,
          isChecked: user.isChecked,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to register user");
      }

      const data = await res.json();
    } catch (error) {
      console.error("Register error:", error.message);
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    validatedFields[3] = checkbox.getAttribute("aria-checked") === "true";
    userData.isChecked = validatedFields[3];

    if (!isFormValid()) {
      submit.classList.add("btn--disabled");
      return;
    }

    const { processCartCheckout } = await import("./cartCheckout.js");
    await processCartCheckout({
      userData,
      submitBtn: submit,
      registerUser: register,
    });
  });
}

if (subscribeForm) {
  const subscribeBlock = subscribeForm.closest(".subscribe-form-block");
  const subscribeBackdrop = subscribeBlock?.querySelector(".js-subscribe-backdrop");
  const confirmModal = subscribeForm.querySelector(".js-modal-subscribe-confirm");
  const duplicateModal = subscribeForm.querySelector(".js-modal-subscribe-duplicate");
  const successModal = subscribeForm.querySelector(".js-modal-subscribe-success");
  const subscribeModals = () =>
    [confirmModal, duplicateModal, successModal].filter(Boolean);
  const confirmOkBtn = subscribeForm.querySelector(".js-subscribe-confirm-ok");
  const successOkBtn = subscribeForm.querySelector(".js-subscribe-success-ok");
  const hint = subscribeForm.querySelector(".js-subscribe-hint");
  const SUBSCRIBE_SUCCESS_KEY = "nft-marketplace-subscribe-success";
  let isSubmitting = false;
  let pendingSubscribeEmail = null;

  const isSuccessModalOpen = () =>
    successModal?.classList.contains("modal__wrapper--visible");

  const setHint = (text, isError = false) => {
    if (!hint) return;
    hint.textContent = text;
    hint.classList.toggle("subscribe-form__hint--error", isError);
    hint.classList.toggle(
      "subscribe-form__hint--success",
      !isError && text.includes("Ready")
    );
  };

  const setModalMessage = (modal, message) => {
    const el = modal?.querySelector(".js-modal-message");
    if (el) el.textContent = message;
  };

  const toggleSubscribeBackdrop = (show) => {
    if (!subscribeBackdrop) return;
    subscribeBackdrop.classList.toggle("subscribe-form__backdrop--visible", show);
    subscribeBackdrop.setAttribute("aria-hidden", show ? "false" : "true");
  };

  const showSubscribeModal = (modal) => {
    if (!modal) return;
    subscribeModals().forEach((m) => {
      if (m !== modal) m.classList.remove("modal__wrapper--visible");
    });
    modal.classList.add("modal__wrapper--visible");
    toggleSubscribeBackdrop(true);
  };

  const hideSubscribeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove("modal__wrapper--visible");
    const anyOpen = subscribeModals().some((m) =>
      m.classList.contains("modal__wrapper--visible")
    );
    if (!anyOpen) toggleSubscribeBackdrop(false);
  };

  const hideAllSubscribeModals = () => {
    subscribeModals().forEach((m) => m.classList.remove("modal__wrapper--visible"));
    toggleSubscribeBackdrop(false);
  };

  const resetAfterSuccess = () => {
    pendingSubscribeEmail = null;
    subscribeInput.value = "";
    subsValidatedField = false;
    setHint("You're in! We'll send updates to your inbox.");
    subscribeBtn.classList.remove("btn--subscribe--disabled");
  };

  subscribeBackdrop?.addEventListener("click", () => {
    if (isSuccessModalOpen()) return;
    pendingSubscribeEmail = null;
    hideAllSubscribeModals();
    subscribeBtn.classList.remove("btn--subscribe--disabled");
  });

  duplicateModal?.querySelector(".js-close")?.addEventListener("click", (e) => {
    e.preventDefault();
    hideSubscribeModal(duplicateModal);
    subscribeBtn.classList.remove("btn--subscribe--disabled");
  });

  successOkBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    sessionStorage.removeItem(SUBSCRIBE_SUCCESS_KEY);
    hideSubscribeModal(successModal);
    resetAfterSuccess();
    subscribeBtn.classList.remove("btn--subscribe--disabled");
  });

  const submitSubscribe = async (email) => {
    if (!email || isSubmitting) return;

    isSubmitting = true;
    subscribeBtn.classList.add("btn--subscribe--disabled");
    const btnText = subscribeBtn.querySelector(".btn__text");
    const originalLabel = btnText?.textContent || "Subscribe";
    if (btnText) btnText.textContent = "Sending...";

    try {
      const res = await fetch(urlSub, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Subscribe failed");

      pendingSubscribeEmail = null;
      hideSubscribeModal(confirmModal);
      sessionStorage.setItem(SUBSCRIBE_SUCCESS_KEY, "1");
      setHint("You're in! We'll send updates to your inbox.");
      showSubscribeModal(successModal);
    } catch (error) {
      console.error(error);
      hideSubscribeModal(successModal);
      showSubscribeModal(confirmModal);
      subscribeBtn.classList.remove("btn--subscribe--disabled");
      setHint("Could not subscribe right now. Is json-server running?", true);
    } finally {
      isSubmitting = false;
      if (btnText) btnText.textContent = originalLabel;
      confirmOkBtn?.classList.remove("btn--subscribe--disabled");
    }
  };

  confirmOkBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const email = pendingSubscribeEmail;
    if (!email || isSubmitting || isSuccessModalOpen()) return;

    confirmOkBtn?.classList.add("btn--subscribe--disabled");
    setModalMessage(confirmModal, `Subscribing ${email}… Please wait.`);

    await submitSubscribe(email);
  });

  if (sessionStorage.getItem(SUBSCRIBE_SUCCESS_KEY)) {
    showSubscribeModal(successModal);
  }

  subscribeInput.addEventListener("input", async () => {
    pendingSubscribeEmail = null;
    subscribeBtn.classList.remove("btn--subscribe--disabled");
    subscribeInput.classList.remove("subscribe__input--disabled");

    const value = subscribeInput.value.trim();
    if (!value) {
      subsValidatedField = false;
      setHint("Get new drops, creator spotlights, and marketplace news every week.");
      return;
    }

    const format = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!format.test(value)) {
      subsValidatedField = false;
      subscribeInput.classList.add("subscribe__input--disabled");
      setHint("Enter a valid email address (e.g. name@example.com).", true);
      return;
    }

    try {
      const data = await fetchSubscribers();
      const emails = data.map((user) => user.email.toLowerCase());
      if (emails.includes(value.toLowerCase())) {
        subsValidatedField = false;
        setHint("This email is already subscribed.", true);
        return;
      }
    } catch {
      /* allow subscribe if server offline */
    }

    subsValidatedField = true;
    setHint("Ready to subscribe — hit the button when you're set.");
  });

  const openSubscribeConfirm = async () => {
    const email = subscribeInput.value.trim();

    if (!email) {
      subscribeInput.classList.add("subscribe__input--disabled");
      subscribeBtn.classList.add("btn--subscribe--disabled");
      setHint("Please enter your email address.", true);
      return;
    }

    const format = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!format.test(email)) {
      subscribeInput.classList.add("subscribe__input--disabled");
      setHint("Enter a valid email address before subscribing.", true);
      return;
    }

    try {
      const data = await fetchSubscribers();
      if (data.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
        showSubscribeModal(duplicateModal);
        return;
      }
    } catch {
      /* continue — server may be offline until OK */
    }

    if (!subsValidatedField) {
      subsValidatedField = true;
    }

    pendingSubscribeEmail = email;
    setModalMessage(
      confirmModal,
      `Subscribe ${email} to our weekly NFT digest? Click OK to confirm.`
    );
    showSubscribeModal(confirmModal);
  };

  subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    openSubscribeConfirm();
  });
}
