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
                galleryContainer.innerHTML=""
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

async function lightbox () {
    const root = document.querySelector("body, html");
    const mediasLightbox = document.querySelectorAll(".mediasLightbox");
    console.log("Ensemble des medias lightbox" , mediasLightbox)
    const l = mediasLightbox.length;
    console.log("Nombre total de medias", l)

    for (var i = 0; i < l; i++) {
        mediasLightbox[i].addEventListener("click", function (i) {
            var currentMedia = this;
            console.log("Media selectionné", this)
            //const parentItem = currentMedia.parentElement
            const screenView = document.createElement('div');
            screenView.id = "lightbox-screen";
            galleryContainer.prepend(screenView);
            //if (parentItem.hasAttribute('data-theme')) screenView.setAttribute("data-theme", "dark");
            var mediaFocus = currentMedia.src;
            console.log("Chemin du média affiché", mediaFocus)
            root.style.overflow = 'hidden';
            screenView.innerHTML = `
                            <div class="gg-image"></div>
                            <div class="gg-close gg-btn"></div>
                            <div class="gg-next gg-btn"></div>
                            <div class="gg-prev gg-btn"></div>`;
            const first = mediasLightbox[0].src, last = mediasLightbox[l - 1].src;
            const imgItem = document.querySelector(".gg-image"), prevBtn = document.querySelector(".gg-prev"), nextBtn = document.querySelector(".gg-next"), close = document.querySelector(".gg-close");
            imgItem.innerHTML = '<img src="' + mediaFocus + '">';

            if (l > 1) {
                if (mediaFocus == first) {
                    prevBtn.hidden = true;
                    var prevImg = false;
                    var nextImg = currentMedia.nextElementSibling;
                }
                else if (mediaFocus == last) {
                    nextBtn.hidden = true;
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

            function prev() {
                prevImg = currentMedia.previousElementSibling;
                imgItem.innerHTML = '<img src="' + prevImg.src + '">';
                currentMedia = currentMedia.previousElementSibling;
                var mainImg = document.querySelector(".mediasLightbox").src;
                nextBtn.hidden = false;
                prevBtn.hidden = mainImg === first;
            };

            function next() {
                nextImg = currentMedia.nextElementSibling;
                imgItem.innerHTML = '<img src="' + nextImg.src + '">';
                currentMedia = currentMedia.nextElementSibling;
                var mainImg = document.querySelector(".mediasLightbox").src;
                prevBtn.hidden = false;
                nextBtn.hidden = mainImg === last;
            };

            function hide() {
                root.style.overflow = 'auto';
                screenView.remove();
            };
        });
    }
/*
    function gridGallery(options) {
        if (options.selector) selector = document.querySelector(options.selector);
        if (options.darkMode) selector.setAttribute("data-theme", "dark");
        if (options.layout == "horizontal" || options.layout == "square") selector.setAttribute("data-layout", options.layout);
        if (options.gaplength) selector.style.setProperty('--gap-length', options.gaplength + 'px');
        if (options.rowHeight) selector.style.setProperty('--row-height', options.rowHeight + 'px');
        if (options.columnWidth) selector.style.setProperty('--column-width', options.columnWidth + 'px');
    }
    */
}