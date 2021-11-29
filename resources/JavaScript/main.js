var tipo = "all";
var productes;
var posicionActual = 0;
var interval;


window.onload = () => {
  let all_btn = document.getElementById("all");
  let homes_btn = document.getElementById("homes");
  let apartaments_btn = document.getElementById("apartaments");
  let garages_btn = document.getElementById("garages");
  

  fetch("https://vicentucf.github.io/Inmobiliaria/resources/inmobiliaria.json")
    
    .then((resp) => {
      return resp.json();
    })
    .then((resposta) => {
      setListeners(resposta);
      productes = resposta;

      all_btn.onclick = function () {
        tipo = "all";
        loadProducts(resposta, "all");
      };
      homes_btn.onclick = function () {
        tipo = "home";
        loadProducts(resposta, "home");
      };

      apartaments_btn.onclick = function () {
        tipo = "apartament";
        loadProducts(resposta, "apartament");
      };

      garages_btn.onclick = function () {
        tipo = "garage";
        loadProducts(resposta, "garage");
      };
      
      loadProducts(resposta, "all",true);
    });
};

function setListeners() {
  let price_up = document.getElementById("price_up");
  let price_down = document.getElementById("price_down");

  let m2_up = document.getElementById("m2_up");
  let m2_down = document.getElementById("m2_down");

  let buscar = document.getElementById("buscar");
  let elementToFind = document.getElementById("elementToFind");

  buscar.onclick = function () {
    let buscant = elementToFind.value;

    const resultado = productes.filter((product) =>
      product.title.toLowerCase().includes(buscant.toLowerCase())
    );

    if (resultado.length > 0) {
      loadProducts(resultado, "all");
    } else {
      Swal.fire({
        title: "Element not Found!",
        icon: "question",
      });
    }
  };

  price_up.onclick = function () {
    productes.sort((a, b) => a.price < b.price);
    loadProducts(productes, tipo);
  };
  price_down.onclick = function () {
    productes.sort((a, b) => a.price > b.price);
    loadProducts(productes, tipo);
  };
  m2_up.onclick = function () {
    productes.sort((a, b) => a.services.m2 < b.services.m2);
    loadProducts(productes, tipo);
  };
  m2_down.onclick = function () {
    productes.sort((a, b) => a.services.m2 > b.services.m2);
    loadProducts(productes, tipo);
  };
}

function loadProducts(inmuebles, tipo, destacados = false) {
  let content = document.getElementById("content");

  content.innerHTML = "";
  
  if(destacados){ 
    loadDestcados(inmuebles,'all'); 
    content.innerHTML += "<p class='bg-dark text-light d-flex justify-content-center'>All producs</p>"
  }

  for (const inmueble of inmuebles) {
    if (tipo == "all" || inmueble.features.type == tipo) {
      let card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("m-3");
      card.classList.add("col-sm-1");
      card.style.width = " 18rem";
      card.innerHTML += loadProduct(
        inmueble.title,
        inmueble.services,
        inmueble.description,
        inmueble.price,
        inmueble.features
      );
      content.appendChild(card);
      knowMoreBtn(inmueble.features.id);
    }
  }
}

function loadDestcados(inmuebles){
  let destacados = Array();
  
  do{
    index = getRandomInt(0,inmuebles.length);
  if (!destacados.includes(inmuebles[index])){
    destacados.push(inmuebles[index]);
  }
  }while(destacados.length < 3);
  loadProducts(destacados,'all');
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loadProduct(title, services, description, price, features) {
  let id = features.id;
  loadServices(services);
  return (
    '<img src="./resources/imgs/inmuebles/' +
    features.img[0] +
    '" class="card-img-top mt-1" height="180px" />' +
    '<div class="card-body">' +
    '<h5 class="card-title" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">' +
    title +
    "</h5>" +
    '<p class="card-text" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">' +
    description +
    "</p>" +
    "</div>" +
    '<ul class="list-group list-group-flush">' +
    loadServices(services) +
    "</ul>" +
    '<div class="card-footer d-flex justify-content-between">' +
    '<p style="color:#e2c044;margin-top:10px;">' +
    Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
      price
    ) +
    "</p>" +
    '<button class="btn" style="background-color: #587B7F; color:white" id="' +
    id +
    '">Saber Mas</button>' +
    "</div>"
  );
}

function knowMoreBtn(inmueble) {
  let btn = document.getElementById(inmueble);

  btn.addEventListener("click", function () {
    const resultado = productes.find(
      (product) => product.features.id === inmueble
    );

    let content = document.getElementById("content");
    content.innerHTML = knowMore(resultado);

    let imagenes = resultado.features.img;

    clearInterval(interval);
    contactBTN();
    showImg(imagenes);
    play(imagenes);
  });
}

function contactBTN() {
  let btn = document.getElementById("btn-contact");
  btn.addEventListener("click", function () {
    let content = document.getElementById("content");
    content.innerHTML = loadForm();
    addFormListeners();
  });
}

