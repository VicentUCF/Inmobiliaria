var tipo = "all";
var productes;

window.onload = () => {
  let all_btn = document.getElementById("all");
  let homes_btn = document.getElementById("homes");
  let apartaments_btn = document.getElementById("apartaments");
  let garages_btn = document.getElementById("garages");

  fetch("/resources/inmobiliaria.json")
    //https://vicentucf.github.io/Inmobiliaria
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

      loadProducts(resposta, "all");
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

    loadProducts(resultado, "all");
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

function loadProducts(inmuebles, tipo) {
  let content = document.getElementById("content");
  content.innerHTML = "";
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

function loadProduct(title, services, description, price, features) {
  let id = features.id;
  loadServices(services);
  return (
  
    '<img src="/resources/imgs/' +
    features.img +
    '" class="card-img-top mt-1" height="180px" />' +
    '<div class="card-body">' +
    '<h5 class="card-title" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">' +
    title +
    '</h5>' +
    '<p class="card-text" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">' +
    description +
    '</p>' +
    '</div>' +
    '<ul class="list-group list-group-flush">' +
    loadServices(services) +
    '</ul>' +
    '<div class="card-footer d-flex justify-content-between">' +
    '<p style="color:#e2c044;margin-top:10px;">' +
    Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price) +
    '</p>'+ 
    '<button class="btn" style="background-color: #587B7F; color:white" id="'+ id +'">Saber Mas</button>' +
    '</div>' 
  );
  
}

function knowMoreBtn(inmueble) {

    let btn = document.getElementById(inmueble);

    btn.addEventListener('click', function(){
       const resultado = productes.find(
         (product) => product.features.id === inmueble
       );

       let content = document.getElementById("content");
       content.innerHTML = knowMore(resultado);
       contactBTN();
    });
}

function contactBTN() {
  let btn = document.getElementById("btn-contact");
  btn.addEventListener("click", function () {
    let content = document.getElementById("content");
    content.innerHTML = loadForm();
  });
}

function knowMore(product) {
  return (
    '<div class="m-1 d-flex justify-content-center">' +
    '<div class="card col-10">' +
    '<div class="row">' +
    '<div class="col-lg-6">' +
    '<img src="/resources/imgs/' +
    product.features.img +
    '" class="img-fluid" style="width=800px;heigth:500px">' +
    "</div>" +
    '<div class="col-lg-6">' +
    '<div class="ms-2 card-body">' +
    '<h3 class="card-text mt-3">' +
    Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
      product.price
    ) +
    "</h3>" +
    "<div>" +
    '<ul class="d-inline-flex">' +
    '<li class="row me-2"><h5><i class="fa fa-shower"></i> ' +
    product.services.bathrooms +
    " bath</h5></li>" +
    '<li class="row me-2"><h5><i class="fa fa-bed"></i> ' +
    product.services.bedrooms +
    " bed.</h5></li>" +
    '<li class="row me-2"><h5><i class="fa fa-cube"></i> ' +
    product.services.m2 +
    " m2</h5></li>" +
    "</ul> " +
    "</div>" +
    '<h3 class="card-title">' +
    product.title +
    "</h3> " +
    '<p class="card-text">' +
    product.description +
    "</p>" +
    '<div class="me-4" style="border:2px solid white;"></div>' +
    "<div>" +
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


function loadForm(){
  return('<div class="mb-3">'+
  '<label for="exampleFormControlInput1" class="form-label">Email address</label>'+
  '<input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">'+
  '</div>'+
  '<div class="mb-3">'+
  '<label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>'+
  '<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>'+
  '<button class="btn btn-primary" type="submit>Submit</button>'+
  '</div>');
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
