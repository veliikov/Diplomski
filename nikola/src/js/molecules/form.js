const form = document.querySelector(".js-form");
const subscribeForm = document.querySelector(".js-subscribe-form");
const subscribeInput = subscribeForm.querySelector(".js-subscribe-input");
const subscribeBtn = subscribeForm.querySelector(".js-subscribe-submit");

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

  usernameInput.addEventListener("input", async (e) => {
    e.preventDefault();
    submit.classList.remove("btn--disabled");
    const data = await fetchUsers();
    const usernames = data.map((user) => user.username);
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
    } else if (usernames.includes(e.target.value)) {
      usernameInputLbl.textContent = `Username (Username is already taken. Please choose another one.)`;
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

  emailInput.addEventListener("input", async (e) => {
    e.preventDefault();
    submit.classList.remove("btn--disabled");
    const data = await fetchUsers();
    const emails = data.map((user) => user.email);
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
    } else if (emails.includes(e.target.value)) {
      emailInputLbl.textContent = `E-mail (E-mail is already registered)`;
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

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const modal = form.querySelector(".js-modal-success");

    if (isFormValid()) {
      modal.classList.add("modal__wrapper--visible");
      modal.showModal();
      const closeBtn = modal.querySelector(".js-close");
      const handleClose = async () => {
        localStorage.setItem("numOfProducts", 0);
        localStorage.setItem("bought", "[]");
        localStorage.setItem("quantities", "{}");
        localStorage.setItem("totalPrice", 0);
        modal.close();
        modal.classList.remove("modal__wrapper--visible");
        closeBtn.removeEventListener("click", handleClose);
        await register(userData);
        form.submit();
      };

      closeBtn.addEventListener("click", handleClose);
    } else {
      submit.classList.add("btn--disabled");
    }
  });
}

if (subscribeForm) {
  const modal = subscribeForm.querySelector(".js-modal-success");
  let modalDisplay = false;
  subscribeInput.addEventListener("input", async (e) => {
    modalDisplay = false;
    e.preventDefault();
    subscribeBtn.classList.remove("btn--subscribe--disabled");
    modal.classList.remove("modal__wrapper--visible");
    const data = await fetchSubscribers();
    const emails = data.map((user) => user.email);
    const format = /^[A-Za-z][A-Za-z0-9._%+-]*@[^\s@]+\.[^\s@]+$/;
    if (!e.target.value) {
      subscribeInput.classList.add("subscribe__input--disabled");
      subsValidatedField = false;
    } else if (!format.test(e.target.value)) {
      subscribeInput.classList.add("subscribe__input--disabled");
      subsValidatedField = false;
    } else if (emails.includes(e.target.value)) {
      modalDisplay = true;
      subsValidatedField = false;
    } else {
      subscribeInput.classList.remove("subscribe__input--disabled");
      subsValidatedField = true;
    }
  });
  subscribeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    subscribeInput.classList.remove("subscribe__input--disabled");
    if (!subsValidatedField) {
      if (!subscribeInput.value) {
        subscribeBtn.classList.add("btn--subscribe--disabled");
      } else {
        if (modalDisplay) {
          subscribeBtn.classList.add("btn--subscribe--disabled");
          modal.classList.add("modal__wrapper--visible");
          modal.showModal();
          subscribeForm.reset();
        } else {
          subscribeInput.classList.add("subscribe__input--disabled");
          subscribeBtn.classList.add("btn--subscribe--disabled");
        }
      }
    } else {
      const email = subscribeInput.value;
      await fetch("http://localhost:3000/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      subscribeForm.submit();
      subscribeForm.reset();
    }
  });
}
