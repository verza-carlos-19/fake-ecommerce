import { appState } from "./assets/js/data.js";
import { renderProducts } from "./assets/js/renderProduct.js";

const goProducts = () => {
  window.location.href = "./assets/pages/products.html";
  console.log("ok");
};

const containerProds = document.querySelector(".main__productos--box");
const btnIndexProd = document.querySelectorAll(".main--productos-show");

const renderTest = () => {
  renderProducts(appState.productsShorts[0], containerProds);
};
const goProductSingle = (id) => {
  const informacion = {
    id: id,
  };
  const queryParams = new URLSearchParams(informacion).toString();
  const urlDestino = "./assets/pages/productSingle.html?" + queryParams;
  window.location.href = urlDestino;
};
const goProduct = (e) => {
  if (!e.target.classList.contains("card--btnsmd")) return;
  const product = e.target.dataset;
  console.log(product.id);
  goProductSingle(product.id);
};

const init = () => {
  btnIndexProd.forEach((btn) => btn.addEventListener("click", goProducts));
  renderTest();
  containerProds.addEventListener("click", goProduct);
};

init();
