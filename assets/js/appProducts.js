import { appState } from "./data.js";
import { renderProducts } from "./renderProduct.js";
import ShopCart from "./cartLogic.js";
import { goProductSingle } from "./utils.js";
import SearcherProds from "./searchLogic.js";
import { Filter } from "./boxFilter.js";
import { SponsorScroller } from "./sponsorLogic.js";

const containerProds = document.querySelector(".productos--container");
const headerBox = document.querySelector(".header--head");
const shopCart = document.querySelector(".cart--shop");
const containerSponsors = document.querySelector(".main__sponsors--scroll");
const cartBubble = document.querySelector(".head__cart--bubble");
const cartContainer = document.querySelector(".products--cart");
const cartCleaner = document.querySelector(".cart--empty");
const cartBuyer = document.querySelector(".total__btn--buy");
const totalCart = document.querySelector(".total--price");
const searchForm = document.querySelector(".head--search");
const showMoreBtn = document.querySelector(".showMoreBtn");
const filterContainer = document.querySelector(".box--filtros");
const filterBrandContainer = document.querySelector(".filtro--brand");
const filterInputRateless = document.querySelector(".rateless");
const filterInputRateup = document.querySelector(".rateup");
const filterInputPriceless = document.querySelector(".priceless");
const filterInputPriceup = document.querySelector(".priceup");
const ordererInputs = document.querySelectorAll(".orderer");
const brandFilters = document.querySelectorAll(".brandFilter");
const comboboxFilter = document.querySelector("#combobox");
const searchInput = document.querySelector(".head--search--input");
const searchDisplay = document.querySelector(".display--results");
const params = new URLSearchParams(window.location.search);
const boolean = params.get("boolean");
const boolBrand = params.get("boolbrand");
const Prodsearcheads = JSON.parse(localStorage.getItem("searcheads")) || [];
const termSearcheads = JSON.parse(localStorage.getItem("termSearcheads")) || [];
const scrollerSponsors = new SponsorScroller(containerSponsors);
const searcher = new SearcherProds(searchForm, searchInput, searchDisplay);
const carrito = new ShopCart(
  headerBox,
  shopCart,
  cartContainer,
  cartCleaner,
  totalCart,
  cartBubble,
  cartBuyer
);
const filtro = new Filter(
  containerProds,
  showMoreBtn,
  filterContainer,
  filterBrandContainer,
  filterInputRateless,
  filterInputRateup,
  filterInputPriceless,
  filterInputPriceup,
  ordererInputs,
  brandFilters,
  comboboxFilter,
  boolean
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
    if (!Prodsearcheads.length) {
      searchInput.value = termSearcheads;
      containerProds.innerHTML = `<p class="container--message">¡no se encontraron relacionados con su busqueda!</p>`;
      showMoreBtn.classList.add("hidden");
    } else {
      searchInput.value = termSearcheads;
      renderProducts(Prodsearcheads, containerProds);
      if (boolBrand) {
        filterBrandContainer.style.display = "none";
      }
      showMoreBtn.classList.add("hidden");
    }
  } else {
    renderProducts(appState.products[0], containerProds);
  }
};
const buyProduct = (e) => {
  const id = e.target.dataset.id;
  const stock = e.target.dataset.stock;
  carrito.buyItem(id, stock, 1);
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
  carrito.init();
  searcher.init();
  filtro.init();
  scrollerSponsors.init();
};

init();
