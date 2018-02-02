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

};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/

Trackster.searchTracksByTitle = async (title) => {
  try {
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${title}&api_key=${apiKey}&format=json`)
    if (response.ok) {
      console.log(response);
    }
  }
  catch (error) {
    console.log(error);
  }
};
