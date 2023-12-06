import { appState, productsData } from "./data.js";
import { renderProducts } from "./renderProduct.js";

export class Filter {
  constructor(
    containerProds,
    showMoreBtn,
    filterContainer,
    filterBrandContainer,
    filterInputRateless,
    filterInputRateup,
    filterInputPriceless,
    filterInputPriceup,
    ordererInputs,
    brandFilters,
    comboboxFilter,
    boolean
  ) {
    this.Prodsearcheads = JSON.parse(localStorage.getItem("searcheads")) || [];
    this.containerProds = containerProds;
    this.showMoreBtn = showMoreBtn;
    this.filterContainer = filterContainer;
    this.filterBrandContainer = filterBrandContainer;
    this.filterInputRateless = filterInputRateless;
    this.filterInputRateup = filterInputRateup;
    this.filterInputPriceless = filterInputPriceless;
    this.filterInputPriceup = filterInputPriceup;
    this.ordererInputs = ordererInputs;
    this.brandFilters = brandFilters;
    this.comboboxFilter = comboboxFilter;
    this.boolean = boolean;
  }

  sortProducts = (prodlist) => {
    const arr = prodlist;
    if (this.filterInputRateless.checked && this.filterInputPriceless.checked) {
      return arr.sort((a, b) => {
        if (b.rate !== a.rate) {
          return a.rate - b.rate;
        } else {
          return a.price - b.price;
        }
      });
    } else if (
      this.filterInputRateless.checked &&
      this.filterInputPriceup.checked
    ) {
      return arr.sort((a, b) => {
        if (b.rate !== a.rate) {
          return a.rate - b.rate;
        } else {
          return b.price - a.price;
        }
      });
    } else if (
      this.filterInputRateup.checked &&
      this.filterInputPriceless.checked
    ) {
      return arr.sort((a, b) => {
        if (b.rate !== a.rate) {
          return b.rate - a.rate;
        } else {
          return a.price - b.price;
        }
      });
    } else if (
      this.filterInputRateup.checked &&
      this.filterInputPriceup.checked
    ) {
      return arr.sort((a, b) => {
        if (b.rate !== a.rate) {
          return b.rate - a.rate;
        } else {
          return b.price - a.price;
        }
      });
    } else if (this.filterInputPriceup.checked) {
      return arr.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (this.filterInputRateup.checked) {
      return arr.sort((a, b) => {
        return b.rate - a.rate;
      });
    } else if (this.filterInputPriceless.checked) {
      return arr.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (this.filterInputRateless.checked) {
      return arr.sort((a, b) => {
        return a.rate - b.rate;
      });
    } else {
      return arr;
    }
  };

  getOrdererChecked() {
    let orderers = [];
    this.ordererInputs.forEach((orderer) => {
      if (orderer.checked) {
        orderers.push(1);
      }
    });
    return orderers;
  }
  getBrandsChecked = () => {
    let brands = [];
    this.brandFilters.forEach((brand) => {
      if (brand.checked) {
        brands.push(brand.value);
      }
    });
    return brands;
  };
  filterBrands(arr) {
    const array = arr;
    const brands = this.getBrandsChecked();
    if (brands.length === 0) {
      return array;
    } else {
      return array.filter((product) => {
        return brands.includes(product.brand);
      });
    }
  }
  toggleCheckerRate = (e) => {
    if (e.target.classList.contains("rateup")) {
      this.filterInputRateless.checked = false;
    } else {
      this.filterInputRateup.checked = false;
    }
  };
  toggleCheckerPrice = (e) => {
    if (e.target.classList.contains("priceup")) {
      this.filterInputPriceless.checked = false;
    } else {
      this.filterInputPriceup.checked = false;
    }
  };
  filterCombox(arr) {
    const categoryCombo = this.comboboxFilter.value;
    if (categoryCombo === "todos") {
      return arr;
    } else {
      const prodsList = arr.filter(
        (product) => categoryCombo === product.category
      );
      return prodsList;
    }
  }
  filterProducts() {
    const brands = this.getBrandsChecked();
    const orderers = this.getOrdererChecked();

    if (this.boolean) {
      if (
        !brands.length &&
        !orderers.length &&
        this.comboboxFilter.value === "todos"
      ) {
        return this.Prodsearcheads;
      } else if (!brands.length) {
        const products = this.sortProducts(
          this.filterCombox(this.Prodsearcheads)
        );
        return products;
      } else {
        const products = this.filterBrands(this.Prodsearcheads);
        return this.sortProducts(this.filterCombox(products));
      }
    } else {
      if (
        !brands.length &&
        !orderers.length &&
        this.comboboxFilter.value === "todos"
      ) {
        this.showMoreBtn.classList.remove("hidden");
        return appState.products[0];
      } else if (!brands.length) {
        const products = this.sortProducts(this.filterCombox(productsData));
        this.showMoreBtn.classList.add("hidden");
        return products;
      } else {
        const products = this.filterBrands(productsData);
        this.showMoreBtn.classList.add("hidden");
        return this.sortProducts(this.filterCombox(products));
      }
    }
  }
  renderProductsFiltereads(products, container) {
    container.innerHTML = "";
    if (!products.length) {
      this.containerProds.innerHTML = `<p class="container--message">¡no hay productos con estas caracteristicas!</p>`;
    } else {
      renderProducts(products, container);
    }
  }
  toggleChecker = (e) => {
    if (e.target.classList.contains("rate-filter")) {
      this.toggleCheckerRate(e);
    } else if (e.target.classList.contains("price-filter")) {
      this.toggleCheckerPrice(e);
    } else if (e.target.classList.contains("btn--filtrar")) {
      this.renderProductsFiltereads(this.filterProducts(), this.containerProds);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      return;
    }
  };
  init() {
    this.filterContainer.addEventListener("click", this.toggleChecker);
  }
}

// const sortProducts = (prodlist) => {
//   const arr = prodlist;
//   if (filterInputRateless.checked && filterInputPriceless.checked) {
//     return arr.sort((a, b) => {
//       if (b.rate !== a.rate) {
//         return a.rate - b.rate;
//       } else {
//         return a.price - b.price;
//       }
//     });
//   } else if (filterInputRateless.checked && filterInputPriceup.checked) {
//     return arr.sort((a, b) => {
//       if (b.rate !== a.rate) {
//         return a.rate - b.rate;
//       } else {
//         return b.price - a.price;
//       }
//     });
//   } else if (filterInputRateup.checked && filterInputPriceless.checked) {
//     return arr.sort((a, b) => {
//       if (b.rate !== a.rate) {
//         return b.rate - a.rate;
//       } else {
//         return a.price - b.price;
//       }
//     });
//   } else if (filterInputRateup.checked && filterInputPriceup.checked) {
//     return arr.sort((a, b) => {
//       if (b.rate !== a.rate) {
//         return b.rate - a.rate;
//       } else {
//         return b.price - a.price;
//       }
//     });
//   } else if (filterInputPriceup.checked) {
//     return arr.sort((a, b) => {
//       return b.price - a.price;
//     });
//   } else if (filterInputRateup.checked) {
//     return arr.sort((a, b) => {
//       return b.rate - a.rate;
//     });
//   } else if (filterInputPriceless.checked) {
//     return arr.sort((a, b) => {
//       return a.price - b.price;
//     });
//   } else if (filterInputRateless.checked) {
//     return arr.sort((a, b) => {
//       return a.rate - b.rate;
//     });
//   } else {
//     return arr;
//   }
// };
// // const getOrdererChecked = () => {
// //   let orderers = [];
// //   ordererInputs.forEach((orderer) => {
// //     if (orderer.checked) {
// //       orderers.push(1);
// //     }
// //   });
// //   return orderers;
// // };
// // // const getBrandsChecked = () => {
// // //   let brands = [];
// // //   brandFilters.forEach((brand) => {
// // //     if (brand.checked) {
// // //       brands.push(brand.value);
// // //     }
// // //   });
// // //   return brands;
// // // };
// // const filterBrands = (arr) => {
// //   const array = arr;
// //   const brands = getBrandsChecked();
// //   if (brands.length === 0) {
// //     return array;
// //   } else {
// //     return array.filter((product) => {
// //       return brands.includes(product.brand);
// //     });
// //   }
// // };

// // const toggleCheckerRate = (e) => {
// //   if (e.target.classList.contains("rateup")) {
// //     filterInputRateless.checked = false;
// //   } else {
// //     filterInputRateup.checked = false;
// //   }
// // };
// // const toggleCheckerPrice = (e) => {
// //   if (e.target.classList.contains("priceup")) {
// //     filterInputPriceless.checked = false;
// //   } else {
// //     filterInputPriceup.checked = false;
// //   }
// // };
// // const filterCombox = (arr) => {
// //   const categoryCombo = comboboxFilter.value;
// //   if (categoryCombo === "todos") {
// //     return arr;
// //   } else {
// //     const prodsList = arr.filter(
// //       (product) => categoryCombo === product.category
// //     );
// //     return prodsList;
// //   }
// // };
// // const filterProducts = () => {
// //   const brands = getBrandsChecked();
// //   const orderers = getOrdererChecked();

// //   if (boolean) {
// //     if (
// // //       !brands.length &&
// // //       !orderers.length &&
// //       comboboxFilter.value === "todos"
// //     ) {
// //       return Prodsearcheads;
// //     } else if (!brands.length) {
// //       const products = sortProducts(filterCombox(Prodsearcheads));
// //       return products;
// //     } else {
// //       const products = filterBrands(Prodsearcheads);
// //       return sortProducts(filterCombox(products));
// //     }
// //   } else {
// //     if (
// //       !brands.length &&
// //       !orderers.length &&
// //       comboboxFilter.value === "todos"
// //     ) {
// //       showMoreBtn.classList.remove("hidden");
// //       return appState.products[0];
// //     } else if (!brands.length) {
// //       const products = sortProducts(filterCombox(productsData));
// //       showMoreBtn.classList.add("hidden");
// //       return products;
// //     } else {
// //       const products = filterBrands(productsData);
// //       showMoreBtn.classList.add("hidden");
// //       return sortProducts(filterCombox(products));
// //     }
// //   }
// // };
// // const renderProductsFiltereads = (products, container) => {
// //   container.innerHTML = "";
// //   if (!products.length) {
// //     containerProds.innerHTML = `<p class="container--message">¡no hay productos con estas caracteristicas!</p>`;
// //   } else {
// //     renderProducts(products, container);
// //   }
// // };
// // const toggleChecker = (e) => {
// //   if (e.target.classList.contains("rate-filter")) {
// //     toggleCheckerRate(e);
// //   } else if (e.target.classList.contains("price-filter")) {
// //     toggleCheckerPrice(e);
// //   } else if (e.target.classList.contains("btn--filtrar")) {
// //     renderProductsFiltereads(filterProducts(), containerProds);
// //     window.scrollTo({
// //       top: 0,
// //       behavior: "smooth",
// //     });
// //   } else {
// //     return;
// //   }
// // };
