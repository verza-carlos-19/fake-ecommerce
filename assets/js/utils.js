export const obtenerNumeroAleatorio = () => {
  let numeroAleatorio = Math.floor(Math.random() * 6) + 1;
  return numeroAleatorio;
};
export const formatPrice = (number) => {
  return number.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
};
export const formatBrand = (brand) => {
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

export const createGallery = (list) => {
  const lista = document.createElement("div");
  lista.classList.add("product__head--gallery");
  list.forEach((img) => {
    const src = img;
    const image = document.createElement("img");
    image.src = src;
    lista.appendChild(image);
  });
  return lista.outerHTML;
};
export const createListCaracts = (list) => {
  const lista = document.createElement("ul");

  list.forEach((caract) => {
    const caracteristicaItem = document.createElement("li");
    caracteristicaItem.textContent = caract;
    lista.appendChild(caracteristicaItem);
  });
  return lista.outerHTML;
};

export const goProductSingle = (id) => {
  const informacion = {
    id: id,
  };
  const queryParams = new URLSearchParams(informacion).toString();
  const urlDestino = "./productSingle.html?" + queryParams;
  window.location.href = urlDestino;
};

const buyProduct = (e) => {
  const id = e.target.dataset.id;
  carrito.buyItem(id);
};
const goProduct = (e) => {
  const id = e.target.dataset.id;
  goProductSingle(id, false);
};
export const initProducts = (e) => {
  if (e.target.classList.contains("card--btnsmd")) {
    goProduct(e);
  } else if (e.target.classList.contains("card--buttonbuy")) {
    buyProduct(e);
  } else {
    return;
  }
};
