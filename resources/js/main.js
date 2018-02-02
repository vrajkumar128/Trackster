const Trackster = {};
const apiKey = "65f045bd924b56ad4d062aa4acbee30d";

$(document).ready(function() {
  $('#search-button').click(function() {
    Trackster.searchTracksByTitle($('#search-box').val());
  });
});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/

Trackster.renderTracks = function(tracks) {
  tracks.forEach(function() {
    const trackHtml =
      '<div class="row d-flex align-items-center">' +
        '<div class="col-1">' +
          '<a href="' + track.url


  });
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/

Trackster.searchTracksByTitle = async (title) => {
  const responses = [];

  try {
    const response1 = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${title}&api_key=${apiKey}&format=json`)
    if (response1.ok) {
      responses.push(response1);
    }
  }
  catch (error) {
    console.log(error);
  }

  try {
    const response2 = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&track=${title}&api_key=${apiKey}&format=json`)
    if (response2.ok) {
      responses.push(response2);
    }
  }
  catch (error) {
    console.log(error);
  }
};
