// var img;

// function setup() {
// img = loadImage('img/plane.png');
// }

// function draw() {
// image(img, mouseX, mouseY);
// }

var img;
 
function preload()
{
  // load image
  img = loadImage("img/plane.png");
}
 
function setup() 
{
  // set canvas size
 var cnv = createCanvas(windowWidth, windowHeight);
}
 
function draw() 
{
  background(255);
  image(img, 50, 50); 
}