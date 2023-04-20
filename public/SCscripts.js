// przykładowa funkcja, która przyjmuje link track.stationpermalink jako argument
const firstTrackLink =
  "https://soundcloud.com/discover/sets/track-stations:1492918582";

function pushFirstTrackToRate(firstTrackLink) {
  const trackId = trackLink.substring(trackLink.lastIndexOf(":") + 1);

  console.log(trackId);

  // zbuduj link do wbudowanego odtwarzacza SoundCloud, używając pobranego id
  const embeddedPlayerLink = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;

  // wyświetl wbudowany odtwarzacz na stronie internetowej lub w aplikacji
  // np. ustaw link jako src dla iframe
  const firstIframe = document.getElementById("soundcloud-widget-first");
  firstIframe.setAttribute("src", embeddedPlayerLink);
}

// pushFirstTrackToRate(firstTrackLink);
