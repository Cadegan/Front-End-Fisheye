// import MediaImage from "../models/MediaImage.js"

// TODO: mettre le bon tag video : ok
// mettre le system loop dans la boucle index : Loop ok
// mettre a jour le style
export class Lightbox {
    lightboxContainerElement = null;
    index = null;
    media = {
        url: null,
        title: null,
        mediatype: null,
        index : null,
    };

    constructor(index) {
        this.open();

        this.index = index;

        // selectionne une image
        this.getImageData();

        // afficher la image
        this.updateSelectedMedia();

        ////Navigation en fonction du Keyboard event
        this.onKeyUp = this.onKeyUp.bind(this)
        document.addEventListener('keyup', this.onKeyUp)
    }

    getImageData() {
        let mediaElements = Array.from(document.querySelectorAll('.media-container a'))
        // console.log(mediaElements)
        let mediaElement = mediaElements[this.index];
        // console.log(mediaElement)

        this.media = {
            url: mediaElement.getAttribute("href"),
            title: mediaElement.getAttribute("alt"),
            type: mediaElement.dataset.mediatype,
            index: mediaElement.dataset.index,
        };
        console.log(this.media)
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
        <button class="btClose btnScreenview" tabindex="1">&times;</button>
        <button class="btNext btnScreenview" tabindex="1">&lsaquo;</button>
        <button class="btPrev btnScreenview" tabindex="1">&rsaquo;</button>
        <div class="lightboxScreenContainer">
            <div class="mediaShow"></div>
        </div>
        `
        dom.querySelector('.btClose').addEventListener('click', this.close.bind(this))
        dom.querySelector('.btNext').addEventListener('click', this.next.bind(this))
        dom.querySelector('.btPrev').addEventListener('click', this.prev.bind(this))

        const galleryContainer = document.querySelector(".gallery-container");
        this.lightboxContainerElement = dom;
        galleryContainer.prepend(dom);
    }

    //Navigation en fonction du Keyboard event
    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.close(e);
            return; // Lance la fonction Close
        } else if (e.key === 'ArrowLeft') {
            this.prev(e)
            return; // Lance la fonction Preview
        } else if (e.key === 'ArrowRight') {
            this.next(e)
            return; // Lance la fonction Next
        }
    }
    
    next(e) {
        e.preventDefault()
        let mediaElements = Array.from(document.querySelectorAll('.media-container a'))
        const links = mediaElements.length
        this.index--;
        if (this.index < 0) {
            this.index = links - 1
        }
        this.getImageData();
        this.updateSelectedMedia();
        // console.log('next :', this.index)
    }

    prev(e) {
        e.preventDefault()
        let mediaElements = Array.from(document.querySelectorAll('.media-container a'))
        const links = mediaElements.length
        this.index++;
        if (this.index === links) {
            this.index = 0
        }
        this.getImageData();
        this.updateSelectedMedia();
        // console.log('prev :', this.index)
    }

    close(e) {
        e.preventDefault()
        this.lightboxContainerElement.classList.add('fadeOut')
        window.setTimeout(() => {
            this.lightboxContainerElement.parentElement.removeChild(this.lightboxContainerElement)
        }, 200)

        const root = document.querySelector("body, html"); //Va servir à ecouter les evenements et cacher toute la page
        root.style.overflow = ''; //Remet la page générale
        document.removeEventListener('keyup', this.onKeyUp) //Enleve de la fonction onKeyUp
    }
}


export default class MediaImage {
    constructor(media) {
        this._media = media;
    }

    createAndGetElement() {
        return `
            <img src="${this._media.url}"/>
            <p>${this._media.title}</p>
        `
    }
}
export class MediaVideo {
    constructor(media) {
        this._media = media;
    }

    createAndGetElement() {
        return `
                <video src="${this._media.url}" type="video" controls="true"></video>
        `
    }
}