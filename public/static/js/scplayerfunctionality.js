console.log(document);
const chooseFirstButton = document.querySelector("button#choose-first");
const drawButton = document.querySelector("#draw");
const chooseSecondButton = document.querySelector("#choose-second");
const secondIframe = document.querySelector("#soundcloud-widget-second");
const firstIframe = document.querySelector("#soundcloud-widget-first");
console.log(firstIframe);
console.log(secondIframe);
console.log(chooseFirstButton);
console.log(chooseSecondButton);
console.log(drawButton);

pushFirstTrackToRate(
	"https://soundcloud.com/discover/sets/track-stations:1390671679"
);
pushSecondTrackToRate(
	"https://soundcloud.com/discover/sets/track-stations:1350831556"
);

chooseFirstButton.addEventListener("click", function () {
	pausePlayers();
	pushFirstTrackToRate(
		"https://soundcloud.com/discover/sets/track-stations:1386035923"
	);
	pushSecondTrackToRate(
		"https://soundcloud.com/discover/sets/track-stations:1372666042"
	);
	console.log("REAGUJENAFIRSTBUTTON");
	//TODO: zbieranie informacji do AHP
});

chooseSecondButton.addEventListener("click", function () {
	pausePlayers();
	pushFirstTrackToRate(
		"https://soundcloud.com/discover/sets/track-stations:1423586479"
	);
	pushSecondTrackToRate(
		"https://soundcloud.com/discover/sets/track-stations:1418963275"
	);
	//TODO: zbieranie informacji do AHP
});

drawButton.addEventListener("click", function () {
	pausePlayers();
	pushFirstTrackToRate(
		"https://soundcloud.com/discover/sets/track-stations:1488710356"
	);
	pushSecondTrackToRate(
		"https://soundcloud.com/discover/sets/track-stations:1488144190"
	);
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

export function pausePlayers() {
	pauseFirstPlayer();
	pauseSecondPlayer();
}

function pauseFirstPlayer() {
	const firstPlayer = SC.Widget(
		document.getElementById("soundcloud-widget-first")
	);
	firstPlayer.pause();
}

function pauseSecondPlayer() {
	const secondPlayer = SC.Widget(
		document.getElementById("soundcloud-widget-second")
	);
	secondPlayer.pause();
}
