import { appState, productsData } from "./data.js";
import { renderProducts } from "./renderProduct.js";

const containerProds = document.querySelector(".main__productos--box");
const containerProduct = document.querySelector(".container--product");
const params = new URLSearchParams(window.location.search);
const idProduct = params.get("id") - 1;

const guardarLocalStorage = (id) => {
  localStorage.setItem("ultimaProducto", JSON.stringify(id));
};
const obtenerNumeroAleatorio = () => {
  let numeroAleatorio = Math.floor(Math.random() * 6) + 1;
  return numeroAleatorio;
};

const goProduct = (e) => {
  if (!e.target.classList.contains("card--btnsmd")) return;
  const product = e.target.dataset;
  console.log(product.id);
  renderPage(product.id - 1);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const renderPage = (id) => {
  renderProducts(productsData[id], containerProduct, true, true);
  if (id >= 0 && id <= 2) {
    containerProds.innerHTML = "";
    renderProducts(
      appState.productsShorts[obtenerNumeroAleatorio()],
      containerProds,
      true,
      false
    );
  } else {
    containerProds.innerHTML = "";
    renderProducts(appState.productsShorts[0], containerProds, true, false);
  }
};

const init = () => {
  containerProds.addEventListener("click", goProduct);
  console.log(idProduct);
  console.log(productsData[idProduct]);
  // const { title, images, price } = productsData[idProduct];
  // const portada = images[0];
  // containerProduct.innerHTML = `<img src="${portada}" alt="${title}" />`;
  renderPage(idProduct);
};
init();
