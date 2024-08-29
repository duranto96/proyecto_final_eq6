function getProducts(url) {
  return fetch(url)
    .then((respuesta) => {
      console.log(respuesta);
      return respuesta.json();
    })
    .then((resultadoObj) => {
      showProductsList(resultadoObj.products);
    });
}

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
document.addEventListener("DOMContentLoaded", function (e) {
  getProducts(
    "https://japceibal.github.io/emercado-api/cats_products/101.json"
  );
});
