// Template pour les medias
export default class BookTemplate {
    constructor(media) {
        this._media = media;
    }

    //Si c'est une image
    createImage() {
        return `
            <article class="media-container" tabindex="0" data-type="image" aria-label="${this._media.title}">
                <a href="${this._media.image}" alt="${this._media.title}" data-id="${this._media.id}">
                <img class="photo mediasLightbox" alt="${this._media.title}" src="${this._media.image}" data-id="${this._media.id}"/>
                </a>
                <div class="titleContent">
                    <h3 class="title">${this._media.title}</h3>
                    <div class="reviewElement">
                        <span class="likes">${this._media.likes}</span>
                        <i class="heartIcon" alt="Likes" tabindex="0"></i>
                    </div>
                </div>
            </article>
        `
    }

    // Si c'est une video
    createVideo () {
        return `
            <article class="media-container" tabindex="0" data-type="video" aria-label="${this._media.title}">
            <a href="${this._media.video}" alt="${this._media.title}">
                 <video class="video mediasLightbox" alt="${this._media.title}" src="${this._media.video}" controls="controls" data-id="${this._media.id}"></video>
            </a>
                <div class="titleContent">
                    <h3 class="title">${this._media.title}</h3>
                    <div class="reviewElement">
                        <span class="likes">${this._media.likes}</span>
                        <i class="heartIcon" alt="Likes" tabindex="0">
                        </i>
                    </div>
                </div>
            </article>
        `
    }
}