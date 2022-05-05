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
            let arrayDate = [];
            let arrayLike = [];

            let sum = 0;
            for (let i = 0; i < found.length; i++) {
                sum += found[i].likes;
                let likesMedias = found[i].likes;
                arrayLike.push(likesMedias); 
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
                let dateMedias = found[i].date;
                arrayDate.push(dateMedias);
        }
            console.log(sum)
            console.log(arrayImgURL)
            console.log(arrayTitleImg)
            console.log(arrayVideoURL)
            console.log(arrayDate)
            console.log(arrayLike);

            let arrayAllMedia = [];
            let arrayTestAgain = [];

           

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
                    imgContent.src = medias;
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
                    imgContent.src = medias;
                }
               titleImgLightbox.textContent = arrayTitleImg[currentPic]
            })
            

            // "Select"
            // By name
            /*
            const arrayTitleImgFilter = arrayTitleImg.sort();
            console.log(arrayTitleImgFilter);

            // By date 
            const arrayDateFilter = arrayDate.sort();
            console.log(arrayDateFilter)
            
            // By like
            const arrayLikesFilter = arrayLike.sort(function(a,b){return b-a});
            console.log(arrayLikesFilter)*/

            

            // teeeeeeeeeeeest

            let selectTitle = document.getElementById('filter_title');
            console.log(selectTitle);
            let selectPopular = document.getElementById('filter_popular');
            let selectDate = document.getElementById('filter_date');


        for (let i = 0; i < found.length; i++) {
            let figure = document.createElement('figure');
            figure.classList.add('figureMedia');
            //
            let mediaType = arrayAllMedia[i];
            let str = mediaType;
            let doxIndex = str.lastIndexOf('.');
            let ext = str.substring(doxIndex);

            let img = document.createElement('img');
            img.classList.add('imgFigure');
            const videoMedias = document.createElement('video');
            if (ext == ".jpg") {
            img.setAttribute("src", arrayAllMedia[i]);
            img.classList.add('imgFigure');
            videoMedias.style.display = "none";
            }
            else if (ext == ".mp4") {
            img.style.display = "none";
            videoMedias.setAttribute("src", arrayAllMedia[i]);
            videoMedias.classList.add('videoFigure');

        }
            const figcaption = document.createElement('figcaption');
            figcaption.classList.add('figcaption-media');
            const titleFigcaption= document.createElement('p');
            titleFigcaption.setAttribute('id', 'titleFigcaption');
            titleFigcaption.textContent = arrayTitleImg[i];
            const likesFigcaption = document.createElement('p');
            likesFigcaption.textContent = arrayLike[i];
            const heartIcon = document.createElement('span');
            heartIcon.innerHTML = '<i class="fas fa-heart"></i>';
            heartIcon.style.cursor = 'pointer';
            heartIcon.style.color = '#525252';
            heartIcon.addEventListener("click", function() {
                this.style.color = "#901C1C";
                let numberLikes = arrayLike[i];
                numberLikes += 1;
                 likesFigcaption.innerHTML = numberLikes + '<i class="fas fa-heart"></i>';
                let pAllLikes = document.querySelector('.number_likes');
                let contentAllLikes = pAllLikes.innerHTML
                console.log(pAllLikes)
                console.log(contentAllLikes)
                contentAllLikes++;
                pAllLikes.innerHTML = contentAllLikes;
                });
            img.onclick = function() {
                const lightbox = document.getElementById("lightboxDiv");
                const imgLightbox = document.getElementById("imgBigger");
                const pImgName = document.getElementById("imgNameLightbox");
                lightbox.style.display = "block";
                imgLightbox.src = this.src;
                pImgName.textContent = arrayTitleImg[i];
                console.log(pImgName);
                }
            img.style.cursor = "pointer";
            videoMedias.onclick = function() {
                const imgLightbox = document.getElementById("imgBigger");
                imgLightbox.style.display = "none";
                const lightbox = document.getElementById("lightboxDiv");
                const videoLightbox = document.getElementById("videoBigger");
                videoLightbox.style.display = "block";
                const pImgName = document.getElementById("imgNameLightbox");
                lightbox.style.display = "block";
                videoLightbox.src = this.src;
                pImgName.textContent = arrayTitleImg[i];
                console.log(pImgName);
                }
                selectTitle.addEventListener("click", function() {
                    const arrayTitleImgFilter = arrayTitleImg.sort();
                    console.log(arrayTitleImgFilter);
                    titleFigcaption.innerText = arrayTitleImgFilter[i];
                    console.log(titleFigcaption)
                });
                selectPopular;addEventListener("click", function() {
                    const arrayLikesFilter = arrayLike.sort(function(a,b){return b-a});
                    likesFigcaption.innerText = arrayLikesFilter[i];
                })
            videoMedias.style.cursor = "pointer";
            likesFigcaption.appendChild(heartIcon);
            likesFigcaption.setAttribute('id', 'likesFigcaption');
            divMedia.appendChild(figure);
            figcaption.appendChild(titleFigcaption);
            figcaption.appendChild(likesFigcaption)
            figure.appendChild(img);
            figure.appendChild(videoMedias)
            figure.appendChild(figcaption)
            }

            
            

            

            selectTitle.onclick = function() {
                const arrayTitleImgFilter = arrayTitleImg.sort();
                console.log(arrayTitleImgFilter);
                titleFigcaption.textContent = arrayTitleImgFilter[currentPic]
                console.log(titleFigcaption)
                
            } 

            //-----------------------
            /*for (let i = 0; i < media.media.length; i++) {
                if (media.media[i].photographerId == idURL) {
                    const mediaModel = mediaFactory(media.media[i]);
                    const mediaDOM = mediaModel.getMedia();
                    divMedia.appendChild(mediaDOM);
                    /*let result = media.media.reduce((a, c) => ({
                        likes: a.likes + c.likes
                    }))
                    console.log(result)
                    

                    
                }
            }*/
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
