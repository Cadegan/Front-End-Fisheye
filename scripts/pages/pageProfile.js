//Page profil du photographe
let urlProfile = new URLSearchParams(window.location.search)
let id = urlProfile.get('id');
const mediaSection = document.querySelector(".gallery-section");

let profile = [];
let media = [];
var filter = "date"
var totalLikesNumber = 0;

async function getPhotographerProfile() {
    await fetch("/data/photographersData.json")
        .then(res => res.json())
        .then((data) => {
            profile = data.photographers.find(photographer => photographer.id === +id);
            media = data.media.filter(media => media.photographerId === +id);
            switch (filter) {
                case "review":
                    media.sort((a, b) => b.likes - a.likes);
                    break;
                case "date":
                    media.sort((a, b) => {
                        return new Date(a.date).valueOf() - new Date(b.date).valueOf();
                    });
                    break;
                case "title":
                    media.sort((a, b) => {
                        if (a.title.toLowerCase() < b.title.toLowerCase()) {
                            return -1;
                        } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                            return 1;
                        }
                    });
            }
        });

    return { profile, media }
}

async function init() {
    const data = await getPhotographerProfile();
    displayProfile(data);
    displayMedia(data);
}

init();


function displayProfile(profile) {
    const header = document.querySelector(".photograph-header")

    const profileModel = profileFactories(profile);
    const profileCardDOM = profileModel.cardProfile();
    header.appendChild(profileCardDOM);
}

function displayMedia() {
    media.forEach((media) => {
        const mediaModel = mediaFactories(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    })
}

//Filtre menu v2
let btDropdown = document.getElementById("btDropdown") //Par défaut sur "Popularité"
let dropdownContent = document.getElementById("dropdownContent")
let dropdownItem = document.getElementsByClassName("dropdownItem")


function dropdownFc() {
    dropdownContent.classList.toggle('show')
    console.log("show ::", dropdownContent)
    console.log(document.body)
}

btDropdown.addEventListener('click', dropdownFc);

// Fermeture du menu
// On ecoute si un evenement se realise à l'exterieur du menu
// On le cache si c'est le cas
window.onclick = function (event) {
    if (!event.target.matches('#btDropdown')) {
        let dropdownContentClass = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdownContentClass.length; i++) {
            let dropdownContentOpen = dropdownContentClass[i];
            if (dropdownContentOpen.classList.contains("show")) {
                dropdownContentOpen.classList.remove("show");
            }
            //Le titre du filtre est injecté dans le titre du bouton
            if (event.target.matches('.dropdownItem')) {
                document.getElementById('btDropdown').textContent = event.target.textContent;
            }
        }
    }
}

function filterSelected () {
    if (dropdownItem.textContent === "Popularité") {
        return "review";
    }
    if (dropdownItem.textContent === "Date") {
        return "date"
    }
    if (dropdownItem.textcontent === "Titre") {
        return "title"
    }
}

//Calcul des likes
document.getElementById("totalLikesNumber").innerHTML = totalLikesNumber;
document.getElementsByClassName("priceDay")