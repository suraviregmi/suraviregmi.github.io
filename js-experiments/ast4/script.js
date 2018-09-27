var wrapper = document.getElementsByClassName('viewport')[0];
var imageSlider = document.getElementsByClassName('images')[0];
var Children = imageSlider.getElementsByTagName('img');
var leftButton = document.getElementById("leftBtn");
var rightButton = document.getElementById("rightBtn");

noOfChildren = Children.length
var width = 768;
var currentMarginLeft = 0;
var currentIndex = 0;
var clickToSlide = 0;
var refStartLoop, refAnimate;
var shifted = 0;
var nextDirection = -1;
var animationTime;
var animationRunning = 1;


//to run on startup
window.onload = function() {
    startSlide();
}



function startSlide() {

    refStartSlide = setInterval(function() {
        if (currentIndex === 0) {
            nextDirection = -1;
            increment = 1;
        } else if (currentIndex == noOfChildren - 1) {
            nextDirection = 1;
            increment = -1;
        }
        currentIndex = currentIndex + increment;
        // console.log("current indx add", currentIndex);
        //console.log("Next Value is ", nextDirection);

        animate(nextDirection);


    }, 5000);
}


function animate(nextDirection) {
    animationRunning = 1;
    stopSlide();
    //console.log("slideStopped and animate")
    animationTime = 0;
    refAnimate = setInterval(function() {
        shifted = shifted + (nextDirection * 768) / 200;
        if (animationTime === 200) {
            stopAnimate();
            // console.log("stop animate")
        } else {
            imageSlider.style.marginLeft = shifted + "px";
        }
        animationTime++;
    }, 1);
    startSlide();
    // console.log("start slide again");
}


// only change when not animating and dont go further than last image
rightButton.onclick = function() {

    if ((currentIndex < noOfChildren - 1) && (animationRunning === 0)) {
        currentIndex++;
        animate(-1)
    }
}
// only change when not animating and dont go further than first image
leftButton.onclick = function() {

    if ((currentIndex > 0) && (animationRunning === 0)) {
        currentIndex--;
        animate(1)
    }
}


//stop only slide
function stopSlide() {
    clearInterval(refStartSlide);
}

///stop ony animate

function stopAnimate() {
    clearInterval(refAnimate);
    animationRunning = 0;
}

//stop animate and slide
function stop() {
    stopSlide();
    stopAnimate();
}