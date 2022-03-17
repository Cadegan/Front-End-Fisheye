// import MediaImage from "../models/MediaImage.js"

// TODO: mettre le bon tag video
// mettre le system loop dans la boucle index
// mettre a jour le style
export class Lightbox {
    lightboxContainerElement = null;
    index = null;
    media = {
        url: null,
        title: null,
        mediaType: null,
    };

    constructor(index) {
        this.open();

        this.index = index;

        // selectionn'e une image
        this.getImageData();

        // afficher la image
        this.updateSelectedMedia();


        // this.onKeyUp = this.onKeyUp.bind(this)
        // document.addEventListener('keyup', this.onKeyUp)
    }

    getImageData() {
        let mediaElements = Array.from(document.querySelectorAll('.media-container a'))
        
        let mediaElement = mediaElements[this.index];

        this.media = {
            url: mediaElement.getAttribute("href"),
            title: mediaElement.getAttribute("alt"),
            type: mediaElement.dataset.mediaType,
        };
    }


    updateSelectedMedia() {
        const container = this.lightboxContainerElement.querySelector('.mediaShow')
        if (this.media.type == "image") {
            container.innerHTML = new MediaImage(this.media).createAndGetElement();
        }
        else {
            container.innerHTML = new MediaVideo(this.media).createAndGetElement();
        }
    }

//Construction HTML du loader
    open() {
        const root = document.querySelector("body, html"); //Va servir à ecouter les evenements et cacher toute la page
        root.style.overflow = 'hidden'; //Cache la page générale
        const dom = document.createElement('div')
        dom.classList.add('lightbox-screen')
        dom.innerHTML = `
        <button class="btClose btnScreenview">&times;</button>
        <button class="btNext btnScreenview">&lsaquo;</button>
        <button class="btPrev btnScreenview">&rsaquo;</button>
        <div class="lightboxScreenContainer">
            <div class="mediaShow">
            </div>
            <p classe="mediaTitle"></p>
        </div>
        `
        dom.querySelector('.btClose').addEventListener('click', this.close.bind(this))
        dom.querySelector('.btNext').addEventListener('click', this.next.bind(this))
        dom.querySelector('.btPrev').addEventListener('click', this.prev.bind(this))

        const galleryContainer = document.querySelector(".gallery-container");
        this.lightboxContainerElement = dom;
        galleryContainer.prepend(dom);
    }

    close(e) {
        e.preventDefault()
        this.lightboxContainerElement.parentElement.removeChild(this.lightboxContainerElement)
        const root = document.querySelector("body, html"); //Va servir à ecouter les evenements et cacher toute la page
        root.style.overflow = ''; //Remet la page générale
        document.removeEventListener('keyup', this.onKeyUp) //Enleve de la fonction onKeyUp
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
    next(e) {
        e.preventDefault()
        this.index++;

        this.getImageData();
        this.updateSelectedMedia();
    }

    prev(e) {
        e.preventDefault()
        this.index--;

        this.getImageData();
        this.updateSelectedMedia();
    }
}


export default class MediaImage {
    constructor(media) {
        this._media = media;
    }

    createAndGetElement() {
        return `
            <img src="${this._media.url}" />
            <p>alt="${this._media.title}"</p>
        `
    }
}
export class MediaVideo {
    constructor(media) {
        this._media = media;
    }

    createAndGetElement() {
        return `
                <img src="${this._media.url}" />
                <p>alt="${this._media.title}"</p>
        `
    }
}