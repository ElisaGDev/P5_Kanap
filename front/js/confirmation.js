//Récupérer l'Id dans l'URL

let str = new URL(window.location.href);
let productId = str.searchParams.get("id");

// Afficher le numéro de commande
const orderId = document.querySelector("#orderId");
orderId.textContent = productId;
//console.log(localStorage);

//Effacer la commande du LocalStorage
localStorage.removeItem("product");
