 var gif = document.getElementById("gif");
 var gif2 = document.getElementById("gif2");
 let audio = document.getElementById("song");
 let mute = document.getElementById("mute");
 let unmute = document.getElementById("unmute");
 let volume = 'on';

//code adapted from https://www.w3schools.com/howto/howto_js_animate.asp

 function myMove() {

      var pos = 0;
      var id = setInterval(frame, 10);

      function frame() {
          if (pos >= window.innerWidth) {
              pos= 0;

              // when planes move off screen they start again. at first i reloaded the page, but that messed up the audio. so i reset the src of the gifs to start them over.
              $('#gif').attr('src', '');
              $('#gif2').attr('src', '');
              $('#gif3').attr('src', '');
              $('#gif').attr('src', 'img/planereal.gif');
              $('#gif2').attr('src', 'img/planereal.gif');
              $('#gif3').attr('src', 'img/planereal.gif');


         } else {
              
         
                pos++;
              gif.style.left= pos + 'px';
              gif.style.bottom = pos + 'px';

              gif2.style.right= pos + 'px';
              gif2.style.bottom = (0.5 * pos) + 'px';


              gif3.style.left= (2*pos) + 'px';
              gif3.style.top = pos + 'px';
     

          }
      }
  }

//originally just made 2 images and was going to use a hide class but it was easier to just change the src to determine whether mute/unmute. however, then i needed to make a flag to show whether vol was on or off.
function Mute() {
  if (volume=='on') {
  song.volume = 0;
  mute.src="img/mute.png"
  volume = 'off'
} else {
  song.volume = 1;
  mute.src = "img/unmute.png"
  volume='on';
}


}
