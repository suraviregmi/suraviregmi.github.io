function Car(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.scored = false; // to make sure scoring 1 point and not more
}

Car.prototype.draw = function() {
	//console.log("displat car");
	ctx.drawImage(car, this.x, this.y, this.w, this.h);
};

Car.prototype.update = function() {
	//check for collision

	if (this.y < obstacle.y + obstacle.h) {
		//console.log("y collsion");
		if (
			(obstacle.x <= this.x + this.w && obstacle.x >= this.x) ||
			(obstacle.x + obstacle.w <= this.x + this.w &&
				obstacle.x + obstacle.w >= this.x)
		) {
			//gameOver();
			console.log("game over");
			isGameOver = true;
		} else {
			if (!this.scored) {
				score++;
				this.scored = true;
				//console.log("socre", score);
			}
		}
	}
	//console.log("obstacle and canvas", obstacle.y);
	if (obstacle.y >= 645) {
		this.scored = false;
		//console.log("out of canvas");
	}
};

Car.prototype.moveLeft = function() {
	if (this.x > 70) {
		this.x -= 10;
	}
};
Car.prototype.moveRight = function() {
	if (this.x < canvas.width - 75 - this.w) {
		this.x += 10;
	}
};
