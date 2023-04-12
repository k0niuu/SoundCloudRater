import { login, logout, register } from "./firebasesetup.js";

const loginSection = document.querySelector("#login");
const loginFormSection = document.querySelector("#login-form");
const registerFormSection = document.querySelector("#register-form");
const mainApplicationSection = document.querySelector("#main-application");

const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const registerEmailInput = document.querySelector("#email-register-input");
const registerPasswordInput = document.querySelector(
  "#password-register-input"
);
const confirmPasswordInput = document.querySelector("#confirm-password-input");

const loginBtn = document.querySelector("#login-btn");
const registerBtn = document.querySelector("#register-btn");
const registerSubmitBtn = document.querySelector("#register-submit-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const logoutBtn = document.querySelector("#logout-btn");
const userEmail = document.querySelector(".user span");

// funkcja, która zmienia styl sekcji
function setActiveSection(sectionToShow, sectionToHide) {
  sectionToShow.classList.add("active-section");
  sectionToShow.classList.remove("inactive-section");
  sectionToHide.classList.add("inactive-section");
  sectionToHide.classList.remove("active-section");
}
// Hide the main application section by default
mainApplicationSection.style.display = "none";

// Show the register form and hide the login form
registerBtn.addEventListener("click", () => {
  setActiveSection(registerFormSection, loginFormSection);
});

// Show the login form and hide the register form
cancelBtn.addEventListener("click", () => {
  setActiveSection(loginFormSection, registerFormSection);
});

// Login by "Log in" button
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  login(email, password)
    .then(() => {
      userEmail.textContent = email;
      console.log(`Successfully logged in as: ${userEmail.textContent}`);
      mainApplicationSection.style.display = "";
      setActiveSection(mainApplicationSection, loginSection);
    })
    .catch((error) => {
      console.error("Error logging in:", error);
    });
});

//Login by enter
// document.addEventListener("keyup", (event) => {
//   if (event.key === "Enter") {
//     loginBtn.click(); // wywołanie funkcji login po naciśnięciu Enter
//   }
// });

//Register by "Register" button
registerSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const email = registerEmailInput.value;
  const password = registerPasswordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password !== confirmPassword) {
    console.error("Passwords do not match");
    return;
  }

  register(email, password)
    .then(() => {
      userEmail.textContent = email;
      console.log(
        `Successfully registered and logged in as: ${userEmail.textContent}`
      );
      setActiveSection(mainApplicationSection, loginSection);
    })
    .catch((error) => {
      console.error("Error logging in:", error);
    });
});

// Logout event listener
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();

  logout()
    .then(() => {
      console.log("Successfully logged out");
      mainApplicationSection.style.display = "none";
      setActiveSection(loginSection, mainApplicationSection);
    })
    .catch((error) => {
      console.error("Error logging out:", error);
    });
});
