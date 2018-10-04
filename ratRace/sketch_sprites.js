var walls,others, rewards;
var player;
var speed=4;
var score = 0;
var playerHeight = 15;
var playerWidth = 15;
var gameHeight = 500;
var gameWidth = 400;
var rewardTimer = 0;
var flowerTimer = 0;
var gameTimer = 0;
var pointsUntil = 100;
var levelCount = 1;
var allFlowers = [];
var flowerCount = 0;
var colorCount = 0;
var bg;
var backgroundTimer = 0;
var seconds = 0;
var gameWon = false;

var flowerColors = ['#d3d3d3'];
var colors= ['#99CCFF','#CC99FF','#FFCC99', '#FF99FF', '#1F8FFF','#99FFCC', '#FF9999', '#CCFF99', '#99FF99', '#FF8F1F','#8F1FFF'];

function setup() {
	createCanvas(gameWidth,gameHeight);

	walls = new Group();
	others = new Group();
	rewards = new Group();


	initPath(9);
	player=createSprite(10,height-60, playerWidth,playerHeight);
	player.shapeColor = color(0);

	allFlowers.push(new Flower());
	makeReward();
	textSize(18);
	textAlign(RIGHT);


}

function draw() {
 backgroundColor((colorCount));
 keyPressed();
checkEdges();
othersOscillate();


		drawSprites();




console.log(mouseX,mouseY);
player.collide(walls);
player.collide(others);
checkRewardCollision();
// checkFlowers();
if (pointsUntil === 0) {
	levelCount += 1;
	pointsUntil = 100 * levelCount;
}
if (millis() - backgroundTimer >=5000){
	colorCount = (colorCount + 1) % flowerColors.length;
	backgroundTimer = millis();

}
if (!gameWon){
generateObjects();


fill(255,0,0);
if (millis() - gameTimer > 1000) {
	seconds += 1;
	gameTimer = millis();
}

text(seconds,50, gameHeight-20);
fill(0);
	text("Score: "+score,width-30,gameHeight-45);
	text("Points until next level: " + pointsUntil,width-30,gameHeight-20);
}

}

//function adapted from https://github.com/craigprotzel/space-flyer/

function initPath(wallCnt) {
	for (var i = 0; i < wallCnt; i++){
		var skipY = Math.floor(random(0,6));
if (i%2===0){
	var other = createSprite(random(15,gameWidth-50),gameWidth/wallCnt + (gameWidth/wallCnt * i)+16,playerWidth,playerHeight);
		other.shapeColor = color(255);
		others.add(other);
}
other.velocity=createVector((skipY+1)/1.5,0);




	
		for (var j = 0; j < 6; j++){
			//creates gaps in walls
			if (j === skipY){
				continue;
			}
			var wall = createSprite(gameHeight/14 + (gameHeight/7 * j),gameWidth/wallCnt + (gameWidth/wallCnt * i),100,15);
			if (i === 9) {
				wall.shapeColor = color(bg);
				
			} else {
			wall.shapeColor = color(120);
		}
		
			walls.add(wall);
		
		}
	}

}

//before had else ifs but then player couldn't move up and right, etc. at same time.
function keyPressed() {
if (keyIsDown(RIGHT_ARROW)) {
    player.position.x += speed;
 


  }
 
   if (keyIsDown(LEFT_ARROW)) {
    player.position.x -= speed;
  }  if (keyIsDown(UP_ARROW)) {
  	player.position.y -= speed;
  }  if (keyIsDown(DOWN_ARROW)) {
  	player.position.y += speed;

  }


}

//collide function didn't work so created for loop iterating through every reward in group
function checkRewardCollision() {
	for (var i = 0; i < rewards.length; i++) {
		//player.collide(rewards[i],rewardCollide(rewards[i]));
		if (player.overlap(rewards[i])) {
		rewardCollide(rewards[i]);
	}
	}
}

function rewardCollide(item){
	item.remove();
	score += 10;
	pointsUntil-=10;
}

