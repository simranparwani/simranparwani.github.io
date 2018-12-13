var player, playerTwo;
var speed = 6;
var gameHeight = 700;
var gameWidth = 1200;
var playerSketchHeight = gameHeight;
var playerSketchWidth = 500;
var playerWidth = 100;
var playerHeight = 100;
var divider; // screen division

function setup(){
	createCanvas(gameWidth, gameHeight);
	
	player=createSprite(200,height-60, playerWidth, playerHeight);
	player.shapeColor = color(212);

	playerTwo=createSprite(800,height-60, playerWidth, playerHeight);
	playerTwo.shapeColor = color(212);


}

function draw() {
	background(255);
	fill(169)
	rect(0,0,playerSketchWidth, playerSketchHeight);
	rect(700,0,playerSketchWidth, playerSketchHeight);
	drawSprites();
	keyPressed();

}



function keyPressed() {


if (keyIsDown(RIGHT_ARROW)) {
    playerTwo.position.x += speed;


  }
 
   if (keyIsDown(LEFT_ARROW)) {
    playerTwo.position.x -= speed;
 
  }  if (keyIsDown(UP_ARROW)) {
  	playerTwo.position.y -= speed;


  }  if (keyIsDown(DOWN_ARROW)) {
  	playerTwo.position.y += speed;
  }


if (keyIsDown(68)) {
    player.position.x += speed;


  }
 
   if (keyIsDown(65)) {
    player.position.x -= speed;
 
  }  if (keyIsDown(87)) {
  	player.position.y -= speed;


  }  if (keyIsDown(83)) {
  	player.position.y += speed;
  }

}