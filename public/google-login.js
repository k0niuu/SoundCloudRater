import { auth, GoogleAuthProvider } from "./firebasesetup.js";

function googleLogin() {
  const provider = new GoogleAuthProvider();
  // console.log(auth);
  auth
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
