var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.font = "bold 56px Comic Sans MS";
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.lineWidth = 2;
ctx.strokeStyle = "black";

//load images
var background = document.getElementById("background");
var car = document.getElementById("car");
var greyCar = document.getElementById("greyCar");

function drawText(text, x, y) {
	ctx.fillStyle = "white";
	ctx.fillText(text, x, y);
	ctx.strokeText(text, x, y);
}

// Custom function for drawing a tint on the screen
function drawTint(x, y, w, h) {
	ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	ctx.fillRect(x, y, w, h);
}

//variables

var score = 0;
var isGameOver = false;
var leftPressed = false;
var rightPressed = false;

var player = new Car(200, 500, 100, 150);
var background1 = new Background(0, 0, 500, 650, 2);
var background2 = new Background(0, -640, 500, 650, 2);
var obstacle = new Obstacle(200, 0, 100, 200, 5);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.keyCode === 39) {
		rightPressed = true;
		player.moveRight();
		// console.log("car x", carX);
		// console.log("condition :", canvas.width - carWidth);
		// console.log("pressed");
	} else if (e.keyCode === 37) {
		leftPressed = true;
		player.moveLeft();
		//console.log("pressed");
	}

	if (e.keyCode === 13) {
		// If the game is in a game over state, refresh the page to restart the game
		if (isGameOver) {
			window.location.reload();
		}
	}
}

function keyUpHandler(e) {
	if (e.keyCode === 39) {
		rightPressed = false;
		// console.log("notpresssed");
	} else if (e.keyCode === 37) {
		leftPressed = false;
		// console.log("notpresssed");
	}
}

function gameLoop() {
	if (!isGameOver) {
		player.update();
		background1.update();
		background2.update();
		obstacle.update();
	}

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	background1.draw();
	background2.draw();
	player.draw();
	obstacle.draw();
	if (isGameOver) {
		drawTint(0, 0, canvas.width, canvas.height);
		drawText("Game Over", 250, 100);
		drawText('Hit "Enter"', 250, 310);
		drawText("to Restart!", 250, 380);
		drawText("Score" + score, 250, 200);
	}

	//recursive loop to call itself
	window.requestAnimationFrame(gameLoop);
}

gameLoop();
