var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

//console.log("i is", i);
//console.log("i is", dropdown);

for (var j = 0; j < dropdown.length; j++) {
    dropdown[j].addEventListener("click", function() {
        for (i = 0; i < dropdown.length; i++) {
            //console.log("dropdown i", dropdown[0], i);
            this.classList.toggle("active");

            var dropdownContent = this.nextElementSibling;

            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        }
    });
}