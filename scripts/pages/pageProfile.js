//Page profil du photographe
let urlProfile = new URLSearchParams(window.location.search)
let id = urlProfile.get('id');
const mediaSection = document.querySelector(".gallery-section");

//Déclaration des variables
let profile = [];
let media = [];
var totalLikesNumberShow = 0;

//Aquisition des éléments du photographe
async function getPhotographerProfile() {
    //Consultation de l'API
    await fetch("/data/photographersData.json")
        .then(res => res.json())
        .then((data) => {
            //Charge les éléments du profile dans la variable profile selon l'id du photographe
            profile = data.photographers.find(photographer => photographer.id === +id);
            //Charge les éléments des media dans la variable media selon l'id du photographe
            media = data.media.filter(media => media.photographerId === +id);
            //Fonction de filtrage selon les données du tableau
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
    //Retourne le profil et les medias
    return { profile, media }
}

async function init() {
    const data = await getPhotographerProfile();
    displayProfile(data);
}

init();


function displayProfile({profile, media}) {
    //Charges les informations du photographes selon le profileFactories
    const header = document.querySelector(".photograph-header")
    const profileModel = profileFactories(profile);
    const profileCardDOM = profileModel.cardProfile();
    header.appendChild(profileCardDOM);

    var priceDay = profile.price + "€ / Jour";
    document.getElementById("priceDay").innerHTML = priceDay

    media.forEach((media) => {
        //Charge les likes des medias et les additionne
        const { likes } = media;
        totalLikesNumberShow += likes;
        //Charge les medias selon le mediaFactories
        const mediaModel = mediaFactories(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    })
    //Affiches le total des likes
    document.getElementById("totalLikesNumber").innerHTML = totalLikesNumberShow;
    
}

//Filtre menu
let btDropdown = document.querySelector(".btDropdown") //Par défaut sur "Popularité"
let dropdownContent = document.getElementById("dropdownContent")
let dropdownItem = document.getElementsByTagName("dropdownItem")
let dropdownItemValue = btDropdown.textContent;


function dropdownFc() {
    dropdownContent.classList.toggle('show')
    /*console.log("show ::", dropdownContent)
    console.log(document.body)*/
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
                filter = event.target.dataset.filterType;
                mediaSection.innerHTML=""
                init();
            }
        }
    }
}

var filter = 'date'

/*
//Lightbox
    const root = document.querySelector("body, html");
    const medias = document.querySelectorAll(".photo")
    const l = medias.length;

    for (var i = 0; i < l; i++) {
        medias[i].addEventListener("click", function (i) {
            var currentMedia = this;
            screenItem = document.createElement('div');
            screenItem.id = 'Lightbox-screen';
            mediaSection.prepend(screenItem);
            var route = currentMedia.scr;
            root.style.innerHTML = 'hidden';
            screenItem.innerHTML = '<div class="gg-media"></div><div class="gg-close gg-btn">&times</div><div class="gg-next gg-btn">&rarr;</div><div class="gg-prev gg-btn">&larr;</div>';
            //const first = medias[0].scr, last = medias[l - 1].scr;
            const mediaItem = document.querySelector('gg-media');
            mediaItem.innerHTML = '< src="' + route + '">';
        });
    }
*/