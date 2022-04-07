    // Récupération et affichage de l'url    
    
    let params = (new URL(document.location)).searchParams;
    let idURL = params.get('id');
    console.log(idURL);

    const headerPhotographer = document.querySelector('.photograph-header');
    const divMedia = document.querySelector('.testMedia');
    
    let photographerRequest = new Request("./data/photographers.json");
    fetch(photographerRequest)
        .then(response => response.json())
        .then(data => {
            //console.log(data.photographers[1].id);
            for (let i = 0; i < data.photographers.length; i++) {
                //console.log(data.photographers[i].id);
                if ( data.photographers[i].id == idURL) {
                    const photographerModelPage = photographerFactory(data.photographers[i]);
                    const photographDOM = photographerModelPage.getPhotographInformation();
                    headerPhotographer.appendChild(photographDOM);
                }
            }
        })
        .catch(console.error);


  
    fetch(photographerRequest)
        .then(response => response.json())
        .then(media => {
            console.log(media.media);
            for (let i = 0; i < media.media.length; i++) {
                if (media.media[i].photographerId == idURL) {
                        const mediaModel = mediaFactory(media.media[i]);
                        const mediaDOM = mediaModel.getMedia();
                        divMedia.appendChild(mediaDOM);
                }
            }
        })
        .catch(console.error);
