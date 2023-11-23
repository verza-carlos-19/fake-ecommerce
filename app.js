// import JSConfetti from "js-confetti";
// import JSConfetti from "./node_modules/js-confetti/dist/es/index.js";
import ShopCart from "./assets/js/cartLogic.js";
import { appState } from "./assets/js/data.js";
import { renderProducts } from "./assets/js/renderProduct.js";
import { initProducts, obtenerNumeroAleatorio } from "./assets/js/utils.js";

// const jsConfetti = new JSConfetti();
const containerProds = document.querySelector(".main__productos--box");
const btnIndexProd = document.querySelectorAll(".main--productos-show");
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
  cartBuyer
);

const renderProductInit = () => {
  renderProducts(
    appState.productsShorts[obtenerNumeroAleatorio()],
    containerProds
  );
};
const goProducts = (e) => {
  if (!e.target.classList.contains("main--productos-show")) return;
  window.location.href = "./products.html";
};

const init = () => {
  document.addEventListener("click", goProducts);
  renderProductInit();
  containerProds.addEventListener("click", initProducts);
  carrito.initCart();
};

init();
