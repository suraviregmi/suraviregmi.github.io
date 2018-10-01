function Obstacle(x, y, w, h, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
}

var lanes = [50, 125, 200];
Obstacle.prototype.draw = function() {
    ctx.drawImage(greyCar, this.x, this.y, this.w, this.h);
    // ctx1.drawImage(greyCar, this.x, this.y, this.w, this.h);
    /*    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.closePath();*/
};

Obstacle.prototype.update = function() {
    this.y += this.speed + 7;
    //if out of canvas height
    //console.log("y  ", this.y);
    if (this.y >= 650) {
        //console.log("y of obstacle is ", this.y);
        this.y = -200;
        this.x = lanes[Math.floor(lanes.length * Math.random())];
        //console.log("y of obstacle is ", this.x);
    }
};