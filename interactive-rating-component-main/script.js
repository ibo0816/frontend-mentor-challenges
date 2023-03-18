function changeScreen() {
  let rbtns = document.getElementsByName("rate");

  for (let i = 0; i < rbtns.length; i++){
    if(rbtns[i].checked){
      let output = document.getElementById("u_input");
      let rating = document.getElementById("rating");
      let thank = document.getElementById("thank");

      output.innerText = rbtns[i].value;
      rating.style.display = "none";
      thank.style.display = "block";
      return;
    }
  }

  alert('No item selected');
}