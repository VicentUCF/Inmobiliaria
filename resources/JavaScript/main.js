


window.onload = () => {
  fetch("https://vicentucf.github.io/Inmobiliaria/resources/inmobiliaria.json")
    .then((resp) => {
      return resp.json();
    })
    .then((resposta) => {
      loadHomes(resposta);
    })
    .catch(console.log("Hi ha hagut un error"));
};

function loadHomes(inmuebles) {
  let content = document.getElementById("content");

  for (const inmueble of inmuebles) {
    content.innerHTML += loadHome(
      inmueble.title,
      inmueble.services,
      inmueble.Description,
      inmueble.price,
      inmueble.features
    );
  }
}

function loadHome(title, services, description, price, freatures) {
  loadServices(services);
  return (
    '<div class="card m-3 col-sm-1" style="width: 18rem">' +
    '<img src="/resources/imgs/casa.jpeg" class="card-img-top" alt="..." />' +
    '<div class="card-body">' +
    '<h5 class="card-title">' +
    title +
    "</h5>" +
    '<p class="card-text">' +
    description +
    "</p>" +
    "</div>" +
    '<ul class="list-group list-group-flush">' +
    loadServices(services) +
    "</ul>" +
    '<div class="card-body" style="text-align:center;">' +
    '<button class="btn" style=" background-color: #587B7F; color:white">Saber Mas</button>' +
    "</div>" +
    "</div>"
  );
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
    console.log(icon);
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




