firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Użytkownik został pomyślnie zarejestrowany
    var user = userCredential.user;
    // Możesz wykonać dodatkowe akcje tutaj
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // Obsłuż błąd tutaj
  });
