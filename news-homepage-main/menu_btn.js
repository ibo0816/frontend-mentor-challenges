
let menuOpen = document.getElementById("menu_btn");
let menuClose = document.getElementById("menu_close_btn");
let nav = document.getElementsByTagName("nav")[0];
let filter = document.getElementById("filter");

function moveNavAndFilter(rightV, translateV){
  nav.style.right = rightV;
  filter.style.transform = translateV;
}

menuOpen.onclick = function() {
  moveNavAndFilter(0, "none");
};

menuClose.onclick = function() {
  moveNavAndFilter("-68%", "translateX(100%)");
}

filter.onclick = function() {
  moveNavAndFilter("-68%", "translateX(100%)");
}