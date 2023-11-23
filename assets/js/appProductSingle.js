import ShopCart from "./cartLogic.js";
import { appState, productsData } from "./data.js";
import { renderProducts } from "./renderProduct.js";
import { initProducts, obtenerNumeroAleatorio } from "./utils.js";

const containerProds = document.querySelector(".main__productos--box");
const containerProduct = document.querySelector(".container--product");
const params = new URLSearchParams(window.location.search);
const idProduct = params.get("id");
const headerBox = document.querySelector(".header--head");
const shopCart = document.querySelector(".cart--shop");
const cartBubble = document.querySelector(".head__cart--bubble");
const cartContainer = document.querySelector(".products--cart");
const cartCleaner = document.querySelector(".cart--empty");
const cartBuyer = document.querySelector(".total__btn--buy");
const totalCart = document.querySelector(".total--price");
const carrito = new ShopCart(
  headerBox,
  shopCart,
  cartContainer,
  cartCleaner,
  totalCart,
  cartBubble,
  cartBuyer,
  true
);

const renderPage = (id) => {
  const product = productsData.find((item) => item.id === Number(id));
  renderProducts(product, containerProduct, true);
  const title = product.title;
  document.title = `${title}`;
  containerProds.innerHTML = "";
  renderProducts(
    appState.productsShorts[obtenerNumeroAleatorio()],
    containerProds
  );
};

const init = () => {
  containerProds.addEventListener("click", initProducts);
  renderPage(idProduct);
  carrito.initCart();
};
init();
