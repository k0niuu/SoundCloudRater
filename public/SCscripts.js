//OBSŁUGA WYSZUKIWARKI

const searchInput = document.querySelector("#search-input"); // pobieramy pole wyszukiwania
const searchButton = document.querySelector("#search-button"); // pobieramy przycisk "wyszukaj"

// funkcja, która obsługuje kliknięcie przycisku "wyszukaj"
function handleSearch() {
  const searchTerm = searchInput.value; // pobieramy wartość wprowadzoną przez użytkownika do pola wyszukiwania
  generateTrackList(searchTerm); // wywołujemy funkcję generującą listę utworów, przekazując nazwę artysty jako argument
}

// funkcja wczytująca utwory artysty z SoundCloud
async function getTracks(artistName) {
  const clientId = "nBNZK2jas9ofvx4mqT6KYcUoDFeOdlRn"; // identyfikator klienta API SoundCloud
  const url = `https://api.soundcloud.com/users/${artistName}/tracks?client_id=${clientId}`;
  const response = await fetch(url);
  const tracks = await response.json();
  return tracks;
}

// funkcja generująca listę utworów na stronie internetowej
async function generateTrackList(artistName) {
  const tracks = await getTracks(artistName);
  const list = document.createElement("ul");
  tracks.forEach((track) => {
    const listItem = document.createElement("li");
    listItem.textContent = track.title;
    list.appendChild(listItem);
  });
  document.body.appendChild(list);
}

searchButton.addEventListener("click", handleSearch); // dodajemy nasłuchiwanie na kliknięcie przycisku "wyszukaj"
