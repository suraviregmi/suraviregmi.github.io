//wrapper div to play game in
var wrapper = document.createElement("div");
wrapper.style.width = "700px";
wrapper.style.height = "500px";
wrapper.style.background = "yellow";
wrapper.style.position = "relative";

document.body.appendChild(wrapper);

var wrapperWidth = removePx(wrapper.style.width);
var wrapperHeight = removePx(wrapper.style.height);
/*var dx = 2;
var dy = 2;*/
var score = 0;
var antObjectIndex = 0;
var antArray = [];

//to change string with px to int
function removePx(stringValue) {
    splitValue = stringValue.substring(0, stringValue.length - 2);
    return parseInt(splitValue);
}

//class of Ants
function Ants(antId) {
    this.x = Math.floor(Math.random() * wrapperWidth) + 1;
    this.y = Math.floor(Math.random() * wrapperHeight) + 1;
    this.antWidth = 50;
    this.antHeight = 20;
    this.antColor = getRandomColor();
    //small random difference
    this.dx = Math.floor(Math.random() * 2) + 1;
    this.dy = Math.floor(Math.random() * 2) + 1;
    this.isAlive = true;
    this.el;
    var that = this;

    this.createAnt = function() {
        var newAnt = document.createElement("div");
        this.el = newAnt;
        newAnt.style.left = this.x + "px";
        newAnt.style.top = this.y + "px";
        newAnt.style.width = this.antWidth + "px";
        newAnt.style.height = this.antHeight + "px";
        newAnt.style.background = this.antColor;
        newAnt.style.borderRadius = "50%";
        newAnt.style.position = "absolute";
        //console.log("beofre click")
        //console.log(newAnt)
        wrapper.appendChild(newAnt);
        newAnt.onclick = function() {
            //console.log("cclicked");
            score++;
            wrapper.removeChild(that.el);
        };
    };

    this.updatePosition = function() {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;

        this.el.style.top = this.y + "px";
        this.el.style.left = this.x + "px";
    };
    this.handleCollsionWall = function() {
        //right
        if (this.x > wrapperWidth - this.antWidth) {
            this.dx = -this.dx;
            this.x = wrapperWidth - this.antWidth;
        }
        //left
        if (this.x < this.antWidth) {
            this.dx = -this.dx;
            this.x = this.antWidth;
            //this.x = 0;
        }
        //bottom
        if (this.y > wrapperHeight - this.antHeight) {
            this.dy = -this.dy;
            this.y = wrapperHeight - this.antHeight;
        }
        //top
        if (this.y < this.antHeight) {
            this.dy = -this.dy;
            this.y = this.antHeight;
        }
    };

    this.handleAntCollision = function(index) {
        for (var i = 0; i < antArray.length; i++) {
            //if nott oneself then handle collisoin

            if (this.isAlive === false) {
                this.antWidth = 0;
                this.antHeight = 0;
            }
            if (i !== index) {
                if (
                    this.x < antArray[i].x + antArray[i].antWidth &&
                    this.x + this.antWidth > antArray[i].x &&
                    this.y < antArray[i].y + antArray[i].antHeight &&
                    this.y + this.antHeight > antArray[i].y
                ) {
                    //collid
                    this.dx = -this.dx;
                    this.dy = -this.dy;
                    /*if (this.dx < 0) {
    this.x += 10;
}
if (this.dx > 0) {
    this.x -= 10;
}
if (this.dy < 0) {
    this.y += 10;
}
if (this.dy > 0) {
    this.x -= 10;
}*/
                }
            }
        }
    };

    /*    this.handleMouseClicks = function(mouseX, mouseY) {
            // this.xy === x, y comapre if equal then hide
            if (mouseX > this.x &&
                mouseX < this.x + this.antWidth &&
                mouseY > this.y &&
                mouseY < this.y + this.antHeight) {
                console.log("clicked");

                this.antHeight = 0;
                this.antWidth = 0;
            }
        }*/
}

var getRandomColor = function() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
/*function handleclick(event) {
    for (var i = 0; i < antArray.length; i++) {
        antArray[i].handleMouseClicks(event.clientX, event.clientY)
    }
}
document.addEventListener("click", handleclick);*/
function initalScene() {
    for (i = 0; i < 20; i++) {
        //create a new single ant
        var singleAnt = new Ants(i);
        singleAnt.createAnt();
        antArray.push(singleAnt);
    }
}

function startMoving() {
    for (i = 0; i < 20; i++) {
        //update and move
        // antArray[i].createAnt();

        antArray[i].updatePosition();
        antArray[i].handleCollsionWall();
        antArray[i].handleAntCollision(i);
    }
    updateScore();
    checkGameEnd();
}

initalScene();
setInterval(startMoving, 30);

function updateScore() {
    document.getElementById("score").innerHTML = "Score = " + score;
}

function checkGameEnd() {
    if (score === antArray.length) {
        alert("YOU WIN!!!");
        document.location.reload();
    }
}
