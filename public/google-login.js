import firebase from "./firebasesetup.js";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp(firebaseConfig);

// funkcja obsługująca logowanie przez Google
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
}

// nasłuchuj na kliknięcie przycisku logowania przez Google
const googleLoginBtn = document.getElementById("google-login-btn");
googleLoginBtn.addEventListener("click", googleLogin);
