const fetch = require("node-fetch");

const url =
  "https://soundcloud-scraper.p.rapidapi.com/v1/user/tracks?user=https%3A%2F%2Fsoundcloud.com%2Fspeed-buda&limit=100";

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
          track.artworkUrl
        } - ${track.waveformUrl} - ${track.stationPermalink}`
      );
    });
  })
  .catch((err) => console.error("error:" + err));
