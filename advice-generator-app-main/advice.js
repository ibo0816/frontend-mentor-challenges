let button = document.querySelector("button");
let adviceID = document.querySelector("#advice_id");
let adviceP = document.querySelector("p");

function showRandomAdivce() {
  fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((data) => passToElement(data))
    .catch((error) => console.log(error));
}

function passToElement(data) {
  adviceID.innerText = data.slip.id;
  adviceP.innerText = data.slip.advice;
}

button.addEventListener("click", function() {
  showRandomAdivce();
})

showRandomAdivce();