const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

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

    const db = admin.firestore();
    const userDoc = db.collection("scArtists").doc(soundcloudUsername);
    const songList = tracks.map((track) => {
      return {
        songTitle: track.title,
        url: track.permalink,
        idToTake: track.stationPermalink,
      };
    });

    await userDoc.set({songs: songList});
    console.log("Document successfully written");
    return {message: "Soundcloud data added to Firestore"};
  } catch (error) {
    console.error("Error writing document: ", error);
    throw new functions.https.HttpsError("internal", "Error writing document");
  }
});
