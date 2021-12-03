import carregarJSON, {exitPromesa} from "./LoadJson.js";
import Listeners from "./Listeners.js";
import Products from "./Products.js";

let productes;



window.onload = () => {
  carregarJSON("https://vicentucf.github.io/Inmobiliaria/resources/inmobiliaria.json").then((resp) => {
   productes = exitPromesa(resp);
   Listeners(productes);
   Products(productes, "all", true);
  });
};

