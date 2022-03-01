//Page profil du photographe
import PhotographBook from '../factories/models/photographBook.js'
import BookTemplate from '../factories/templates/bookTemplate.js'
import { getAllLikes, addLikes } from '../utils/like.js'
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
            lightbox()
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
}

//Filtre menu
let btDropdown = document.querySelector(".btDropdown") //Par défaut sur "Popularité"
let dropdownContent = document.getElementById("dropdownContent")

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
    var filter = []
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
                galleryContainer.innerHTML = ""
                switchFilter(filter)
            }
        }
    }
}

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
    lightbox()
}

init()


//Lightbox
async function lightbox() {
    const root = document.querySelector("body, html"); //Va servir à ecouter les evenements et cacher toute la page
    const mediasLightbox = document.querySelectorAll(".mediasLightbox"); //Slecetionne tous les medias (images et videos)
    console.log("Ensemble des medias lightbox :", mediasLightbox)
    const l = mediasLightbox.length; //Longeur de la collection
    console.log("Nombre total de medias :", l)

    for (var i = 0; i < l; i++) {
        mediasLightbox[i].addEventListener("click", function (i) { //Pour chaque media, on ecoute le click
            var currentMedia = this; //Chargera le media actuellement visionné
            console.log("Media visionné :", this)
            const screenView = document.createElement('div'); //Zonne d'ouverture du media
            screenView.id = "lightbox-screen";
            galleryContainer.prepend(screenView);
            var mediaFocus = currentMedia.src; //Recupere le media
            var mediaFocusTitle = currentMedia.alt //Recupere le titre du media
            console.log("Titre du media selectionné :", mediaFocusTitle);
            console.log("Chemin du média affiché :", mediaFocus)
            root.style.overflow = 'hidden'; //Cache la page générale
            screenView.innerHTML = `
                            <div class="mediaShow"></div>
                            <button class="btClose btnScreenview">&times;</button>
                            <button class="btNext btnScreenview">&lsaquo;</button>
                            <button class="btPrev btnScreenview">&rsaquo;</button>
                            <p classe="mediaTitle">${mediaFocusTitle}</p>`;
            const first = mediasLightbox[0].src, last = mediasLightbox[l - 1].src; //Determine le 1er et le dernier media de la liste
            //Cible les différents éléments pour la visualisation
            const imgItem = document.querySelector(".mediaShow"), prevBtn = document.querySelector(".btPrev"), nextBtn = document.querySelector(".btNext"), close = document.querySelector(".btClose");
            imgItem.innerHTML = '<img src="' + mediaFocus + '">'; //Affiche le media
            //Conditions qui détermine si c'est le 1er, un ou le dernier media
            if (l > 1) {
                if (mediaFocus == first) {
                    nextBtn.hidden = true;
                    var prevImg = false;
                    var nextImg = currentMedia.nextElementSibling; //!!!Impossible d'accéder au media suivant
                }
                else if (mediaFocus == last) {
                    prevBtn.hidden = true;
                    var nextImg = false;
                    var prevImg = currentMedia.previousElementSibling;
                }
                else {
                    var prevImg = currentMedia.previousElementSibling;
                    var nextImg = currentMedia.nextElementSibling;
                }
            }
            else {
                prevBtn.hidden = true;
                nextBtn.hidden = true;
            }
            //Fonctions de navigation
            screenView.addEventListener("click", function (e) {
                if (e.target == this || e.target == close) hide();
            });

            root.addEventListener("keydown", function (e) {
                if (e.keyCode == 37 || e.keyCode == 38) prev();
                if (e.keyCode == 39 || e.keyCode == 40) next();
                if (e.keyCode == 27) hide();
            });

            prevBtn.addEventListener("click", prev);
            nextBtn.addEventListener("click", next);

            //Fonction d'appel du media précédent
            function prev() {
                prevImg = currentMedia.previousElementSibling; //Fonctionnne pas
                imgItem.innerHTML = '<img src="' + prevImg.src + '">';
                currentMedia = currentMedia.previousElementSibling;
            }

            //Fonction d'appel du media d'après
            function next() {
                nextImg = currentMedia.nextElementSibling;
                imgItem.innerHTML = '<img src="' + nextImg.src + '">';
                currentMedia = currentMedia.nextElementSibling;
            }

            function hide() {
                root.style.overflow = 'auto';
                screenView.remove();
            }
        });
    }
}