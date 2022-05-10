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
            let object = media.media;


            function getBy(photographerId) {
                return object.filter(
                    function(object) {
                        return object.photographerId == photographerId
                    }
                );
            }
            
            let found = getBy(idURL);

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

            const arr = [];
            videoURL.forEach(e => {
                if (e !== undefined) {
                    arr.push(e)
                }
            });

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
                // Récupération et ajout image url dans array 
                let urlPicture = found[i].image;
                arrayImgURL.push(urlPicture)
                const titleImg = found[i].title;
                arrayTitleImg.push(titleImg);
                let urlVideo = found[i].video;
                arrayVideoURL.push(urlVideo)
                let dateMedias = found[i].date;
                arrayDate.push(dateMedias);
        }

            let arrayAllMedia = [];
            let arrayResultImgURL = [];

           
            // Retirer élements indéfinis, ajouter url à élements MP4 (vidéos)
            const filterArrayVideoURL = arrayVideoURL.filter(e => {
                return e !== undefined
            })

            for (let i = 0; i < filterArrayVideoURL.length; i++) {
                let getVideoURL = filterArrayVideoURL[i];
                let resultArrayImgUrl = arrayImgURL.map(e => e !== undefined ? e : getVideoURL);
                arrayResultImgURL.push(resultArrayImgUrl)
                
            }

            for (let i = 0; i < arrayResultImgURL.length; i++) {
                let urlMedia = arrayResultImgURL[i];
                for (let i = 0; i < urlMedia.length; i++) {
                    let urlMedias = urlMedia[i];
                    const defineURLMedia = `assets/images/${urlMedias}`;
                    arrayAllMedia.push(defineURLMedia)
                } 
            }

            // Calcul numbre likes affiché
            let pAllLikes = document.querySelector('.number_likes');
            pAllLikes.innerHTML = sum;
            
            /* ----------------------------*/

            /*---- Lightbox ---- */

            const lightboxImg = document.getElementById('imgBigger');

            let next = document.querySelector('.fa-angle-right');
            next.style.cursor = "pointer";
            let previous = document.querySelector('.fa-angle-left');
            previous.style.cursor = "pointer";
            let imgContent = document.getElementById('imgBigger');
            let titleImgLightbox = document.getElementById('imgNameLightbox');
            let videoContent = document.getElementById('videoBigger');

            let currentPic = 0;

            // Tri et récupération des éléments quand galerie filtrée par popularity
            let tryArray = found.sort(function(a,b){return b.likes-a.likes})
            console.log(tryArray)
            let arrayImgFilterByPopularity = [];
            let arrayTitleFilterByPopularity = [];
            let arrayVideoFilterByPopularity = [];
            for (let i = 0; i < tryArray.length; i++) {
                let imgFilterByPopularity = tryArray[i].image;
                let titleFilterByPopularity = tryArray[i].title;
                let videoFilterByPopularity = tryArray[i].video;
                arrayImgFilterByPopularity.push(imgFilterByPopularity);
                arrayTitleFilterByPopularity.push(titleFilterByPopularity);
                arrayVideoFilterByPopularity.push(videoFilterByPopularity); 
            }

            const filtredArrayVideoFilterByPopularity = arrayVideoFilterByPopularity.filter(e => {
                return e !== undefined
            })

            let arrayAllMediaFilterPopularity = [];
            let arrayTestAgainFilterPopularity = [];

            for (let i = 0; i < filtredArrayVideoFilterByPopularity.length; i++) {
                let getVideoURLFiltredPopularity = filterArrayVideoURL[i];
                let resuult = arrayImgFilterByPopularity.map(e => e !== undefined ? e : getVideoURLFiltredPopularity);
                arrayTestAgainFilterPopularity.push(resuult)
                
            }

            for (let i = 0; i < arrayTestAgainFilterPopularity.length; i++) {
                let testuuurl = arrayTestAgainFilterPopularity[i];
                console.log(testuuurl)
                for (let i = 0; i < testuuurl.length; i++) {
                    let testURLAgain = testuuurl[i];
                    const defineURLMedia = `assets/images/${testURLAgain}`;
                    arrayAllMediaFilterPopularity.push(defineURLMedia)
                } 
            }
            console.log(arrayAllMediaFilterPopularity)

            // Affichage des élements par Title

            let foundFilterTitle = getBy(idURL);

            let getArrayTitleFilter = foundFilterTitle.sort(function(a,b) {
                return a.title.localeCompare(b.title)
            })

            let arrayFilterTitle = [];
            let arrayFilterImgByTitle = [];
            let arrayFilterVideoByTitle = [];
            let arrayFilterLikesByTitle = [];

            for (let i = 0; i < getArrayTitleFilter.length; i++) {
                let imgFilterByTitle = getArrayTitleFilter[i].image;
                let titleFilterByTitle = getArrayTitleFilter[i].title;
                let videoFilterByTitle = getArrayTitleFilter[i].video;
                let likesFilterByTitle = getArrayTitleFilter[i].likes;
                arrayFilterImgByTitle.push(imgFilterByTitle);
                arrayFilterTitle.push(titleFilterByTitle);
                arrayFilterVideoByTitle.push(videoFilterByTitle); 
                arrayFilterLikesByTitle.push(likesFilterByTitle);
            }

            const filtredArrayVideoFilterByTitle = arrayFilterVideoByTitle.filter(e => {
                return e !== undefined
            })

            let arrayAllMediaFilterTitle = [];
            let arrayTitle = [];

            for (let i = 0; i < filtredArrayVideoFilterByTitle.length; i++) {
                let getVideoURLFiltredTitle = filtredArrayVideoFilterByTitle[i];
                console.log(getVideoURLFiltredTitle)
                let result = arrayFilterImgByTitle.map(e => e !== undefined ? e : getVideoURLFiltredTitle);
                arrayTitle.push(result)
                
            }

            for (let i = 0; i < arrayTitle.length; i++) {
                let url = arrayTitle[i];
                for (let i = 0; i < url.length; i++) {
                    let getUrl = url[i];
                    const defineURLMedia = `assets/images/${getUrl}`;
                    arrayAllMediaFilterTitle.push(defineURLMedia)
                } 
            }

        
            // Affichage des éléments par date

            let foundDate = getBy(idURL);

            let getArrayDateFilter = foundDate.sort(function(a,b) {
                return b.date.localeCompare(a.date)
            })

            let arrayFilterImgByDate = [];
            let arrayFilterVideoByDate = [];
            let arrayFilterLikesByDate = [];
            let arrayFilterTitleByDate = [];

            for (let i = 0; i < getArrayDateFilter.length; i++) {
                let imgFilterByDate = getArrayDateFilter[i].image;
                let videoFilterByDate = getArrayDateFilter[i].video;
                let likesFilterByDate = getArrayDateFilter[i].likes;
                let titleFilterByDate = getArrayDateFilter[i].title;
                arrayFilterImgByDate.push(imgFilterByDate);
                arrayFilterVideoByDate.push(videoFilterByDate); 
                arrayFilterLikesByDate.push(likesFilterByDate);
                arrayFilterTitleByDate.push(titleFilterByDate);
            }

            const filtredArrayVideoFilterByDate = arrayFilterVideoByDate.filter(e => {
                return e !== undefined
            })

            let arrayAllMediaFilterDate = [];
            let arrayFilterDate = [];

            for (let i = 0; i < filtredArrayVideoFilterByDate.length; i++) {
                let getVideoURLFiltredDate = filtredArrayVideoFilterByDate[i];
                let resultFilter = arrayFilterImgByDate.map(e => e !== undefined ? e : getVideoURLFiltredDate);
                arrayFilterDate.push(resultFilter)
                
            }

            for (let i = 0; i < arrayFilterDate.length; i++) {
                let url = arrayFilterDate[i];
                for (let i = 0; i < url.length; i++) {
                    let getUrl = url[i];
                    const defineURLMedia = `assets/images/${getUrl}`;
                    arrayAllMediaFilterDate.push(defineURLMedia)
                } 
            }

            // DOM Select

            let selectTitle = document.getElementById('filter_title');
            let selectPopular = document.getElementById('filter_popular');
            let selectDate = document.getElementById('filter_date');

            // DOM Lightbox
            const lightbox = document.getElementById("lightboxDiv");
            const imgLightbox = document.getElementById("imgBigger");
            const pImgName = document.getElementById("imgNameLightbox");

            
            
            // Affichage Galerie

        for (let i = 0; i < found.length; i++) {
            let figure = document.createElement('figure');
            figure.classList.add('figureMedia');
            figure.tabIndex = 0;
            figure.onfocus = function() {
                document.addEventListener('keydown', function(e) {
                    let keyCode = e.keyCode;
                    if (keyCode === 13) {
                        lightbox.style.display = "block";
                        imgLightbox.src = img.src;
                        pImgName.textContent = arrayTitleImg[i];
                    }
                })
            }
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
                lightbox.style.display = "block";
                imgLightbox.src = this.src;
                pImgName.textContent = arrayTitleImg[i];
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
                }
            selectPopular.addEventListener("click", function() {
                const arrayLikesFilter = arrayLike.sort(function(a,b){return b-a});
                likesFigcaption.innerHTML = arrayLikesFilter[i];
                likesFigcaption.appendChild(heartIcon);
                titleFigcaption.innerText = arrayTitleFilterByPopularity[i];
                let mediaTypePopular = arrayAllMediaFilterPopularity[i];
                let strPopular = mediaTypePopular;
                let doxIndexPopular = strPopular.lastIndexOf('.');
                let extPopular = strPopular.substring(doxIndexPopular);
                if (extPopular == ".jpg") {
                    img.style.display = "block";
                    img.setAttribute("src", arrayAllMediaFilterPopularity[i]);
                    img.classList.add('imgFigure');
                    videoMedias.style.display = "none";
                }
                else if (extPopular == ".mp4") {
                    videoMedias.style.display = "block";
                    img.style.display = "none";
                    videoMedias.setAttribute("src", arrayAllMediaFilterPopularity[i]);
                    videoMedias.classList.add('videoFigure');
                }
                
            })
            selectDate.addEventListener("click", function() {
                likesFigcaption.innerText = arrayFilterLikesByDate[i];
                likesFigcaption.appendChild(heartIcon);
                heartIcon.addEventListener("click", function() {
                    let numberLikesByDate = arrayFilterLikesByDate[i];
                    numberLikesByDate += 1;
                    likesFigcaption.innerHTML = numberLikesByDate + '<i class="fas fa-heart"></i>';
                    });
                titleFigcaption.innerText = arrayFilterTitleByDate[i];
                let mediaTypeDate = arrayAllMediaFilterDate[i];
                let strDate = mediaTypeDate;
                let dotDate = strDate.lastIndexOf('.');
                let extDate = strDate.substring(dotDate);
                if (extDate == ".jpg") {
                    img.style.display = "block";
                    img.setAttribute("src", arrayAllMediaFilterDate[i]);
                    img.classList.add('imgFigure');
                    videoMedias.style.display = "none";
                }
                else if (extDate == ".mp4") {
                    videoMedias.style.display = "block";
                    img.style.display = "none";
                    videoMedias.setAttribute("src", arrayAllMediaFilterDate[i]);
                    videoMedias.classList.add('videoFigure');
                }
                console.log(arrayFilterTitleByDate[i])
                
                
            })
            selectTitle.addEventListener("click", function() {
                likesFigcaption.innerText = arrayFilterLikesByTitle[i];
                likesFigcaption.appendChild(heartIcon);
                heartIcon.addEventListener("click", function() {
                    let numberLikesByTitle = arrayFilterLikesByTitle[i];
                    numberLikesByTitle += 1;
                    likesFigcaption.innerHTML = numberLikesByTitle + '<i class="fas fa-heart"></i>';
                    });
                titleFigcaption.innerText = arrayFilterTitle[i];
                let mediaTypeTitle = arrayAllMediaFilterTitle[i];
                let strTitle = mediaTypeTitle;
                let doxIndexTitle = strTitle.lastIndexOf('.');
                let extTitle = strTitle.substring(doxIndexTitle);
                if (extTitle == ".jpg") {
                    img.style.display = "block";
                    img.setAttribute("src", arrayAllMediaFilterTitle[i]);
                    img.classList.add('imgFigure');
                    videoMedias.style.display = "none";
                }
                else if (extTitle == ".mp4") {
                    videoMedias.style.display = "block";
                    img.style.display = "none";
                    videoMedias.setAttribute("src", arrayAllMediaFilterTitle[i]);
                    videoMedias.classList.add('videoFigure');
                }
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

            // Lightbox by filter
            /*selectDate.onclick = function() {
                previous.addEventListener('click', function() {
                    if (currentPic <= 0) {
                        currentPic = arrayAllMediaFilterDate.length -1;
                    } else {
                        currentPic--;
                    }
    
                    let medias = arrayAllMediaFilterDate[currentPic];
                    let str = medias;
                    let dotIndex = str.lastIndexOf('.');
                    let ext = str.substring(dotIndex);
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
                    
                    titleImgLightbox.textContent = arrayFilterTitleByDate[currentPic];
                })
                next.addEventListener('click', function() {
                    if (currentPic < arrayAllMediaFilterDate.length-1) {
                        currentPic = currentPic+1;
                    } else {
                        currentPic = 0;
                    }
                    let medias = arrayAllMediaFilterDate[currentPic];
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
                    titleImgLightbox.textContent = arrayFilterTitleByDate[currentPic]
                 })
                    
                
            };
            selectTitle.onclick = function() {
                previous.addEventListener('click', function() {
                    if (currentPic <= 0) {
                        currentPic = arrayAllMediaFilterTitle.length -1;
                    } else {
                        currentPic--;
                    }
    
                    let medias = arrayAllMediaFilterTitle[currentPic];
                    let str = medias;
                    let dotIndex = str.lastIndexOf('.');
                    let ext = str.substring(dotIndex);
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
                    
                    titleImgLightbox.textContent = arrayFilterTitle[currentPic];
                    console.log(arrayFilterTitle)
    
    
                })
                next.addEventListener('click', function() {
                    if (currentPic < arrayAllMediaFilterTitle.length-1) {
                        currentPic = currentPic+1;
                    } else {
                        currentPic = 0;
                    }
                    
                    let medias = arrayAllMediaFilterTitle[currentPic];
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
                    titleImgLightbox.textContent = arrayFilterTitle[currentPic]
                 })
            };
            selectPopular.onclick = function() {
                previous.addEventListener('click', function() {
                    if (currentPic <= 0) {
                        currentPic = arrayAllMediaFilterPopularity.length -1;
                    } else {
                        currentPic--;
                    }
    
                    let medias = arrayAllMediaFilterPopularity[currentPic];
                    let str = medias;
                    let dotIndex = str.lastIndexOf('.');
                    let ext = str.substring(dotIndex);
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
                    
                    titleImgLightbox.textContent = arrayTitleFilterByPopularity[currentPic];
                    console.log(arrayTitleFilterByPopularity)
    
    
                })
                next.addEventListener('click', function() {
                    if (currentPic < arrayAllMediaFilterPopularity.length-1) {
                        currentPic = currentPic+1;
                    } else {
                        currentPic = 0;
                    }
                    
                    let medias = arrayAllMediaFilterPopularity[currentPic];
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
                    titleImgLightbox.textContent = arrayTitleFilterByPopularity[currentPic]
                 })
            }*/
            img.addEventListener("click", function() {
                previous.addEventListener('click', function() {
                    if (currentPic <= 0) {
                        currentPic = arrayAllMedia.length -1;
                    } else {
                        currentPic--;
                    }
    
                    let medias = arrayAllMedia[currentPic];
                    let str = medias;
                    let dotIndex = str.lastIndexOf('.');
                    let ext = str.substring(dotIndex);
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
            })
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
  