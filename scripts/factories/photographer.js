function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait, id } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute("src", picture)

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const location = document.createElement('h3');
        location.textContent = `${city}, ${country}`;

        const quote = document.createElement('p');
        quote.textContent = tagline;

        const priceDay = document.createElement('p');
        priceDay.textContent = price + "€";

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(quote);
        article.appendChild(priceDay);
        return (article);
    }
    return { name, picture, location, tagline, price, getUserCardDOM }
}