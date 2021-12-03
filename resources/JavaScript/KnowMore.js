import {printCarrusel} from "./Carrusel.js";

function KnowMore(product) {
  return (
    '<div class="m-1 d-flex justify-content-center">' +
      '<div class="card col-10">' +
        '<div class="row">' +
          printCarrusel(product.features.img) +
            '<div class="col-lg-6">' +
                '<div class="ms-2 card-body">' +
                  '<h3 class="card-text mt-3">' + Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(product.price) + "</h3>" +
                  '<ul class="d-inline-flex"style="color:#e2c044">' +
                    '<li class="row me-2"><h5><i class="fa fa-shower"></i> ' + product.services.bathrooms + " bath.</h5></li>" +
                    '<li class="row me-2"><h5><i class="fa fa-bed"></i> ' + product.services.bedrooms + " bed.</h5></li>" +
                    '<li class="row me-2"><h5><i class="fa fa-cube"></i> ' + product.services.m2 + "m²</h5></li>" +
                  "</ul> " +
                  '<h3 class="card-title">' + product.title + "</h3> " +
                  '<p class="card-text">' + product.description + "</p>" +
                  '<div class="me-4" style="border:2px solid white;"></div>' +
                    "<div col-lg-12>" +
                    "<h2>Caracteristicas</h2>" +
                    "<ul>" +
                      '<li class="row me-2"><h5><i class="fa fa-home me-1"></i>Tipo de inmueble: ' + product.features.type + "</h5></li>" +
                      '<li class="row me-2"><h5><i class="fa fa-cube me-1"></i>Antiguedad: ' + product.features.antiquity + "</h5></li>" +
                      "</ul>" +
                    "</div>" +
                  "</div>" +
                  '<div class="card-footer d-flex">' +
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

export default KnowMore;
