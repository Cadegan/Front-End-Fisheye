// Page profil du photographe
import { profileFactories } from "../factories/profileFactories.js"
import PhotographBook from "../factories/models/photographBook.js"
import BookTemplate from "../factories/templates/bookTemplate.js"
import { getAllLikes, addLikes } from "../utils/like.js"
import { Lightbox } from "../utils/lightBox.js"
const urlProfile = new URLSearchParams(window.location.search)
const id = urlProfile.get("id")
const galleryContainer = document.querySelector(".gallery-container")

// Déclaration des variables
let profile = []
let media = []
export const gallery = []

// Aquisition des éléments du photographe
async function init () {
  // Consultation de l'API
  await fetch("https://cadegan.github.io/Data/photographers_data.json")
    .then(res => res.json())
    .then((data) => {
      // Charge les éléments du profile dans la variable profile selon l'id du photographe
      profile = data.photographers.find(photographer => photographer.id === +id)
      // Charge les éléments des media dans la variable media selon l'id du photographe
      media = data.media.filter(media => media.photographerId === +id)
      profileDisplay()
      mediaDisplay()
      getAllLikes()
      addLikes()
      initLightbox()
      // console.log(media)
    })
    // Retourne le profil et les medias
  return { profile, media }
}

const profileDisplay = () => {
  // Charges les informations du photographes selon le profileFactories
  const header = document.querySelector(".photograph-header")
  const profileModel = profileFactories(profile)
  const profileCardDOM = profileModel.cardProfile()
  header.appendChild(profileCardDOM)

  const priceDay = profile.price + "€ / Jour"
  document.getElementById("priceDay").innerHTML = priceDay
}

const mediaDisplay = () => {
  // Réinitialise la gallery
  galleryContainer.innerHTML = ""
  // Pour chaque media recupéré et injecté dans la const "media", on les ajoute au tableau "gallery"
  media.forEach((media) => {
    gallery.push(media)
  })
  // On affiche le nouveau tableau "gallery" selon les instructions de la fonction "showGallery"
  showGallery(gallery)
}

export function showGallery (medias) {
  // Pour chaque media (data)
  let index = 0

  medias.forEach((media) => {
    // On récupère les informations à chaque media
    const photographBook = new PhotographBook(media)
    // On applique une mise en forme selon si c'est une image ou autre, donc video
    const BookTemplateData = new BookTemplate(photographBook)

    if (media.image) {
      // Ajoute un nouveau media "image"
      galleryContainer.innerHTML += BookTemplateData.createImage(index)
    } else {
      // Ajoute un nouveau media "video"
      galleryContainer.innerHTML += BookTemplateData.createVideo(index)
    }

    index++
  })
}

// Filtre menu
const btDropdown = document.querySelector(".btDropdown") // Par défaut sur "Popularité"
const dropdownContainer = document.getElementById("dropdownContent")
const menuDropdown = document.querySelector("#menu_dropdown")

function toggleDropdownVisibility () {
  dropdownContainer.classList.toggle("show")
  const expanded = menuDropdown.getAttribute("aria-expanded") === "true" ? "false" : "true"
  menuDropdown.setAttribute("aria-expanded", expanded)
}

btDropdown.addEventListener("click", toggleDropdownVisibility)

// recuper l'arrray des options
const optionsElements = document.getElementsByClassName("dropdownItem")

// lié event au click
for (let i = 0; i < optionsElements.length; i++) {
  const optionElement = optionsElements[i]
  optionElement.addEventListener("click", toggleOption)
}

function toggleOption (event) {
  let filter = []

  dropdownContainer.classList.remove("show")

  document.getElementById("btDropdown").textContent = event.target.textContent

  filter = event.target.dataset.filterType
  galleryContainer.innerHTML = ""
  switchFilter(filter)
}

async function switchFilter (selectedFilter) {
  let mediaFiltred = []
  switch (selectedFilter) {
    case "review":
      mediaFiltred = media.sort((a, b) => b.likes - a.likes)
      break
    case "date":
      mediaFiltred = media.sort((a, b) => {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf()
      })
      break
    case "title":
      mediaFiltred = media.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1
        } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1
        }
      })
  }
  showGallery(mediaFiltred)
  addLikes()
  initLightbox(mediaFiltred)
}

init()

// Initialisation de la lightbox
function initLightbox () {
  // Tableau de tous les medias pour la Lightbox

  const links = Array.from(document.querySelectorAll(".picture"))
  // console.log ("Ensemble des medias qui seront chargés dans la Lightbox :", links)

  // Pour chaque élément on obtient son href
  const gallery = links.map(link => link.getAttribute("href"))

  links.forEach(link => link.addEventListener("click", e => {
    e.preventDefault()
    new Lightbox(e.currentTarget.dataset.index, gallery)
  }))
  // console.log('Medias chargés dans la lightbox :', gallery)
}
