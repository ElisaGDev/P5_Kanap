function validFirstName() {
  firstName.addEventListener("change", function () {
    testFirstName = nameRegex.test(firstName.value);
    if (firstName.value == "") {
      testFirstName = false;
    } else if (testFirstName == false) {
      firstNameErrorMsg.textContent =
        "Prénom invalide, ne doit pas contenir de chiffre ou de caractères spéciaux";
    } else if (testFirstName == true) {
      firstNameErrorMsg.textContent = "";
    }
  });
}

function validLastName() {
  lastName.addEventListener("change", function () {
    testFirstName = nameRegex.test(lastName.value);
    if (lastName.value == "") {
      testFirstName = false;
    } else if (testFirstName == false) {
      lastNameErrorMsg.textContent =
        "Prénom invalide, ne doit pas contenir de chiffre ou de caractères spéciaux";
    } else if (testFirstName == true) {
      lastNameErrorMsg.textContent = "";
    }
  });
}

function validAddress() {
  address.addEventListener("change", function () {
    testAddress = addressRegex.test(address.value);
    if (address.value == "") {
      testAddress = false;
    } else if (testAddress == false) {
      addressErrorMsg.textContent =
        "Prénom invalide, ne doit pas contenir de chiffre ou de caractères spéciaux";
    } else if (testAddress == true) {
      addressErrorMsg.textContent = "";
    }
  });
}

function validCity() {
  city.addEventListener("change", function () {
    testCity = cityRegex.test(city.value);
    if (city.value == "") {
      testCity = false;
    } else if (testCity == false) {
      cityErrorMsg.textContent =
        "Prénom invalide, ne doit pas contenir de chiffre ou de caractères spéciaux";
    } else if (testCity == true) {
      cityErrorMsg.textContent = "";
    }
  });
}

function validEmail() {
  email.addEventListener("change", function () {
    testEmail = emailRegex.test(email.value);
    if (email.value == "") {
      testEmail = false;
    } else if (testEmail == false) {
      emailErrorMsg.textContent =
        "Prénom invalide, ne doit pas contenir de chiffre ou de caractères spéciaux";
    } else if (testEmail == true) {
      emailErrorMsg.textContent = "";
    }
  });
}

//Valide le formulaire
/*function formValidation() {
    let check = true;
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
        check = false;
      }
    });
    lastName.addEventListener("change", (Event) => {
      if (nameRegex.test(lastName.value) == true) {
        lastNameErrorMsg.innerHTML = " ";
      } else {
        lastNameErrorMsg.innerHTML = "Le nom ne comporte que des lettres";
        return false;
      }
    });
    address.addEventListener("change", (Event) => {
      if (addressRegex.test(address.value) == true) {
        addressErrorMsg.innerHTML = " ";
      } else {
        addressErrorMsg.innerHTML =
          "Le format de l'adresse n'est pas correct (ex: 1 rue de l'église)";
        return false;
      }
    });
    city.addEventListener("change", (Event) => {
      if (cityRegex.test(city.value) == true) {
        cityErrorMsg.innerHTML = " ";
      } else {
        cityErrorMsg.innerHTML = "La ville ne comporte que des lettres";
        return false;
      }
    });
    email.addEventListener("change", (Event) => {
      if (emailRegex.test(email.value) == true) {
        emailErrorMsg.innerHTML = " ";
      } else {
        emailErrorMsg.innerHTML =
          "Le format de l'adresse n'est pas correct (ex: nom@domaine.fr)";
        return false;
      }
    });
  }
  formValidation();
  
  //Envoi des informations au localStorage
  function formPost() {
    const btnOrder = document.querySelector("#order");
  
    btnOrder.addEventListener("click", (event) => {
      event.preventDefault();
      if (saveInLocalStorage !== null && formValidation() == true) {
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
  formPost();*/
