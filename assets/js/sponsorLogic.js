import { productsData } from "./data.js";

export class SponsorScroller {
  constructor(containerSponsors) {
    this.containerSponsors = containerSponsors;
  }
  goBrand = (e) => {
    if (!e.target.classList.contains("sponsor-brand")) return;
    const results = productsData.filter((product) => {
      return product.brand === e.target.dataset.brand;
    });
    localStorage.setItem("searcheads", JSON.stringify(results));
    const informacion = {
      boolean: true,
      boolbrand: true,
    };
    const queryParams = new URLSearchParams(informacion).toString();
    const urlDestino = "./products.html?" + queryParams;
    window.location.href = urlDestino;
  };
  init() {
    this.containerSponsors.addEventListener("click", this.goBrand);
  }
}
