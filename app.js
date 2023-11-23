// import JSConfetti from "js-confetti";
// import JSConfetti from "./node_modules/js-confetti/dist/es/index.js";
import ShopCart from "./assets/js/cartLogic.js";
import { appState, productsData } from "./assets/js/data.js";
import { renderProducts } from "./assets/js/renderProduct.js";
import { goProductSingle, obtenerNumeroAleatorio } from "./assets/js/utils.js";

// const jsConfetti = new JSConfetti();
const containerProds = document.querySelector(".main__productos--box");
const headerBox = document.querySelector(".header--head");
const searchForm = document.querySelector(".head--search");
const searchInput = document.querySelector(".head--search--input");
const searchDisplay = document.querySelector(".display--results");
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

const buscarProducto = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const resultados = productsData.filter((producto) =>
    producto.title.toLowerCase().includes(searchTerm)
  );
  mostrarResultados(resultados);
};

// Función para mostrar los resultados en la página
const goProductSearch = (e) => {
  console.log(e);
  if (
    e.target.classList.contains("searcher--card") ||
    e.target.classList.contains("searcher--img") ||
    e.target.classList.contains("searcher--p")
  ) {
    goProduct(e);
  }
  return;
};
const mostrarResultados = (resultados) => {
  searchDisplay.innerHTML = "";

  if (resultados.length === 0) {
    searchDisplay.innerHTML = "<p>No se encontraron resultados.</p>";
  } else {
    resultados.forEach((producto) => {
      const productoDiv = document.createElement("div");
      productoDiv.classList.add("searcher--card");
      productoDiv.dataset.id = producto.id;
      productoDiv.innerHTML = `<img class="searcher--img" data-id="${producto.id}"src="${producto.images[0]}" alt=""><p class="searcher--p" data-id="${producto.id}">${producto.title} - Precio: $${producto.price}</p>`;
      searchDisplay.appendChild(productoDiv);
    });
  }
};

const searcherFunc = (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.toLowerCase();
  const resultados = productsData.filter((producto) =>
    producto.title.toLowerCase().includes(searchTerm)
  );
  mostrarResultados(resultados);
};
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
  document.addEventListener("click", goProducts);
  renderProductInit();
  containerProds.addEventListener("click", initProducts);
  searchInput.addEventListener("keyup", buscarProducto);
  searchDisplay.addEventListener("click", goProductSearch);
  carrito.initCart();
};

init();
