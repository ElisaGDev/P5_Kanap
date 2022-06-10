//Récupération de l'Id dans l'URL
let str = new URL(window.location.href);
let productId = str.searchParams.get("id");

// Affichage du numéro de commande
const orderId = document.querySelector("#orderId");
orderId.textContent = productId;
//console.log(localStorage);

//Efface la commande du LocalStorage
localStorage.removeItem("product");
//console.log(localStorage);
