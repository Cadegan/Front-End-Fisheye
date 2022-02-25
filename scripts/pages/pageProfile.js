//Page profil du photographe
import PhotographBook from '../factories/models/photographBook.js'
import BookTemplate from '../factories/templates/bookTemplate.js'
import { filterBy } from '../utils/filtre.js';
let urlProfile = new URLSearchParams(window.location.search)
let id = urlProfile.get('id');
const mediaSection = document.querySelector(".gallery-section");

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
    mediaSection.innerHTML = ''
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
            mediaSection.innerHTML += BookTemplateData.createImage()
        } else {
            //Ajoute un nouveau media "video"
            mediaSection.innerHTML += BookTemplateData.createVideo()
        }
    })
}

//Filtre menu
let menuDropdown = document.getElementById("menu_dropdown") //Menu principal
let btDropdown = document.querySelector(".btDropdown") //Bouton contenant le label
let dropdownContent = document.getElementById("dropdownContent") //Liste (div) contenant les filtres. Show ou non show
const premierEnfant = dropdownContent.firstElementChild //Cible le 1er enfant de la liste
let dropdownItem = document.getElementsByTagName("dropdownItem") //Cible les 3 filtres
let dropdownItemValue = btDropdown.textContent;



function dropdownFc() {
    btDropdown.addEventListener('click', () => toggleFc('Popularité'))
    menuDropdown.addEventListener('keypress', enterNavKey)
    //dropdownContent.classList.toggle('show')
    /*console.log("show ::", dropdownContent)
    console.log(document.body)*/
}

dropdownFc()

function enterNavKey(e) {
    if (e.keyCode === 13) {
        toggleFc('Popularité')
        filterBy
    }
}

function toggleFc(value) {
    if (!dropdownContent.classList.contains('show')) {
        menuDropdown.setAttribute('aria-expanded', 'true')
        menuDropdown.addEventListener('keypress', keyNav)
        dropdownContent.classList.toggle('show')
    } else {
        btDropdown.textContent = value
        dropdownContent.classList.toggle('show')
        menuDropdown.setAttribute('aria-expanded', 'false')
        menuDropdown.removeEventListener('keypress', keyNav)
        
    }
}

function keyNav (event) {
event.preventDefault()
 let focusElement = document.activeElement
 focusElement.setAttribute('aria-selected', 'true')
 if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
     focusElement.setAttribute('aria-selected', 'false')
     if (event.key === 'ArrowUp') {
         if (focusElement.previousElementSibling != null) {
             focusElement = focusElement.previousElementSibling
         } else {
             focusElement = focusElement.parentNode.lastElementChild
         }
     } else if (event.key === 'ArrowDown') {
         if (focusElement.nextElement != null) {
             focusElement = focusElement.nextElementSibling
         } else {
             focusElement = focusElement.parentNode.firstElementChild
         }
     }
 }
}

/*

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
                mediaDisplay(filter);
            }
        }
    }
}

var filter = 'date'
*/

//Fonction likes
//Aquisition des likes
function getAllLikes () {
    let totalLikesNumber = 0;
    const heartIcon = document.querySelectorAll('.heartIcon')
    const likes = document.getElementById("likes")
    heartIcon.forEach((review) => {
        const x = parseInt(review.previousElementSibling.innerHTML)
        totalLikesNumber += x
    })
    if (likes != null) {
        likes.firstElementChild.innerHTML = totalLikesNumber
    }
}

//Like par media
export function addLikes() {
    const heartIcon = document.querySelectorAll('.heartIcon')
    heartIcon.forEach((icon) => {
        icon.addEventListener("click", () => {
            let mediaLikes = parseInt(icon.previousElementSibling.innerHTML)
            mediaLikes++
            icon.previousElementSibling.innerHTML = mediaLikes
            getAllLikes()
        }, { once: true })
    })
}

init()

/*
async function getAllLikes () {
    
    let likes = 0;
    for (let i = 0; i < media.length; i++) {
        likes += media[i].likes;
    }
    console.log("Totaux des likes : " + likes);
    return likes;
}

//Cumule des likes et affichage des resultats
async function showAllLikes () {
    const allLikes = await getAllLikes();
    const likes = document.getElementById("totalLikesNumber")
    likes.innerHTML = `${allLikes}`
}
*/


/*
document.getElementById('btDropdown').textContent = event.target.textContent;
filter = event.target.dataset.filterType;



const heart = document.createElement('i');
        heart.className = 'heartIcon';
        heart.setAttribute("alt", "Likes");
        heart.tabIndex = 0;

        //Declare la variable mediaLike et charge les likes
        let mediaLike = likes;

        heart.addEventListener("click", (event) => {
            event.stopPropagation()
            mediaLike += 1;
            likeCount.innerText = mediaLike;
            addLikes();
        }, {once : true}
        );  
*/
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