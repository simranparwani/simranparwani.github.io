/*$(document).ready(function(){
	console.log(YT.playerState.ENDED);
	var player;
	function onYouTubeIframeAPIReady() {
		console.log("is this working");
	    player = new YT.Player( 'player', {
	    events: { 'onStateChange': onPlayerStateChange }
		});
	}
	function onPlayerReady(event) {
		event.target.playVideo();
				}

	function onPlayerStateChange(event) {	
		if (event.data == YT.playerState.ENDED) {
	      		console.log("video is over");
	      		$("#page1").addClass('hide');
	      		$("#page2").fadeIn('slow').removeClass("hide");
		}
	}
});

let theVideo*/

// Get the modal


// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



$(document).ready(function() {
    $("#downarrow").on('click', function() {
    	console.log("yay its working");

            $("#page1").fadeOut('fast').addClass('hide');
            $('#page2').fadeIn('slow').removeClass('hide');

    });
});




// When the user clicks on <span> (x), close the modal
span.onclick = function() {
   $('#displayMessage').fadeOut('fast').addClass('hide');

}

h1.onclick = function() {
  console.log('this is wokring');
  window.location.href = 'index.html';
}
/* used code from https://webapps.stackexchange.com/questions/25246/can-pins-on-a-google-map-link-to-other-websites
*/
function initMap() {
        var abuDhabi = {lat: 24.454, lng: 54.377};
        var goa = {lat: 15.299, lng: 74.124};
        var istanbul = {lat: 41.008, lng: 28.978};
        var hongkong = {lat: 22.396, lng: 114.110};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: abuDhabi
        });
        var markerGoa = new google.maps.Marker({
          position: goa,
          url: 'threeStepsGoa.html',
          title: 'Beach',
          map: map
        });
        var markerIstanbul = new google.maps.Marker({
          position: istanbul,
          url: 'threeStepsIstanbul.html',
          map: map
        });
        var markerHongkong = new google.maps.Marker({
          position: hongkong,
          url: 'threeStepsHongKong.html',
          map: map
        });



google.maps.event.addListener(markerGoa, 'click', function() {
      window.location.href = markerGoa.url;
    });
google.maps.event.addListener(markerIstanbul, 'click', function() {
      window.location.href = markerIstanbul.url;
    });
google.maps.event.addListener(markerHongkong, 'click', function() {
      window.location.href = markerHongkong.url;
    });
}