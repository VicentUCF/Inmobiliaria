import Carrusel from "./Carrusel.js";
import KnowMore from "./KnowMore.js";
import Form, { loadForm } from "./Form.js";


function Products(productes, tipo, destacados = false) {
  let content = document.getElementById("content");
  content.innerHTML = "";

  if (destacados) {
    loadDestcados(productes, "all");
    content.innerHTML +=
      "<p class='bg-dark text-light d-flex justify-content-center'>All producs</p>";
  }

  for (const product of productes) {
    if (tipo == "all" || product.features.type == tipo) {
      let card = document.createElement("div");
      card.classList.add("card", "m-3", "col-sm1");
      card.style.width = " 18rem";
      card.innerHTML += loadProduct(product);
      content.appendChild(card);
      knowMoreBtn(productes,product.features.id);
    }
  }
}

function loadDestcados(productes) {
  let destacados = Array();

  do {
    let index = Math.floor(Math.random() * (productes.length - 0)) + 0;
    if (!destacados.includes(productes[index])) {
      destacados.push(productes[index]);
    }
  } while (destacados.length < 3);

  Products(destacados, "all");
}

function loadProduct(p) {
  let id = p.features.id;

  loadServices(p.services);
  return (
    '<img src="./resources/imgs/inmuebles/' +
    p.features.img[0] +
    '" class="card-img-top mt-1" height="180px" />' +
    '<div class="card-body">' +
    '<h5 class="card-title" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">' +
    p.title +
    "</h5>" +
    '<p class="card-text" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">' +
    p.description +
    "</p>" +
    "</div>" +
    '<ul class="list-group list-group-flush">' +
    loadServices(p.services) +
    "</ul>" +
    '<div class="card-footer d-flex justify-content-between">' +
    '<p style="color:#e2c044;margin-top:10px;">' +
    Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
      p.price
    ) +
    "</p>" +
    '<button class="btn" style="background-color: #587B7F; color:white" id="' +
    id +
    '">Saber Mas</button>' +
    "</div>"
  );
}

function knowMoreBtn(productes,p) {
  let btn = document.getElementById(p);

  btn.addEventListener("click", function () {
    let content = document.getElementById("content");
    let imagenes;

    const resultado = productes.find((product) => product.features.id === p);

    content.innerHTML = KnowMore(resultado);
    imagenes = resultado.features.img;

    contactBTN();
    Carrusel(imagenes);
  });
}

function contactBTN() {
  let btn = document.getElementById("btn-contact");
  let content = document.getElementById("content");
  btn.onclick = () => {content.innerHTML = loadForm(); Form();}
}

function loadServices(services) {
  let lista = "";
  const icons = {
    bedrooms: "fa fa-bed",
    bathrooms: "fa fa-bath",
    m2: "fa fa-cube",
    floors: "fa fa-bed",
  };

  const def_icon = "fa fa-bed";

  for (const service in services) {
    lista +=
      '<li class="list-group-item"><i class="' + icons[service] ||
      def_icon + '" style="margin-right:10px"></i>' + services[service] ||
      def_icon + " " + service + "</li>";
  }
  return lista;
}

export default Products;
