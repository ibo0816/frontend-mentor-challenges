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

function checkValid(currentDate) {
  let dayValidation = checkValidDayOrMonth(0, 1, 31);
  let monthValidation = checkValidDayOrMonth(1, 1, 12);
  let yearValidation = checkPastYear(currentDate);

  if(dayValidation&&monthValidation&&yearValidation){
    return checkValidDate();
  }
  return false;
}

function checkValidDayOrMonth(index, start, end) {
  let input = inputList[index];
  if(input.value >= start && input.value <= end)
    return true;
  else {
    showErrorMsg(input, "Must be a valid " + input.name);
    return false;
  }
}

function checkPastYear(currentDate) {
  let year = inputList[2];
  let month = inputList[1];
  let day = inputList[0];
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();

  if(year.value < currentYear)
    return true;
  else if (year.value == currentYear && month.value < currentMonth)
    return true;
  else if (year.value == currentYear && month.value == currentMonth && day.value <= currentDay)
    return true;
  else {
    showErrorMsg(year, "Must be in the past");
    return false;
  }
}

function checkValidDate() {
  let year = inputList[2].value;
  let month = inputList[1].value;
  let day = inputList[0].value;
  let leapDay = 0;

  if (month == 2 && year % 4 == 0)
    leapDay++;

  if(day <= days[month - 1] + leapDay)
    return true;
  else {
    showErrorMsg(inputList[0], "Must be a valid date");
    return false;
  }
  
}

function calculateAge(currentDate) {
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();
  let leapDay = 0;
  let result = 0;

  if (inputList[2].value % 4 == 0 && inputList[1].value == 2)
    leapDay++;

  result = currentDay - inputList[0].value;
  if (result < 0){
    result += (days[inputList[1].value - 1] + leapDay);
    currentMonth--;
  }
  outputList[2].innerText = result;

  result = currentMonth - inputList[1].value;
  if (result < 0){
    result += 12;
    currentYear--;
  }
  outputList[1].innerText = result;

  outputList[0].innerText = currentYear - inputList[2].value;
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
    if(checkValid(currentDate)){
      calculateAge(currentDate);
    }
  }
})
