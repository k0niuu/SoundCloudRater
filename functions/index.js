const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const {initializeApp} = require("firebase/app");
const {
  getFirestore,
  getDoc,
  doc,
  collection,
  getDocs,
  setDoc,
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBgDXnlyvsxXAleGEiKnh-UtwvF-54Aj00",
  authDomain: "soundcloudrater.firebaseapp.com",
  projectId: "soundcloudrater",
  storageBucket: "soundcloudrater.appspot.com",
  messagingSenderId: "360159974990",
  appId: "1:360159974990:web:5568f64f2be6fe01d1951f",
  measurementId: "G-E4EZBJ85K0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
admin.initializeApp();

exports.getSoundcloudData = functions.https.onCall(async (data) => {
  const soundcloudUsername = data.soundcloudUsername;
  const url = `https://soundcloud-scraper.p.rapidapi.com/v1/user/tracks?user=https%3A%2F%2Fsoundcloud.com%2F${soundcloudUsername}&limit=100`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "362b672dcfmshee0ef355b3f1e9fp1f3661jsnc4550a5a21ca",
      "X-RapidAPI-Host": "soundcloud-scraper.p.rapidapi.com",
    },
  };

  try {
    const res = await fetch(url, options);
    const json = await res.json();

    const tracks = json.tracks.items;
    console.log("Track list:");
    tracks.forEach((track, index) => {
      console.log(
          `${index + 1}. ${track.title} - ${track.permalink} - ${
            track.stationPermalink
          }`,
      );
    });

    const adminDb = admin.firestore();
    const userDoc = adminDb.collection("scArtists").doc(soundcloudUsername);
    const songList = tracks.map((track) => {
      return {
        songTitle: track.title,
        url: track.permalink,
        idToTake: track.stationPermalink,
      };
    });

    await userDoc.set({songs: songList});
    console.log("Document successfully written");
    await distributePairsByUsers();
    return {message: "Soundcloud data added to Firestore"};
  } catch (error) {
    console.error("Error writing document: ", error);
    throw new functions.https.HttpsError("internal", "Error writing document");
  }
});

async function getSongsArrayFromDb() {
  const docRef = doc(db, "scArtists", "speed-buda");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // console.log("document data:", docSnap.data());
    return docSnap.data().songs.map((song) => song.idToTake);
  } else {
    console.log("no data!!");
    return [];
  }
}

function generateRandomPairs(idToTakeArray, numUsers) {
  const pairs = [];
  for (let i = 0; i < idToTakeArray.length; i++) {
    for (let j = i + 1; j < idToTakeArray.length; j++) {
      pairs.push(`${idToTakeArray[i]},${idToTakeArray[j]}`);
    }
  }

  const userTabs = Array(numUsers)
      .fill()
      .map(() => []);

  let userIndex = 0;

  while (pairs.length > 0) {
    const pairsPerUser = Math.floor(pairs.length / (numUsers - userIndex));
    let pairsToTake = Math.min(pairsPerUser, pairs.length);

    if (pairsToTake === 0) {
      pairsToTake = 1;
    }

    for (let i = 0; i < pairsToTake; i++) {
      const index = Math.floor(Math.random() * pairs.length);
      const pair = pairs[index];
      pairs.splice(index, 1);
      userTabs[userIndex].push(pair);
    }

    userIndex++;

    if (userIndex === numUsers) {
      userIndex = 0;
    }
  }

  return userTabs;
}

async function getNumberOfUsers() {
  const usersRef = collection(db, "users");
  const snapshot = await getDocs(usersRef);
  return snapshot.size;
}

async function distributePairsByUsers() {
  const numUsers = await getNumberOfUsers();
  const idToTakeArray = await getSongsArrayFromDb();
  const pairsPerUser = generateRandomPairs(idToTakeArray, numUsers);
  const usersRef = collection(db, "users");
  const snapshot = await getDocs(usersRef);
  let userIndex = 0;
  snapshot.forEach((doc) => {
    console.log(doc.id);
    const userPairs = pairsPerUser[userIndex];
    console.log(userIndex);
    console.log(userPairs);
    console.log(userPairs.length);
    setDoc(doc.ref, {pairs: userPairs}, {merge: true});
    userIndex++;
  });

  console.log("END OF FUNCTION");
  return;
}
