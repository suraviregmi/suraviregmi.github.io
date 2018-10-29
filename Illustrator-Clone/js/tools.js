class Pencil {
    constructor() {
        this.element = document.getElementById("pen-tool");
    }
    pencilFunction(event, layer) {
        //console.log("pencil function called");
        this.path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        this.path.setAttribute("fill", defaultFill);
        this.path.setAttribute("draggable", "true");
        this.path.setAttribute("stroke", this.color);
        this.path.setAttribute("stroke-width", this.strokeWidth);
        this.path.setAttribute("class", "draggable");
        this.path.setAttribute("d", "M" + cursor.x + " " + cursor.y + " ");
        layer.appendChild(this.path);

        this.refloop = setTimeout(() => {
            this.pencilDraw();
        }, 1);
    }
    pencilDraw() {
        //console.log("in pencil Draw");
        clearTimeout(this.refLoop);
        let d = this.path.getAttribute("d");
        d += "L" + cursor.x + " " + cursor.y + " ";
        this.path.setAttribute("d", d);
        // console.log("stop is ", stop);

        if (!stop) {
            //console.log("stop is in not stop", stop);

            this.refloop = setTimeout(() => {
                this.pencilDraw();
            }, 1);
        }
    }
}

class Circle {
    constructor() {
        this.element = document.getElementById("circle-tool");
    }
    circleFunction(event, layer) {
        //console.log("pencil function called");
        this.circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "ellipse"
        );
        this.circle.setAttribute("fill", defaultFill);
        //this.circle.setAttribute("fill", "none");
        this.circle.setAttribute("draggable", "true");
        this.circle.setAttribute("stroke", this.color);
        this.circle.setAttribute("stroke-width", this.strokeWidth);
        this.circle.setAttribute("class", "draggable");
        this.circle.setAttribute("cx", cursor.x);
        prev.x = cursor.x;
        this.circle.setAttribute("cy", cursor.y);
        prev.y = cursor.y;
        layer.appendChild(this.circle);

        this.refloop = setTimeout(() => {
            this.circleDraw();
        }, 1);
    }
    circleDraw() {
        //console.log("in pencil Draw");
        clearTimeout(this.refLoop);

        this.circle.setAttribute("rx", cursor.x - prev.x);
        this.circle.setAttribute("ry", cursor.y - prev.y);
        //console.log("stop is ", stop);

        if (!stop) {
            //console.log("stop is in not stop", stop);

            this.refloop = setTimeout(() => {
                this.circleDraw();
            }, 1);
        }
    }
}

class Rectangle {
    constructor() {
        this.element = document.getElementById("rect-tool");
    }
    rectangleFunction(event, layer) {
        //console.log("pencil function called");
        this.rectangle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
        );
        this.rectangle.setAttribute("fill", defaultFill);
        //this.rectangle.setAttribute("fill", "none");
        this.rectangle.setAttribute("draggable", "true");
        this.rectangle.setAttribute("stroke", this.color);
        this.rectangle.setAttribute("stroke-width", this.strokeWidth);
        this.rectangle.setAttribute("class", "draggable");
        this.rectangle.setAttribute("x", cursor.x);
        prev.x = cursor.x;
        this.rectangle.setAttribute("y", cursor.y);
        prev.y = cursor.y;
        layer.appendChild(this.rectangle);

        this.refloop = setTimeout(() => {
            this.rectangleDraw();
        }, 1);
    }
    rectangleDraw() {
        //console.log("in pencil Draw");
        clearTimeout(this.refLoop);

        this.rectangle.setAttribute("width", cursor.x - prev.x);
        this.rectangle.setAttribute("height", cursor.y - prev.y);
        //console.log("stop is ", stop);

        if (!stop) {
            //console.log("stop is in not stop", stop);

            this.refloop = setTimeout(() => {
                this.rectangleDraw();
            }, 1);
        }
    }
}

class Font {
    constructor() {
        this.element = document.getElementById("font");
    }
    fontFunction(event, layer) {
        svgCanvas.onclick = () => {
            let message = prompt("Text here", "");

            this.text = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );
            // text.setAttribute("fill", "none");
            this.text.setAttribute("stroke", this.color);
            this.text.setAttribute("font-size", this.strokeWidth);
            this.text.setAttribute("x", cursor.x);
            this.text.setAttribute("y", cursor.y);
            this.text.setAttribute("fill", defaultFill);
            this.text.setAttribute("class", "draggable");
            this.text.innerHTML = message;
            layer.appendChild(this.text);

            console.log("removed in this.text");
        };
    }
}

