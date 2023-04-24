import {
	collection,
	doc,
	deleteDoc,
	updateDoc,
	getDocs,
	deleteField,
	getDoc,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { db, auth, onAuthStateChanged } from "./firebasesetup.js";

const chooseFirstButton = document.querySelector("button#choose-first");
const drawButton = document.querySelector("#draw");
const chooseSecondButton = document.querySelector("#choose-second");
const secondIframe = document.querySelector("#soundcloud-widget-second");
const firstIframe = document.querySelector("#soundcloud-widget-first");

nextTrackToRate();

chooseFirstButton.addEventListener("click", async function () {
	const userId = await getCurrentUserId();
	const artistName = "speed-buda";
	await deleteTrackFromDb(userId, artistName);
	nextTrackToRate();
	//TODO: zbieranie informacji do AHP
});

chooseSecondButton.addEventListener("click", async function () {
	const userId = await getCurrentUserId();
	const artistName = "speed-buda";
	await deleteTrackFromDb(userId, artistName);
	nextTrackToRate();
	//TODO: zbieranie informacji do AHP
});

drawButton.addEventListener("click", async function () {
	const userId = await getCurrentUserId();
	const artistName = "speed-buda";
	await deleteTrackFromDb(userId, artistName);
	nextTrackToRate();
	//TODO: zbieranie informacji do AHP
});

function pushFirstTrackToRate(firstTrackLink) {
	const firstTrackId = firstTrackLink.substring(
		firstTrackLink.lastIndexOf(":") + 1
	);
	const embeddedPlayerLink = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${firstTrackId}&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
	firstIframe.setAttribute("src", embeddedPlayerLink);
}

function pushSecondTrackToRate(secondTrackLink) {
	const secondTrackId = secondTrackLink.substring(
		secondTrackLink.lastIndexOf(":") + 1
	);
	const embeddedPlayerLink = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${secondTrackId}&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
	secondIframe.setAttribute("src", embeddedPlayerLink);
}

function getCurrentUser() {
	return new Promise((resolve, reject) => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				resolve(user);
			} else {
				reject(new Error("No user is currently logged in."));
			}
		});
	});
}

async function getCurrentUserId() {
	const user = await getCurrentUser();
	return user.uid;
}

async function getFirstPairToRate(userId, artistName) {
	const userDoc = doc(db, "users", userId);
	const userSnapshot = await getDoc(userDoc);
	const userData = userSnapshot.get(artistName);
	const firstPair = userData[0];
	const stringToSplit = firstPair;
	const stringsArray = stringToSplit.split(",");
	return stringsArray;
}

async function nextTrackToRate() {
	const userId = await getCurrentUserId();
	const artistName = "speed-buda";
	const stringsArray = await getFirstPairToRate(userId, artistName);
	pushFirstTrackToRate(stringsArray[0]);
	pushSecondTrackToRate(stringsArray[1]);
}

async function deleteTrackFromDb(userId, artistName) {
	const userDoc = doc(db, "users", userId);
	const userSnapshot = await getDoc(userDoc);
	const userPairs = userSnapshot.get(artistName);
	const [, ...restPairs] = userPairs;

	await updateDoc(userDoc, {
		[artistName]: restPairs,
	});
}
