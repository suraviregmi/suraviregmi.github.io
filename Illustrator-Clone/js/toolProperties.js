class ToolProperties {
    constructor() {
        this.color = "#000";
        this.sizeInput = document.getElementById("size");
        this.sizeInput.addEventListener("change", () => {
            this.strokeSize = this.sizeInput.value;
        });

        this.canvas = document.getElementsByClassName("color-bar")[0];

        this.ctx = this.canvas.getContext("2d");
        //console.log("canvas of clor bar", this.ctx);
        var colorFrame = new Image();
        //console.log("color bar ", colorFrame);
        colorFrame.src =
            "http://2.bp.blogspot.com/_6ZIqLRChuQg/S2gHmfRGRoI/AAAAAAAAAdE/4SdZoVgu2pc/s320/rainbow.jpg";
        colorFrame.width = "200px";

        colorFrame.crossOrigin = "Anonymous";
        colorFrame.onload = () => {
            this.ctx.drawImage(colorFrame, 0, 0, 226, 200);
        };
        // console.log("this ctxx", this.canvas);
        this.canvas.onmousemove = e => {
            // console.log("this ctxx", this.canvas);
            var posX = e.clientX - this.canvas.getBoundingClientRect().left;
            // console.log("xin canvas", posX);
            var posY = e.clientY - this.canvas.getBoundingClientRect().top;
            //console.log("yin canvas", posY);
            // console.log("ctx is ", this.ctx);
            var imgData = this.ctx.getImageData(posX, posY, 1, 1);
            //console.log("imgData", imgData);

            this.canvas.addEventListener("click", e => {
                var value =
                    "rgb(" +
                    imgData.data[0] +
                    "," +
                    imgData.data[1] +
                    "," +
                    imgData.data[2] +
                    ")";
                console.log(value);
                this.color = value;
            });
        };
    }
}