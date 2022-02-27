// Template pour les medias
export default class BookTemplate {
    constructor(media) {
        this._media = media;
    }

    //Si c'est une image
    createImage() {
        return `
            <article class="media-container" tabindex="0" data-type="image">
                <img class="photo mediasLightbox" alt="${this._media.title}" src="${this._media.image}"/>
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
            <article class="media-container" tabindex="0" data-type="video">
                <video class="video mediasLightbox" alt="${this._media.title}" src="${this._media.video}" aria-label="${this._media.title}" controls="controls"></video>
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