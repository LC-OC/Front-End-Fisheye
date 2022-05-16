//Récupération données

    const photographersSection = document.querySelector(".photographer_section");

    let myRequest = new Request("./data/photographers.json");
    fetch(myRequest)
        .then(response => response.json())
        .then(data => {
            console.log(data.photographers)
            for (const photographer of data.photographers) {
                const photographerModel = photographerFactory(photographer);
                const userCardDOM = photographerModel.getUserCardDOM();
                photographersSection.appendChild(userCardDOM);
            }
        })
        .catch(console.error);