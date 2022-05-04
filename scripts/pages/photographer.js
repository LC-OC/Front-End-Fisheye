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
            
            // Récupération url vidéo

            function selectVideo(videos) {
                const {video} = videos;
                return {video}
            }

            let videoURL = found.map(selectVideo);
            console.log(videoURL)

            const arr = [];
            videoURL.forEach(e => {
                if (e !== undefined) {
                    arr.push(e)
                }
            });

            console.log(arr)
        

            // isoler un élement en particulier - montre bien que found est un array
            let test = found.find(e => e.likes === 88);
            console.log(test)

            let arrayImgURL = [];
            let arrayTitleImg = [];
            let arrayVideoURL = [];

            let sum = 0;
            for (let i = 0; i < found.length; i++) {
                sum += found[i].likes; 
                //console.log(found[i].image)
                //console.log(found[i].video)
                // Récupération et ajout image url dans array 
                let urlPicture = found[i].image;
                //const pictureMedia = `assets/images/${urlPicture}`;
                //console.log(pictureMedia)
                arrayImgURL.push(urlPicture)
                const titleImg = found[i].title;
                arrayTitleImg.push(titleImg);
                let urlVideo = found[i].video;
                //const videoMedia = `assets/images/${urlVideo}`;
                //console.log(videoMedia)
                arrayVideoURL.push(urlVideo)
        }
            console.log(sum)
            console.log(arrayImgURL)
            console.log(arrayTitleImg)
            console.log(arrayVideoURL)

            let arrayAllMedia = [];
            let arrayTestAgain = [];

            /*// Retirer élements indéfins, ajouter url à élement JPG (images)
            const filterArrayImgURL = arrayImgURL.filter(e => {
                return e !== undefined
            })

            console.log(filterArrayImgURL)

            for (let i = 0; i < filterArrayImgURL.length; i++) {
                let getImgURl = filterArrayImgURL[i];
                console.log(getImgURl)
                const defineImgURL = `assets/images/${getImgURl}`;
                console.log(defineImgURL)
                arrayAllMedia.push(defineImgURL)
            }*/

           

            // Retirer élements indéfinis, ajouter url à élements MP4 (vidéos)
            const filterArrayVideoURL = arrayVideoURL.filter(e => {
                return e !== undefined
            })



            let result = arrayImgURL.map(e => e !== undefined ? e : filterArrayVideoURL);
            console.log(result)

            /*for (let i = 0; i < result.length; i++) {
                let testURL = result[i];
            }*/

            //console.log(filterArrayVideoURL)
            

            
            for (let i = 0; i < filterArrayVideoURL.length; i++) {
                let getVideoURL = filterArrayVideoURL[i];
                console.log(getVideoURL)
                /*const defineVideoURl = `assets/images/${getVideoURL}`;
                console.log(defineVideoURl)
                arrayTestAgain.push(defineVideoURl)*/
                let resuult = arrayImgURL.map(e => e !== undefined ? e : getVideoURL);
                arrayTestAgain.push(resuult)
                
            }
            console.log(arrayTestAgain)

            for (let i = 0; i < arrayTestAgain.length; i++) {
                let testuuurl = arrayTestAgain[i];
                console.log(testuuurl)
                for (let i = 0; i < testuuurl.length; i++) {
                    let testURLAgain = testuuurl[i];
                    console.log(testURLAgain)
                    const defineURLMedia = `assets/images/${testURLAgain}`;
                    arrayAllMedia.push(defineURLMedia)
                } 
            }
            console.log(arrayAllMedia)

            /*for (let i = 0; i < arrayImgURL.length; i++) {
                let getImgURl = arrayImgURL[i];
                console.log(getImgURl)
                const defineImgURL = `assets/images/${getImgURl}`;
                console.log(defineImgURL)
                arrayAllMedia.push(defineImgURL)
            }

            console.log(arrayAllMedia)

            let result = arr*/

            /*for (let i = 0; i < arrayAllMedia.length; i++) {
                let medias = arrayAllMedia[i];
                console.log(medias)
                let str = medias;
                let dotIndex = str.lastIndexOf('.');
                let ext = str.substring(dotIndex)
                console.log(ext)
                if (ext === ".mp4") {
                    console.log("yolo")
                }
                
            }*/

            


            //console.log(arrayAllMedia)


            // Calcul numbre likes affiché
            let pAllLikes = document.querySelector('.number_likes');
            pAllLikes.innerHTML = sum;
            
            /* ----------------------------*/

            /*---- Lightbox ---- */

            const lightboxImg = document.getElementById('imgBigger');
            console.log(lightboxImg)

            let next = document.querySelector('.fa-angle-right');
            next.style.cursor = "pointer";
            let previous = document.querySelector('.fa-angle-left');
            previous.style.cursor = "pointer";
            let imgContent = document.getElementById('imgBigger');
            let titleImgLightbox = document.getElementById('imgNameLightbox');
            let videoContent = document.getElementById('videoBigger');

            let currentPic = 0;

            previous.addEventListener('click', function() {
                if (currentPic <= 0) {
                    currentPic = arrayAllMedia.length -1;
                } else {
                    currentPic--;
                }

                let medias = arrayAllMedia[currentPic];
                let str = medias;
                let doxIndex = str.lastIndexOf('.');
                let ext = str.substring(doxIndex);
                console.log(ext)

                if (ext == ".mp4") {
                    videoContent.style.display = "block";
                    imgContent.style.display = "none";
                    videoContent.src = medias;
                }

                else if (ext == ".jpg") {
                    videoContent.style.display = "none";
                    imgContent.style.display = "block";
                    imgContent.src = arrayAllMedia[currentPic];
                }
                
                titleImgLightbox.textContent = arrayTitleImg[currentPic];


            })
            
            next.addEventListener('click', function() {
               if (currentPic < arrayAllMedia.length-1) {
                   currentPic = currentPic+1;
               } else {
                   currentPic = 0;
               }
               
               let medias = arrayAllMedia[currentPic];
                let str = medias;
                let doxIndex = str.lastIndexOf('.');
                let ext = str.substring(doxIndex);
                console.log(ext)

                if (ext == ".mp4") {
                    videoContent.style.display = "block";
                    imgContent.style.display = "none";
                    videoContent.src = medias;
                }

                else if (ext == ".jpg") {
                    videoContent.style.display = "none";
                    imgContent.style.display = "block";
                    imgContent.src = arrayAllMedia[currentPic];
                }
               titleImgLightbox.textContent = arrayTitleImg[currentPic]
            })
            /*

            let currentPic = 0;

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