let paintColors;
let count;
function setup() {
	var canvas = createCanvas(windowWidth, windowHeight/6);
	canvas.parent("sketch-holder");
	paintColors = ["#6B9080", "#6A5B6E", "#F46036", "#F0C62D"]

	count = 0;

}

function draw() {
	noStroke();
	let paintColor = color(paintColors[count % 4])
	paintColor.setAlpha(40)
	// paintColor.setAlpha(128 + 128 * sin(millis() / 1000));
	fill(paintColor);
	ellipse(mouseX, mouseY, 100, 100);
	if (round(millis()) % 1000 < 50) {
		count ++;
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight/6);
}