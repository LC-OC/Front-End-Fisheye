// DOM Form

const pValidation = document.querySelectorAll('.validation');
const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputEmail = document.getElementById("email");
const textArea = document.getElementById("yourMessage");
const pValidationFirstName = document.getElementById('validationFirstName');
const pValidationLastName = document.getElementById('validationLastName');
const pValidationEmail = document.getElementById('validationEmail');
const pValidationMessage = document.getElementById('validationMessage');
const modal = document.getElementById("contact_modal");

function closeModal() {
    modal.style.display = "none";
    body.style.overflow = "auto"
}
    
document.addEventListener('keydown', function(e) {
    let keyCode = e.keyCode;
    if (keyCode === 27) {
        closeModal();
    }
})

function getValueOnSubmit() {
    //Validation message et regex first name
    const inputFirstNameValue = document.getElementById("firstName").value;
    console.log(inputFirstNameValue);
    const firstNameRegex = inputFirstNameValue.match(/^[A-zÀ-ú- ]{2,15}$/);
    if (inputFirstNameValue != firstNameRegex || inputFirstNameValue == "") {
        pValidationFirstName.textContent = "Veuillez renseigner un prénom valide."
        pValidationFirstName.style.color = '#dd1812';
        inputFirstName.style.border = "thick solid #dd1812";
        inputFirstName.setAttribute("arria-invalid", "true");
    }
    else {
        pValidationFirstName.textContent = "Format du prénom valide.";
        pValidationFirstName.style.color = '#057a3a';
        inputFirstName.style.border = "thick solid #057a3a";
        inputFirstName.setAttribute("arria-invalid", "false");
    }
    // Validation message et Regex last name
    const inputLastNameValue = document.getElementById("lastName").value;
    console.log(inputLastNameValue);
    const lastNameRegex = inputLastNameValue.match(/^[A-zÀ-ú- ]{2,30}$/);
    if (inputLastNameValue != lastNameRegex || inputLastNameValue == "" ) {
        pValidationLastName.textContent = "Veuillez renseigner un nom valide."
        pValidationLastName.style.color = '#dd1812';
        inputLastName.style.border = "thick solid #dd1812";
        inputLastName.setAttribute("arria-invalid", "true");
    }
    else {
        pValidationLastName.textContent = "Format du nom valide.";
        pValidationLastName.style.color = '#057a3a';
        inputLastName.style.border = "thick solid #057a3a";
        inputLastName.setAttribute("arria-invalid", "false");
    }

    // Validation message et Regex Email
    const inputEmailValue = document.getElementById("email").value;
    console.log(inputEmailValue);
    const emailRegex = inputEmailValue.match(/[A-z0-9._-]+[@]{1}[a-z0-9._-]+[.]{1}[a-z]{2,10}/);
    if (inputEmailValue != emailRegex || inputEmailValue == "" ) {
        pValidationEmail.textContent = "Veuillez renseigner une adresse mail valide."
        pValidationEmail.style.color = '#dd1812';
        inputEmail.style.border = "thick solid #dd1812";
        inputEmail.setAttribute("arria-invalid", "true");
    }
    else {
        pValidationEmail.textContent = "Format de l'adresse mail valide.";
        pValidationEmail.style.color = '#057a3a';
        inputEmail.style.border = "thick solid #057a3a";
        inputEmail.setAttribute("aria-invalid", "false");
    }

    // Récupération contenu textArea et message erreur si vide
    const contactMessageValue = document.getElementById("yourMessage").value;
    console.log(contactMessageValue);
    if (contactMessageValue == "") {
        pValidationMessage.textContent = "Veuillez renseigner un message."
        pValidationMessage.style.color = '#dd1812';
        textArea.style.border = "thick solid #dd1812";
        inputEmail.setAttribute("arria-invalid", "true");
    }
    else {
        pValidationMessage.style.display = "none";
        textArea.style.border = "thick solid #057a3a";
        inputEmail.setAttribute("arria-invalide", "false");
    }

}

document.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        getValueOnSubmit(e)
    }
})
