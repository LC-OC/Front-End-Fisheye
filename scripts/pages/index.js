   /*async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json

        // Récupération des données avec Fetch (apparaissent bien dans la console)
        let myRequest = new Request("./data/photographers.json");
        fetch(myRequest)
            .then(function(resp) {
                return resp.json();
            })
            .then(function(data) {
                console.log(data.photographers);
                let photographers = data.photographers;
                return photographers;
            })

        
            
        /*const photographers = [            
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
            
            
        ]
        // et bien retourner le tableau photographers seulement une fois
        return ({
            photographers: [...photographers]})
    }
    

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };
    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
        
    };
    
    init(); */

    // Test Récupération données

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