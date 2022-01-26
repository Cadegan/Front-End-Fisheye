function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait} = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute("src", picture)

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const location = document.createElement('location');
        location.className = 'location'
        location.textContent = `${city}, ${country}`;

        const quote = document.createElement('div');
        quote.className = 'quote';
        quote.textContent = tagline;

        const priceDay = document.createElement('div');
        priceDay.className = 'priceDay'
        priceDay.textContent = price + "€/jour";

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(quote);
        article.appendChild(priceDay);
        return (article);
    }
    return { name, picture, location, tagline, price, getUserCardDOM }
}