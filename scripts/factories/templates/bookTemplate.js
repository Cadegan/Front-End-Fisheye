// Template pour les medias
export default class BookTemplate {
    constructor(media) {
        this._media = media;
    }

    //Si c'est une image
    createImage(index) {
        return `
            <article class="media-container" tabindex="0" data-type="image" aria-label="${this._media.title}">
                <a href="${this._media.image}" alt="${this._media.title}" data-id="${this._media.id}" data-index="${index}" data-mediaType="image" >
                <img class="photo mediasLightbox" alt="${this._media.title}" src="${this._media.image}"/>
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
    createVideo (index) {
        return `
            <article class="media-container" tabindex="0" data-type="video" aria-label="${this._media.title}" data-index="${index}">
            <a href="${this._media.video}" alt="${this._media.title}" data-mediaType="video">
                 <video class="video mediasLightbox" alt="${this._media.title}" src="${this._media.video}" controls="controls"></video>
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