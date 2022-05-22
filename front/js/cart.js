const urlKanap = "http://localhost:3000/api/products/order";
let saveInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(saveInLocalStorage);
let productArray = [];
const itemPosition = document.querySelector("#cart__items");

if (saveInLocalStorage === null || saveInLocalStorage == 0) {
  window.location.hash = "card__title";
  itemPosition.innerHTML = "Votre panier est vide.";
  alert(
    "Votre panier est vide. Allez sur la page d'accueil pour choisir vos articles !"
  );
  localStorage.removeItem("product", JSON.stringify(product));
  window.location.href = "index.html";
} else {
  for (let product in saveInLocalStorage) {
    //Ajout de l'élément "article" avec récupération de l'id
    let productArticle = document.createElement("article");
    productArticle.classList.add("cart__item");
    productArticle.setAttribute(
      "data-id",
      "{saveInLocalStorage[product].productId}"
    );
    productArray.push(saveInLocalStorage[product].productId);

    //Ajout de l'élément "div"
    productArticle.innerHTML = `<div class="cart__item__img">
            <img src="${saveInLocalStorage[product].productImg}" alt="${saveInLocalStorage[product].productImg_alt}">
            </div>
         <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
                <h2>${saveInLocalStorage[product].productName} - ${saveInLocalStorage[product].productColors}</h2>
                <p>${saveInLocalStorage[product].productPrice} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${saveInLocalStorage[product].productQuantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>`;
    itemPosition.appendChild(productArticle);

    updateCart(product);
  }
}

function updateCart() {
  var itemQuantity = document.querySelectorAll(".itemQuantity");
  var lengthQuantity = itemQuantity.length,
    totalQuantity = 0;

  for (var i = 0; i < lengthQuantity; ++i) {
    totalQuantity += itemQuantity[i].valueAsNumber;
  }

  let productTotalQuantity = document.querySelector("#totalQuantity");
  productTotalQuantity.innerHTML = totalQuantity;
  console.log(totalQuantity);

  totalPrice = 0;

  for (var i = 0; i < lengthQuantity; ++i) {
    totalPrice +=
      itemQuantity[i].valueAsNumber * saveInLocalStorage[i].productPrice;
  }

  let productTotalPrice = document.querySelector("#totalPrice");
  productTotalPrice.innerHTML = totalPrice;
  console.log(totalPrice);
}

updateCart();

function ChangeQuantity() {}
