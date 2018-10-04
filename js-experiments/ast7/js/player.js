class Bird {
    constructor(x, y, w, h,ctx) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fallSpeed = 0;
        this.ySpeed = 0;
        this.ctx = ctx;

        this.scored = false;

    }

    draw() {
        let birdImg = new Image();
        birdImg.src = bird;
        this.ctx.drawImage(birdImg, this.x, this.y, this.w, this.h);

    }
    update() {
        this.fallSpeed += 0.1;
        this.y += this.fallSpeed + this.ySpeed;
    }
        //collision detection

    //     for (let i = 0; i < pipeArray.length; i++) {
    //         let p = pipeArray[i]
    //         if (this.x + this.w >= p.x && this.x <= p.x + pipeTop.width &&
    //             (this.y <= p.y + pipeTop.height || this.y + this.h >= p.y + pipeTop.height + 100) ||
    //             this.y + this.h >= 400) {
    //             console.log("game over")
    //             isGameOver = true;
    //         }

    //         if ((this.x > p.x + pipeTop.width) && !this.scored) {
    //             score++;
    //             this.scored = true;
    //             console.log("scred", score)4
    //         }

    //         if (p.x + pipeTop.width === this.x) {
    //             this.scored = false;
    //             // console.log("nt scoredr")
    //         }

    //    }





    moveUp(speed) {
        this.fallSpeed = 0;
        this.ySpeed = -speed;
    }
}