function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.ariaLabel = "Informations Photographe";
        let urlPhotographer = new URL('http://127.0.0.1:5500/photographer.html');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.classList.add("photographe_picture");
        img.onclick = function() {
            urlPhotographer.searchParams.set('id', id);
            window.location = urlPhotographer;
        };
        img.style.cursor = "pointer";
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.classList.add("photographe_name");
        h2.onclick = function() {
            urlPhotographer.searchParams.set('id', id);
            window.location = urlPhotographer;
        };
        h2.style.cursor = "pointer";
        img.setAttribute("alt", name);
        pCityCountry = document.createElement('p');
        pCityCountry.textContent = city + ', ' + country; 
        pCityCountry.classList.add("photographe_city");
        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.classList.add("photographe_tagline");
        const pPrice = document.createElement('p');
        pPrice.textContent = price + '€/jour';
        pPrice.classList.add("photographe_price");
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCityCountry);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (article); 
    }

    function getPhotographInformation() {
        const divPriceLike = document.querySelector('.likes_price_div');
        const div = document.createElement('div');
        div.classList.add("infos_header");
        const divTest = document.createElement('div');
        divTest.classList.add("text_infos_header");
        const imgProfil = document.createElement( 'img' );
        imgProfil.setAttribute("src", picture);
        imgProfil.classList.add("photograph_profile_picture");
        const h1Name = document.createElement('h1');
        h1Name.textContent = name;
        const pCityCountryPhotograph = document.createElement('p');
        pCityCountryPhotograph.textContent = city + ', ' + country; 
        const pTaglinePhotograph = document.createElement('p');
        pTaglinePhotograph.textContent = tagline;
        const buttonContact = document.createElement('button');
        buttonContact.textContent = "Contactez-moi";
        buttonContact.classList.add("contact_button");
        buttonContact.onclick = function() {
            const modal = document.getElementById("contact_modal");
	        modal.style.display = "block";
        };
        const priceByDay = document.createElement('p');
        priceByDay.textContent = price + '€/jour';
        divPriceLike.appendChild(priceByDay);
        priceByDay.classList.add('price-by-day');
        divTest.appendChild(h1Name);
        divTest.appendChild(pCityCountryPhotograph);
        divTest.appendChild(pTaglinePhotograph);
        div.appendChild(divTest);
        div.appendChild(buttonContact)
        div.appendChild(imgProfil);
        
        return (div);
        

    }

    return { name, picture, city, country, tagline, price, getUserCardDOM, id, getPhotographInformation}

    
}


function mediaFactory(media) {
    const { id, photographerId, title, image, likes, date, price } = media;

    const pictureMedia = `assets/images/${image}`;
    

    function getMedia() {
        const figure = document.createElement('figure');
        figure.classList.add('figureMedia');
        const imgMedias = document.createElement('img');
        imgMedias.setAttribute("src", pictureMedia);
        imgMedias.classList.add('imgFigure');
        videoMedia = document.createElement('video');
        const figcaption = document.createElement('figcaption');
        figcaption.classList.add('figcaption-media');
        const titleFigcaption = document.createElement('p');
        titleFigcaption.textContent = title;
        titleFigcaption.setAttribute('id', 'titleFigcaption');
        const likesFigcaption = document.createElement('p');
        likesFigcaption.textContent = likes;
        const heartIcon = document.createElement('span');
        heartIcon.innerHTML = '<i class="fas fa-heart"></i>';
        heartIcon.style.cursor = 'pointer';
        heartIcon.style.color = '#525252';
        heartIcon.addEventListener("click", function() {
            this.style.color = "#901C1C";
            let numberLikes = likes;
            numberLikes += 1;
            likesFigcaption.innerHTML = numberLikes + '<i class="fas fa-heart"></i>';
            let pAllLikes = document.querySelector('.number_likes');
            let contentAllLikes = pAllLikes.innerHTML
            console.log(pAllLikes)
            console.log(contentAllLikes)
            contentAllLikes++;
            pAllLikes.innerHTML = contentAllLikes;
            

        });
        likesFigcaption.appendChild(heartIcon);
        likesFigcaption.setAttribute('id', 'likesFigcaption');
        imgMedias.onclick = function() {
            const lightbox = document.getElementById("lightboxDiv");
            const imgLightbox = document.getElementById("imgBigger");
            const pImgName = document.getElementById("imgNameLightbox");
	        lightbox.style.display = "block";
            imgLightbox.src = this.src;
            pImgName.textContent = title;
            console.log(pImgName);
        }
        imgMedias.style.cursor = "pointer";
        const leftArrowIcon = document.querySelector('.fa-angle-left');
        leftArrowIcon.style.cursor = "pointer";
        leftArrowIcon.addEventListener("click", function() {
            //this.style.color = "red";
            
        });
        const rightArrowIcon = document.querySelector('.fa-angle-right');
        rightArrowIcon.style.cursor = "pointer";
        rightArrowIcon.addEventListener("click", function() {
            //this.style.color = "red";
            
        });
        
        figure.appendChild(imgMedias);
        figure.appendChild(figcaption);
        figcaption.appendChild(titleFigcaption);
        figcaption.appendChild(likesFigcaption);
        return(figure);
    }

    return {id, photographerId, title, pictureMedia, likes, date, price, getMedia}
}