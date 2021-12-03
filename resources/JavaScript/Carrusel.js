var posicionActual = 0;
let interval;
let imagen;


/*
 @imagenes Array de imagenes que compone el carrusel
*/
function Carrusel(imagenes) {
  clearInterval(interval);
  play(imagenes);
}

/*
 Se encarga de retornar el div donde se encontraran
 las imagenes para formar el carrusel
*/
export function printCarrusel() {
  return (
    '<div class="col-lg-6">' +
    '<img id="imagen" class="card-img-top img-fluid carrusel-img"></img>' +
    "</div>"
  );
}


function play(imagenes) {
   imagen = document.querySelector("#imagen");
   if (imagen != null) {
    showImg(imagenes);
    interval = setInterval(function () {
      nextPhoto(imagenes);
    }, 4000);
  }
}

function nextPhoto(imagenes) {
  posicionActual >= imagenes.length - 1 ? posicionActual = 0 : posicionActual++;
  showImg(imagenes);
}

function showImg(imagenes) {
  imagen = document.querySelector("#imagen");
  const pintar = () =>
    imagen != null ? (imagen.src = "./resources/imgs/inmuebles/" + imagenes[posicionActual]): '';
  pintar();
}

export default Carrusel;
