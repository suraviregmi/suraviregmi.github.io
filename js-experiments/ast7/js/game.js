let canvas = document.getElementById("myCanvas");

const pipeTopHeight = 242;
const pipeWidth = 52;
const gap =100;
const birdWidth = 40;
const birdHeight = 40;
const restartHeight = 75;
const restartWidth  =214;


//images
let background = "images/background.png";
let bird = "images/bird.png"
let pipeTop = "images/pipeNorth.png"
let pipeBottom = "images/pipeSouth.png"
let restart = "images/restart.png"
let scoreCard ="images/scoreboard.png"

//

let pressed = false;
let isPaused = true;
let isGameOver = false;
let score = 0;
let frameCounter = 0;
//objects





class Game {
    constructor() {
        this.ctx = canvas.getContext('2d');
        //declarations
        //console.log(" in constructor")
        this.pipeArray = [];
        this.background1 = new Background(0, 0, 650, 500, 1,this.ctx);
        this.background2 = new Background(650, 0, 650, 500, 1,this.ctx);
        this.player = new Bird(32, 240, birdWidth,birdHeight,this.ctx);


    }
    init() {

        //initiaizations
        //console.log(" in init")

        this.gameLoop();
    }
    gameLoop() {

        frameCounter++;
        
        //onkey press
        if (pressed) {
            this.player.moveUp(2);
        }

        
        //update and draw
        if (!isGameOver) {
            this.ctx.clearRect(0,0,canvas.width,canvas.height);
            this.background1.draw();
           this.background2.draw();
            this.player.draw();
            this.background1.update();
            this.background2.update();
            this.handleBottomCollision();
            this.handlePipeCollison();
            this.player.update();
            
            
            for (let i = 0; i < this.pipeArray.length; i++) {
                this.pipeArray[i].update();

                this.pipeArray[i].draw();


                if (this.pipeArray[i].x < -50)
                    this.removePipe();
            }


            if (this.pipeArray.length < 3) {
                if (frameCounter % 150 === 0) {
                    this.createNewPipe();
                }
            }
        }
     


        if (isGameOver) {
      
            let restartImg = new Image();
            restartImg.src = restart;   
            this.ctx.drawImage(restartImg,250,250);


        }

        let scorecardImg = new Image();
        scorecardImg.src = scoreCard;
        this.ctx.drawImage(scorecardImg,250,0);

        this.drawText(+score, 440, 90);



        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    createNewPipe(){

        this.pipeObj = new Pipe(canvas.width, Math.floor(Math.random() * 100) - 100, 1,this.ctx);
        this.pipeArray.push(this.pipeObj);
    
    }
    
     removePipe(){
        this.pipeArray.splice(0, 1);
    }
    handleBottomCollision(){
        if(this.player.y + this.player.h >= 400)
        {isGameOver =true;
        }
    }

    handlePipeCollison(){
        const bird = this.player;
      
      //  console.log('')
        for (let i = 0; i < this.pipeArray.length; i++) {
                    let p = this.pipeArray[i]
                    if (bird.x + bird.w >= p.x && bird.x <= p.x + pipeWidth &&
                        (bird.y <= p.y + pipeTopHeight || bird.y + bird.h >= p.y + pipeTopHeight + gap )
                        ) {
                        console.log("game over pipe")
                        isGameOver = true;
                    }
        
                    if ((bird.x > p.x + pipeWidth) && !bird.scored) {
                        score++;
                        bird.scored = true;
                        console.log("scred", score)
                    }
        
                    if (p.x + pipeWidth === bird.x) {
                        bird.scored = false;
                        // console.log("nt scoredr")
                    }
        
               }
    }

    // and text
 drawText(text, x, y){
    this.ctx.font = 'bold 56px Comic Sans MS';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(text, x, y);
    this.ctx.strokeText(text, x, y);
}


}

//check for key press
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
        pressed = true;
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
    if (x > 250 && x < 250 + restartWidth && y > 250 && y < 250 + restartHeight) {
        console.log("cicked in restart")
        if (isGameOver) {
            window.location.reload();
        }
    }
});



const newGame = new Game();
newGame.init()

