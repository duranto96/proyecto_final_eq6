let productINFOURL = PRODUCT_INFO_URL + localStorage.getItem("productId") + EXT_TYPE;

fetch(productINFOURL)
    .then((respuesta) => {
        console.log(respuesta);
        return respuesta.json();
    })
    .then((resultadoObj) => {
        showProduct(resultadoObj);
    });




function showProduct(product) {
    let htmlProduct = " ";
   
    htmlProduct += `<div id="imagenes-chicas" class="col-2">`

    for (let i = 1; i < product.images.length; i++) {
        const img = product.images[i];
        htmlProduct += `
        
                    <img src="${img}" alt="Imágenes secundarias del producto">
                  `;
                }

        htmlProduct += `</div>`
    
                htmlProduct +=  `<div id="imagenGrande" class="col-7">
                <img src="${product.images[0]}" alt="Imagen principal del producto">
              </div>`;

        htmlProduct += `<div id="info" class="col-3">
                    <h6> Categoría ${product.category}</h6>
                    <h7> ${product.soldCount} Unidades vendidas</h7>
                    <h2>${product.name}</h2>
                    <p><strong>Precio:</strong> ${product.currency}${new Intl.NumberFormat("es-ES").format(product.cost)}</p>
                    <button class="btn btn-primary">Agregar al carrito</button>
                  </div>`;

htmlProduct+= `<div id="Descripción" class="col-9">
<p><strong>Descripción</strong></p>
<p>${product.description}</p>`;

        document.getElementById("product").innerHTML = htmlProduct;
    

    

    function listenForListGroupClicks() {
        const listGroups = document.querySelectorAll('.list-group');

        listGroups.forEach(listGroup => {
            listGroup.addEventListener('click', (event) => {
                if (event.target.classList.contains('list-group-item')) {
                    window.location.href = 'product-info.html';
                }
            });
        });
    }

    // Llamamos a la función para que se ejecute al cargar la página
    document.addEventListener('DOMContentLoaded', listenForListGroupClicks);
  } 

function showRelatedProducts(relatedProducts) {
    let htmlRelated = '';

    relatedProducts.forEach(product => {
        htmlRelated += `
            <div class="col-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <a href="#" class="btn btn-primary" onClick="mostrarRelacionado(${product.id})">Ver</a>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById("related-products").innerHTML = htmlRelated;
}

function mostrarRelacionado(id) {
    localStorage.setItem("productId", id); 
    window.location.href = "product-info.html"; 
} 

getJSONData(productINFOURL).then(function(result) {
    if (result.status === "ok") {
        let productData = result.data;
        showProduct(productData);
        showRelatedProducts(productData.relatedProducts);
    } else {
        console.error("Error al obtener los datos del producto");
    }
});
