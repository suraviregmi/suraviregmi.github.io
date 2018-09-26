var wrapper = document.getElementsByClassName('viewport');
var imageSlider = document.getElementsByClassName('images')[0];
var noOfChilldren = imageSlider.getElementsByTagName('img');
//console.log(noOfChilldren.length)
var width = 768;
var status = 1;
var index = 0;
var startLoop, startleftloop;


//to run on startup
window.onload = function() {
    startSlide();
}

//to loop slider in interval 5 sec
startLoop = setInterval(function() {
    startSlide();
}, 2000);


//function to slide right
function startSlide() {
    var imgMarginLeft = -index * width;
    imageSlider.style.marginLeft = imgMarginLeft + "px";
    index = (index + 1) % noOfChilldren.length;
}


document.getElementById("leftBtn").onclick = function() {
    startSlide();
}
document.getElementById("rightBtn").onclick = function() {
    startSlide();
}


//to stop the interval
function stop() {
    clearInterval(startLoop)
}