class Move {
    constructor() {
        this.element = document.getElementById("hand");
    }
    moveFunction(evt, layer) {
        let selectedElement = false;
        let transform;

        svgCanvas.onmousedown = () => {
            let offsetX = cursor.x;
            let offsetY = cursor.y;
            console.log("offsetand cursor", offsetX, cursor);
            // console.log("OFFFFFFFFFFFFFFFFFFFFFFFFFFFFSET", offset);
            // console.log("in movepath", evt.target);
            if (evt.target.classList.contains("draggable")) {
                console.log("dragable");

                this.selectedElement = evt.target;
                console.log("selected path", this.selectedElement);

                let transforms = this.selectedElement.transform.baseVal;
                console.log("transforms", transforms);

                if (
                    transforms.length === 0 ||
                    transforms.getItem(0).type !==
                    SVGTransform.SVG_TRANSFORM_TRANSLATE
                ) {
                    // Create an transform that translates by (0, 0)
                    let translate = svgCanvas.createSVGTransform();
                    translate.setTranslate(0, 0);
                    // Add the translation to the front of the transforms list
                    this.selectedElement.transform.baseVal.insertItemBefore(
                        translate,
                        0
                    );
                }
                transform = transforms.getItem(0);
                offsetX -= transform.matrix.e;
                offsetY -= transform.matrix.f;
                console.log("offsetand cursor", offsetX, cursor);
            }
            svgCanvas.addEventListener(
                "mousemove",
                this.drag(transform, offsetX, offsetY)
            );
            svgCanvas.addEventListener(
                "mouseup",
                this.endDrag(this.selectedElement)
            );
        };
    }

    drag(transform, offsetX, offsetY) {
        console.log("in start drag");
        console.log(offsetX, offsetY);
        console.log(cursor.x, cursor.y);
        transform.setTranslate(cursor.x - offsetX, cursor.y - offsetY);
        //selectedElement.removeEventListener("mousemove", drag);
    }
    endDrag(selectedElement) {
        selectedElement = null;
        svgCanvas.removeEventListener("mousemove", this.drag);
        console.log("in end drag");
        //svgCanvas.removeEventListener("mousedown", startDrag);
    }
}

class Curve {
    constructor() {
        this.element = document.getElementById("curve-tool");
    }
    curveFunction(event, layer) {
        this.mouseDown(event, layer);
    }
    mouseDown(evt, layer) {
        // console.log("in mouse doen in curve");

        if (evt.target.classList[0] === "dragging") {
            console.log("in dragging ");
            svgCanvas.removeEventListener("click", this.mouseClick(evt, layer));
            console.log("in dragging  removed click");
            let draggingAreaToMove = evt.target;
            let circleToMove = draggingAreaToMove.previousElementSibling;

            let groupToMove = evt.target.parentNode;
            let child = groupToMove.childNodes;
            let indexToMove = 3;
            for (let i = 0; i < groupToMove.childNodes.length; i++) {
                if (circleToMove === child[i]) {
                    //get the index of the path to move
                    indexToMove = i - 1;
                    console.log("index to move ", indexToMove);
                }
            }

            if (groupToMove.getElementsByClassName("first-marker")[0]) {
                console.log("path t redraw");
                this.pathToRedraw = child[indexToMove];
            }
            svgCanvas.addEventListener(
                "mousemove",
                this.movePoint(
                    evt,
                    draggingAreaToMove,
                    circleToMove,
                    this.pathToRedraw
                )
            );
            svgCanvas.addEventListener(
                "mouseup",
                this.mouseUp(
                    evt,
                    circleToMove,
                    draggingAreaToMove,
                    this.pathToRedraw
                )
            );
        }
        svgCanvas.addEventListener("click", this.mouseClick(evt, layer));

        //console.log("emoved svg canvas read in ebzier curve");
    }
    mouseUp(evt, circleToMove, draggingAreaToMove, pathToRedraw) {
        console.log("in mouseup");

        circleToMove.style.fill = "none";

        svgCanvas.removeEventListener(
            "mousemove",
            this.movePoint(evt, draggingAreaToMove, circleToMove, pathToRedraw)
        );
        svgCanvas.removeEventListener(
            "mouseup",
            this.mouseUp(evt, circleToMove, draggingAreaToMove, pathToRedraw)
        );
        console.log("removed mouseup and move");
        svgCanvas.removeEventListener("click", this.mouseClick(evt, layer));
        console.log("removed click");
    }
    movePoint(evt, draggingAreaToMove, circleToMove, pathToRedraw) {
        //console.log("move Point", draggingAreaToMove);

        draggingAreaToMove.setAttribute("cx", cursor.x);
        draggingAreaToMove.setAttribute("cy", cursor.y);
        console.log("move Point", draggingAreaToMove);
        circleToMove.setAttribute("cx", cursor.x);
        circleToMove.setAttribute("cy", cursor.y);
        console.log("move Point", circleToMove);
        circleToMove.style.fill = "#49c";

        this.redrawPath(
            pathToRedraw,
            cursor,
            circleToMove.getAttribute("class")
        );
    }

