async function getPhotographers(id) {
    let photographers = []; //Changement de la constant en variable. On déclare un tableau "photographers" 

    // et bien retourner le tableau photographers seulement une fois
    await fetch("/data/photographers.json") //On attend la resolution de la promesse : l'extraction des données
        .then(res => res.json())
        .then((data) => (photographers = data.photographers))
    return { photographers }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
