let productsURL = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE;

fetch(productsURL)
  .then((respuesta) => {
    console.log(respuesta);
    return respuesta.json();
  })
  .then((resultadoObj) => {
    showProductsList(resultadoObj.products);
  });

function showProductsList(productsArray) {
  let htmlLista = "";
  for (let p of productsArray) {
    htmlLista += ` 
 <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex align-items-start justify-content-between">
      <img src="${p.image}" style="height: 5rem;" class="me-3"> 
      <div class="w-100">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${p.name}</h5>
          <small class="text-end">${p.soldCount} vendidos</small>
        </div>
        <p class="mb-1">${p.description}</p>
        <h5>${p.currency}${new Intl.NumberFormat("es-ES").format(p.cost)}</h5>
      </div>
    </div>
  </a>  
</div>

`;
  }
  document.getElementById("lproduct").innerHTML = htmlLista;
}

//Llamamos a la función dentro de un evento para que se ejecute después de que se haya cargado todo.
document.addEventListener("DOMContentLoaded", (e) => {
  getJSONData(PRODUCTS_URL + EXT_TYPE).then((object) => {
    if (object.status === "ok") {
      let productsArray = object.data.products;
      showProductsList(productsArray);
    }
  });
});


// Variables globales
let currentProductsArray = [];

// Filtrar por rango de precio
document.getElementById("filterPrice").addEventListener("click", function() {
    let minPrice = document.getElementById("minPrice").value;
    let maxPrice = document.getElementById("maxPrice").value;

    // Filtrar productos según los precios
    let filteredProducts = currentProductsArray.filter(product => {
        let price = product.cost;
        return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
    });

    // Mostrar los productos filtrados
    showProductsList(filteredProducts);
});

document.getElementById("clearFilters").addEventListener("click", function() {
    // Limpiar los campos de filtro y mostrar todos los productos
    document.getElementById("minPrice").value = "";
    document.getElementById("maxPrice").value = "";
    showProductsList(currentProductsArray);
});

// Función para ordenar productos
function sortProducts(criteria, array) {
    let sortedArray = [];
    if (criteria === "asc") {
        sortedArray = array.sort((a, b) => a.cost - b.cost);
    } else if (criteria === "desc") {
        sortedArray = array.sort((a, b) => b.cost - a.cost);
    } else if (criteria === "relevance") {
        sortedArray = array.sort((a, b) => b.soldCount - a.soldCount);
    }
    return sortedArray;
}

// Funciones para manejar los botones de orden
document.getElementById("sortAsc").addEventListener("click", function() {
    let sortedProducts = sortProducts("asc", currentProductsArray);
    showProductsList(sortedProducts);
});

document.getElementById("sortDesc").addEventListener("click", function() {
    let sortedProducts = sortProducts("desc", currentProductsArray);
    showProductsList(sortedProducts);
});

document.getElementById("sortByRelevance").addEventListener("click", function() {
    let sortedProducts = sortProducts("relevance", currentProductsArray);
    showProductsList(sortedProducts);
});

// Cargar productos al inicio
document.addEventListener("DOMContentLoaded", function() {
    const catID = localStorage.getItem("catID");
    if (catID) {
        getJSONData(PRODUCTS_URL + catID + EXT_TYPE).then(function(resultObj) {
            if (resultObj.status === "ok") {
                currentProductsArray = resultObj.data.products;
                showProductsList(currentProductsArray);
            }
        });
    }
});
;

document.getElementById("searchBar").addEventListener("input", function() {
  let searchQuery = this.value.toLowerCase();

  let filteredProducts = currentProductsArray.filter(product => {
      let productName = product.name.toLowerCase();
      let productDescription = product.description.toLowerCase();
      return productName.includes(searchQuery) || productDescription.includes(searchQuery);
  });

  showProductsList(filteredProducts);
});

