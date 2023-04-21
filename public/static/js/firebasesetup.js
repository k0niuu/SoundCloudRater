import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import {
	getFirestore,
	collection,
	onSnapshot,
	getDoc,
	addDoc,
	setDoc,
	doc,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import {
	getFunctions,
	httpsCallable,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-functions.js";

// Konfiguracja Firebase
const firebaseConfig = {
	apiKey: "AIzaSyBgDXnlyvsxXAleGEiKnh-UtwvF-54Aj00",
	authDomain: "soundcloudrater.firebaseapp.com",
	projectId: "soundcloudrater",
	storageBucket: "soundcloudrater.appspot.com",
	messagingSenderId: "360159974990",
	appId: "1:360159974990:web:5568f64f2be6fe01d1951f",
	measurementId: "G-E4EZBJ85K0",
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);

// Eksportowanie funkcji logowania, rejestrowania i wylogowania
export function login(email, password) {
	return signInWithEmailAndPassword(auth, email, password);
}

export function register(email, password) {
	return createUserWithEmailAndPassword(auth, email, password);
}

export function logout() {
	return signOut(auth);
}

export const auth = getAuth();
export const db = getFirestore();
export const colUsersRef = collection(db, "users");
export { doc, setDoc, getDoc };

const performNewRating = document.getElementById("perform-new-rating");
const artistNameInput = document.getElementById("artist-name");
// performNewRating.addEventListener("click", () => {
// 	const functions = getFunctions();
// 	const getSoundcloudData = httpsCallable(functions, "getSoundcloudData");
// 	const artistName = artistNameInput.value;

// 	getSoundcloudData({ soundcloudUsername: artistName })
// 		.then((result) => {
// 			console.log(result);
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 		});
// });
