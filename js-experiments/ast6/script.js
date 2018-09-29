/*get canvas 
draw car  //done
move car left and right //done
 bacgrund set//done
draw obstacle//dome
collion of car and obstacle//done
game over//done

put obstacles in array
origin at top 3 rows 
delete at bottom 3 rows
repeat background
restart game 
*/

var canvas = document.getElementById("myCanvas");

//to store 2d rendering context
var ctx = canvas.getContext("2d");

var carWidth = 40;
var carHeight = 20;
var carX = (canvas.width - carWidth) / 2;
var carY = canvas.height - carHeight;
console.log(carX);
//for key press

var leftPressed = false;
var rightPressed = false;

//for obstacle
lanesArray = [50, 130, 200];
var obstacleX = lanesArray[Math.floor(Math.random() * lanesArray.length)];
var obstacleY = 0;
var obstacleWidth = 40;
var obstacleHeight = 20;
var dy = 0.5;
var obstacleStatus = 1;
var arrayOfObstacle = [];

//for restart button

var buttonX = 50;
var buttonY = 70;
var buttonHeight = 50;
var buttonWidth = 200;

function setUpScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar();
    drawObstacles();
    //drawScore();
    collisionDetection();

    //console.log("check condition");
    //move obstacle in the function
    if (obstacleY < canvas.height) {
        // console.log("check condition", obstacleY);
        obstacleY += dy;
    }
    if (obstacleY + obstacleHeight > canvas.height) {
        //delete obstacle
        // console.log(obstacleStatus);
        //console.log("obstacleStatus");
        obstacleStatus = 0;
    }
    //collision detection to walls of car
    if (rightPressed && carX < canvas.width - 50 - carWidth) {
        carX += 10;
        // console.log("car x in condition check", carX);
    } else if (leftPressed && carX > 50) {
        carX -= 10;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = true;
        // console.log("car x", carX);
        // console.log("condition :", canvas.width - carWidth);
        console.log("pressed");
    } else if (e.keyCode === 37) {
        leftPressed = true;
        console.log("pressed");
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

function drawCar() {
    ctx.beginPath();
    //x,y,width,height
    ctx.rect(carX, carY, carWidth, carHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawObstacles() {
    // to genera te obstacle in different lane single lane

    if (obstacleStatus === 1) {
        ctx.beginPath();
        ctx.rect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();
    }
}

function collisionDetection() {
    //console.log(carY, "car Y");
    //console.log(obstacleY + obstacleHeight);

    if (obstacleStatus === 1) {
        if (carY < obstacleY + obstacleHeight) {
            //console.log("y collsion");
            if (
                (obstacleX <= carX + carWidth && obstacleX >= carX) ||
                (obstacleX + obstacleWidth <= carX + carWidth &&
                    obstacleX + obstacleWidth >= carX)
            ) {
                gameOver();
                // console.log("x collsion");
            }
        }
    }
}
refgame = setInterval(setUpScene, 10);

function stop() {
    clearInterval(refgame);
}

function gameOver() {
    clearInterval(refgame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //to display game over
    ctx.beginPath();
    ctx.font = "40px Arial";
    ctx.strokeStyle = "yellow";
    ctx.strokeText("Game Over", 50, 50);
    ctx.closePath();
    //button to restart game

    ctx.beginPath();
    ctx.rect(buttonX, buttonY, buttonWidth, buttonHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "20px sans-serif";
    ctx.fillText("restart", buttonX + 50, buttonY + 30);
    ctx.closePath();

    canvas.onclick = function() {
        console.log("cclicked");
    };
}
