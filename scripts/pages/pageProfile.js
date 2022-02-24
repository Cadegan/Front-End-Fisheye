//Page profil du photographe
import PhotographBook from '../factories/models/photographBook.js'
import BookTemplate from '../factories/templates/bookTemplate.js'
let urlProfile = new URLSearchParams(window.location.search)
let id = urlProfile.get('id');
const mediaSection = document.querySelector(".gallery-section");

//Déclaration des variables
let profile = [];
let media = [];
let gallery = [];
var totalLikesNumberShow = 0;

//Aquisition des éléments du photographe
async function init() {
    //Consultation de l'API
    await fetch("/data/photographersData.json")
        .then(res => res.json())
        .then((data) => {
            //Charge les éléments du profile dans la variable profile selon l'id du photographe
            profile = data.photographers.find(photographer => photographer.id === +id);
            //Charge les éléments des media dans la variable media selon l'id du photographe
            media = data.media.filter(media => media.photographerId === +id);
            profileDisplay()
            mediaDisplay()
        });
    //Retourne le profil et les medias
    return { profile, media }
}

/*
async function init() {
    const data = await getPhotographerProfile();
    displayData(data);
}

init();
*/

const profileDisplay = () => {
    //Charges les informations du photographes selon le profileFactories
    const header = document.querySelector(".photograph-header")
    const profileModel = profileFactories(profile);
    const profileCardDOM = profileModel.cardProfile();
    header.appendChild(profileCardDOM);

    var priceDay = profile.price + "€ / Jour";
    document.getElementById("priceDay").innerHTML = priceDay
}

const mediaDisplay = () => {
    //Réinitialise la gallery
    mediaSection.innerHTML = ''
    //Pour chaque media recupéré et injecté dans la const "media"
    //On les ajoute au tableau "gallery"
    media.forEach((media) => {
        gallery.push(media);
    })
    //On affiche le nouveau tableau "gallery" selon les instructions de la fonction "showGallery"
    showGallery(gallery)
}

function showGallery(medias) {
    //Pour chaque media (data)
    medias.forEach((media) => {
        //On récupère les informations à chaque media
        const photographBook = new PhotographBook(media)
        //On applique une mise en forme selon si c'est une
        //image ou autre, donc video
        const BookTemplateData = new BookTemplate(photographBook)
        if (media.image) {
            mediaSection.innerHTML += BookTemplateData.createImage()
        } else {
            mediaSection.innerHTML += BookTemplateData.createVideo()
        }
    })
}

//Affiches le total des likes
document.getElementById("totalLikesNumber").innerHTML = totalLikesNumberShow;

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
                mediaDisplay();
            }
        }
    }
}

var filter = 'date'

init()

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