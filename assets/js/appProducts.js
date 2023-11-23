import { appState } from "./data.js";
import { renderProducts } from "./renderProduct.js";
import ShopCart from "./cartLogic.js";
import { goProductSingle } from "./utils.js";
const containerProds = document.querySelector(".productos--container");
const showMoreBtn = document.querySelector(".showMoreBtn");
const headerBox = document.querySelector(".header--head");
const shopCart = document.querySelector(".cart--shop");
const cartBubble = document.querySelector(".head__cart--bubble");
const cartContainer = document.querySelector(".products--cart");
const cartCleaner = document.querySelector(".cart--empty");
const cartBuyer = document.querySelector(".total__btn--buy");
const totalCart = document.querySelector(".total--price");
const params = new URLSearchParams(window.location.search);
const boolean = params.get("boolean");
const Prodsearcheads = JSON.parse(localStorage.getItem("searcheads")) || [];
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
  renderProducts(products[currentProductsIndex], containerProds, false);
  if (isLastIndexOf()) {
    showMoreBtn.classList.add("hidden");
  }
};
const renderInitialize = (boolean) => {
  if (boolean) {
    renderProducts(Prodsearcheads, containerProds);
  } else {
    renderProducts(appState.products[0], containerProds);
  }
};
const buyProduct = (e) => {
  const id = e.target.dataset.id;
  carrito.buyItem(id);
};
const goProduct = (e) => {
  const id = e.target.dataset.id;
  goProductSingle(id, false);
};
const initProducts = (e) => {
  if (e.target.classList.contains("card--btnsmd")) {
    goProduct(e);
  } else if (e.target.classList.contains("card--buttonbuy")) {
    buyProduct(e);
  } else {
    return;
  }
};
const init = () => {
  renderInitialize(boolean);
  showMoreBtn.addEventListener("click", renderMoreProducts);
  containerProds.addEventListener("click", initProducts);
  carrito.initCart();
};

init();
