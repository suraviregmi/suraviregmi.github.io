var images = document.getElementsByClassName("slider")[0];

var currentIndex = 0,
    IMG_WIDTH = 1170,
    nextIndex = 1,
    IMAGES_MAX_COUNT = 3,
    isAnimationRunning = false;

//the global currentIndex is passes so to make it a pure function
var calculateNextIndex = function(currentIndex) {
    return (currentIndex + 1) % 4;
};

var calculatePreviousIndex = function(currentIndex) {
    //for calculating previous index we send 3  if current index is 0 else decrease by 1
    return currentIndex === 0 ? 3 : currentIndex - 1;
};

var prevClickHandler = function() {
    nextIndex = calculatePreviousIndex(currentIndex);

    clearInterval(mainLoop);
    addEventListeners();

    animateTransition();
    currentIndex = nextIndex;
};

var nextClickHandler = function() {
    nextIndex = calculateNextIndex(currentIndex);
    clearInterval(mainLoop);
    addEventListeners();

    animateTransition();
    currentIndex = nextIndex;
};

var addEventListeners = function() {
    document
        .getElementsByClassName("prev")[0]
        .addEventListener("click", prevClickHandler);
    document
        .getElementsByClassName("next")[0]
        .addEventListener("click", nextClickHandler);
};
var removeEventListeners = function() {
    document
        .getElementsByClassName("prev")[0]
        .removeEventListener("click", prevClickHandler);
    document
        .getElementsByClassName("next")[0]
        .removeEventListener("click", nextClickHandler);
};

var animate = function() {
    isAnimationRunning = true;
    let FRAME_COUNT = 25,
        currentCount = 1;

    var startingImagePosition = -currentIndex * IMG_WIDTH,
        endingImagePosition = -nextIndex * IMG_WIDTH;

    //for animation we divide the transition into the number of frames that is defined
    var increment = (endingImagePosition - startingImagePosition) / FRAME_COUNT;

    //removing the evnet listeners before animation so that the user cant move during the animation
    removeEventListeners();

    var animateInterval = setInterval(function() {
        startingImagePosition += increment;

        images.style.left = startingImagePosition + "px";

        //if all the frames that needed to be calculated have
        //been rendered stop the animation and run the main loop
        if (currentCount === FRAME_COUNT) {
            //clear the current interval and start the main interval
            clearInterval(animateInterval);
            runMainInterval();
        }
        currentCount++;
    }, 20);
};

var animateTransition = function() {
    //for animation we clear the main interval and run the animation interval

    clearInterval(mainLoop);

    setInterval(animate(), 200);
};

var changeImage = function() {
    nextIndex = calculateNextIndex(currentIndex);
    animateTransition();
    currentIndex = nextIndex;
};

var navigationDots = document.getElementsByClassName("nav");
var drawDotNavigation = function() {
    for (let i = 0; i < navigationDots.length; i++) {
        if (i === currentIndex) {
            navigationDots[i].className = "navigation-li nav";
        } else {
            navigationDots[i].className = "navigation-li-active nav";
        }

        navigationDots[i].onclick = function() {
            if (!isAnimationRunning) {
                //setting the picture that need to be generated as the index of the image that was pressed
                nextIndex = i;
                animateTransition();
                currentIndex = nextIndex;
            }
        };
    }
};

var mainLoop;
var runMainInterval = function() {
    isAnimationRunning = false;
    //adding the event listeners
    addEventListeners();
    drawDotNavigation();
    mainLoop = setInterval(changeImage, 2000);
};

var createDotNavigation = function() {
    var mainContainer = document.getElementsByClassName("banner")[0];
    console.log(mainContainer);

    var dots = document.createElement("ul");

    for (var i = 0; i <= IMAGES_MAX_COUNT; i++) {
        var li = document.createElement("li");
        li.classList.add("nav");
        dots.appendChild(li);
    }
    dots.style.listStyleType = "none";
    dots.style.top = "440px";
    dots.style.left = "500px";
    dots.style.width = "100px";
    dots.style.height = "20px";
    dots.style.position = "absolute";
    mainContainer.appendChild(dots);
};

//creates the li and ul for the bottom navigation element
createDotNavigation();

//starts the main slider loop
runMainInterval();