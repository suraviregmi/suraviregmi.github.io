var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
	dropdown[i].addEventListener("click", function() {
		this.classList.toggle("active");

		var dropdownContent = this.nextElementSibling;
		if (dropdownContent.style.display === "block") {
			dropdownContent.style.display = "none";
		} else {
			dropdownContent.style.display = "block";
		}
	});
}

var menuButton = document.getElementsByClassName("burger-icon")[0];
var lowerMenu = document.getElementsByClassName("ht-lower")[0];
menuButton.addEventListener("click", function() {
	if (lowerMenu.style.display === "none") {
		lowerMenu.style.display = "block";
	} else {
		lowerMenu.style.display = "none";
	}
});
