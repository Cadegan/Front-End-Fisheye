function profileFactories() {
    const { name, city, country, tagline, price, portrait } = profile;
    const picture = `assets/photographers/${portrait}`;

    function cardProfile() {
        const contact = document.querySelector(".contact_button");

        const img = document.createElement('img');
        img.setAttribute("src", picture)

        const h1 = document.createElement('h1');
        h1.textContent = name;

        const location = document.createElement('location');
        location.className = 'location'
        location.textContent = `${city}, ${country}`;

        const quote = document.createElement('div');
        quote.className = 'quote';
        quote.textContent = tagline;

        /*
        const priceDay = document.createElement('div');
        priceDay.className = 'priceDay'
        priceDay.textContent = price + "€/jour";
        */

        const photographeName = document.querySelector(".modal-header")
        photographeName.innerHTML = "Contactez-moi" + "<br/>" + name;
        

        const presentation = document.createElement('div');
        presentation.className = 'presentation'
        presentation.appendChild(h1);
        presentation.appendChild(location);
        presentation.appendChild(quote);

        const article = document.createElement('article');
        article.appendChild(presentation);
        article.appendChild(contact);
        article.appendChild(img);
        return (article);
    }
    return { name, picture, location, tagline, cardProfile }
}