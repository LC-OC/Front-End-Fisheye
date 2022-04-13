const pValidation = document.querySelectorAll('.validation');
let inputFirstName = document.getElementById("firstName");
let pValidationFirstName = document.getElementById('validationFirstName');

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function getValueOnSubmit() {
    let inputFirstNameValue = document.getElementById("firstName").value;
    console.log(inputFirstNameValue);
    let firstNameRegex = inputFirstNameValue.match(/^[A-zÀ-ú- ]{2,15}$/);
    if (inputFirstNameValue != firstNameRegex || inputFirstNameValue == "") {
        pValidationFirstName.textContent = "Veuillez renseigner un prénom valide."
        pValidationFirstName.style.color = '#dd1812';
        inputFirstName.style.border = "thick solid #dd1812";
    }
    else {
        pValidationFirstName.textContent = "Format du prénom valide.";
        pValidationFirstName.style.color = '#057a3a';
        inputFirstName.style.border = "thick solid #057a3a";
    }
    let inputLastName = document.getElementById("lastName").value;
    console.log(inputLastName);
    let inputEmail = document.getElementById("email").value;
    console.log(inputEmail);
    let contactMessage = document.getElementById("yourMessage").value;
    console.log(contactMessage);
}


