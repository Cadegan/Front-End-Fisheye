//Page profil du photographe
let urlProfile = new URL(window.location.search)
let id = urlProfile.get('id');
const header = document.getElementsByClassName(".photograph-header")

let person = [];
let photos = [];

async function getPhotographerProfile() {
    await fetch("/data/photographersData.json")
        .then(res => res.json())
        .then((data) => (person = data.photographers.find(photographer => photographer.id === +id)
        ));
    return { person, photos }
}

async function displayProfile(person) {
    const profileModel = profileFactories(person);
    const profileCardDOM = profileModel.cardProfile();
    header.appendChild(profileCardDOM);
}

async function init() {
    const { photographerProfile } = await getPhotographerProfile();
    displayProfile(photographerProfile);
}

init();