    mouseClick(evt, layer) {
        console.log("click", clickcount);
        clickcount++;
        svgCanvas.removeEventListener("click", this.mouseClick);
        //console.log("removed click");

        switch (pointsCounter) {
            case 0:
                // Create new group of points
                if (document.getElementById("currentGroup")) {
                    document
                        .getElementById("currentGroup")
                        .removeAttribute("id");
                }
                let myGroup = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "g"
                );

                myGroup.setAttribute("id", "currentGroup");
                myGroup.setAttribute("class", "draggable");
                console.log("layer", layer);
                layer.appendChild(myGroup);
                // Draw first point and add it to the current group
                this.drawPoint(cursor.x, cursor.y, "first-anchor");
                prev.x = cursor.x;
                prev.y = cursor.y;
                firstBezierPoint.x = cursor.x;
                firstBezierPoint.y = cursor.y;
                pointsCounter++;
                break;
            case 1:
                // Draw second point
                this.drawPoint(cursor.x, cursor.y, "second-anchor");

                midpoint.x = (cursor.x + prev.x) / 2;
                midpoint.y = (cursor.y + prev.y) / 2;
                //draw control point

                //draw path
                this.drawPathQuadratic(
                    prev.x,
                    prev.y,
                    midpoint.x,
                    midpoint.y,
                    cursor.x,
                    cursor.y,
                    "quadratic-path"
                );
                this.drawPoint(
                    (cursor.x + prev.x) / 2,
                    (cursor.y + prev.y) / 2,
                    "first-marker"
                );
                //draw draggaalbe control point
                this.drawPoint(
                    (cursor.x + prev.x) / 2,
                    (cursor.y + prev.y) / 2,
                    "dragging"
                );

                prev.x = cursor.x;
                prev.y = cursor.y;
                //check if the endpoint is near to 1st point
                if (
                    Math.abs(cursor.x - firstBezierPoint.x) < 5 &&
                    Math.abs(cursor.y - firstBezierPoint.y) < 5
                ) {
                    console.log(
                        "EWUAL BHAYO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
                    );
                    let lencircle = document
                        .getElementById("currentGroup")
                        .getElementsByTagName("circle").length;
                    //console.log(lencircle);
                    for (let i = 0; i < lencircle; i++) {
                        //remove all dots to form group
                        document
                            .getElementById("currentGroup")
                            .removeChild(
                                document
                                .getElementById("currentGroup")
                                .getElementsByTagName("circle")[0]
                            );
                    }
                    let myPath = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                    );
                    let g = document.getElementById("currentGroup");
                    let data =
                        "M" +
                        firstBezierPoint.x +
                        " " +
                        firstBezierPoint.y +
                        " " +
                        "L " +
                        cursor.x +
                        " " +
                        cursor.y +
                        " ";

                    myPath.setAttribute("d", data);
                    myPath.setAttribute("fill", defaultFill);
                    myPath.setAttribute("class", "linear-path");
                    g.appendChild(myPath);

                    //set to draw a new path
                    pointsCounter = 0;
                }

                break;
        }
    }
    drawPoint(x, y, classToSet) {
        let myCircle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        let g = document.getElementById("currentGroup");
        myCircle.setAttribute("cx", x);
        myCircle.setAttribute("cy", y);
        myCircle.setAttribute("r", this.strokeWidth);
        myCircle.setAttribute("class", classToSet);

        g.appendChild(myCircle);
    }
    drawPathQuadratic(firstX, firstY, cpX, cpY, lastX, lastY, classToSet) {
        let segments = [];
        let seg = "M" + firstX + "," + firstY;

        seg = seg + " Q" + " " + cpX + " " + cpY + " ";
        segments.push(seg);

        seg = lastX + "," + lastY;
        segments.push(seg);
        //console.log("in segments", segments);
        let data = segments.join(" ");
        //console.log("in data", data);
        let myPath = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        let g = document.getElementById("currentGroup");
        myPath.setAttribute("d", data);
        myPath.setAttribute("class", classToSet);
        myPath.setAttribute("stroke", this.color);
        myPath.setAttribute("stroke-width", this.strokeWidth);
        myPath.setAttribute("fill", defaultFill);
        myPath.setAttribute("stroke-linecap", "round");
        g.appendChild(myPath);
    }
    redrawPath(pathToRedraw, newCoords, pointToChange) {
        let segments = pathToRedraw.getAttribute("d");

        let newX = newCoords.x;
        let newY = newCoords.y;

        let pointsArr = segments.split(" ");
        for (let i = 0; i < 5; i++) {
            if (i === 2) {
                pointsArr[i] = newX.toString();
            }
            if (i === 3) {
                pointsArr[i] = newY.toString();
            }
        }
        // console.log("pointsArrafter new cp", pointsArr);
        let joinedsegment = pointsArr.join(" ");
        //console.log("joiined segment", joinedsegment);
        pathToRedraw.setAttribute("d", joinedsegment);
    }
}