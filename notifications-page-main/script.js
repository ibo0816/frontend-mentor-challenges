let output = document.querySelector("#unread_num");

function showUnReadNum() {
  let unreads = document.querySelectorAll(".unread");

  output.innerText = unreads.length;
}

function initializeButton() {
  let button = document.querySelector("button");

  button.addEventListener("click", function() {
    let unreads = document.querySelectorAll(".unread");
    unreads.forEach(function(unread){
      unread.classList.remove('unread');
    });
    showUnReadNum();
  });
}

function initializeArticle() {
  let unreads = document.querySelectorAll(".unread");
  unreads.forEach(function(unread) {
    unread.addEventListener("click", function(){
      this.classList.remove('unread');
      showUnReadNum();
    }, {once: true});
  })
}

showUnReadNum();
initializeButton();
initializeArticle();