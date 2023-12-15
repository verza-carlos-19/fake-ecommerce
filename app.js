import ShopCart from "./assets/js/cartLogic.js";
import { appState } from "./assets/js/data.js";
import { Form } from "./assets/js/formLogic.js";
import { renderProducts } from "./assets/js/renderProduct.js";
import SearcherProds from "./assets/js/searchLogic.js";
import { SponsorScroller } from "./assets/js/sponsorLogic.js";
import { goProduct, obtenerNumeroAleatorio } from "./assets/js/utils.js";

const containerProds = document.querySelector(".main__productos--box");
const containerSponsors = document.querySelector(".main__sponsors--scroll");
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
const formContainer = document.querySelector(".main__contacto");
const form = document.querySelector(".main__contacto--form");
const nameField = document.querySelector(".nombre");
const phoneField = document.querySelector(".telefono");
const emailField = document.querySelector(".email");
const asuntField = document.querySelector(".asunto");
const messageField = document.querySelector(".mensaje");
const formName = document.querySelector(".contacto__form--name");
const formPhone = document.querySelector(".contacto__form--tel");
const formAsunt = document.querySelector(".contacto__form--asunt");
const formEmail = document.querySelector(".contacto__form--email");
const formMessage = document.querySelector(".contacto__form--message");
const formulario = new Form(
  formContainer,
  form,
  nameField,
  phoneField,
  emailField,
  asuntField,
  messageField,
  formName,
  formPhone,
  formAsunt,
  formEmail,
  formMessage
);
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
  carrito.buyItem(id, stock, 1);
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
  scrollerSponsors.init();
  formulario.init();
};

init();
