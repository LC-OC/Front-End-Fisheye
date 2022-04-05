    // Récupération et affichage de l'url    
    
    let params = (new URL(document.location)).searchParams;
    let idURL = params.get('id');
    console.log(idURL);

    const headerPhotographer = document.querySelector('.photograph-header');
    
    let photographerRequest = new Request("./data/photographers.json");
    fetch(photographerRequest)
        .then(response => response.json())
        .then(data => {
            //console.log(data.photographers[1].id);
            for (let i = 0; i < data.photographers.length; i++) {
                //console.log(data.photographers[i].id);
                if ( data.photographers[i].id == idURL) {
                    const recupFactory = photographerFactory(data.photographers[i]);
                    const recupDOM = recupFactory.getPhotographInformation();
                    headerPhotographer.appendChild(recupDOM);
                }
            }
        })
        .catch(console.error);


    /*    
    fetch(photographerRequest)
        .then(response => response.json())
        .then(data => {
            console.log(data.media)
        })
        .catch(console.error);
        */