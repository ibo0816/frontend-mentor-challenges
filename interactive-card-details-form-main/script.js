let cardInfo = [
  {
    input: document.querySelector("#input_name"),
    output: document.querySelector("#cardholder_name"),
    default: "Jane Appleseed",
    error: document.querySelector("#input_name + p"),
    valid: true
  },
  {
    input: document.querySelector("#input_num"),
    output: document.querySelector("#card_num"),
    default: "0000 0000 0000 0000",
    error: document.querySelector("#input_num + p"),
    valid: true
  },
  {
    input: document.querySelector("#input_month"),
    output: document.querySelector("#month"),
    default: "00",
    error: document.querySelectorAll("#last_line_input p")[0],
    valid: true
  },
  {
    input: document.querySelector("#input_year"),
    output: document.querySelector("#year"),
    default: "00",
    error: document.querySelectorAll("#last_line_input p")[0],
    valid: true
  },
  {
    input: document.querySelector("#input_cvc"),
    output: document.querySelector("#cvc"),
    default: "000",
    error: document.querySelectorAll("#last_line_input p")[1],
    valid: true
  }
];

let confirmBtn = document.querySelector("#input button");
let form = document.querySelector("#input");
let completed = document.querySelector("#completed");
let continueBtn = document.querySelector("#completed button");

function showInput(node) {
  node.output.innerText = node.input.value;

  if(node.input.value.length == 0){
    node.output.innerText = node.default;
  }
}

function checkCardNum(input) {
  let str = input.value;
  if (str.length % 5 == 0 && str.length != 0){
    if(str[str.length - 1] == " "){
      str = str.slice(0, str.length - 1);
    }
    else {
      str = str.slice(0, str.length - 1) + " " + str.slice(str.length - 1);
    }
  }
  input.value = str;
}

cardInfo.forEach(function(node, index){
  if (index == 1)
    node.input.addEventListener("input", function() {
      checkCardNum(this);
      showInput(node);
    });
  else
    node.input.addEventListener("input", function() {
      showInput(node);
    });
});

function checkEmpty(node) {
  if (node.input.value.length == 0){
    node.valid = false;
    showErrorMsg(node, "Can't be blank")
    return false;
  }
  return true;
}

function initialize(node) {
  node.input.style.borderColor = "hsl(270, 3%, 87%)";
  node.error.innerText = "";
  node.valid = true;
}

function showErrorMsg(node, msg) {
  node.input.style.borderColor = "hsl(0, 100%, 66%)";
  node.error.innerText = msg;
}

function checkLength(node, index) {
  let maxLength = node.input.maxLength;
  if (index == 1)
    maxLength -= 3;

  if (node.input.value.length != node.input.maxLength){
    node.valid = false;
    showErrorMsg(node, "Must be " + maxLength + " digits");
    return false;
  }
  return true;
}

function checkOnlyNumber(node, index) {
  let input = node.input.value;
  if (index == 1)
    input = input.slice(0, 4) + input.slice(5, 9) + input.slice(10, 14) + input.slice(16);

  if(isNaN(input)){
    showErrorMsg(node, "Wrong format, numbers only");
    node.valid = false;
    return false;
  }
  return true;
}

function checkValidNumber(node, index) {
  let range = [
    {
      start: 1,
      end: 12
    },
    {
      start: 23,
      end: 99
    }
  ];

  let input = node.input.value;
  if (input < range[index - 2].start || input > range[index - 2].end){
    showErrorMsg(node, "Invalid number");
    node.valid = false;
  }
}

function showCompleted(){
  cardInfo.forEach(function(node){
    node.input.value = "";
  });

  form.style.display = "none";
  completed.style.display = "block";
}

function showForm() {
  form.style.display = "block";
  completed.style.display = "none";
}

confirmBtn.addEventListener("click", function(event) {

  event.preventDefault();

  cardInfo.forEach(function(node){
    initialize(node);
  });

  cardInfo.forEach(function(node, index) {
    if(checkEmpty(node) && index != 0)
      if(checkLength(node, index))
        if(checkOnlyNumber(node, index) && (index == 2 || index == 3))
          checkValidNumber(node, index);
  });

  let valid = true;
  cardInfo.forEach(function(node) {
    valid = valid && node.valid;
  });

  if(valid){
    showCompleted();
  }
});

continueBtn.addEventListener("click", function(event){
  event.preventDefault();

  showForm();
  cardInfo.forEach(function(node) {
    showInput(node);
  })
});