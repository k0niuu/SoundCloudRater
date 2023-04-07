//OBSŁUGA PANELU NAWIGACYJNEGO

const rateLink = document.querySelector("#rate-link"); // pobieramy link "Rate"
const scoresLink = document.querySelector("#scores-link"); // pobieramy link "Scores"
const adminLink = document.querySelector("#admin-link"); // pobieramy link "Admin"

const rateSection = document.querySelector("#rate-section"); // pobieramy sekcję "Rate"
const scoresSection = document.querySelector("#scores-section"); // pobieramy sekcję "Scores"
const adminSection = document.querySelector("#admin-section"); // pobieramy sekcję "Admin"

// funkcja, która zmienia styl sekcji
function setActiveSection(sectionToShow, sectionToHide1, sectionToHide2) {
  sectionToShow.classList.add("active-section"); // dodajemy klasę "active-section" do sekcji, którą chcemy pokazać
  sectionToShow.classList.remove("inactive-section"); // usuwamy klasę "inactive-section" z tej samej sekcji
  sectionToHide1.classList.add("inactive-section"); // dodajemy klasę "inactive-section" do pierwszej sekcji, którą chcemy ukryć
  sectionToHide1.classList.remove("active-section"); // usuwamy klasę "active-section" z pierwszej sekcji
  sectionToHide2.classList.add("inactive-section"); // dodajemy klasę "inactive-section" do drugiej sekcji, którą chcemy ukryć
  sectionToHide2.classList.remove("active-section"); // usuwamy klasę "active-section" z drugiej sekcji
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

//OBSŁUGA WYSZUKIWARKI

const searchInput = document.querySelector("#search-input"); // pobieramy pole wyszukiwania
const searchButton = document.querySelector("#search-button"); // pobieramy przycisk "wyszukaj"

// funkcja, która obsługuje kliknięcie przycisku "wyszukaj"
function handleSearch() {
  const searchTerm = searchInput.value; // pobieramy wartość wprowadzoną przez użytkownika do pola wyszukiwania
  // TODO: dodać kod, który wykona wyszukiwanie i wyświetli wyniki
}

// nasłuchiwanie kliknięcia na przycisk "wyszukaj"
searchButton.addEventListener("click", handleSearch);

const buttons = document.querySelectorAll(".play-pause-button");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const icon = button.querySelector("i");
    if (icon.classList.contains("fa-circle-play")) {
      icon.classList.remove("fa-circle-play");
      icon.classList.add("fa-circle-pause");
    } else if (icon.classList.contains("fa-circle-pause")) {
      icon.classList.remove("fa-circle-pause");
      icon.classList.add("fa-circle-play");
    }
  });
});
