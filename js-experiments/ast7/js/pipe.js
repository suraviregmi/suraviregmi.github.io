class Pipe {

	constructor(x, y, speed) {

		this.x = x;
		this.y = y;
		this.speed = speed;
	}

	draw() {
		for (let i = 0; i < pipeArray.length; i++) {
			ctx.drawImage(pipeTop, pipeArray[i].x, pipeArray[i].y);
			ctx.drawImage(pipeBottom, pipeArray[i].x, pipeArray[i].y + pipeTop.height + 100);
		}
	}

	update() {
		for (let i = 0; i < pipeArray.length; i++) {
			pipeArray[i].x -= 2;

			if (pipeArray[i].x === 300) {
				createNewPipe();
			}

			if (pipeArray[i].x === -50) {
				removePipe();
			}


		}
	}
}