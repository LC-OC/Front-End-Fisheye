function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    // Ajout id Photographe dans URL page photographe
    function idURL() {
        let url = new URL('http://127.0.0.1:5500/photographer.html');
        let params = new URLSearchParams(url.search);
        params.append('id', id);
    }


    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.ariaLabel = "Informations Photographe";
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.classList.add("photographe_picture");
        img.onclick = function() {
            window.location.href = 'http://127.0.0.1:5500/photographer.html';
        };
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.classList.add("photographe_name");
        h2.onclick = function() {
            window.location = 'http://127.0.0.1:5500/photographer.html';
        };
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

    return { name, picture, city, country, tagline, price, getUserCardDOM, id, idURL }

    
}