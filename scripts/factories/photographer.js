function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.classList.add("photographe_picture");
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.classList.add("photographe_name");
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
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}