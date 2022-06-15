const urlKanap = "http://localhost:3000/api/products/order";
//Importation du localStorage
let saveInLocalStorage = JSON.parse(localStorage.getItem("product"));
//console.table(saveInLocalStorage);

//Création d'un tableau pour le panier
let productArray = [];
const itemPosition = document.querySelector("#cart__items");

//Récupèration des informations et affichage dans le panier
//Quand le panier est vide
if (saveInLocalStorage === null || saveInLocalStorage == 0) {
  alert(
    "Votre panier est vide. Allez sur la page d'accueil pour choisir vos articles !"
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

//Mise à jour de la quantité totale du panier
function updateCart(product) {
  var itemQuantity = document.querySelectorAll(".itemQuantity");

  //Déclare une variable qui récupère le nombre de produits différents dans le panier
  var lengthQuantity = itemQuantity.length,
    totalQuantity = 0;

  //Ajoute la valeur pour chaque produit à la quantité totale
  for (var i = 0; i < lengthQuantity; ++i) {
    totalQuantity += itemQuantity[i].valueAsNumber;
  }

  //On implémente la quantité totale à l'élément HTML
  let productTotalQuantity = document.querySelector("#totalQuantity");
  productTotalQuantity.innerHTML = totalQuantity;
  //console.log(totalQuantity);
  totalPrice = 0;

  //Calcul du total
  for (var i = 0; i < lengthQuantity; ++i) {
    totalPrice +=
      itemQuantity[i].valueAsNumber * saveInLocalStorage[i].productPrice;
  }

  let productTotalPrice = document.querySelector("#totalPrice");
  productTotalPrice.innerHTML = totalPrice;
  //console.log(totalPrice);
}

//Mise à jour du panier quand on modifie la quantité pour chaque produit
function changeQuantity() {
  let itemQuantity = document.getElementsByClassName("itemQuantity");
  //console.log(itemQuantity);
  for (let q = 0; q < itemQuantity.length; q++) {
    let changeQuantity = itemQuantity[q];
    //Mise à jour au moment de changer la valeur de l'input
    changeQuantity.addEventListener("input", (event) => {
      itemQuantity.innerHTML += `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" 
            value="${event.target.value}">`;

      changeQuantity.addEventListener("change", (event) => {
        if (event.target.value > 100) event.target.value = 100;
        if (event.target.value < 0) event.target.value = 0;
      });

      saveInLocalStorage[q].productQuantity = Number(changeQuantity.value);

      localStorage.setItem("product", JSON.stringify(saveInLocalStorage));

      updateCart(q);
    });
  }
}

//Suppression d'un produit du panier grâce au bouton
function deleteProduct() {
  let btn_delete = document.querySelectorAll(".deleteItem");
  //console.log(btn_delete);

  for (let i = 0; i < btn_delete.length; i++) {
    let deleteOne = btn_delete[i];

    //Ecoute du bouton "Supprimer"
    deleteOne.addEventListener("click", (event) => {
      saveInLocalStorage.splice(i, 1);
      localStorage.setItem("product", JSON.stringify(saveInLocalStorage));
      alert("Ce produit a bien été supprimé du panier.");
      window.location.reload();
    });
  }
}

//Valide le formulaire
function formValidation() {
  let form = document.querySelector("#order");

  //Identifie les champs du formulaire
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

  //Création des expressions régulières
  let nameRegex = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç_. -]{2,30}$");
  let emailRegex = new RegExp(
    "^[_]*([a-z0-9]+(.|_*)?)+@([a-z][a-z0-9-]+(.|-*.))+[a-z]{2,6}$"
  );
  let addressRegex = new RegExp(
    "^[0-9]{1,3}(?:(?:[,.' ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+$"
  );
  let cityRegex = new RegExp(
    "^([a-zA-Zàâäéèêëïîôöùûüç]+(?:. |-| |'))*[a-zA-Zàâäéèêëïîôöùûüç]*$"
  );

  //Ecoute du changement pour chaque champ de formulaire
  firstName.addEventListener("change", (Event) => {
    if (nameRegex.test(firstName.value) == true) {
      firstNameErrorMsg.innerHTML = " ";
    } else {
      firstNameErrorMsg.innerHTML = "Le prénom ne comporte que des lettres";
    }
  });
  lastName.addEventListener("change", (Event) => {
    if (nameRegex.test(lastName.value) == true) {
      lastNameErrorMsg.innerHTML = " ";
    } else {
      lastNameErrorMsg.innerHTML = "Le nom ne comporte que des lettres";
    }
  });
  address.addEventListener("change", (Event) => {
    if (addressRegex.test(address.value) == true) {
      addressErrorMsg.innerHTML = " ";
    } else {
      addressErrorMsg.innerHTML =
        "Le format de l'adresse n'est pas correct (ex: 1 rue de l'église)";
    }
  });
  city.addEventListener("change", (Event) => {
    if (cityRegex.test(city.value) == true) {
      cityErrorMsg.innerHTML = " ";
    } else {
      cityErrorMsg.innerHTML = "La ville ne comporte que des lettres";
    }
  });
  email.addEventListener("change", (Event) => {
    if (emailRegex.test(email.value) == true) {
      emailErrorMsg.innerHTML = " ";
    } else {
      emailErrorMsg.innerHTML =
        "Le format de l'adresse n'est pas correct (ex: nom@domaine.fr)";
    }
  });
}
formValidation();

//Envoi des informations au localStorage
function formPost() {
  const btnOrder = document.querySelector("#order");

  btnOrder.addEventListener("click", (event) => {
    event.preventDefault();

    if (saveInLocalStorage !== null) {
      let productsOrder = [];
      for (let i = 0; i < saveInLocalStorage.length; i++) {
        productsOrder.push(saveInLocalStorage[i].productId);
      }

      const valuesOrder = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products: productsOrder,
      };

      // Requête POST sur l'API
      const options = {
        method: "POST",
        body: JSON.stringify(valuesOrder),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      fetch("http://localhost:3000/api/products/order", options)
        .then((results) => results.json())
        .then((data) => {
          // Renvoi de l'orderID dans l'URL
          document.location.href = "confirmation.html?id=" + data.orderId;
        })
        .catch(function (error) {
          console.log("Erreur fetch" + error);
        });
    } else {
      alert("Veuillez compléter le formulaire");
    }
  });
}
formPost();
