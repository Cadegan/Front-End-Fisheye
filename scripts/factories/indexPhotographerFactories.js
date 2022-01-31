// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait, id } = data;
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

        function linkProfile() {
            window.open(`photographer.html?id=${id}`);
        }

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(quote);
        article.appendChild(priceDay);
        article.addEventListener("click", linkProfile)
        return (article);
    }
    return { getUserCardDOM }
}