//blocks representing others will move from 0 to width
function othersOscillate() {

	for (var i = 0; i < others.length; i++){
	if (others[i].position.x < 0 || others[i].position.x >width) {

		others[i].velocity.x*= -1;
	}
}
}
function checkEdges() {
	if (player.position.x - playerWidth/2 < 0) {
		player.position.x = playerWidth/2;
	} 
	if (player.position.x + playerWidth/2 >width) {
		player.position.x = width - playerWidth/2;
	}
	if (player.position.y + playerHeight/2 < 0) {
		player.position.y = height - 60;
		camera.position.y = player.position.y - 200;
		walls.removeSprites();
		others.removeSprites();
		allFlowers = [];
		rewards.removeSprites(); //otherwise they appear in the next segment
		initPath(9-flowerCount);
	}
	if (player.position.y + playerHeight/2 > gameHeight-60) {
		player.position.y = gameHeight -60 - playerHeight/2;
	}
}

//creating a square class and a flower class would be much more efficient
function Flower() {
this.flowerX = random(10,390);
if (player.position.y > gameHeight -80) {
	this.flowerY = random(gameHeight-180,gameHeight-80);
} else {
this.flowerY = random(player.position.y,player.position.y+200);
}
for (var i =0; i < walls.length; i++){
	var flowerDistance = mag(this.flowerY, walls[i].position.y);
	//makes sure flowers don't hit the walls but this method doesn't seem to work 
	if (flowerDistance > 100) {
		this.flowerX = random(10, 390);
this.flowerY = random(250,400);
}
}

	



this.display = function(){
	noStroke();
fill(160,79,213);
rect(this.flowerX, this.flowerY + 9, 7,7);

rect(this.flowerX, this.flowerY, 7,7);

rect(this.flowerX + 9, this.flowerY, 7,7);

rect(this.flowerX + 9, this.flowerY + 9, 7,7);
fill(60,179,113);
rect(this.flowerX+7,this.flowerY+15,2,10);
fill(238,231,130);


rect(this.flowerX + 6, this.flowerY + 5, 4,4);
}

}

function makeReward() {
//defined y coord such that it would always be above the player whereas the flowers are always behind the player
var newReward = createSprite(random(10, width-10), random(player.position.y-100, player.position.y) , 7,20);
//kept trying rotate(PI/5) which didn't work but apparently rotation is a built in attribute for p5.play
newReward.rotation = 10;
	newReward.shapeColor = color(60,179,113);
	rewards.add(newReward);
	if (newReward.overlap(walls) || newReward.overlap(others){
	newReward.remove(); //random reassignment of position didn't seem to work so just removed the sprite entirely adjusting the timer

}
}


// function checkFlowers() {
// 	for (var i = 0; i < allFlowers.length; i++) {
// 		//player.collide(rewards[i],rewardCollide(rewards[i]));
// 		for (var j=0; j<flower.length;j++) {
// 		if (player.overlap(allFlowers[i][j])) {
// 		allFlowers[i][j].remove();
// 		allFlowers[i].splice(j,1);
// 		console.log("removed");
// 		}
// 	}
// 	}
// }

function backgroundColor(cnt) {
	bg=flowerColors[colorCount];
	background(bg);
}

function generateObjects() {
	for (var i = 0; i < allFlowers.length; i++){
	allFlowers[i].display();
	var distance = dist(allFlowers[i].flowerX,allFlowers[i].flowerY, player.position.x, player.position.y);
	if (distance < 17){
		allFlowers.splice(i,1);
		flowerCount += 1;
		flowerColors.push(colors[flowerCount]);
	}
	if (flowerCount === 9){
			gameWon = true;
	
		}
}		


if (millis() - rewardTimer >= 1500) {
    makeReward();
    rewardTimer = millis();

}


if (millis() - flowerTimer >=10000){
	allFlowers.push(new Flower());
	flowerTimer = millis();

}
}
