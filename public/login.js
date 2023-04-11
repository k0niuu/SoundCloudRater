const loginSection = document.querySelector("#login");
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");
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

// Hide the main application section by default
mainApplicationSection.style.display = "none";

// Show the register form and hide the login form
registerBtn.addEventListener("click", () => {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});

// Show the login form and hide the register form
cancelBtn.addEventListener("click", () => {
  loginForm.style.display = "block";
  registerForm.style.display = "none";
});

// Login form submission event listener
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Successfully logged in");
      loginSection.style.display = "none";
      mainApplicationSection.style.display = "block";
    })
    .catch((error) => {
      console.error("Error logging in:", error);
    });
});

// Register form submission event listener
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = registerEmailInput.value;
  const password = registerPasswordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password !== confirmPassword) {
    console.error("Passwords do not match");
    return;
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Successfully registered and logged in");
      loginSection.style.display = "none";
      mainApplicationSection.style.display = "block";
    })
    .catch((error) => {
      console.error("Error registering:", error);
    });
});

// Logout event listener
// logoutBtn.addEventListener("click", (e) => {
//   e.preventDefault();

//   firebase
//     .auth()
//     .signOut()
//     .then(() => {
//       console.log("Successfully logged out");
//       mainApplicationSection.style.display = "none";
//       loginSection.style.display = "block";
//     })
//     .catch((error) => {
//       console.error("Error logging out:", error);
//     });
// });
