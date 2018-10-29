class MainPainter {
    constructor() {
        this.canvases = [];
        this.tracker = 0;
        //console.log("in Main painter");
        //console.log("current tool", currentTool);

        this.toolBox = new ToolBox();
        this.toolProperties = new ToolProperties();
        // console.log("i mmain ", this.tool);
        // to get coordinates

        //for mouse up

        //create layer
        let createLayer = document.getElementById("createLayer");

        createLayer.addEventListener("click", () => {
            // console.log("add layer");

            // console.log(svgContainer);
            svgContainer.style.backgroundColor = "white";
            let layer = new LayerElement(this.canvases.length);
            leftCol.appendChild(layer.element);
            svgCanvas.appendChild(layer.canvasLayer);
            leftCol.appendChild(layer.eye);
            this.canvases.push(layer);
            this.activeLayer = layer;
            this.history = [];

            for (let i = 0; i < this.canvases.length; i++) {
                this.canvases[i].element.setAttribute(
                    "class",
                    "inactiveLayerBlock"
                );
            }

            this.activeLayer.element.setAttribute("class", "activeLayerBlock");

            layer.element.innerHTML += " Layer " + this.tracker;
            layer.element.id = "Layer" + this.tracker;
            layer.eye.id = "eye" + this.tracker;
            layer.canvasLayer.id = "Canvas" + this.tracker;
            layer.canvasLayer.style.zIndex = this.tracker;
            this.tracker++;

            //make clicked layer active layer
            layer.element.addEventListener("click", event => {
                this.activeLayer = layer;
                //this.history.push(this.activeLayer.canvasLayer.toDataURL());

                for (let i = 0; i < this.canvases.length; i++) {
                    this.canvases[i].element.setAttribute(
                        "class",
                        "inactiveLayerBlock"
                    );
                }
                this.activeLayer.element.setAttribute(
                    "class",
                    "activeLayerBlock"
                );
            });

            //eye function
            layer.eye.addEventListener("click", event => {
                this.activeLayer = layer;
                //console.log("in eye clicked", this.activeLayer);
                //this.history.push(this.activeLayer.canvasLayer.toDataURL());

                console.log(
                    "before if ",
                    this.activeLayer.eye.getAttribute("class")
                );
                if (
                    this.activeLayer.eye.getAttribute("class") === "clickedEye"
                ) {
                    console.log("showing content");
                    //now show the content
                    this.activeLayer.canvasLayer.setAttribute("opacity", 1);
                    this.activeLayer.eye.setAttribute("class", "unclickedEye");
                } else {
                    //hide the content
                    console.log("hiding  content");
                    this.activeLayer.canvasLayer.setAttribute("opacity", 0);
                    console.log(this.activeLayer.canvasLayer);
                    this.activeLayer.eye.setAttribute("class", "clickedEye");
                }
            });

            //listen to tool click now

            svgCanvas.addEventListener("mousedown", event => {
                // console.log(
                //     "mousedown in layer current",
                //     this.activeLayer.canvasLayer
                // );
                stop = false;
                this.toolBox.currentTool.color = this.toolProperties.color;
                this.toolBox.currentTool.strokeWidth = this.toolProperties.sizeInput.value;

                if (this.toolBox.currentTool == this.toolBox.pencil)
                    this.toolBox.pencil.pencilFunction(
                        event,
                        this.activeLayer.canvasLayer
                    );

                if (this.toolBox.currentTool == this.toolBox.circle)
                    this.toolBox.circle.circleFunction(
                        event,
                        this.activeLayer.canvasLayer
                    );
                if (this.toolBox.currentTool == this.toolBox.rectangle)
                    this.toolBox.rectangle.rectangleFunction(
                        event,
                        this.activeLayer.canvasLayer
                    );
                if (this.toolBox.currentTool == this.toolBox.font)
                    this.toolBox.font.fontFunction(
                        event,
                        this.activeLayer.canvasLayer
                    );
                if (this.toolBox.currentTool == this.toolBox.curve)
                    this.toolBox.curve.curveFunction(
                        event,
                        this.activeLayer.canvasLayer
                    );
                if (this.toolBox.currentTool == this.toolBox.move)
                    this.toolBox.move.moveFunction(
                        event,
                        this.activeLayer.canvasLayer
                    );
                // console.log("clor and size", color, size);
            });
        });

        //     svgCanvas.addEventListener("mousedown", callDrawDrag);
        // });
        // let callDrawDrag = event => {
        //     mouseup = false;
        //     //console.log("called draw drag");
        //     drawDrag(this.activeLayer.canvasLayer);
        // };

        //delete layer
        let deleteLayer = document.getElementById("deleteLayer");
        deleteLayer.addEventListener("click", event => {
            // console.log("delete layer");
            if (this.canvases.length > 0) {
                leftCol.removeChild(this.activeLayer.element);
                leftCol.removeChild(this.activeLayer.eye);
                svgCanvas.removeChild(this.activeLayer.canvasLayer);
                this.canvases.splice(
                    this.canvases.indexOf(this.activeLayer),
                    1
                );
            }
            if (this.canvases.length != 0) {
                //set last layer as active
                this.activeLayer = this.canvases[this.canvases.length - 1];
                this.activeLayer.element.setAttribute(
                    "class",
                    "activeLayerBlock"
                );
            }
            if (this.canvases.length === 0) {
                console.log("no of canvases", this.canvases.length);
                svgContainer.style.backgroundColor = "transparent";

                console.log("set tot none", svgContainer);
            }
        });

        //undo
        let undo = document.getElementById("undo");
        undo.addEventListener("click", event => {
            let paths = 0;
            paths = this.activeLayer.canvasLayer.children;
            //console.log("clearing layer path ", paths);
            let len = paths.length;
            //console.log("no of paths", len);
            paths[len - 1].remove();
        });

        //clear current layer
        let clearCurrentLayer = document.getElementById("clearCurrentLayer");
        clearCurrentLayer.addEventListener("click", event => {
            this.activeLayer.canvasLayer.innerHTML = "";
        });
        // clear All canvases

        let clearAll = document.getElementById("clear");
        clearAll.addEventListener("click", function() {
            leftCol.innerHTML = "";
            svgCanvas.innerHTML = "";
            svgContainer.style.backgroundColor = "transparent";
        });

        //merge layers

        let mergeLayer = document.getElementById("mergeLayer");
        mergeLayer.addEventListener("click", event => {
            if (
                this.canvases.length > 1 &&
                this.canvases.length - 1 !=
                this.canvases.indexOf(this.activeLayer)
            ) {
                console.log("ciretira met");
                let selectedLayer = this.canvases[
                    this.canvases.indexOf(this.activeLayer) + 1
                ];
                console.log("layer to b edeleted", selectedLayer);
                console.log("active laer", this.activeLayer.canvasLayer);

                let cx = selectedLayer.canvasLayer;
                console.log("children are ", cx);

                this.activeLayer.canvasLayer.appendChild(cx);

                console.log("appended");

                leftCol.removeChild(selectedLayer.element);
                leftCol.removeChild(selectedLayer.eye);
                this.canvases.splice(this.canvases.indexOf(selectedLayer), 1);
            }
        });

        //eye tool
    }
}