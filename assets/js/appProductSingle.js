import ShopCart from "./cartLogic.js";
import { appState, productsData } from "./data.js";
import { renderProducts } from "./renderProduct.js";
import SearcherProds from "./searchLogic.js";
import { SponsorScroller } from "./sponsorLogic.js";
import { goProduct, goProductSingle, obtenerNumeroAleatorio } from "./utils.js";

const containerProds = document.querySelector(".main__productos--box");
const containerProduct = document.querySelector(".container--product");
const headerBox = document.querySelector(".header--head");
const shopCart = document.querySelector(".cart--shop");
const cartBubble = document.querySelector(".head__cart--bubble");
const cartContainer = document.querySelector(".products--cart");
const cartCleaner = document.querySelector(".cart--empty");
const cartBuyer = document.querySelector(".total__btn--buy");
const totalCart = document.querySelector(".total--price");
const searchForm = document.querySelector(".head--search");
const searchInput = document.querySelector(".head--search--input");
const searchDisplay = document.querySelector(".display--results");
const containerSponsors = document.querySelector(".main__sponsors--scroll");
const menuBurger = document.querySelector(".header--body");
const scrollerSponsors = new SponsorScroller(containerSponsors);
const searcher = new SearcherProds(searchForm, searchInput, searchDisplay);
const params = new URLSearchParams(window.location.search);
const idProduct = params.get("id");
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
const toggleBurgerSm = (e) => {
  if (e.target.classList.contains("sm--menu--burger")) {
    shopCart.classList.remove("show--cart");
    searchForm.classList.remove("open");
    menuBurger.classList.toggle("open");
    return;
  } else if (e.target.classList.contains("sm--searcher--toggle")) {
    menuBurger.classList.remove("open");
    shopCart.classList.remove("show--cart");
    searchForm.classList.toggle("open");
    return;
  } else if (e.target.classList.contains("btn--cart")) {
    menuBurger.classList.remove("open");
    searchForm.classList.remove("open");
    return;
  } else if (e.target.classList.contains("navbarToggles")) {
    menuBurger.classList.remove("open");
    return;
  } else {
    return;
  }
};
const quantityHandler = (e) => {
  const button = e.target;
  if (button.classList.contains("quantity-handler--add")) {
    const stock = button.dataset.stock;
    let quantity = button.parentNode.querySelector(
      ".quantity-handler--display"
    ).value;
    if (Number(quantity) >= Number(stock)) {
      return;
    }
    button.parentNode.querySelector(".quantity-handler--display").value++;
  } else if (button.classList.contains("quantity-handler--remove")) {
    const stock = button.dataset.stock;
    const quantity = button.parentNode.querySelector(
      ".quantity-handler--display"
    ).value;
    if (quantity <= 1) {
      return;
    }
    button.parentNode.querySelector(".quantity-handler--display").value--;
  } else {
    return;
  }
};
const slider = (e) => {
  if (!e.target.classList.contains("tumblr")) return;
  const image = e.target;
  const imageSiblings = image.parentNode.children;
  for (let i = 0; i < imageSiblings.length; i++) {
    imageSiblings[i].style.boxShadow = "none";
    imageSiblings[i].style.borderBottom = "none";
  }
  image.style.boxShadow =
    "inset 0px -27px 20px -28px white, 23px 30px 11px -26px white, 11px 20px 20px -22px white, -24px 30px 11px -26px white, -12px 30px 11px -26px white, 1px 29px 11px -26px white, 12px 29px 11px -26px white, -3px 29px 11px -26px white";
  image.style.borderBottom = "2px solid white";
  const imagesContainer = image.parentNode.previousElementSibling;
  const id = e.target.dataset.id;
  imagesContainer.style.left = `${-29 * id}rem`;
  return;
};
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
const buyProduct = (e) => {
  const button = e.target;
  const id = button.dataset.id;
  const stock = button.dataset.stock;
  if (button.classList.contains("button--buyMult")) {
    const quantity = button.previousElementSibling
      .querySelector(".quantity-handler")
      .querySelector(".quantity-handler--display").value;
    carrito.buyItem(id, stock, Number(quantity));
  } else {
    carrito.buyItem(id, stock, 1);
  }
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
  document.addEventListener("click", initProducts);
  renderPage(idProduct);
  carrito.init();
  searcher.init();
  scrollerSponsors.init();
  document.addEventListener("click", slider);
  document.addEventListener("click", quantityHandler);

  document.addEventListener("click", toggleBurgerSm);
};
init();
