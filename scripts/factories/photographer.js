function photographerFactory(data) {
    const {name, city, country, tagline, price, portrait} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const h3 = document.createElement('h3');
        h3.textContent = `${city}, ${country}`;

        const quote = document.createElement('p');
        quote.textContent = tagline;

        const priceDay = document.createElement('p');
        priceDay.textContent = price;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(quote);
        article.appendChild(priceDay);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}