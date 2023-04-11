import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebasesetup.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
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
const analytics = getAnalytics(app);
const auth = getAuth();

// Eksportowanie funkcji logowania
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
