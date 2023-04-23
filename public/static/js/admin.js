import {
	getFunctions,
	httpsCallable,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-functions.js";

const performNewRating = document.getElementById("perform-new-rating");
const performingInfo = document.getElementById("performing-info");
const artistNameInput = document.getElementById("artist-name");
const timeoutDuration = 5000;

performNewRating.addEventListener("click", performNewRatingHandler);

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
