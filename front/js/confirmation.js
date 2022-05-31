//Récupérer l'Id dans l'URL
let str = new URL(window.location.href);
let productId = str.searchParams.get("id");

// Affiche le numéro de commande
const orderId = document.querySelector("#orderId");
orderId.textContent = productId;
//console.log(localStorage);

//Efface la commande du LocalStorage
localStorage.removeItem("product");
