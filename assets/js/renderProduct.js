const formatPrice = (number) => {
  return number.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
};
const formatBrand = (brand) => {
  if (
    brand === "black and decker" ||
    brand === "dewalt" ||
    brand === "stanley"
  ) {
    return brand + ".png";
  } else {
    return brand + ".svg";
  }
};
const formatImage = (imageUrl, prop) => {
  if (prop === true) {
    const img = imageUrl.slice(8, imageUrl.length);
    return ".." + img;
  } else {
    return imageUrl;
  }
};

const createGallery = (list) => {
  const lista = document.createElement("div");
  lista.classList.add("product__head--gallery");
  list.forEach((img) => {
    const src = formatImage(img, true);
    const image = document.createElement("img");
    image.src = src;
    lista.appendChild(image);
  });
  return lista.outerHTML;
};
const createListCaracts = (list) => {
  const lista = document.createElement("ul");

  list.forEach((caract) => {
    const caracteristicaItem = document.createElement("li");
    caracteristicaItem.textContent = caract;
    lista.appendChild(caracteristicaItem);
  });
  return lista.outerHTML;
};

const createTemplateProductSingle = (product, prop) => {
  const { title, images, price, id, brand, stock, ficha } = product;
  console.log(price);
  const precio = formatPrice(price);
  const marca = formatBrand(brand);
  const lista = createListCaracts(ficha);
  const galleria = createGallery(images);
  const template = `        <div class="product--head">
  <h1>${title}</h1>
  <article class="product__head--info">
  ${lista}
    <span>${precio}</span>
  </article>
  <div class="product__head--img">
    <div class="product__head--portada">
      <img src="${formatImage(images[0], prop)}" alt="${title}">
    </div>
    ${galleria}
  </div>
</div>
<div class="product--foot">
  <div class="box--brand">
    <img src="../imgs/logos_marcas/${marca}" alt="${brand}">
  </div>
  <div class="foot__quantity">
    <p class="stock--quantity" >${stock} unidades en stock</p>
    <div class="quantity-handler">
      <span class="material-symbols-outlined quantity-handler--remove">
        remove
      </span>
      <input type="num" value="1" class="quantity-handler--display" disabled />
      <span class="material-symbols-outlined quantity-handler--add">
        add
        </span>
    </div>
  </div> 
  <button class="btn--add">comprar</button>
</div>`;
  return template;
};
const createTemplateProduct = (product, prop) => {
  const { title, images, price, id } = product;
  const precio = formatPrice(price);
  const portada = formatImage(images[0], prop);
  console.log(product);
  console.log(portada);
  return `<div class="cardProduct">
    <div class="img--box">
      <img src="${portada}" alt="${title}" />
    </div>
    <div class="producto--info">
      <h3>${title}</h3>
      <span>${precio}</span>
      <div class="card--btns">
        <button class="card--btn card--buttonbuy">comprar</button
        ><button class="card--btn card--btnsmd" data-id='${id}'>detalles</button>
      </div>
    </div>
    </div>
    </div>`;
};

export const renderProducts = (productList, container, prop, single) => {
  if (!single) {
    container.innerHTML += productList
      .map((producto) => createTemplateProduct(producto, prop))
      .join("");
  } else {
    container.innerHTML = createTemplateProductSingle(productList, prop);
  }

  //    container.innerHTML += productList.map(createTempleateProduct).join("");
};
