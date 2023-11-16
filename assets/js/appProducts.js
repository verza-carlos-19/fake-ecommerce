import { appState } from "./data.js";
import { renderProducts } from "./renderProduct.js";

const containerProds = document.querySelector(".productos--container");
const showMoreBtn = document.querySelector(".showMoreBtn");

const isLastIndexOf = () => {
  return appState.currentProductsIndex === appState.productsLimit - 1;
};

const renderMoreProducts = () => {
  appState.currentProductsIndex += 1;

  let { products, currentProductsIndex } = appState;

  renderProducts(products[currentProductsIndex], containerProds, true, false);

  if (isLastIndexOf()) {
    showMoreBtn.classList.add("hidden");
  }
};

const renderInitialize = () => {
  renderProducts(appState.products[0], containerProds, true, false);
};
const goProductSingle = (id) => {
  const informacion = {
    id: id,
  };
  const queryParams = new URLSearchParams(informacion).toString();
  const urlDestino = "./productSingle.html?" + queryParams;
  window.location.href = urlDestino;
};
const goProduct = (e) => {
  if (!e.target.classList.contains("card--btnsmd")) return;
  const product = e.target.dataset;
  console.log(product.id);

  goProductSingle(product.id);
};

const init = () => {
  renderInitialize();
  showMoreBtn.addEventListener("click", renderMoreProducts);
  containerProds.addEventListener("click", goProduct);
};

init();
