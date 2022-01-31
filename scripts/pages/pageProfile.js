//Page profil du photographe
let urlProfile = new URLSearchParams(window.location.search)
let id = urlProfile.get('id');
const header = document.querySelector(".photograph-header")

let profile = [];
let media = [];

async function getPhotographerProfile() {
    await fetch("/data/photographersData.json")
        .then(res => res.json())
        .then((data) => {
            profile = data.photographers.find(photographer => photographer.id === +id);
            media = data.media.filter(media => media.photographerId === +id);
        });

    return { profile, media }
}

async function init() {
    const data = await getPhotographerProfile();
    displayProfile(data);
}

init();

async function displayProfile(profile) {
    const profileModel = profileFactories(profile);
    const profileCardDOM = profileModel.cardProfile();
    header.appendChild(profileCardDOM);
}