import { productsData } from "./data.js";
import { createDiplayProductTemplate } from "./renderProduct.js";
import { showToarts, goProduct } from "./utils.js";

class SearcherProds {
  constructor(searchForm, searchInput, searchDisplay) {
    this.searchForm = searchForm;
    this.searchInput = searchInput;
    this.searchDisplay = searchDisplay;
  }

  searchProds = () => {
    const searchTerm = this.searchInput.value.toLowerCase();
    const result = productsData.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
    this.showResults(result);
  };

  // Función para mostrar los resultados en la página
  goProductSearch = (e) => {
    if (
      e.target.classList.contains("searcher--card") ||
      e.target.classList.contains("searcher--img") ||
      e.target.classList.contains("searcher--p")
    ) {
      goProduct(e);
    }
    return;
  };
  showResults(result) {
    this.searchDisplay.innerHTML = "";
    if (result.length === 0) {
      this.searchDisplay.innerHTML = "<p>No se encontraron resultados.</p>";
    } else {
      this.searchDisplay.innerHTML = result
        .map(createDiplayProductTemplate)
        .join("");
    }
  }
  goProductSearchead(searchTerm, results) {
    localStorage.setItem("searcheads", JSON.stringify(results));
    localStorage.setItem("termSearcheads", JSON.stringify(searchTerm));
    const informacion = {
      boolean: true,
    };
    const queryParams = new URLSearchParams(informacion).toString();
    const urlDestino = "./products.html?" + queryParams;
    window.location.href = urlDestino;
  }
  search = (e) => {
    e.preventDefault();
    const searchTerm = this.searchInput.value.toLowerCase();
    if (searchTerm.length === 0) {
      showToarts(
        this.searchForm,
        "no se encontraron productos relacionados con su busqueda"
      );
      return;
    }
    const results = productsData.filter((producto) =>
      producto.title.toLowerCase().includes(searchTerm)
    );
    this.goProductSearchead(searchTerm, results);
  };

  init() {
    this.searchInput.addEventListener("keyup", this.searchProds);
    this.searchForm.addEventListener("submit", this.search);
    this.searchDisplay.addEventListener("click", this.goProductSearch);
  }
}

export default SearcherProds;
