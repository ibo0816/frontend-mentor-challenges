let menuOpen = document.getElementById("menu_btn");
let menuClose = document.getElementById("menu_close_btn");
let nav = document.getElementsByTagName("nav")[0];
let body = document.getElementsByTagName("body")[0];
let filter = document.getElementById("filter");

menuOpen.onclick = function() {
  nav.style.opacity = 1;
  nav.style.right = 0;
  filter.style.display = "block";
  body.style.overflow = "hidden";
};

menuClose.onclick = function() {
  nav.style.opacity = 0;
  nav.style.right = "-68%";
  filter.style.display = "none";
  body.style.overflow = "auto";
}