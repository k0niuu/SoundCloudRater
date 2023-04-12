import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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
// Eksportowanie obiektu GoogleAuthProvider oraz funkcji auth, które są potrzebne do autoryzacji użytkowników w Firebase.
// export { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
export const auth = getAuth();
