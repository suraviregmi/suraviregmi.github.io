class ToolProperties {
    constructor() {
        this.color = "#000";
        this.sizeInput = document.getElementById("size");
        this.sizeInput.addEventListener("change", () => {
            this.strokeSize = this.sizeInput.value;
        });
        this.canvas = document.getElementsByClassName("color-bar")[0];
        this.ctx = this.canvas.getContext("2d");
        var colorFrame = new Image();
        colorFrame.src =
            "http://2.bp.blogspot.com/_6ZIqLRChuQg/S2gHmfRGRoI/AAAAAAAAAdE/4SdZoVgu2pc/s320/rainbow.jpg";
        colorFrame.width = "200px";

        colorFrame.crossOrigin = "Anonymous";
        colorFrame.onload = () => {
            this.ctx.drawImage(colorFrame, 0, 0, 226, 200);
        };

        this.canvas.onmousemove = e => {
            var posX = e.clientX - this.canvas.getBoundingClientRect().left;
            var posY = e.clientY - this.canvas.getBoundingClientRect().top;
            var imgData = this.ctx.getImageData(posX, posY, 1, 1);
            this.canvas.addEventListener("click", e => {
                var value =
                    "rgb(" +
                    imgData.data[0] +
                    "," +
                    imgData.data[1] +
                    "," +
                    imgData.data[2] +
                    ")";
                //console.log(value);
                this.color = value;
            });
        };
    }
}