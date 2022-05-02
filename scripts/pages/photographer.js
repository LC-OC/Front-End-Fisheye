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

            // Récupération de l'url des images dans un tableau
            function selectImageOnly(images) {
                const {image} = images;
                return {image}
            }

            const imagesURL = found.map(selectImageOnly);
            console.log(imagesURL)
            


            // isoler un élement en particulier - montre bien que found est un array
            let test = found.find(e => e.likes === 88);
            console.log(test)

            let arrayImgURL = [];
            let arrayTitleImg = [];

            let sum = 0;
            for (let i = 0; i < found.length; i++) {
                sum += found[i].likes; 
                /*console.log(found[i].image)*/
                // Récupération et ajout image url dans array 
                let urlPicture = found[i].image;
                const pictureMedia = `assets/images/${urlPicture}`;
                console.log(pictureMedia)
                arrayImgURL.push(pictureMedia)
                const titleImg = found[i].title;
                arrayTitleImg.push(titleImg);
                
        }
            console.log(sum)
            console.log(arrayImgURL)
            console.log(arrayTitleImg)

            let pAllLikes = document.querySelector('.number_likes');
            pAllLikes.innerHTML = sum;
            
            /* ----------------------------*/

            /*---- Lightbox ---- */

            const lightboxImg = document.getElementById('imgBigger');
            console.log(lightboxImg)
            // lightbox
            let next = document.querySelector('.fa-angle-right');
            let previous = document.querySelector('.fa-angle-left');
            let imgContent = document.getElementById('imgBigger');
            let titleImgLightbox = document.getElementById('imgNameLightbox');

            let currentPic = 0;
            previous.addEventListener('click', function() {
                if (currentPic <= 0) {
                    currentPic = arrayImgURL.length -1;
                } else {
                    currentPic--;
                }
                imgContent.src = arrayImgURL[currentPic]
                titleImgLightbox.textContent = arrayTitleImg[currentPic]

            })
            
            next.addEventListener('click', function() {
               if (currentPic < arrayImgURL.length-1) {
                   currentPic = currentPic+1;
               } else {
                   currentPic = 0;
               }
               imgContent.src = arrayImgURL[currentPic]
               titleImgLightbox.textContent = arrayTitleImg[currentPic]
            })

            /*let currentPic = 0;

            next.addEventListener('click', function() {
                let lastPic = arrayImgURL.length-1;
                if (currentPic == lastPic) {
                    currentPic = 0;
                    imgContent.src = arrayImgURL[currentPic];
                } else {
                    currentPic++;
                    imgContent.src = arrayImgURL[currentPic];
                }
            })

            previous.addEventListener('click', function() {
                let lastPic = arrayImgURL.length+1;
                if (currentPic == lastPic) {
                    currentPic = 0;
                    imgContent.src = arrayImgURL[currentPic];
                } else {
                    currentPic--;
                    imgContent.src = arrayImgURL[currentPic];
                }
            })*/


           

            /*let arrayLikes = object.map(i => [i.likes, i.photographerId]);
            console.log(arrayLikes);*/
            
            
            /*
            let result = media.media.reduce((a, c) => ({
                likes: a.likes + c.likes
            }))
            console.log(result)
            let arrayPhotographerId = object.map(i => i.photographerId);
            console.log(arrayPhotographerId);*/
            
            

           
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