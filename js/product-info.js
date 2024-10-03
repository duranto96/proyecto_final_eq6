let productINFOURL =
  PRODUCT_INFO_URL + localStorage.getItem("productId") + EXT_TYPE;
let productCommentsURL =
  PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productId") + EXT_TYPE;

// Función para mostrar el producto
function showProduct(product) {
  let htmlProduct = " ";

  htmlProduct += `<div id="imagenes-chicas" class="col-xs-12 col-md-2">`;

  for (let i = 1; i < product.images.length; i++) {
    const img = product.images[i];
    htmlProduct += `
                    <img src="${img}" alt="Imágenes secundarias del producto" class="img-fluid">
                  `;
  }

  htmlProduct += `</div>`;

  htmlProduct += `<div id="imagenGrande" class="col-xs-12 col-md-7">
                <img src="${product.images[0]}" alt="Imagen principal del producto">
              </div>`;

  htmlProduct += `<div id="info" class="col-xs-12 col-md-3">
                    <h6> Categoría ${product.category}</h6>
                    <h7> ${product.soldCount} Unidades vendidas</h7>
                    <h2>${product.name}</h2>
                    <p><strong>Precio:</strong> $${product.currency}${new Intl.NumberFormat("es-ES").format(product.cost)}</p>
                    <button class="btn btn-primary">Agregar al carrito</button>
                  </div>`;

  htmlProduct += `<div id="Descripción" class="col-xs-12 col-md-9">
<p><strong>Descripción</strong></p>
<p>${product.description}</p>`;

  document.getElementById("product").innerHTML = htmlProduct;
}

// Función para mostrar los comentarios
function showComments(commentsArray) {
  let htmlComments = "";
  for (let comment of commentsArray) {
    htmlComments += `
            <div class="comment">
                <p><strong>${comment.user}</strong> - <span>${comment.dateTime}</span></p>
                <p>${comment.description}</p>
                <div class="rating">
                    ${getStarsHTML(comment.score)}
                </div>
            </div>
        `;
  }
  document.getElementById("comments").innerHTML = htmlComments;
}

// Función auxiliar para generar las estrellas de calificación
function getStarsHTML(score) {
  let starsHTML = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= score) {
      starsHTML += `<span class="fa fa-star checked"></span>`;
    } else {
      starsHTML += `<span class="fa fa-star"></span>`;
    }
  }
  return starsHTML;
}

// Obtener los comentarios usando getJSONData dentro del evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", (e) => {
  getJSONData(productCommentsURL).then((object) => {
    if (object.status === "ok") {
      let commentsArray = object.data;
      showComments(commentsArray);
    }
  });
});

// Agregar la funcionalidad para enviar la calificación
document.getElementById("rating-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const ratingValue = document.getElementById("new-rating").value;
  const commentValue = document.getElementById("new-comment").value;

  const username = localStorage.getItem("username") || "Usuario Anónimo";

  const newComment = {
    score: parseInt(ratingValue),
    description: commentValue,
    user: username,
    dateTime: new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date()),
  };

  const comments = document.getElementById("comments");
  comments.innerHTML += `
    <div class="comment">
        <p><strong>${newComment.user}</strong> - <span>${newComment.dateTime}</span></p>
        <p>${newComment.description}</p>
        <div class="rating">
            ${getStarsHTML(newComment.score)}
        </div>
    </div>
  `;

  document.getElementById("new-rating").value = "";
  document.getElementById("new-comment").value = "";
});

function showRelatedProducts(relatedProducts) {
  let htmlRelated = '';

  relatedProducts.forEach(product => {
      htmlRelated += `
          <div class="col-4">
              <div class="card related-product-card">
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

