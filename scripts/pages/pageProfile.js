//Page profil du photographe
import PhotographBook from '../factories/models/photographBook.js'
import BookTemplate from '../factories/templates/bookTemplate.js'
import { getAllLikes, addLikes } from '../utils/like.js'
import { Lightbox } from '../utils/lightBox.js'
let urlProfile = new URLSearchParams(window.location.search)
let id = urlProfile.get('id');
const galleryContainer = document.querySelector(".gallery-container");

//Déclaration des variables
let profile = [];
let media = [];
export let gallery = [];

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
            getAllLikes()
            addLikes()
            // initLightbox()
            // console.log(media)
        });
    //Retourne le profil et les medias
    return { profile, media }
}

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
    galleryContainer.innerHTML = ''
    //Pour chaque media recupéré et injecté dans la const "media", on les ajoute au tableau "gallery"
    media.forEach((media) => {
        gallery.push(media);
    })
    //On affiche le nouveau tableau "gallery" selon les instructions de la fonction "showGallery"
    showGallery(gallery)
}

export function showGallery(medias) {
    //Pour chaque media (data)
    medias.forEach((media) => {
        //On récupère les informations à chaque media
        const photographBook = new PhotographBook(media)
        //On applique une mise en forme selon si c'est une image ou autre, donc video
        const BookTemplateData = new BookTemplate(photographBook)
        if (media.image) {
            //Ajoute un nouveau media "image"
            galleryContainer.innerHTML += BookTemplateData.createImage()
        } else {
            //Ajoute un nouveau media "video"
            galleryContainer.innerHTML += BookTemplateData.createVideo()
        }
    })
    Lightbox.initLightbox(medias);
}

//Filtre menu
let btDropdown = document.querySelector(".btDropdown") //Par défaut sur "Popularité"
let dropdownContent = document.getElementById("dropdownContent")
let menuDropdown = document.querySelector("#menu_dropdown")

function dropdownFc() {
    dropdownContent.classList.toggle('show')
    let expanded = menuDropdown.getAttribute('aria-expanded') == "true" ? "false" : "true";
    menuDropdown.setAttribute('aria-expanded', expanded);  
    /*console.log("show ::", dropdownContent)
    console.log(document.body)*/
}

btDropdown.addEventListener('click', dropdownFc);

function toggleOption(event) {
    console.log("toggleOption()", event)
    var filter = []
    let dropdownContentClass = document.querySelector(".dropdown-content");
    for (let i = 0; i < dropdownContentClass.length; i++) {
        let dropdownContentOpen = dropdownContentClass[i];
        if (dropdownContentOpen.classList.contains("show")) {
            dropdownContentOpen.classList.remove("show");
        }
        //Le titre du filtre est injecté dans le titre du bouton
        if (event.target.matches('.dropdownItem')) {
            document.getElementById('btDropdown').textContent = event.target.textContent;
            filter = event.target.dataset.filterType;
            galleryContainer.innerHTML = ""
            switchFilter(filter)
        }
    }
}

// Fermeture du menu
// On ecoute si un evenement se realise à l'exterieur du menu
// On le cache si c'est le cas
// window.onclick = function (event) {
//     var filter = []
//     if (!event.target.matches('#btDropdown')) {
//         // let dropdownContentClass = document.getElementsByClassName("dropdown-content");
//         // for (let i = 0; i < dropdownContentClass.length; i++) {
//         //     let dropdownContentOpen = dropdownContentClass[i];
//         //     if (dropdownContentOpen.classList.contains("show")) {
//         //         dropdownContentOpen.classList.remove("show");
//         //     }
//         //     //Le titre du filtre est injecté dans le titre du bouton
//         //     if (event.target.matches('.dropdownItem')) {
//         //         document.getElementById('btDropdown').textContent = event.target.textContent;
//         //         filter = event.target.dataset.filterType;
//         //         galleryContainer.innerHTML = ""
//         //         switchFilter(filter)
//         //     }
//         // }
//     }
// }

document.getElementById("btDropdown").addEventListener("click", toggleOption)

async function switchFilter(selectedFilter) {
    let mediaFiltred = []
    switch (selectedFilter) {
        case "review":
            mediaFiltred = media.sort((a, b) => b.likes - a.likes);
            break;
        case "date":
            mediaFiltred = media.sort((a, b) => {
                return new Date(a.date).valueOf() - new Date(b.date).valueOf();
            });
            break;
        case "title":
            mediaFiltred = media.sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                }
            });
    }
    showGallery(mediaFiltred)
    addLikes()
    Lightbox.initLightbox(mediaFiltred)
    // initLightbox(mediaFiltred)
    // lightbox()
}

init()

//Initialisation de la lightbox
// function initLightbox() {
//     //Tableau de tous les medias pour la Lightbox

//     const links = Array.from(document.querySelectorAll('.media-container a'))
//     console.log ("Ensemble des medias qui seront chargés dans la Lightbox :", links)

//     //Pour chaque élément on recupere les href (faudrait récupèrer tous les alt!!!)
//     const gallery = links.map(link => link.getAttribute('href'))

//     // const gallery = links.map(link => link.getAttribute('a'))
//     const titles = links.map(link => link.getAttribute('alt'))
//     console.log("Titres des medias chargés :", titles)

//     links.forEach(link => link.addEventListener('click', e => {
//         e.preventDefault()
//         new Lightbox(e.currentTarget.getAttribute('href'), gallery)
//     }))
//     console.log('Medias chargés dans la lightbox :', gallery)
// }

