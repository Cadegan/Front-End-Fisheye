
export class Lightbox {


    constructor(id, media, title) {
        this.element = this.buildDOM(id)
        this.media = media
        this.title = title
        this.loadMedia(id) //Charge le media dans le container
        this.onKeyUp = this.onKeyUp.bind(this)
        const galleryContainer = document.querySelector(".gallery-container");
        galleryContainer.prepend(this.element)
        document.addEventListener('keyup', this.onKeyUp)
    }

    //Injecte le media recupéré
    loadMedia(id, alt) {
        this.id = null //Reinitialise le media
        let media = new Image()
        const container = this.element.querySelector('.mediaShow')
        container.innerHTML = ''
        media.onload = () => {
            container.appendChild(media)//Injecte le media
            this.id = id //Charge le media passé en paramettre
            this.alt = alt
        }
        media.src = id
        media.alt = alt
    }

    //Navigation en fonction du Keyboard event
    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.close(e) // Lance la fonction Close
        } else if (e.key === 'ArrowLeft') {
            this.prev(e) // Lance la fonction Preview
        } else if (e.key === 'ArrowRight') {
            this.next(e) // Lance la fonction Next
        }
    }

    //Fermeture de la Lightbox
    close(e) {
        e.preventDefault()
            this.element.parentElement.removeChild(this.element)
            const root = document.querySelector("body, html"); //Va servir à ecouter les evenements et cacher toute la page
            root.style.overflow = ''; //Remet la page générale
        document.removeEventListener('keyup', this.onKeyUp) //Enleve de la fonction onKeyUp
    }

    next(e) {
        e.preventDefault()
        let i = this.media.findIndex(media => media === this.id) //Parcour l'index
        if (i === this.media.length - 1) {
            i = -1
        } //Reviens au debut de l'index au denier media
        this.loadMedia(this.media[i + 1]) //Passe au media suivant
        // this.element.querySelector('.mediaShow').innerHTML = this.createMediaLightbox()
    }

    prev(e) {
        e.preventDefault()
        let i = this.media.findIndex(media => media === this.id)
        if (i === 0) {
            i = this.media.length
        } //Reviens à la fin de l'index au denier media
        this.loadMedia(this.media[i - 1]) //Passe au media pécédent
    }

//Construction HTML du loader
    buildDOM(alt) {
        const root = document.querySelector("body, html"); //Va servir à ecouter les evenements et cacher toute la page
        root.style.overflow = 'hidden'; //Cache la page générale
        const dom = document.createElement('div')
        dom.classList.add('lightbox-screen')
        dom.innerHTML = `
        <button class="btClose btnScreenview">&times;</button>
        <button class="btNext btnScreenview">&lsaquo;</button>
        <button class="btPrev btnScreenview">&rsaquo;</button>
        <div class="lightboxScreenContainer">
            <div class="mediaShow"></div>
            <p classe="mediaTitle">${alt}</p>
        </div>
        `
        dom.querySelector('.btClose').addEventListener('click', this.close.bind(this))
        dom.querySelector('.btNext').addEventListener('click', this.next.bind(this))
        dom.querySelector('.btPrev').addEventListener('click', this.prev.bind(this))
        return dom
    }

}