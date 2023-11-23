import { appState } from "./data.js";
import { renderProducts } from "./renderProduct.js";
import ShopCart from "./cartLogic.js";
import { goProductSingle, initProducts } from "./utils.js";
const containerProds = document.querySelector(".productos--container");
const showMoreBtn = document.querySelector(".showMoreBtn");
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
  renderProducts(appState.products[0], containerProds);
};

const init = () => {
  renderInitialize();
  showMoreBtn.addEventListener("click", renderMoreProducts);
  containerProds.addEventListener("click", initProducts);
  carrito.initCart();
};

init();
