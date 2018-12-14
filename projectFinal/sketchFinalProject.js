var player;
var playerWidth = 100;
var playerHeight = 100;
var gameHeight = 500;
var gameWidth = 1000;
var input, button, greeting, ending, title, instructions1, instructions2, instructions3, warning, ending2;
var gameState="start";
var speed = 15;
var goal;
var instructionTimer = 0;
var startTimer;


 var textTimer = 0;
var friend, friends;
var count = 0;
var moodCount = 1;
var gameTimer = 0;
var moveTimer = 0;
var bgColor = 250;
var spaceCount=0;
var insideScale;

var obstacles, obs;
var YPosObs = [-11100,-12200,-13200,-14200,-15200,-16200,-17200,-18200,-19100,-20000,-20900,-21800,-22700,-23600,24500,-25400,-26200,-27000,-27800,-28500,-29200,-29900,-30500,-31000,-31500,-32000,-32400,-32800,-33200,-33600,-34000,-34400,-34800,-35200,-35600,-36000,-36400,-36800,-37200,-37600,-38000,-38400,-38800,-39400,-39800,-40200,-40600,-41000,-41400,-41800,-42200,-42600,-43000,-43300,-43600,-43900,-44200,-44500,-44800,-45100,-45400,-45700,-46000,-46300,-46600,-46900,-47200,-47500,-47800,-48100,-48400,-48700,-49000,-49300,-49600,-49900,-50200,-50500,-50800,-51100,-51400,-51700,-52000,-52300,-52600,-52900,-53200,-53500,-53800,-54100,-54400,-54700,-55000,-55300,-55600,-55900,-56200,-56500,-56800,-57100,-57400,-57600,-57800,-58000,-58200,-58400,-58600,-58800,-59000,-59200,-59400,-59600,-59800,-60200,-60400,-60600,-60800,-61000,-61200,-61400,-61600,-61800,-62000,-62200,-62400,-62600,-62800,-63000,-63200,-63400,-63600,-63800,-64000,-64200,-64400,-64600,-64800,-65000,-65200,-65400,-65600,-65800,-66000,-66200,-66400,-66600,-66800,-67000,-67200,-67400,-67600,-67800,-68000,-68200,-68400,-68600,-68800,-69000]
// -60000,-60200,-60400,-60600,-60800,-61000,-61200,-61400,-61600,-61800,-62000,-62200,-62400,-62600,-62800,-62000,-62200,-62400,-62600,-62800,-63000,-63200,-63400,-63600,-63800,-64000,-64200,-64400,-64600,-64800,-65000,-65100,-65200,-65300,-65400,-65500,-65600,-65700,-65800,-65900,-66000,-66100,-66200,-66300,-66400,-66500,-66600,-66700,-66800,-66900,-67000,-67100,-67200,-67300,-67400,-67500,-67600,-67700,-67800,-67900,-68000,-68100,-68200,-68300,-68400,-68500,-68600,-68700,-68800,-68900,-69000,-69100,-69200,-69300,-69400,-69500,-69600,-69700,-69800,-69900,-70000]


function setup() {
	  var col = color(25, 23, 200);
  var col2 = color(212,112,45);
	createCanvas(gameWidth, gameHeight);
	friends = new Group();
	obstacles = new Group();
	player=createSprite(200,height-60, playerWidth, playerHeight);
	player.shapeColor = color(212,112,45);
	player.visible = false;

	inside=createSprite(player.position.x,player.position.y, 10, 10);
	inside.shapeColor = color(112);
	inside.visible = false;

	input = createInput();
  input.position(gameWidth / 2, gameHeight/2+50);
  input.size(250,20);
 input.style('border-width', '2px');
  button = createButton('start');
  button.style('background-color', col2);

  button.position(input.x + input.width, input.y);
  button.size(70,25);
	// drawSliders();
createFriends();
createObstacles();


}

function draw() {

	if (gameState==="start"){
		startScreen();
	}
	else if (gameState==='play'){
		loadGame();
	}
	else if (gameState==="end"){
		endGame();
	}
	
}

function playGame() {
 button.remove();


 input.hide();
 goal = input.value();
 startTimer = 0;
 gameState = 'play';


}


function startScreen() {
		background(bgColor);

fill(123)
textSize(64)
textAlign(CENTER);
text("The Semester",gameWidth/2,gameHeight/2 -150);
textSize(24);
text("Enter your semester goal to begin.",gameWidth/2,gameHeight/2 -50);


button.mousePressed(playGame);
}


function loadGame(){
		background(bgColor);
	drawSprite(player);
	drawSprite(inside);
	fill(25, 23, 200, 50);
player.visible = true;
deleteItems();
sidebar();
player.overlap(friends,socialize);
	player.collide(obstacles, collisionObs);

checkEdges();
camera.position.y = player.position.y -200;
if (inside.scale > 10){

} else {
	keyPressed();
}
if (millis() - moveTimer > 10) {
	player.position.y -= speed;
	moveTimer = millis();
}
if (player.position.y < -5000) {
	insideUpdate();

	if ((millis() - gameTimer > 12000) && inside.scale < 9.9 && !player.overlap(friends) && !(keyIsDown(32))) {
	moodCount += 1;
	gameTimer = millis();
	}

}
if (inside.height >= playerHeight) {
	inside.scale = (speed *.1 + moodCount);
}

if (spaceCount>= 10){
	moodCount -= 1;
	spaceCount = 0;
}

if (player.position.y <= -70000){
	gameState="end";

}
}

