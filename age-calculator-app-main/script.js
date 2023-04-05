const inputList = document.querySelectorAll("input");
const outputList = document.querySelectorAll(".calculated_age");
const submitBtn = document.querySelector("button");
const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const lightRed = "hsl(0, 100%, 67%)";

function cutBelowMaxLength(node) {
  if (node.value.length > node.maxLength){
    node.value = node.value.slice(0, node.maxLength);
  } 
}

function clearErrorMsg() {
  inputList.forEach(function(input){
    input.style.borderColor = "hsl(0, 0%, 86%)";
    input.previousElementSibling.style.color = "hsl(0, 1%, 44%)";
    input.nextElementSibling.style.display = "none";
    input.nextElementSibling.innerText = "";
  });
}

function checkEmpty() {
  let returnValue = false;
  inputList.forEach(function(input){
    if(input.value.length == 0){
      returnValue = true;
      showErrorMsg(input, "This field is required");
    }
  });
  return returnValue;
}

function checkInvalid(currentYear) {
  if(checkInvalidDayOrMonth(0, 1, 31)&&checkInvalidDayOrMonth(1, 1, 12)&&checkPastYear(currentYear)){
    return checkInvalidDate();
  }
  return false;
}

function checkInvalidDayOrMonth(index, start, end) {
  let input = inputList[index];
  if(input.value >= start && input.value <= end)
    return true;
  else {
    showErrorMsg(input, "Must be a valid " + input.name);
    return false;
  }
}

function checkPastYear(currentYear) {
  let year = inputList[2];
  if(year.value <= currentYear)
    return true;
  else {
    showErrorMsg(year, "Must be in the past");
    return false;
  }
}

function checkInvalidDate() {

}

function calculateAge() {

}

function showErrorMsg(input, msg) {
  input.style.borderColor = lightRed;
  input.previousElementSibling.style.color = lightRed;
  input.nextElementSibling.style.display = "block";
  input.nextElementSibling.innerText = msg;
}

inputList.forEach(function(input) {
  input.addEventListener("input", function(){
    cutBelowMaxLength(this);
  })
});

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  clearErrorMsg();
  if(!checkEmpty()){

    let currentDate = new Date();

    if(!checkInvalid(currentDate.getFullYear())){
      calculateAge();
    }
  }
})
