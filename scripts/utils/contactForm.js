const form = document.querySelector("form")
const firstName = document.getElementById("prenom_input");
const firstError = document.getElementById("firstError")
const lastName = document.getElementById("nom_input");
const lastError = document.getElementById("lastError")
const emailAdress = document.getElementById("mail_input");
const main = document.querySelector('main');
const formulaire = document.querySelector('#formulaire');
const modal = document.getElementById("contact_modal");
const modalContent = document.querySelector(".modal-content")
const messageValidation = document.querySelector('.message-validation')

//Controle du format du mail
const mailError = document.getElementById("mailError");
const mailRegex = /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;

function displayModal() {
    modal.style.display = "block";
    modalContent.style.display = "flex";
    main.onkeydown = function () {
        return false;
    }
    //body.classList.add('no-scroll');
}

function closeModal() {
    modal.style.display = "none";
    modalContent.style.display = "none";
    messageValidation.style.display = "none";
    //body.classList.remove('no-scroll');
    clearInput();
    main.onkeydown = function () {
        return true;
    }
}

window.addEventListener("keydown", (e) => {
    if (modal.style.display = "block" && e.key === "Escape") {
        closeModal();
    }
})

const clearInput = () => {
    //Réinitialise les inputs
    form.reset();

    //Suppression des cadres rouges
    const resetErrorBorder = document.querySelectorAll('input')
    resetErrorBorder.forEach((element) => {
        element.classList.remove('errorForm');
    });

    //Suppression des messages d'erreur
    const resetErrorMessage = document.querySelectorAll('.result')
    resetErrorMessage.forEach((message) => {
        message.innerHTML = '';
    });
};

function firstNameValidation() {
    //Réinitialise les messages d'erreur
    firstError.innerHTML = ' ';
    firstError.classList.remove('errorStyle');
    firstName.classList.remove('errorForm');
    //Chaque fois que l'utilisateur saisit quelque chose
    //On vérifie la validité du champ prénom
    //Si rien n'est écrit ou s'il n'y a que des espaces
    if (firstName.value.trim().length == 0) {
        firstError.innerHTML = 'Réponse obligatoire!'; //ajout du message
        firstError.classList.add('errorStyle'); //ajout d'une class au message d'erreur
        firstName.classList.add('errorForm'); //ajout d'une class a la zone d'entrée
        return false;
        //s'il y a moins de 2 caracteres ou que des espaces
    } else if (firstName.value.trim().length < 2) {
        firstError.innerHTML = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';
        firstError.classList.add('errorStyle');
        firstName.classList.add('errorForm');
        return false;
        //si toutes les conditions sont remplies
    } else {
        firstError.innerHTML = ' ';
        return true;
    }
};

//Controle d'entrée du nom
function lastNameValidation() {
    //Réinitialise les messages d'erreur
    lastError.innerHTML = ' ';
    lastError.classList.remove('errorStyle')
    lastName.classList.remove('errorForm')
    // Chaque fois que l'utilisateur saisit quelque chose
    // on vérifie la validité du champ
    //si rien n'est écrit ou s'il n'y a que des espaces (.trim())
    if (lastName.value.trim().length == 0) {
        lastError.innerHTML = 'Réponse obligatoire!'; //ajout du message
        lastError.classList.add('errorStyle') //ajout d'une class au message d'erreur
        lastName.classList.add('errorForm') //ajout d'une class a la zone d'entrée
        return false
        //s'il y a moins de 2 caractères ou que des espaces
    } else if (lastName.value.trim().length < 2) {
        lastError.innerHTML = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
        lastError.classList.add('errorStyle')
        lastName.classList.add('errorForm')
        return false
        //si toutes les conditions sont remplies
    } else {
        lastError.innerHTML = ' ';
        return true
    }
};

//Controle email
//Reinitialisation
function mailValidation() {
    mailError.innerHTML = '';
    mailError.classList.remove('errorStyle');
    emailAdress.classList.remove('errorForm');

    //Si rien n'a été indiqué
    if (emailAdress.value == "") {
        mailError.innerHTML = 'Entrez une adresse mail.';
        mailError.classList.add('errorStyle');
        emailAdress.classList.add('errorForm');
        return false;
        //Si la valeur du mail ne correspond pas au standard
    } else if (!emailAdress.value.match(mailRegex)) {
        mailError.innerHTML = 'Adresse mail invalide.';
        mailError.classList.add('errorStyle')
        emailAdress.classList.add('errorForm')
        return false;
    }

    else {
        mailError.innerHTML = '';
        return true;
    }
}

//Ecoute des evenements dans chaque input et lance la fonction associée
firstName.addEventListener('input', firstNameValidation);
lastName.addEventListener('input', lastNameValidation);
emailAdress.addEventListener('input', mailValidation);

//Envoi du formulaire
formulaire.addEventListener('submit', (event) => {
    event.preventDefault();
    firstNameValidation();
    lastNameValidation();
    mailValidation();

    // Verifie si toutes les conditions sont remplies
    // C'est a dire "true"
    if (
        firstNameValidation() == true &&
        lastNameValidation() == true &&
        mailValidation() == true
    ) {
        //Si tout est bon, on enleve le formulaire et affiche le message de validation
        modalContent.style.display = "none";
        messageValidation.style.display = "flex";
        // clearInput()
        return true;
    } else {
        return false;
    }
})