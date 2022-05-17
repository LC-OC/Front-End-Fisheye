    // Récupération et affichage de l'id de l'url    
    
    let params = (new URL(document.location)).searchParams;
    let idURL = params.get('id');
    console.log(idURL);

    // Elements DOM
    const headerPhotographer = document.querySelector('.photograph-header');
    const divMedia = document.querySelector('.mediaDiv');
    
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
            let arrayFilterPopularity = [];

            for (let i = 0; i < filtredArrayVideoFilterByPopularity.length; i++) {
                let getVideoURLFiltredPopularity = filterArrayVideoURL[i];
                let resuult = arrayImgFilterByPopularity.map(e => e !== undefined ? e : getVideoURLFiltredPopularity);
                arrayFilterPopularity.push(resuult)
                
            }

            for (let i = 0; i < arrayFilterPopularity.length; i++) {
                let urlPopularity = arrayFilterPopularity[i];
                console.log(urlPopularity)
                for (let i = 0; i < urlPopularity.length; i++) {
                    let arrayURL = urlPopularity[i];
                    const defineURLMedia = `assets/images/${arrayURL}`;
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

            let selectTitle = document.getElementById('title_filter');
            selectTitle.style.cursor = "pointer";
            let selectPopular = document.getElementById('popularity_filter');
            let selectDate = document.getElementById('date_filter');
            selectDate.style.cursor = "pointer";

            // DOM Lightbox
            const lightbox = document.getElementById("lightboxDiv");
            const imgLightbox = document.getElementById("imgBigger");
            const pImgName = document.getElementById("imgNameLightbox");
            const videoLightbox = document.getElementById("videoBigger");

             /*---- Lightbox ---- */

             let next = document.querySelector('.fa-angle-right');
             next.style.cursor = "pointer";
             let previous = document.querySelector('.fa-angle-left');
             previous.style.cursor = "pointer";
             let imgContent = document.getElementById('imgBigger');
             let titleImgLightbox = document.getElementById('imgNameLightbox');
             let videoContent = document.getElementById('videoBigger');

             let currentPic = 0;
             let currentPicTitle = 0;
             let currentPicDate = 0;
             let currentPicPopular = 0;


             //Lightbox sans filtre

             function getLightboxPrevious() {
                    if (currentPic <= 0) {
                        currentPic = arrayAllMedia.length -1;
                    } else {
                        currentPic--;
                    }
    
                    let medias = arrayAllMedia[currentPic];
                    let str = medias;
                    let dotIndex = str.lastIndexOf('.');
                    let ext = str.substring(dotIndex);
    
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
                    imgLightbox.setAttribute("alt", arrayTitleImg[currentPic]);
                    videoLightbox.setAttribute("title", arrayTitleImg[currentPic])
             }

             previous.onclick = function(e) {
                getLightboxPrevious(e);
             }

             document.addEventListener("keydown", function(e) {
                 if (e.keyCode === 37) {
                     getLightboxPrevious(e)
                 }
             })

             function getLightboxNext() {
                if (currentPic < arrayAllMedia.length-1) {
                    currentPic = currentPic+1;
                } else {
                    currentPic = 0;
                }
                
                let medias = arrayAllMedia[currentPic];
                 let str = medias;
                 let doxIndex = str.lastIndexOf('.');
                 let ext = str.substring(doxIndex);
 
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
                imgLightbox.setAttribute("alt", arrayTitleImg[currentPic]);
                videoLightbox.setAttribute("title", arrayTitleImg[currentPic])
             }

             next.onclick = function(e) {
                 getLightboxNext(e);
             }

             document.addEventListener("keydown", function(e) {
                if (e.keyCode === 39) {
                    getLightboxNext(e)
                }
            })

            //Lightbox filtre Title

            function lightboxTitleFilter() {
                function getLightboxPreviousTitle() {
                    if (currentPicTitle <= 0) {
                        currentPicTitle = arrayAllMediaFilterTitle.length -1;
                    } else {
                        currentPicTitle--;
                    }
    
                    let medias = arrayAllMediaFilterTitle[currentPicTitle];
                    let str = medias;
                    let dotIndex = str.lastIndexOf('.');
                    let ext = str.substring(dotIndex);
    
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
                    
                    titleImgLightbox.textContent = arrayFilterTitle[currentPicTitle];
                    imgLightbox.setAttribute("alt", arrayFilterTitle[currentPicTitle]);
                    videoLightbox.setAttribute("title", arrayFilterTitle[currentPicTitle])
                }
                previous.onclick = function(e) {
                    getLightboxPreviousTitle(e);
                 }
    
                document.addEventListener("keydown", function(e) {
                     if (e.keyCode === 37) {
                         getLightboxPreviousTitle(e)
                     }
                })

                 function getLightboxNextTitle() {
                    if (currentPicTitle < arrayAllMediaFilterTitle.length-1) {
                        currentPicTitle = currentPicTitle+1;
                    } else {
                        currentPicTitle = 0;
                    }
                    
                    let medias = arrayAllMediaFilterTitle[currentPicTitle];
                     let str = medias;
                     let dotIndex = str.lastIndexOf('.');
                     let ext = str.substring(dotIndex);
     
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
                    titleImgLightbox.textContent = arrayFilterTitle[currentPicTitle]
                    imgLightbox.setAttribute("alt", arrayFilterTitle[currentPicTitle]);
                    videoLightbox.setAttribute("title", arrayFilterTitle[currentPicTitle])
                }
                next.onclick = function(e) {
                    getLightboxNextTitle(e);
                 }
    
                document.addEventListener("keydown", function(e) {
                     if (e.keyCode === 39) {
                         getLightboxNextTitle(e)
                     }
                 })
            }
            selectTitle.addEventListener("click", function(e) {
                lightboxTitleFilter(e);
            })
            selectTitle.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    lightboxTitleFilter(e)
                }
           })

            // Lightbox filtre Date
            function lightboxDateFilter() {
                function getLightboxPreviousDate() {
                    if (currentPicDate <= 0) {
                        currentPicDate = arrayAllMediaFilterDate.length -1;
                    } else {
                        currentPicDate--;
                    }
    
                    let medias = arrayAllMediaFilterDate[currentPicDate];
                    let str = medias;
                    let dotIndex = str.lastIndexOf('.');
                    let ext = str.substring(dotIndex);

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
                    
                    titleImgLightbox.textContent = arrayFilterTitleByDate[currentPicDate];
                    imgLightbox.setAttribute("alt", arrayFilterTitleByDate[currentPicDate]);
                    videoLightbox.setAttribute("title", arrayFilterTitleByDate[currentPicDate])
                }
            previous.onclick = function(e) {
                    getLightboxPreviousDate(e);
                }
        
            document.addEventListener("keydown", function(e) {
                     if (e.keyCode === 37) {
                         getLightboxPreviousDate(e)
                     }
                })
    
            function getLightboxNextDate() {
                    if (currentPicDate < arrayAllMediaFilterDate.length-1) {
                        currentPicDate = currentPicDate+1;
                    } else {
                        currentPicDate = 0;
                    }
                    
                    let medias = arrayAllMediaFilterDate[currentPicDate];
                     let str = medias;
                     let dotIndex = str.lastIndexOf('.');
                     let ext = str.substring(dotIndex);
     
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
                    titleImgLightbox.textContent = arrayFilterTitleByDate[currentPicDate]
                    imgLightbox.setAttribute("alt", arrayFilterTitleByDate[currentPicDate]);
                    videoLightbox.setAttribute("title", arrayFilterTitleByDate[currentPicDate])

            }
            next.onclick = function(e) {
                getLightboxNextDate(e);
             }
        
            document.addEventListener("keydown", function(e) {
                 if (e.keyCode === 39) {
                     getLightboxNextDate(e)
                  }
             })
            } 
            selectDate.addEventListener("click", function(e) {
                lightboxDateFilter(e)
            })
            selectDate.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    lightboxDateFilter(e)
                }
           })

            // Lightbox filtre Popularity
            function lightboxPopularFilter() {
                function getLightboxPreviousPopular() {
                    if (currentPicPopular <= 0) {
                        currentPicPopular= arrayAllMediaFilterPopularity.length -1;
                    } else {
                        currentPicPopular--;
                    }
    
                    let medias = arrayAllMediaFilterPopularity[currentPicPopular];
                    let str = medias;
                    let dotIndex = str.lastIndexOf('.');
                    let ext = str.substring(dotIndex);
    
                    if (ext == ".mp4") {
                        videoContent.style.display = "block";
                        imgContent.style.display = "none";
                        videoContent.src = medias;
                        videoContent.setAttribute("alt", arrayTitleFilterByPopularity[currentPicPopular])
                    }
    
                    else if (ext == ".jpg") {
                        videoContent.style.display = "none";
                        imgContent.style.display = "block";
                        imgContent.src = medias;
                        imgContent.setAttribute("alt", arrayTitleFilterByPopularity[currentPicPopular])
                    }
                    
                    titleImgLightbox.textContent = arrayTitleFilterByPopularity[currentPicPopular];
                    imgLightbox.setAttribute("alt", arrayTitleFilterByPopularity[currentPicPopular]);
                    videoLightbox.setAttribute("title", arrayTitleFilterByPopularity[currentPicPopular])
                    }
                previous.onclick = function(e) {
                        getLightboxPreviousPopular(e);
                    }
            
                document.addEventListener("keydown", function(e) {
                         if (e.keyCode === 37) {
                             getLightboxPreviousPopular(e)
                         }
                    })
        
                function getLightboxNextPopular() {
                    if (currentPicPopular < arrayAllMediaFilterPopularity.length-1) {
                        currentPicPopular = currentPicPopular+1;
                    } else {
                        currentPicPopular = 0;
                    }
                    
                     let medias = arrayAllMediaFilterPopularity[currentPicPopular];
                     let str = medias;
                     let dotIndex = str.lastIndexOf('.');
                     let ext = str.substring(dotIndex);
     
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
                    
                    titleImgLightbox.textContent = arrayTitleFilterByPopularity[currentPicPopular]
                    imgLightbox.setAttribute("alt", arrayTitleFilterByPopularity[currentPicPopular]);
                    videoLightbox.setAttribute("title", arrayTitleFilterByPopularity[currentPicPopular])
                    
                }
                next.onclick = function(e) {
                    getLightboxNextPopular(e);
                 }
            
                document.addEventListener("keydown", function(e) {
                    if (e.keyCode === 39) {
                     getLightboxNextPopular(e)
                  }
                 })
            }
            selectPopular.addEventListener("click", function(e) {
                lightboxPopularFilter(e);
            })
            selectPopular.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    lightboxPopularFilter(e)
                }
           })

            // Affichage Galerie

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
            img.ariaLabel = "Ouvrez la lightbox en cliquant sur une image";
            const videoMedias = document.createElement('video');
            if (ext == ".jpg") {
                img.setAttribute("src", arrayAllMedia[i]);
                img.classList.add('imgFigure');
                videoMedias.style.display = "none";
                img.setAttribute("alt", arrayTitleImg[i])
            }
            else if (ext == ".mp4") {
                img.style.display = "none";
                videoMedias.setAttribute("src", arrayAllMedia[i]);
                videoMedias.classList.add('videoFigure');
                videoMedias.setAttribute("alt", arrayTitleImg[i])

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
            heartIcon.tabIndex = 0; 
            let heartLikes;
            heartLikes = function heartLike() {
                heartIcon.style.color = "#901C1C";
                let numberLikes = arrayLike[i];
                numberLikes += 1;
                 likesFigcaption.innerHTML = numberLikes + '<i class="fas fa-heart"></i>';
                let pAllLikes = document.querySelector('.number_likes');
                let contentAllLikes = pAllLikes.innerHTML;
                contentAllLikes++;
                pAllLikes.innerHTML = contentAllLikes;
            }
            heartIcon.addEventListener("click", function(e) {
               heartLikes(e)
                });
            heartIcon.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    heartLikes(e)
                    }
                })
                
            let openLightboxFunction = function openLightbox() {
                lightbox.style.display = "block";
                videoLightbox.style.display = "none";
                imgLightbox.style.display = "block";
                imgLightbox.setAttribute("alt", arrayTitleImg[i]);
                 }
            img.onclick = function(e) {
                imgLightbox.src = this.src;
                console.log(imgLightbox.src)
                openLightboxFunction(e);
                pImgName.textContent = arrayTitleImg[i];
            }

            img.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    openLightboxFunction(e)
                    imgLightbox.src = this.src;
                    pImgName.textContent = arrayTitleImg[i];
                }
            })
            img.style.cursor = "pointer";
            img.tabIndex = 0;
            let openLightboxVideoFunction = function openLightboxVideo() {
                imgLightbox.style.display = "none";
                videoLightbox.style.display = "block";
                lightbox.style.display = "block";
            }
            videoMedias.onclick = function() {
                openLightboxVideoFunction();
                videoLightbox.src = this.src;
                pImgName.textContent = arrayTitleImg[i];
            }
            videoMedias.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    openLightboxVideoFunction(e)
                    videoLightbox.src = this.src;
                    pImgName.textContent = arrayTitleImg[i];
                }
            })
            videoMedias.tabIndex = 0;
            videoMedias.setAttribute("alt", arrayTitleImg[i])
            let filterPopularFunction = function filterPopular() {
                const arrayLikesFilter = arrayLike.sort(function(a,b){return b-a});
                likesFigcaption.innerHTML = arrayLikesFilter[i];
                likesFigcaption.appendChild(heartIcon);
                heartIcon.addEventListener("keydown", function(e) {
                    if (e.keyCode === 13) {
                        let numberLikesByPopular = arrayLikesFilter[i];
                        numberLikesByPopular += 1;
                        likesFigcaption.innerHTML = numberLikesByPopular + '<i class="fas fa-heart"></i>';
                    }
                })
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
                    img.setAttribute("alt", arrayTitleFilterByPopularity[i])
                }
                else if (extPopular == ".mp4") {
                    videoMedias.style.display = "block";
                    img.style.display = "none";
                    videoMedias.setAttribute("src", arrayAllMediaFilterPopularity[i]);
                    videoMedias.classList.add('videoFigure');
                    videoMedias.setAttribute("alt", arrayTitleFilterByPopularity[i])
                }
                img.onclick = function(e) { 
                    openLightboxFunction(e);
                    imgLightbox.src = this.src;
                    pImgName.textContent = arrayTitleFilterByPopularity[i];
                    imgLightbox.setAttribute("alt", arrayTitleFilterByPopularity[i])
                    }
                img.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    openLightboxFunction(e)
                    imgLightbox.src = this.src;
                    pImgName.textContent = arrayTitleFilterByPopularity[i];
                    imgLightbox.setAttribute("alt", arrayTitleFilterByPopularity[i])
                }
                })
                videoMedias.onclick = function(e) {
                openLightboxVideoFunction(e);
                videoLightbox.src = this.src;
                pImgName.textContent = arrayTitleFilterByPopularity[i];
                imgLightbox.setAttribute("alt", arrayTitleFilterByPopularity[i])
                }
                videoMedias.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    openLightboxVideoFunction(e)
                    videoLightbox.src = this.src;
                    pImgName.textContent = arrayTitleFilterByPopularity[i];
                    imgLightbox.setAttribute("alt", arrayTitleFilterByPopularity[i])
                }
                })
            }
            selectPopular.addEventListener("click", function(e) {
                filterPopularFunction(e)
            })  
            selectPopular.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    filterPopularFunction(e);
                }
            })
            let filterDateFunction = function filterDate() {
                likesFigcaption.innerText = arrayFilterLikesByDate[i];
                likesFigcaption.appendChild(heartIcon);
                heartIcon.addEventListener("click", function() {
                    let numberLikesByDate = arrayFilterLikesByDate[i];
                    numberLikesByDate += 1;
                    likesFigcaption.innerHTML = numberLikesByDate + '<i class="fas fa-heart"></i>';
                    });
                heartIcon.addEventListener("keydown", function(e) {
                    if (e.keyCode === 13) {
                        let numberLikesByPopular = arrayFilterLikesByDate[i];
                        numberLikesByPopular += 1;
                        likesFigcaption.innerHTML = numberLikesByPopular + '<i class="fas fa-heart"></i>';
                    }
                    })
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
                img.onclick = function(e) { 
                   openLightboxFunction(e);
                   imgLightbox.src = this.src;
                   pImgName.textContent = arrayFilterTitleByDate[i];
                }
                img.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    openLightboxFunction(e)
                    imgLightbox.src = this.src;
                    pImgName.textContent = arrayFilterTitleByDate[i];
                }
                })
                videoMedias.onclick = function(e) {
                openLightboxVideoFunction(e);
                videoLightbox.src = this.src;
                pImgName.textContent = arrayFilterTitleByDate[i];
                }
                videoMedias.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    openLightboxVideoFunction(e)
                    videoLightbox.src = this.src;
                    pImgName.textContent = arrayFilterTitleByDate[i];
                }
                })
            }
            selectDate.addEventListener("click", function(e) {
                filterDateFunction(e);
            })
            selectDate.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    filterDateFunction(e);
                }
            })
            let filterTitleFunction = function filterTitle() {
                likesFigcaption.innerText = arrayFilterLikesByTitle[i];
                likesFigcaption.appendChild(heartIcon);
                heartIcon.addEventListener("click", function() {
                    let numberLikesByTitle = arrayFilterLikesByTitle[i];
                    numberLikesByTitle += 1;
                    likesFigcaption.innerHTML = numberLikesByTitle + '<i class="fas fa-heart"></i>';
                    });
                heartIcon.addEventListener("keydown", function(e) {
                    if (e.keyCode === 13) {
                        let numberLikesByTitle = arrayFilterLikesByTitle[i];
                        numberLikesByTitle += 1;
                        likesFigcaption.innerHTML = numberLikesByTitle + '<i class="fas fa-heart"></i>';
                        }
                    })
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
                img.onclick = function() { 
                    lightbox.style.display = "block";
                    videoLightbox.style.display = "none";
                    imgLightbox.style.display = "block";
                    imgLightbox.src = this.src;
                    pImgName.textContent = arrayFilterTitle[i];
                    }
                img.onclick = function(e) { 
                   openLightboxFunction(e);
                   imgLightbox.src = this.src;
                   pImgName.textContent = arrayFilterTitle[i];
                }
                img.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    openLightboxFunction(e)
                    imgLightbox.src = this.src;
                    pImgName.textContent = arrayFilterTitle[i];
                }
                })
                videoMedias.onclick = function(e) {
                openLightboxVideoFunction(e);
                videoLightbox.src = this.src;
                pImgName.textContent = arrayFilterTitle[i];
                }
                videoMedias.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    openLightboxVideoFunction(e)
                    videoLightbox.src = this.src;
                    pImgName.textContent = arrayFilterTitle[i];
                }
                })
            }
            selectTitle.addEventListener("click", function(e) {
                filterTitleFunction(e); 
            })
            selectTitle.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    filterTitleFunction(e);
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
            }
        })
        .catch(console.error);
