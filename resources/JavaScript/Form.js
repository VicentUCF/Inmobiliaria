function Form(){
  addFormListeners();
}

export function loadForm() {
  return (
    '<form id="contact" class="m-3 col-6 justify-content-center  rounded p-4" action="index.html">' +
    '<h1><i class="fas fa-address-card me-2"></i>Contactanos</h1>' +
    '<div class="mb-3">' +
    '<label for="email" class="form-label">Email address<i class="fas fa-envelope ms-2 "></i></label>' +
    '<input type="email" class="form-control" id="email" placeholder="name@example.com" required>' +
    "</div>" +
    '<div class="mb-3">' +
    '<label for="comment" class="form-label">Comment<i class="fas fa-comments ms-2"></i></label>' +
    '<textarea class="form-control" id="comment" rows="3" required></textarea>' +
    "<h3 class='mt-2'>More Interests</h3>" +
    '<div class="m-3 row">' +
    '<div class="form-check col">' +
    '<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">' +
    '<label class="form-check-label" for="flexCheckDefault">' +
    "Homes" +
    "</label>" +
    "</div>" +
    '<div class="form-check col">' +
    '<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">' +
    '<label class="form-check-label" for="flexCheckDefault">' +
    "Apartaments" +
    "</label>" +
    "</div>" +
    '<div class="form-check col">' +
    '<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">' +
    '<label class="form-check-label" for="flexCheckDefault">' +
    "Garages" +
    "</label>" +
    "</div>" +
    "</div>" +
    '<button class="btn btn-primary mt-2" id="form-submit">Submit</button>' +
    "</form>" +
    "</div>"
  );
}

function validateEmail(email) {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(mailformat)) {
    email.className = "form-control is-valid";
    email.setCustomValidity("");
  } else {
    email.className = "form-control is-invalid";
    email.setCustomValidity("not a valid email");
  }
}

function validateComment(comment) {
  if (comment.value.length > 3) {
    comment.className = "form-control is-valid";
    comment.setCustomValidity("");
  } else {
    comment.className = "form-control is-invalid";
    comment.setCustomValidity("rellena este campo");
  }
}

function addFormListeners() {
  let button = document.getElementById('form-submit');
  button.onclick = () => validateForm();

  let email = document.getElementById("email");
  email.onclick = () => validateEmail(email);

  let comment = document.getElementById("comment");
  comment = () => validateComment(comment);
}

function validateForm() {
  event.preventDefault();
  let form = document.getElementById("contact");
  let email = document.getElementById("email");
  let comment = document.getElementById("comment");

  validateEmail(email);
  validateComment(comment);

  if (email.className.includes("is-valid") && comment.className.includes("is-valid")) {
    let interests = document.querySelectorAll(".form-check-input");
    let chekeds = 0;

    for (const interest in interests) {
      console.log(chekeds);
      if (interests[interest].checked) {
        chekeds++;
      }
    }

    chekeds >= 2
      ? form.submit()
      : Swal.fire({
          title: "You need to select 2 interests!",
          icon: "",
        });
  }
}

export default Form;
