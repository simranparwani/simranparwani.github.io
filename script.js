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
              location.reload();
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


function Mute() {
  if (volume=='on') {
  song.volume = 0;
  mute.src="img/unmute.png"
  volume = 'off'
} else {
  song.volume = 1;
  mute.src = "img/mute.png"
  volume='on';
}


}
