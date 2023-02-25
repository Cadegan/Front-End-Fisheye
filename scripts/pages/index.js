import { photographerFactory } from "../factories/indexPhotographerFactories.js"

async function getPhotographers () {
  let photographers = [] // Changement de la constant en variable. On déclare un tableau "photographers"

  // et bien retourner le tableau photographers seulement une fois
  await fetch("https://cadegan.github.io/Data/photographers_data.json") // On attend la resolution de la promesse : l'extraction des données
    .then(reponse => reponse.json())
    .then((data) => (photographers = data.photographers))
  return { photographers }
}

async function displayData (photographers) {
  const photographersSection = document.querySelector(".photographer_section")

  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init () {
  // On attend que la promesse getPhotographers se réalise pour afficher les photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
}

init()
