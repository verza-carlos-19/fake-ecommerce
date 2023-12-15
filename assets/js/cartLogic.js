// import JSConfetti from "../../node_modules/js-confetti/dist/es/index.js";
import { productsData } from "./data.js";
import { createCartProductTemplate } from "./renderProduct.js";
import { formatPrice, showToarts } from "./utils.js";

class ShopCart {
  constructor(
    headerBox,
    shopCart,
    cartContainer,
    cartCleaner,
    totalCart,
    cartBubble,
    cartBuyer
  ) {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    // this.jsConfetti = new JSConfetti();
    this.headerBox = headerBox;
    this.shopCart = shopCart;
    this.cartContainer = cartContainer;
    this.cartCleaner = cartCleaner;
    this.totalCart = totalCart;
    this.cartBubble = cartBubble;
    this.cartBuyer = cartBuyer;
  }
  toggleCart = (e) => {
    if (!e.target.classList.contains("btn--cart")) return;
    this.shopCart.classList.toggle("show--cart");
  };
  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
  handlePlusBtnEvent(id, stock, quantity) {
    const existingCartProduct = this.cart.find(
      (item) => item.id === String(id)
    );
    if (existingCartProduct.quantity >= Number(stock)) {
      showToarts(this.cartContainer, "No hay mas stock de este producto");
      return;
    }
    this.addUnitToProduct(existingCartProduct.id, quantity);
    this.updateCartState();
  }
  handleMinusBtnEvent(id) {
    const existingCartProduct = this.cart.find(
      (item) => item.id === String(id)
    );
    if (existingCartProduct.quantity === 1) {
      return;
    }
    this.substractProductUnit(existingCartProduct.id);
    this.updateCartState();
  }

  substractProductUnit(existingCartProduct) {
    this.cart = this.cart.map((product) => {
      return product.id === existingCartProduct
        ? { ...product, quantity: Number(product.quantity) - 1 }
        : product;
    });
  }
  removeProductFromCart(id) {
    this.cart = this.cart.filter((product) => product.id !== String(id));
    this.updateCartState();
  }
  quantityHandler = (e) => {
    if (e.target.classList.contains("quantity-handler--remove")) {
      this.handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains("quantity-handler--add")) {
      this.handlePlusBtnEvent(e.target.dataset.id, e.target.dataset.stock, 1);
    } else if (e.target.classList.contains("quantity-handler--delete")) {
      this.removeProductFromCart(e.target.dataset.id);
    } else {
      return;
    }
  };
  getItemByArray(id) {
    return productsData.find((item) => item.id === Number(id));
  }
  getCartTotal() {
    const precio = this.cart.reduce(
      (acc, cur) =>
        acc + Number(this.getItemByArray(cur.id).price) * cur.quantity,
      0
    );
    return precio;
  }

  showCartTotal() {
    const precio = formatPrice(this.getCartTotal());
    this.totalCart.innerHTML = `${precio}`;
  }

  renderCartBubble() {
    this.cartBubble.textContent = this.cart.reduce(
      (acc, cur) => acc + cur.quantity,
      0
    );
  }
  resetCartItems = () => {
    this.cart = [];
    this.updateCartState();
  };
  buyCartItems = () => {
    if (!this.cart.length) {
      showToarts(this.cartContainer, "agregue un producto en el carrito");
      return;
    }
    setTimeout(() => {
      this.resetCartItems();
    }, 2500);
    this.cartContainer.innerHTML = `<p>¡gracias por su compra!</p>`;
    showToarts(this.cartContainer, "gracias por la compra");
    // this.jsConfetti.addConfetti({
    //   emojis: ["💸", "💵", "💴", "💶", "💷"],
    //   emojiSize: 40,
    //   confettiNumber: 80,
    // });
  };
  renderProductCart = () => {
    if (!this.cart.length) {
      this.cartContainer.innerHTML = `<p class="empty-msg">Aqui podras ver tus productos</p>`;
      this.cartCleaner.style.display = "none";
      return;
    }
    this.cartCleaner.style.display = "flex";
    this.cartContainer.innerHTML = this.cart
      .map(createCartProductTemplate)
      .join("");
  };

  createCartProduct(product, quant) {
    this.cart = [...this.cart, { id: product, quantity: quant }];
  }
  isExistingCartProduct(product) {
    return this.cart.find((item) => item.id === product);
  }

  addUnitToProduct(product, quantity) {
    this.cart = this.cart.map((cartProduct) =>
      cartProduct.id === product
        ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
        : cartProduct
    );
  }
  updateCartState() {
    this.renderProductCart();
    this.renderCartBubble();
    this.showCartTotal();
    this.saveCart();
  }
  buyItem(id, stock, quantity) {
    if (this.isExistingCartProduct(id)) {
      this.handlePlusBtnEvent(id, stock, quantity);
      return;
    } else {
      this.createCartProduct(id, quantity);
      this.updateCartState();
    }
  }
  init() {
    this.updateCartState();
    this.headerBox.addEventListener("click", this.toggleCart);
    this.cartContainer.addEventListener("click", this.quantityHandler);
    this.cartCleaner.addEventListener("click", this.resetCartItems);
    this.cartBuyer.addEventListener("click", this.buyCartItems);
  }
}

export default ShopCart;
