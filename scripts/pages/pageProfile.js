//Page profil du photographe
const urlProfile = new URL(window.location.search)
const id = urlProfile.get('id');
let person = []

async function getPhotographersProfile() {

    await fetch("/data/photographersDdata.json")
    .then(res =>res.json())
    .then((data) => {
        person = data.photographersDdata.find((photographer) => photographer.id === +id );
    });
    return {person};
}

async function init() {
    const { photographer } = await getPhotographersProfile();
    displayData(photographer);
}

init();

/*
async function displayProfile(photographer) {
    const photographersProfile = document.querySelector(".photograph-header");
    const photographerModel = photographerProfileFactory(photographer);
    
}
*/