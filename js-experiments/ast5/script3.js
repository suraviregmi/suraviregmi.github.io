//wrapper div to play game in
var wrapper = document.createElement('div');
wrapper.style.width = '700px';
wrapper.style.height = '500px';
wrapper.style.background = 'salmon';
wrapper.style.position = 'relative';

document.body.appendChild(wrapper);

var wrapperWidth = removePx(wrapper.style.width);
var wrapperHeight = removePx(wrapper.style.height);

var dx = 2;
var dy = 2;

var antObjectIndex = 0;
var antArray = [];
//to change string with px to int
function removePx(stringValue) {
    splitValue = stringValue.substring(0, stringValue.length - 2)
    return (parseInt(splitValue))
}

//class of Ants
function Ants(antId) {
    this.x = Math.floor(Math.random() * wrapperWidth) + 1;
    this.y = Math.floor(Math.random() * wrapperHeight) + 1;
    this.antWidth = 30;
    this.antHeight = 30;
    this.antColor = getRandomColor();
    //small random difference
    this.dx = Math.floor(Math.random() * 5);
    this.dy = Math.floor(Math.random() * 5);

    this.createAnt = function() {
        var newAnt = document.createElement('div');
        newAnt.style.left = this.x + 'px';
        newAnt.style.top = this.y + 'px';
        newAnt.style.width = this.antWidth + 'px';
        newAnt.style.height = this.antHeight + 'px';
        newAnt.style.background = this.antColor;
        newAnt.style.borderRadius = '50%';
        newAnt.style.position = 'absolute';
        wrapper.appendChild(newAnt);
    }

    this.updatePosition = function() {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
        if (this.x >= wrapperWidth - this.antWidth) {
            this.dx = -this.dx;
        }
        if (this.x < this.antWidth) {
            this.dx = -this.dx;
        }

        if (this.y > wrapperHeight - this.antHeight) {
            this.dy = -this.dy;
        }
        if (this.y < this.antHeight) {
            this.dy = -this.dy;
        }
    }
}

var getRandomColor = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function initalScene() {
    for (i = 0; i < 50; i++) {
        //create a new single ant
        var singleAnt = new Ants(i);
        singleAnt.createAnt();
        antArray.push(singleAnt);
    }
}

function startMoving() {
    //like in canvas
    clearWrapper();
    for (i = 0; i < 50; i++) {
        antContext = antArray[i];
        //update and move 
        antContext.updatePosition();
        antContext.createAnt();
    }
}

function clearWrapper() {
    wrapper.innerHTML = "";
}


initalScene();
setInterval(startMoving, 30);