function insideUpdate() {
	inside.visible = true;
	inside.position.x = player.position.x;
	inside.position.y = player.position.y;
inside.scale=(speed *.1 + moodCount);
bgColor = inside.scale * -10 + 255;
}
function keyReleased() {
	if (keyCode === 32){
		spaceCount += 1;
	}
}

function keyPressed() {
if (keyIsDown(RIGHT_ARROW)) {
    player.position.x += speed;
  }
   if (keyIsDown(LEFT_ARROW)) {
    player.position.x -= speed;
  }  
  if (keyIsDown(UP_ARROW)) {
  	if (speed < 20){
    speed +=1;
}} 
if (keyIsDown(DOWN_ARROW)) {
    if (speed > 1){
    speed -=1;
}
  }  
    
}


	function checkEdges() {
	if (player.position.x - playerWidth/2 < 0) {
		player.position.x = playerWidth/2;
	} 
	if (player.position.x + playerWidth/2 >gameWidth-200) {
		player.position.x = gameWidth-200 - playerWidth/2;
	}
// 	if (player.position.y + playerHeight/2 < 0) {
// 		player.position.y = height - 60;
		
// 	}
// 	if (player.position.y + playerHeight/2 > gameHeight-60) {
// 		player.position.y = gameHeight -60 - playerHeight/2;
// 	}
// }
}

function createFriends() {
	var posY;
for (var i = -800; i > -70000; i -= 500) {
	friend = createSprite(random(50,gameWidth-225), height + (random(.8,1.2)* i), playerWidth/2, playerHeight/2);
	friend.posY=friend.position.y;
	friends.add(friend);
}
}

// function drawSliders() {
// 	// goalSlider = createSlider(0,10,10,1);
// 	// goalSlider.position(windowWidth, 0);

// 	speedSlider = createSlider(0,20,5,1);
// 	speedSlider.position(windowWidth, 0);
// }

function socialize(sprite) {
sprite.shapeColor= color(random(255),random(255),random(255));
if (count < 300){
count += 1;
}
}

function createObstacles() {
	for (var i = 0; i < YPosObs.length; i++) {
		obs = createSprite(random(0,gameWidth-250),YPosObs[i],random(200,400), random(50,140));
		obs.posY = obs.position.y;
		obs.shapeColor=color(0);
		obstacles.add(obs);
	}
}

function collisionObs() {
	
	if (count > 0){
		count -=1;
}
}

function deleteItems() {
	for (var i = 0; i < friends.length; i++) {
		if (friends[i].posY > player.position.y - 600) {
			drawSprite(friends[i]);
		}
		if (friends[i].posY > player.position.y + 100) {
		friends.splice(i,1);
		console.log("dleted", friends.length);
	}
}

for (var i = 0; i < obstacles.length; i++) {
	if (obstacles[i].posY > player.position.y - 600) {
			drawSprite(obstacles[i]);
		}
		if (obstacles[i].posY > player.position.y + 100) {
		obstacles.splice(i,1);
	}
}
}

function sidebar() {
	noStroke();
rect(gameWidth-200,player.position.y-gameHeight,200,gameHeight+200);
// goalSlider.position(windowWidth-265, 300);
fill(250)
rect(gameWidth-175,player.position.y-250,150,20);

fill(231,121,12);
rect(gameWidth-175,player.position.y-250,count * .5,20);
fill(255);
textSize(16)

// speedSlider.position(windowWidth-265,200);
text("goal: "+ goal, gameWidth-175,player.position.y-290,200);
if (player.position.y > -6500) {
	text("Use the left/right arrows to navigate.", gameWidth-175, player.position.y-150,150);





} else if (player.position.y <-7500 && player.position.y > -13000) {
		text("Seek the small squares and you will achieve your goals.", gameWidth-175, player.position.y-150,150);
	}
	else if (player.position.y <-14000 && player.position.y > -20000) {
		text("Use the up/down arrows to go at your own pace.", gameWidth-175, player.position.y-150,150);
	}


if (inside.scale > 8) {

	if (millis() -  textTimer> 500){
		console.log("yay");
	text("click SPACEBAR to recharge", gameWidth-175, player.position.y-150,200);
		if (millis() -  textTimer> 2000){

	textTimer= millis();
}
}
}
 //  speedLabel.style("color", 'white').style("font-family",'Verdana');
	// speed = speedSlider.value();


// if (millis()-instructionTimer > 5000) {
// 	instructions.hide();
// }

  // speedLabel = createElement('p', 'Speed:');
  // speedLabel.position((windowWidth-250), 162);
//     	warning = createElement('p', "Click SPACE to recharge!");
//     	warning.position((gameWidth-275), 355);
// warning.style("color", 'white').style("font-family",'Verdana').style("font-size", '12px');


//     if (inside.scale > 8) {
// warning.show()

//   }  else {
//   	warning.hide();
//   }
}

function endGame(){
	
	
	background(212,112,45);
	textSize(64);
 fill(255);
 textAlign(CENTER);
text("You made it, atleast.", width/2,player.position.y-300);
 textSize(24);
 text("(There's alway's next semester.)", width/2,player.position.y-200);
insideScale = inside.scale;
friends.splice(0,friends.length);
obstacles.splice(0,obstacles.length)
input.remove();
button.remove();

 


}



