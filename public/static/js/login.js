import {
  colUsersRef,
  login,
  logout,
  register,
  doc,
  setDoc,
  getDoc,
  db,
} from "./firebasesetup.js";

import { pausePlayers } from "./scplayerfunctionality.js";

const loginSection = document.querySelector("#login");
const loginFormSection = document.querySelector("#login-form");
const registerFormSection = document.querySelector("#register-form");
const mainApplicationSection = document.querySelector("#main-application");
const adminSection = document.querySelector("#admin-section");
const adminButton = document.querySelector("#admin-link");

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
  document.getElementById("login-error-information").textContent = "";
  document.getElementById("register-error-information").textContent = "";
  document.getElementById("email-input").value = "";
  document.getElementById("password-input").value = "";
  document.getElementById("email-register-input").value = "";
  document.getElementById("password-register-input").value = "";
  document.getElementById("confirm-password-input").value = "";
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
loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  login(email, password)
    .then((cred) => {
      userEmail.textContent = email;
      console.log(
        `Successfully logged in as: ${userEmail.textContent}`,
        cred.user
      );
      console.log(cred.user.uid);
      mainApplicationSection.style.display = "";
      setActiveSection(mainApplicationSection, loginSection);
      CheckIfAdmin(cred.user.uid);
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      document.getElementById("login-error-information").textContent =
        "Invalid email or password!";
    });
});

//Register by "Register" button
registerSubmitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = registerEmailInput.value;
  const password = registerPasswordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password !== confirmPassword) {
    console.error("Passwords do not match!");
    document.getElementById("register-error-information").textContent =
      "Passwords do not match!";
    return;
  }

  register(email, password)
    .then((cred) => {
      userEmail.textContent = email;
      console.log(
        `Successfully registered and logged in as: ${userEmail.textContent}`,
        cred.user
      );
      console.log(cred.user.uid);
      mainApplicationSection.style.display = "";
      setActiveSection(mainApplicationSection, loginSection);
      addUserToDatabase(cred.user.uid, email); // dodanie użytkownika do bazy danych
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      document.getElementById("register-error-information").textContent =
        "User registration error!";
    });
});

// Logout event listener
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();

  logout()
    .then(() => {
      pausePlayers();
      console.log("Successfully logged out");
      mainApplicationSection.style.display = "none";
      setActiveSection(loginSection, mainApplicationSection);
      document.getElementById("email-input").value = "";
      document.getElementById("password-input").value = "";
      document.getElementById("email-register-input").value = "";
      document.getElementById("password-register-input").value = "";
      document.getElementById("confirm-password-input").value = "";
    })
    .catch((error) => {
      console.error("Error logging out:", error);
    });
});

function addUserToDatabase(uid, email) {
  const userRef = doc(colUsersRef, uid);
  const userData = {
    email: email,
    userType: "regular",
  };

  setDoc(userRef, userData)
    .then(() => {
      console.log("User added to database");
    })
    .catch((error) => {
      console.error("Error adding user to database:", error);
    });
}

async function CheckIfAdmin(uid) {
  const userDoc = doc(db, "users", uid);
  const userSnap = await getDoc(userDoc);
  const { userType } = userSnap.data();

  if (userSnap.exists() && userType === "admin") {
    adminSection.style.display = "";
    adminButton.style.display = "";
    console.log("Logged as an administrator");
    console.log(userType);
  } else {
    adminSection.style.display = "none";
    adminButton.style.display = "none";
    console.log("Logged as a regular user");
    console.log(userType);
  }
}
