class Pipe {

	constructor(x, y, speed,ctx) {

		this.x = x;
		this.y = y;
		this.speed = speed;
		this.ctx = ctx;
	
	}

	draw() {
	

		let pipeTopImg = new Image();
		pipeTopImg.src = pipeTop;
		this.ctx.drawImage(pipeTopImg, this.x, this.y);
		
		let pipeBottomImg = new Image();
        pipeBottomImg.src = pipeBottom;
        this.ctx.drawImage(pipeBottomImg, this.x, this.y +pipeTopImg.height+100 );
	}

	update() {
		this.x -= 2;
	}

}