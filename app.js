import ShopCart from "./assets/js/cartLogic.js";
import { appState } from "./assets/js/data.js";
import { renderProducts } from "./assets/js/renderProduct.js";
import SearcherProds from "./assets/js/searchLogic.js";
import { goProduct, obtenerNumeroAleatorio } from "./assets/js/utils.js";

const containerProds = document.querySelector(".main__productos--box");
const headerBox = document.querySelector(".header--head");
const searchForm = document.querySelector(".head--search");
const searchInput = document.querySelector(".head--search--input");
const searchDisplay = document.querySelector(".display--results");
const searcher = new SearcherProds(searchForm, searchInput, searchDisplay);
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

const buyProduct = (e) => {
  const id = e.target.dataset.id;
  const stock = e.target.dataset.stock;
  carrito.buyItem(id, stock);
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
  document.addEventListener("click", goProducts);
  renderProductInit();
  containerProds.addEventListener("click", initProducts);
  carrito.init();
  searcher.init();
};

init();
