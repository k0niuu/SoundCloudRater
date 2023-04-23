import { logout } from "./firebasesetup.js";

const logoutBtn = document.querySelector("#logout-btn");
const navigationBar = document.querySelector("header");

logoutBtn.addEventListener("click", (e) => {
	e.preventDefault();

	logout()
		.then(() => {
			navigationBar.style.display = "none";
			console.log("Successfully logged out");
			// document.getElementById("email-input").value = "";
			// document.getElementById("password-input").value = "";
			// document.getElementById("email-register-input").value = "";
			// document.getElementById("password-register-input").value = "";
			// document.getElementById("confirm-password-input").value = "";
		})
		.catch((error) => {
			console.error("Error logging out:", error);
		});
});
