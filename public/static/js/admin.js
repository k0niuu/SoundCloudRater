import {
	getFunctions,
	httpsCallable,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-functions.js";
import {
	collection,
	doc,
	deleteDoc,
	updateDoc,
	getDocs,
	deleteField,
	getDoc,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { db } from "./firebasesetup.js";

const performNewRating = document.getElementById("perform-new-rating");
const performingInfo = document.getElementById("performing-info");
const artistNameInput = document.getElementById("artist-name");
const deleteRating = document.getElementById("delete-rating");
const deletionInfo = document.getElementById("deletion-info");
const timeoutDuration = 5000;

performNewRating.addEventListener("click", performNewRatingHandler);
deleteRating.addEventListener("click", deleteRatingHandler);

function deleteRatingHandler() {
	const artistName = artistNameInput.value;
	deletionInfo.textContent = "Deleting rating, please wait...";
	deleteRatingForAllUsers(artistName)
		.then((result) => {
			console.log(result);
		})
		.catch((error) => {
			console.log(
				`Wystąpił błąd podczas usuwania oceny dla artysty ${artistName}: ${error}`
			);
			deletionInfo.textContent = "Rating deletion error!";
			deletionInfo.style.color = "red";
		});

	deleteArtistFromCollection(artistName)
		.then((result) => {
			console.log(result);
			deletionInfo.textContent = "Rating deleted succesfully!";
			deletionInfo.style.color = "yellowgreen";
		})
		.catch((error) => {
			console.log(
				`Wystąpił błąd podczas usuwania dokumentu artysty ${artistName} z kolekcji 'scArtists': ${error}`
			);
			deletionInfo.textContent = "Rating deletion error!";
			deletionInfo.style.color = "red";
		})
		.finally(() => {
			setTimeout(function () {
				deletionInfo.textContent = "";
				deletionInfo.style.color = "";
				deletionInfo.style.fontWeight = "";
			}, timeoutDuration);
		});
}

function performNewRatingHandler() {
	const functions = getFunctions();
	const getSoundcloudData = httpsCallable(functions, "getSoundcloudData");
	const artistName = artistNameInput.value;
	performingInfo.textContent = "Performing new rating, please wait...";

	getSoundcloudData({ soundcloudUsername: artistName })
		.then((result) => {
			console.log(result);
			performingInfo.textContent = "New rating performed!";
			performingInfo.style.color = "yellowgreen";
			return Promise.resolve();
		})
		.catch((error) => {
			console.error(error);
			performingInfo.textContent = "Performing failed!";
			performingInfo.style.color = "red";
			performingInfo.style.fontWeight = "bold";
			return Promise.reject();
		})
		.finally(() => {
			setTimeout(function () {
				performingInfo.textContent = "";
				performingInfo.style.color = "";
				performingInfo.style.fontWeight = "";
			}, timeoutDuration);
		});
}

async function deleteRatingForAllUsers(artistName) {
	const querySnapshot = await getDocs(collection(db, "users"));
	querySnapshot.forEach(async (doc) => {
		if (doc.exists()) {
			const userRef = doc.ref;
			const userData = doc.data();
			if (userData.hasOwnProperty(artistName)) {
				await updateDoc(userRef, {
					[artistName]: deleteField(),
				});
				console.log(
					`Pole '${artistName}' zostało usunięte z dokumentu użytkownika o ID ${doc.id}`
				);
			} else {
				console.log(
					`Dokument użytkownika o ID ${doc.id} nie posiada pola '${artistName}'`
				);
			}
		} else {
			console.log(`Nie znaleziono dokumentu użytkownika o ID ${doc.id}`);
		}
	});
}

async function deleteArtistFromCollection(artistName) {
	console.log(artistName);
	const artistRef = doc(db, "scArtists", artistName);
	const artistDoc = await getDoc(artistRef);
	if (!artistDoc.exists()) {
		console.log(`Dokument ${artistName} nie istnieje w 'scArtists'`);
	} else {
		await deleteDoc(artistRef);
		console.log(`Dokument ${artistName} został usunięty z 'scArtists'`);
	}
}
