class Bird {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fallSpeed = 0;
        this.ySpeed = 0;

        this.scored = false;

    }

    draw() {
        ctx.drawImage(bird, this.x, this.y);

    }
    update() {
        this.fallSpeed += 0.1;
        this.y += this.fallSpeed + this.ySpeed;

        //collision detection

        for (let i = 0; i < pipeArray.length; i++) {
            let p = pipeArray[i]
            if (this.x + this.w >= p.x && this.x <= p.x + pipeTop.width &&
                (this.y <= p.y + pipeTop.height || this.y + this.h >= p.y + pipeTop.height + 100) ||
                this.y + this.h >= 400) {
                console.log("game over")
                isGameOver = true;
            }

            if ((this.x > p.x + pipeTop.width) && !this.scored) {
                score++;
                this.scored = true;
                console.log("scred", score)
            }

            if (p.x + pipeTop.width === this.x) {
                this.scored = false;
                // console.log("nt scoredr")
            }

        }



    }


    moveUp(speed) {
        this.fallSpeed = 0;
        this.ySpeed = -speed;
    }
}