let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');


//images
let background = document.getElementById('background');
let bird = document.getElementById('bird');
let pipeTop = document.getElementById('pipeTop');
let pipeBottom = document.getElementById('pipeBottom');
let restart = document.getElementById('restart');
let scoreCard = document.getElementById('score');

//
let arr = 1;
let pressed = false;
let isPaused = true;
let isGameOver = false;
let pipeArray = [];
let score = 0;

//objects
let player = new Bird(32, 240, 30, 40)
let pipe = new Pipe(650, 0, 1)
let background1 = new Background(0, 0, 650, 500, 1);
let background2 = new Background(650, 0, 650, 500, 1);


pipeArray.push(pipe);


class Game {
    constructor(ctx) {

        //declarations
        //console.log(" in constructor")
        this.ctx = ctx;


    }
    init() {

        //initiaizations
        //console.log(" in init")

        this.gameLoop();
    }
    gameLoop() {
        //update and drawings


        //update
        if (!isGameOver) {
            background1.update();
            background2.update();
            player.update();
            for (let i = 0; i < pipeArray.length; i++) {
                pipeArray[i].update();
            }
        }

        //draw
        background1.draw();
        background2.draw();
        player.draw();
        for (let i = 0; i < pipeArray.length; i++) {
            pipeArray[i].draw();
        }

        if (isGameOver) {
            drawTint();
            ctx.drawImage(restart, 250, 250)


        }

        ctx.drawImage(scoreCard, 250, 0)
        drawText(+score, 200 + scoreCard.width, 100);



        window.requestAnimationFrame(this.gameLoop.bind(this));
    }
}

//tint and text
let drawText = (text, x, y) => {
    ctx.font = 'bold 56px Comic Sans MS';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
}

//function for drawing tint on the screen 
let drawTint = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}



//check for key press
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
        pressed = true;
        player.moveUp(2);
        // console.log("pressed");

    }

}, false);
document.addEventListener('keyup', (e) => {
    if (e.keyCode === 32) {
        pressed = false;
        //console.log(" notpressed");
    }
}, false);

document.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    if (x > 250 && x < 250 + restart.width && y > 250 && y < 250 + restart.height) {
        console.log("cicked in restart")
        if (isGameOver) {
            window.location.reload();
        }
    }
});


let createNewPipe = () => {

    pipeObj = 'pipe' + arr;
    pipeObj = new Pipe(canvas.width, Math.floor(Math.random() * 100) - 100, 1);
    pipeArray.push(pipeObj);

}

let removePipe = () => {
    pipeArray.splice(0, 1);
}
const newGame = new Game(ctx);
newGame.init()