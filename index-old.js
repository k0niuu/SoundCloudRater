const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");
const fetch = require("node-fetch");
const admin = require("firebase-admin");
// firebase config
const firebaseConfig = {
	apiKey: "AIzaSyBgDXnlyvsxXAleGEiKnh-UtwvF-54Aj00",
	authDomain: "soundcloudrater.firebaseapp.com",
	projectId: "soundcloudrater",
	storageBucket: "soundcloudrater.appspot.com",
	messagingSenderId: "360159974990",
	appId: "1:360159974990:web:5568f64f2be6fe01d1951f",
	measurementId: "G-E4EZBJ85K0",
};

// firebase init
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
});

const soundcloudUsername = "speed-buda";
const url = `https://soundcloud-scraper.p.rapidapi.com/v1/user/tracks?user=https%3A%2F%2Fsoundcloud.com%2F${soundcloudUsername}&limit=100`;
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "362b672dcfmshee0ef355b3f1e9fp1f3661jsnc4550a5a21ca",
		"X-RapidAPI-Host": "soundcloud-scraper.p.rapidapi.com",
	},
};

fetch(url, options)
	.then((res) => res.json())
	.then((json) => {
		const tracks = json.tracks.items;
		console.log("Track list:");
		tracks.forEach((track, index) => {
			console.log(
				`${index + 1}. ${track.title} - ${track.permalink} - ${
					track.stationPermalink
				}`
			);
		});
		const userDoc = db.collection("scArtists").doc(soundcloudUsername);
		const songList = tracks.map((track) => {
			return {
				songTitle: track.title,
				url: track.permalink,
				idToTake: track.stationPermalink,
			};
		});

		userDoc
			.set({ songs: songList })
			.then(() => {
				console.log("Document successfully written");
				process.exit(0);
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
	})
	.catch((err) => console.error("error:" + err));
