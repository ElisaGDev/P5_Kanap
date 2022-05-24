const urlKanap = "http://localhost:3000/api/products/order";
let saveInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(saveInLocalStorage);
let productArray = [];
const itemPosition = document.querySelector("#cart__items");

//Quand le panier est vide
if (saveInLocalStorage === null || saveInLocalStorage == 0) {
  window.location.hash = "card__title";
  itemPosition.innerHTML = "Votre panier est vide.";
  alert(
    "Votre panier est vide. Allez sur la page d'accueil pour choisir vos articles !"
  );
  localStorage.removeItem(
    "saveInLocalStorage",
    JSON.stringify(saveInLocalStorage)
  );
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

    //Ajout des éléments HTML
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

changeQuantity();
deleteProduct();

//**************************************** FONCTIONS ****************************************/

//Mis à jour du panier quand la quantité est modifié ou supprimé
function updateCart(product) {
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

//Mise à jour du panier quand on modifie la quantité
function changeQuantity() {
  let itemQuantity = document.getElementsByClassName("itemQuantity");
  console.log(itemQuantity);

  for (let q = 0; q < itemQuantity.length; q++) {
    let changeQuantity = itemQuantity[q];
    //Mise à jour auto au moment de changer la valeur de l'input
    changeQuantity.addEventListener("input", (event) => {
      itemQuantity.innerHTML += `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" 
            value="${event.target.value}">`;

      saveInLocalStorage[q].productQuantity = Number(changeQuantity.value);

      localStorage.setItem("product", JSON.stringify(saveInLocalStorage));

      updateCart(q);
    });
  }
}

//Supprimer un produit du panier
function deleteProduct() {
  let btn_delete = document.querySelectorAll(".deleteItem");
  console.log(btn_delete);

  for (let i = 0; i < btn_delete.length; i++) {
    let deleteOne = btn_delete[i];

    deleteOne.addEventListener("click", (event) => {
      saveInLocalStorage.splice(i, 1);
      localStorage.setItem("product", JSON.stringify(saveInLocalStorage));
      alert("Ce produit a bien été supprimé du panier.");
      window.location.reload();
    });
  }
}

//Validation du formulaire
function formValidation() {
  let form = document.querySelector("#order");

  //Identification des champs du formulaire
  let firstName = document.querySelector("#firstName");
  let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

  let lastName = document.querySelector("#lastName");
  let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

  let address = document.querySelector("#address");
  let addressErrorMsg = document.querySelector("#addressErrorMsg");

  let city = document.querySelector("#city");
  let cityErrorMsg = document.querySelector("#cityErrorMsg");

  let email = document.querySelector("#email");
  let emailErrorMsg = document.querySelector("#emailErrorMsg");

  //Création des regex
  let nameRegex = new RegExp("^[a-zA-Z ,.'-]+$");
  let emailRegex = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let locationRegex = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  //Ecoute du changement pour chaque champ de formulaire
  firstName.addEventListener("change", (Event) => {
    if (nameRegex.test(firstName.value) == true) {
      firstNameErrorMsg.innerHTML = " ";
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner le prénom";
    }
  });

  lastName.addEventListener("change", (Event) => {
    if (nameRegex.test(lastName.value) == true) {
      lastNameErrorMsg.innerHTML = " ";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner le nom de famille";
    }
  });

  city.addEventListener("change", (Event) => {
    if (locationRegex.test(city.value) == true) {
      cityErrorMsg.innerHTML = " ";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner votre ville";
    }
  });

  address.addEventListener("change", (Event) => {
    if (locationRegex.test(address.value) == true) {
      addressErrorMsg.innerHTML = " ";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner votre adresse postale";
    }
  });

  email.addEventListener("change", (Event) => {
    if (emailRegex.test(email.value) == true) {
      emailErrorMsg.innerHTML = " ";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre adresse email";
    }
  });
}
formValidation();

//Envoi des informations au localStorage
