let playback_slider 
let init = () => {

  playback_slider = document.getElementById('playback-position-slider')

  playback_slider.setAttribute('max', mySound.duration())
}

let mySound = new Howl({
  src: 'shamwow.mp3',
  loop: false, 
  onload: init 
})

let adjustVolume = (value) => {
  mySound.volume(value)
}