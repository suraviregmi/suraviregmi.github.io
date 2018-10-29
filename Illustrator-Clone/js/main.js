let svgCanvas = document.getElementById("SVG");
let leftCol = document.getElementById("leftCol");
let svgContainer = document.getElementById("svgContainer");
let cursor = {
    x: 0,
    y: 0
};
let prev = {
    x: 0,
    y: 0
};
// to get the chanage in position
let del = {
    x: 0,
    y: 0
};

let firstBezierPoint = {
    x: 0,
    y: 0
};
let midpoint = {
    x: 0,
    y: 0
};
let mouseup,
    stop,
    clickcount = 0,
    pointsCounter = 0;
let defaultFill = "transparent";
document.onmousemove = e => {
    //console.log("in mouse moving");

    del.x = e.pageX - cursor.x - svgCanvas.getBoundingClientRect().left;
    del.y = e.pageY - cursor.y - svgCanvas.getBoundingClientRect().top;
    // del.x = e.pageX - cursor.x - 76;
    // del.y = e.pageY - cursor.y - 60;

    cursor.x += del.x;
    console.log("X", cursor.x);
    cursor.y += del.y;
    console.log("y", cursor.y);
};

svgCanvas.addEventListener("mouseup", () => {
    //console.log("mouseup");
    //console.log("path2", path);
    mouseup = true;
    //console.log("mouseup");
    stop = true;
    //console.log("mouseup", stop);
});

window.onload = () => {
    let painter = new MainPainter();
};