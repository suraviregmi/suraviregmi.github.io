class Background {
    constructor(x, y, w, h, speed,ctx) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed;
        this.ctx = ctx;
    }
    draw() {
        let backgroundIMg = new Image();
        backgroundIMg.src = background;
        this.ctx.drawImage(backgroundIMg, this.x, this.y, this.w, this.h);

    }
    update() {
        this.x -= this.speed;

        if (this.x <= -650) {
            this.x = 650;
        }
    }
}