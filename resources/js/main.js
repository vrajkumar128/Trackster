const Trackster = {};
const apiKey = "65f045bd924b56ad4d062aa4acbee30d";
const $trackList = $('#songs .container-fluid');


$(document).ready(() => {

  // Pass the search box's input into .searchTracksByTitle() and log the returned responses
  let search = async function() {
    let searchInput = $('#search-box').val();
    if (searchInput.length > 0) {
      let responses = await Trackster.searchTracksByTitle(searchInput);
      console.log(responses);
    }
  };

  // Execute search when search button is clicked
  $('#search-button').click(search);

  // Click search button when user presses Enter with input field focused
  $("#search-box").keypress(e => {
    if (e.which === 13) {
      $('#search-button').click();
    }
  });

});

// Convert milliseconds into a human-readable mm:ss format
Trackster.msToTime = ms => {
  let minutes = Math.floor(ms / 1000 / 60);
  let seconds = ms / 1000 % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each row to the container in the body to display all tracks.
*/

Trackster.renderTracks = response => {
  if (response.track && response.track.url && response.track.name && response.track.artist.name && response.track.album && response.track.listeners && response.track.duration) {
    const trackHtml =
      '<div class="row d-flex align-items-center">' +
      '  <div class="col-1">' +
      '    <a href="' + response.track.url + '" target="_blank">' +
      '      <i class="far fa-play-circle fa-2x"></i>' +
      '    </a>' +
      '  </div>' +
      '  <span class="col-3">' + response.track.name + '</span>' +
      '  <span class="col-2">' + response.track.artist.name + '</span>' +
      '  <span class="col-3">' + response.track.album.title + '</span>' +
      '  <figure class="col-1 mt-3">' +
      '    <img class="w-100" src="' + response.track.album.image[0]["#text"] + '" alt="Album art" />' +
      '  </figure>' +
      '  <span class="col-1">' + response.track.listeners + '</span>' +
      '  <span class="col-1">' + Trackster.msToTime(response.track.duration) + '</span>' +
      '</div>';
    $trackList.append(trackHtml);
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the data returned by the API query.
*/

Trackster.searchTracksByTitle = async title => {
  $trackList.empty();
  let responses = [];

  try {
    let response1 = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${title}&api_key=${apiKey}&format=json`);
    if (response1.ok) {
      let jsonResponse1 = await response1.json();
      let artists = [];
      let titles = [];
      jsonResponse1.results.trackmatches.track.forEach(track => {
        artists.push(track.artist);
        titles.push(track.name);
      });

      async function getInfo() {
        for (let arrIndex = 0; arrIndex < artists.length; arrIndex++) {
          try {
            let response2 = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&artist=${artists[arrIndex]}&track=${titles[arrIndex]}&api_key=${apiKey}&format=json`);
            if (response2.ok) {
              let jsonResponse2 = await response2.json();
              responses.push(jsonResponse2);
              Trackster.renderTracks(jsonResponse2);
            } else {
              throw new Error("Request Two Failed!");
            }
          }
          catch (error) {
            console.log(error);
          }
        }
      }
      await getInfo();
    } else {
      throw new Error("Request One Failed!");
    }
    return responses;
  }
  catch (error) {
    console.log(error);
  }
};
