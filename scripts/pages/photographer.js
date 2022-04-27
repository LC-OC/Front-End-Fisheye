    // Récupération et affichage de l'id de l'url    
    
    let params = (new URL(document.location)).searchParams;
    let idURL = params.get('id');
    console.log(idURL);

    // Elements DOM
    const headerPhotographer = document.querySelector('.photograph-header');
    const divMedia = document.querySelector('.mediaDiv');
    const lightboxContent = document.getElementById('lightboxContent');
    

    // Récupération data 
    let photographerRequest = new Request("./data/photographers.json");
    fetch(photographerRequest)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.photographers.length; i++) {
                if ( data.photographers[i].id == idURL) {
                    const photographerModelPage = photographerFactory(data.photographers[i]);
                    const photographDOM = photographerModelPage.getPhotographInformation();
                    headerPhotographer.appendChild(photographDOM);
                }
            }
        })
        .catch(console.error);


    // Récupération data media
    fetch(photographerRequest)
        .then(response => response.json())
        .then(media => {
            /*console.log(media.media);
            console.log(media.media.likes);*/
            let object = media.media;
            console.log(object[2].likes);

            // ----------- CALCUL DE TOUS LES LIKES -------- */
            function getbyTest(photographerId) {
                return object.filter(
                    function(object) {
                        return object.photographerId == photographerId
                    }
                );
            }
            
            let found = getbyTest(idURL);
            console.log(found)

            let sum = 0;
            for (let i = 0; i < found.length; i++) {
                sum += found[i].likes;
            }
            console.log(sum)

            let pAllLikes = document.querySelector('.number_likes');
            pAllLikes.innerHTML = sum + '<i class="fas fa-heart"></i>';
            /* ----------------------------*/


            /*let arrayLikes = object.map(i => [i.likes, i.photographerId]);
            console.log(arrayLikes);*/
            
            
            /*
            let result = media.media.reduce((a, c) => ({
                likes: a.likes + c.likes
            }))
            console.log(result)
            /*let arrayPhotographerId = object.map(i => i.photographerId);
            console.log(arrayPhotographerId);
            let arrayPictures = object.map(i => [i.title]);
            console.log(arrayPictures);*/
            

           
            //-----------------------
            for (let i = 0; i < media.media.length; i++) {
                if (media.media[i].photographerId == idURL) {
                    const mediaModel = mediaFactory(media.media[i]);
                    const mediaDOM = mediaModel.getMedia();
                    divMedia.appendChild(mediaDOM);
                    /*let result = media.media.reduce((a, c) => ({
                        likes: a.likes + c.likes
                    }))
                    console.log(result)
                    */

                    
                }
            }
        })
        .catch(console.error);



        /*
        //Récupération media pour lightbox
        fetch(photographerRequest)
        .then(response => response.json())
        .then(media => {
            console.log(media.media);
            for (let i = 0; i < media.media.length; i++) {
                if (media.media[i].photographerId == idURL) {
                        const mediaLightboxModel = mediaFactory(media.media[i]);
                        const mediaLightboxDOM = mediaLightboxModel.getMediaLightbox();
                        lightboxContent.appendChild(mediaLightboxDOM);
                }
            }
        })
        .catch(console.error);*/