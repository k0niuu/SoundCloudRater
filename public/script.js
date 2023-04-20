//OBSŁUGA PANELU NAWIGACYJNEGO
import { pausePlayers } from "./scplayerfunctionality.js";

const rateLink = document.querySelector("#rate-link");
const scoresLink = document.querySelector("#scores-link");
const adminLink = document.querySelector("#admin-link");

const rateSection = document.querySelector("#rate-section");
const scoresSection = document.querySelector("#scores-section");
const adminSection = document.querySelector("#admin-section");

// funkcja, która zmienia styl sekcji
function setActiveSection(sectionToShow, sectionToHide1, sectionToHide2) {
	pausePlayers();
	sectionToShow.classList.add("active-section");
	sectionToShow.classList.remove("inactive-section");
	sectionToHide1.classList.add("inactive-section");
	sectionToHide1.classList.remove("active-section");
	sectionToHide2.classList.add("inactive-section");
	sectionToHide2.classList.remove("active-section");
}

// nasłuchiwanie kliknięcia na link "Rate"
rateLink.addEventListener("click", (event) => {
	event.preventDefault(); // zapobiegamy domyślnej akcji przekierowania

	setActiveSection(rateSection, scoresSection, adminSection); // pokazujemy sekcję "Rate" i ukrywamy sekcje "Scores" i "Admin"
});

// nasłuchiwanie kliknięcia na link "Scores"
scoresLink.addEventListener("click", (event) => {
	event.preventDefault(); // zapobiegamy domyślnej akcji przekierowania

	setActiveSection(scoresSection, rateSection, adminSection); // pokazujemy sekcję "Scores" i ukrywamy sekcje "Rate" i "Admin"
});

// nasłuchiwanie kliknięcia na link "Admin"
adminLink.addEventListener("click", (event) => {
	event.preventDefault(); // zapobiegamy domyślnej akcji przekierowania

	setActiveSection(adminSection, rateSection, scoresSection); // pokazujemy sekcję "Admin" i ukrywamy sekcje "Rate" i "Scores"
});
