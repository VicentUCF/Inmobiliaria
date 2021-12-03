import Products from "./Products.js";
let tipo = 'all';
function Listeners(productes) {
  //Botones con los que se filtra el tipo de producto que se quiere ver(todos,casas,apartamentos y garajes)
  let all_btn = document.getElementById("all");
  let homes_btn = document.getElementById("homes");
  let apartaments_btn = document.getElementById("apartaments");
  let garages_btn = document.getElementById("garages");

  //Botones con los que se aplican los filtros de busqueda(precio y metros cuadrados)
  let price_up = document.getElementById("price_up");
  let price_down = document.getElementById("price_down");
  let m2_up = document.getElementById("m2_up");
  let m2_down = document.getElementById("m2_down");

  let buscar = document.getElementById("buscar");
  let elementToFind = document.getElementById("elementToFind");

  /*
  *Listeners de los botones para filtrar por el tipo de porducto
  */
  all_btn.onclick = () => {
    Products(productes, "all");
    tipo = "all";
  };
  homes_btn.onclick = () => {
    Products(productes, "home");
    tipo = "home";
  };
  apartaments_btn.onclick = () => {
    Products(productes, "apartament");
    tipo = "apartament";
  };
  garages_btn.onclick = () => {
    Products(productes, "garage");
    tipo = "garage";
  };
  //Final Listener Tipo

  //Listeners de los filtros de ordenacion (precio y m2)
  price_up.onclick = () =>
    Products(
      productes.sort((a, b) => a.price < b.price),
      tipo
    );
  price_down.onclick = () =>
    Products(
      productes.sort((a, b) => a.price > b.price),
      tipo
    );
  m2_up.onclick = () =>
    Products(
      productes.sort((a, b) => a.services.m2 < b.services.m2),
      tipo
    );
  m2_down.onclick = () =>
    Products(
      productes.sort((a, b) => a.services.m2 > b.services.m2),
      tipo
    );

  //Final Listeners

  /*
  *Listener del buscador de productos, busca todos los titulos
  *de los productos que coinciden con el dato introducido
  */
  buscar.onclick = () => {
    let buscant = elementToFind.value;

    const resultado = productes.filter((product) =>
      product.title.toLowerCase().includes(buscant.toLowerCase())
    );

    resultado.length > 0
      ? Products(resultado, "all")
      : Swal.fire({
          title: "Element not Found!",
          icon: "question",
        });
  };


}

export default Listeners;
