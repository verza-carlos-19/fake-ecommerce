import { productsData } from "./data.js";
import {
  formatPrice,
  formatBrand,
  createGallery,
  createListCaracts,
  createGalleryPortada,
} from "./utils.js";

export const createDiplayProductTemplate = (product) => {
  const id = product.id;
  const image = product.images[0];
  const title = product.title;
  const price = formatPrice(product.price);
  return `<div class="searcher--card" data-id="${id}" >
  <img class="searcher--img" data-id="${id}"src="${image}" alt="${title}">
  <p class="searcher--p" data-id="${id}">${title} - Precio: ${price}</p>
  </div>`;
};
export const createCartProductTemplate = (cartProduct) => {
  const { id, quantity } = cartProduct;
  const product = productsData.find((item) => item.id === Number(id));
  const image = product.images[0];
  const title = product.title;
  const stock = product.stock;
  const precio = formatPrice(product.price * quantity);
  return `
                <div class="cart--producto">
                  <div class="producto__box--img">
                    <img src="${image}" alt="${title}" />
                  </div>
                  <div class="producto__box--info">
                        <h3 class="title-item-cart">${title}</h3>
                      <p class="price-item">${precio}</p>
                  </div>
                  <div class="producto__box--quantity">
                    <div class="quantity-handler">
                      <span class="material-symbols-outlined quantity-handler--remove" data-id='${id}'>
                        remove
                      </span>
                      <input type="num" value="${quantity}" class="quantity-handler--display" disabled />
                      <span  class="material-symbols-outlined quantity-handler--add" data-id='${id}' data-stock='${stock}'>
                        add
                        </span>
                    </div>
                  </div>
                  <span class="material-symbols-outlined quantity-handler--delete" data-id='${id}'>
                    delete
                    </span>
                  </div>
  `;
};

const createTemplateProductSingle = (product) => {
  const { title, images, price, id, brand, stock, ficha } = product;
  const precio = formatPrice(price);
  const marca = formatBrand(brand);
  const lista = createListCaracts(ficha);
  const galleria = createGallery(images);
  const galleriaPortada = createGalleryPortada(images);
  const template = `        <div class="product--head">
  <h1>${title}</h1>
  <div class="product__head--img">
  <h1 class="title--sm">${title}</h1>
  ${galleriaPortada}
  ${galleria}
  </div>
  <article class="product__head--info">
  ${lista}
  <span>${precio}</span>
  </article>
</div>
<div class="product--foot">
  <div class="box--brand">
    <img src="./assets/imgs/logos_marcas/${marca}" alt="${brand}">
  </div>
  <div class="foot__quantity">
    <p class="stock--quantity" >${stock} unidades en stock</p>
    <div class="quantity-handler">
      <span class="material-symbols-outlined quantity-handler--remove" data-id='${id}'>
        remove
      </span>
      <input type="num" value="1" class="quantity-handler--display"data-stock='${stock}' disabled />
      <span class="material-symbols-outlined quantity-handler--add"data-stock='${stock}' data-id='${id}'>
        add
        </span>
    </div>
  </div> 
  <button class="btn--add card--buttonbuy button--buyMult" data-id='${id}'data-stock='${stock}'>comprar</button>
</div>`;
  return template;
};
const createTemplateProduct = (product) => {
  const { title, images, price, id, stock } = product;
  const precio = formatPrice(price);
  const portada = images[0];

  return `<div class="cardProduct">
    <div class="img--box">
      <img src="${portada}" alt="${title}" />
    </div>
    <div class="producto--info">
      <h3>${title}</h3>
      <span>${precio}</span>
      <div class="card--btns">
        <button class="card--btn card--buttonbuy" data-id='${id}' data-stock='${stock}'>comprar</button
        ><button class="card--btn card--btnsmd" data-id='${id}'data-stock='${stock}'>detalles</button>
      </div>
    </div>
    </div>
    </div>`;
};

export const renderProducts = (productList, container, single) => {
  if (!single) {
    container.innerHTML += productList
      .map((producto) => createTemplateProduct(producto))
      .join("");
  } else {
    container.innerHTML = createTemplateProductSingle(productList);
  }
};
