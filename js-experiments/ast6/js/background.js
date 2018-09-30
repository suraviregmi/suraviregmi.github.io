//background constructor

function Background(x, y, w, h, speed) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.speed = speed;
}
Background.prototype.draw = function() {
	ctx.drawImage(background, this.x, this.y, this.w, this.h);
};

Background.prototype.update = function() {
	//make it move down
	this.y += this.speed;
	//if top of image is at bottom move it to top
	if (this.y >= 650) {
		this.y = -640;
	}
};
