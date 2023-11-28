import { appState, productsData } from "./data.js";
import { renderProducts } from "./renderProduct.js";
import ShopCart from "./cartLogic.js";
import { goProductSingle, showToarts } from "./utils.js";
import SearcherProds from "./searchLogic.js";

const containerProds = document.querySelector(".productos--container");
const headerBox = document.querySelector(".header--head");
const shopCart = document.querySelector(".cart--shop");
const cartBubble = document.querySelector(".head__cart--bubble");
const cartContainer = document.querySelector(".products--cart");
const cartCleaner = document.querySelector(".cart--empty");
const cartBuyer = document.querySelector(".total__btn--buy");
const totalCart = document.querySelector(".total--price");
const searchForm = document.querySelector(".head--search");
const showMoreBtn = document.querySelector(".showMoreBtn");
const filterContainer = document.querySelector(".box--filtros");
const filterInputRateless = document.querySelector(".rateless");
const filterInputRateup = document.querySelector(".rateup");
const filterInputPriceless = document.querySelector(".priceless");
const filterInputPriceup = document.querySelector(".priceup");
const ordererInputs = document.querySelectorAll(".orderer");
const brandFilters = document.querySelectorAll(".brandFilter");
const comboboxFilter = document.querySelector("#combobox");
const searchInput = document.querySelector(".head--search--input");
const searchDisplay = document.querySelector(".display--results");
const searcher = new SearcherProds(searchForm, searchInput, searchDisplay);
const params = new URLSearchParams(window.location.search);
const boolean = params.get("boolean");
const Prodsearcheads = JSON.parse(localStorage.getItem("searcheads")) || [];
const termSearcheads = JSON.parse(localStorage.getItem("termSearcheads")) || [];
const carrito = new ShopCart(
  headerBox,
  shopCart,
  cartContainer,
  cartCleaner,
  totalCart,
  cartBubble,
  cartBuyer
);
const sortProducts = (prodlist) => {
  const arr = prodlist;
  if (filterInputRateless.checked && filterInputPriceless.checked) {
    console.log("menorprecio menorrating");
    showMoreBtn.classList.add("hidden");
    return arr.sort((a, b) => {
      if (b.rate !== a.rate) {
        return a.rate - b.rate;
      } else {
        return a.price - b.price;
      }
    });
  } else if (filterInputRateless.checked && filterInputPriceup.checked) {
    console.log("mayorprecio menorrating");
    showMoreBtn.classList.add("hidden");
    return arr.sort((a, b) => {
      if (b.rate !== a.rate) {
        return a.rate - b.rate;
      } else {
        return b.price - a.price;
      }
    });
  } else if (filterInputRateup.checked && filterInputPriceless.checked) {
    console.log("menorprecio mayorrating");
    showMoreBtn.classList.add("hidden");
    return arr.sort((a, b) => {
      if (b.rate !== a.rate) {
        return b.rate - a.rate;
      } else {
        return a.price - b.price;
      }
    });
  } else if (filterInputRateup.checked && filterInputPriceup.checked) {
    console.log("mayorprecio mayorrating");
    showMoreBtn.classList.add("hidden");
    return arr.sort((a, b) => {
      if (b.rate !== a.rate) {
        return b.rate - a.rate;
      } else {
        return b.price - a.price;
      }
    });
  } else if (filterInputPriceup.checked) {
    console.log("mayorprecio");
    showMoreBtn.classList.add("hidden");
    return arr.sort((a, b) => {
      return b.price - a.price;
    });
  } else if (filterInputRateup.checked) {
    console.log("mayorrating");
    showMoreBtn.classList.add("hidden");
    return arr.sort((a, b) => {
      return b.rate - a.rate;
    });
  } else if (filterInputPriceless.checked) {
    console.log("menorprecio");
    showMoreBtn.classList.add("hidden");
    return arr.sort((a, b) => {
      return a.price - b.price;
    });
  } else if (filterInputRateless.checked) {
    console.log("menorrating");
    showMoreBtn.classList.add("hidden");
    return arr.sort((a, b) => {
      return a.rate - b.rate;
    });
  } else {
    showMoreBtn.classList.remove("hidden");
    console.log("nada");
    return arr;
  }
};
const getOrdererChecked = () => {
  let orderers = [];
  ordererInputs.forEach((orderer) => {
    if (orderer.checked) {
      orderers.push(1);
    }
  });
  return orderers;
};
const getBrandsChecked = () => {
  let brands = [];
  brandFilters.forEach((brand) => {
    if (brand.checked) {
      brands.push(brand.value);
    }
  });
  return brands;
};
const filterBrands = () => {
  const brands = getBrandsChecked();
  if (brands.length === 0) {
    return appState.products[0];
  } else {
    return productsData.filter((product) => {
      return brands.includes(product.brand);
    });
  }
};

const toggleCheckerRate = (e) => {
  if (e.target.classList.contains("rateup")) {
    filterInputRateless.checked = false;
  } else {
    filterInputRateup.checked = false;
  }
};
const toggleCheckerPrice = (e) => {
  if (e.target.classList.contains("priceup")) {
    filterInputPriceless.checked = false;
  } else {
    filterInputPriceup.checked = false;
  }
};
const filterCombox = (arr) => {
  const categoryCombo = comboboxFilter.value;
  if (categoryCombo === "todos") {
    return arr;
  } else {
    const prodsList = arr.filter(
      (product) => categoryCombo === product.category
    );
    return prodsList;
  }
};
const filterProducts = () => {
  let brands = getBrandsChecked();
  let orderers = getOrdererChecked();
  if (!brands.length && !orderers.length && comboboxFilter.value === "todos") {
    showMoreBtn.classList.remove("hidden");
    return sortProducts(appState.products[0]);
  } else if (!brands.length) {
    const products = sortProducts(filterCombox(productsData));
    showMoreBtn.classList.add("hidden");
    return products;
  } else {
    const products = filterBrands();
    return sortProducts(filterCombox(products));
  }
};
const renderProductsFiltereads = (products, container) => {
  container.innerHTML = "";
  if (!products.length) {
    containerProds.innerHTML = `<p class="container--message">¡no hay productos con estas caracteristicas!</p>`;
  } else {
    renderProducts(products, container);
  }
};
const toggleChecker = (e) => {
  if (e.target.classList.contains("rate-filter")) {
    toggleCheckerRate(e);
  } else if (e.target.classList.contains("price-filter")) {
    toggleCheckerPrice(e);
  } else if (e.target.classList.contains("btn--filtrar")) {
    renderProductsFiltereads(filterProducts(), containerProds);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    return;
  }
};

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
      showMoreBtn.classList.add("hidden");
    }
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
  filterContainer.addEventListener("click", toggleChecker);
  carrito.init();
  searcher.init();
};

init();
