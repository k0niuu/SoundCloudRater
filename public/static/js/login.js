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

import { navigateTo } from "./router.js";

const loginFormSection = document.querySelector("#login");
const registerFormSection = document.querySelector("#register");
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
const userEmail = document.querySelector(".user span");
const navigationBar = document.querySelector("header");

function setActiveSection(sectionToShow, sectionToHide) {
	sectionToShow.classList.add("active-section");
	sectionToShow.classList.remove("inactive-section");
	sectionToHide.classList.add("inactive-section");
	sectionToHide.classList.remove("active-section");
}

registerBtn.addEventListener("click", () => {
	setActiveSection(registerFormSection, loginFormSection);
	emailInput.value = "";
	passwordInput.value = "";
});

cancelBtn.addEventListener("click", () => {
	setActiveSection(loginFormSection, registerFormSection);
	registerEmailInput.value = "";
	registerPasswordInput.value = "";
	confirmPasswordInput.value = "";
});

loginBtn.addEventListener("click", async (e) => {
	e.preventDefault();

	const email = emailInput.value;
	const password = passwordInput.value;

	login(email, password)
		.then(async (cred) => {
			userEmail.textContent = email;
			console.log(
				`Successfully logged in as: ${userEmail.textContent}`,
				cred.user
			);
			console.log(cred.user.uid);
			await CheckIfAdmin(cred.user.uid);
			navigationBar.style.display = "block";
			navigateTo("/rate");
		})
		.catch((error) => {
			console.error("Error logging in:", error);
			document.getElementById("login-error-information").textContent =
				"Invalid email or password!";
		});
});

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
		.then(async (cred) => {
			userEmail.textContent = email;
			console.log(
				`Successfully registered and logged in as: ${userEmail.textContent}`,
				cred.user
			);
			console.log(cred.user.uid);
			addUserToDatabase(cred.user.uid, email);
			await CheckIfAdmin(cred.user.uid);
			navigationBar.style.display = "block";
			navigateTo("/rate");
		})
		.catch((error) => {
			console.error("Error logging in:", error);
			document.getElementById("register-error-information").textContent =
				"User registration error!";
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
		adminButton.style.display = "";
		console.log("Logged as an administrator");
		console.log(userType);
	} else {
		adminButton.style.display = "none";
		console.log("Logged as a regular user");
		console.log(userType);
	}
}
