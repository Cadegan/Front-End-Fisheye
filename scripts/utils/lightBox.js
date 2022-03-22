// import MediaImage from "../models/MediaImage.js"
export class Lightbox {
    lightboxContainerElements = null;
    index = null;
    media = {
        url: null,
        title: null,
        mediatype: null,
        index: null,
    };

    constructor(index) {
        this.index = index;

        this.open();

        // selectionne une image
        this.getImageData();

        // afficher la image
        this.updateSelectedMedia();

        ////Navigation en fonction du Keyboard event
        this.onKeyUp = this.onKeyUp.bind(this)
        document.addEventListener('keyup', this.onKeyUp)
    }

    getImageData() {
        let mediaElements = Array.from(document.querySelectorAll('.picture'))
        // console.log("Medias chargés dans mediaElements", mediaElements)
        let mediaElement = mediaElements[this.index];
        // console.log(mediaElement)

        this.media = {
            url: mediaElement.getAttribute("href"),
            title: mediaElement.getAttribute("alt"),
            type: mediaElement.dataset.mediatype,
            index: mediaElement.dataset.index,
        };
        console.log(this.media)

        document.onkeydown = function () {
            return false;
        }
    }

    updateSelectedMedia() {
        const container = this.lightboxContainerElements.querySelector('.mediaShow')
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
        root.style.overflow = 'hidden'; //Bloque le défilement de la page générale
        const dom = document.createElement('div')
        dom.classList.add('lightbox-screen')
        dom.innerHTML = `
        <button class="btClose btnScreenview" tabindex="1"><div>&times;</div></button>
        <button class="btPrev btnScreenview" tabindex="1"><div>&lsaquo;</div></button>
        <button class="btNext btnScreenview" tabindex="1"><div>&rsaquo;</div></button>
        <div class="lightboxScreenContainer">
            <div class="mediaShow"></div>
        </div>
        `
        dom.querySelector('.btClose').addEventListener('click', this.close.bind(this))
        dom.querySelector('.btPrev').addEventListener('click', this.prev.bind(this))
        dom.querySelector('.btNext').addEventListener('click', this.next.bind(this))


        const galleryContainer = document.querySelector(".gallery-container");
        this.lightboxContainerElements = dom;
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

    prev(e) {
        e.preventDefault()
        let mediaElements = Array.from(document.querySelectorAll('.media-container .picture'))
        const links = mediaElements.length
        this.index--;
        if (this.index < 0) {
            this.index = links - 1
        }
        this.getImageData();
        this.updateSelectedMedia();
        // console.log('next :', this.index)
    }

    next(e) {
        e.preventDefault()
        let mediaElements = Array.from(document.querySelectorAll('.media-container .picture'))
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
        this.lightboxContainerElements.classList.add('fadeOut')
        window.setTimeout(() => {
            this.lightboxContainerElements.parentElement.removeChild(this.lightboxContainerElements)
        }, 200)

        const root = document.querySelector("body, html"); //Va servir à ecouter les evenements et cacher toute la page
        root.style.overflow = ''; //Remet la page générale
        document.removeEventListener('keyup', this.onKeyUp) //Enleve de la fonction onKeyUp

        document.onkeydown = function () {
            return true;
        }
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