function knowMore(product) {
  return (
    '<div class="m-1 d-flex justify-content-center">' +
    '<div class="card col-10">' +
    '<div class="row">' +
    printCarrusel() +
    '<div class="col-lg-6">' +
    '<div class="ms-2 card-body">' +
    '<h3 class="card-text mt-3">' +
    Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
      product.price
    ) +
    "</h3>" +
    '<ul class="d-inline-flex"style="color:#e2c044">' +
    '<li class="row me-2"><h5><i class="fa fa-shower"></i> ' +
    product.services.bathrooms +
    " bath.</h5></li>" +
    '<li class="row me-2"><h5><i class="fa fa-bed"></i> ' +
    product.services.bedrooms +
    " bed.</h5></li>" +
    '<li class="row me-2"><h5><i class="fa fa-cube"></i> ' +
    product.services.m2 +
    "m²</h5></li>" +
    "</ul> " +
    '<h3 class="card-title">' +
    product.title +
    "</h3> " +
    '<p class="card-text">' +
    product.description +
    "</p>" +
    '<div class="me-4" style="border:2px solid white;"></div>' +
    "<div col-lg-12>" +
    "<h2>Caracteristicas</h2>" +
    "<ul>" +
    '<li class="row me-2"><h5><i class="fa fa-home me-1"></i>Tipo de inmueble: ' +
    product.features.type +
    "</h5></li>" +
    '<li class="row me-2"><h5><i class="fa fa-cube me-1"></i>Antiguedad: ' +
    product.features.antiquity +
    "</h5></li>" +
    "</ul>" +
    "</div>" +
    "</div>" +
    ' <div class="card-footer d-flex">' +
    '<button class="btn btn-primary me-2" id="btn-contact">' +
    "Contact" +
    "</button>" +
    '<button class="btn btn-danger" onClick="window.location.reload();">' +
    "Return" +
    "</button>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>"
  );
}

function loadForm() {
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
    '<button class="btn btn-primary mt-2" onclick="validateForm()">Submit</button>' +
    "</form>" +
    "</div>"
  );
}

function validateEmail(email){
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(mailformat)) {
    email.className = "form-control is-valid";
    email.setCustomValidity("");
  } else {
    email.className = "form-control is-invalid";
    email.setCustomValidity("not a valid email");
  }
}

function validateComment(comment){
   if (comment.value.length > 3) {
     comment.className = "form-control is-valid";
     comment.setCustomValidity("");
   } else {
     comment.className = "form-control is-invalid";
     comment.setCustomValidity("rellena este campo");
   }
}

function addFormListeners(){
  let email = document.getElementById("email");
  email.addEventListener("change", function () {
    validateEmail(email);
  });
  let comment = document.getElementById("comment");
  comment.addEventListener("change", function () {
    validateComment(comment);
  }); 
}

function validateForm() {
  event.preventDefault();
  let form = document.getElementById("contact");
  let email = document.getElementById("email");
  let comment = document.getElementById("comment");

  validateEmail(email);
  validateComment(comment);
  

  if (email.className.includes('is-valid') && (comment.className.includes('is-valid'))) {
    let interests = document.querySelectorAll(".form-check-input");
    let chekeds = 0;

    for (const interest in interests) {
      console.log(chekeds);
      if (interests[interest].checked) {
        chekeds++;
      }
    }

    if (chekeds >= 2) {
      form.submit();
    }else{
      Swal.fire({
        title: "You need to select 2 interests!",
        icon: "",
      });
    }
  }
}

function loadServices(services) {
  let icon = "";
  let lista = "";
  for (const service in services) {
    switch (service) {
      case "bedrooms":
        icon = "fa fa-bed";
        break;
      case "bathrooms":
        icon = "fa fa-bath";
        break;
      case "m2":
        icon = "fa fa-cube";
        break;
      case "floors":
        icon = "fa fa-bed";
        break;
      default:
        icon = "fa fa-bed";
        break;
    }

    lista +=
      '<li class="list-group-item"><i class="' +
      icon +
      '" style="margin-right:10px"></i>' +
      services[service] +
      " " +
      service +
      "</li>";
  }

  return lista;
}

function printCarrusel() {
  return (
    '<div class="col-lg-6">' +
    '<img id="imagen" class="card-img-top img-fluid carrusel-img"></img>' +
    "</div>"
  );
}

function play(imagenes) {
  let imagen = document.querySelector("#imagen");
  if (imagen != null) {
    interval = setInterval(function () {
      nextPhoto(imagenes);
    }, 4000);
  }
}

function nextPhoto(imagenes) {
  if (posicionActual >= imagenes.length - 1) {
    posicionActual = 0;
  } else {
    posicionActual++;
  }
  showImg(imagenes);
}

function showImg(imagenes) {
  let imagen = document.querySelector("#imagen");
  if (imagen != null) {
    imagen.src = "./resources/imgs/inmuebles/" + imagenes[posicionActual];
  }
}
