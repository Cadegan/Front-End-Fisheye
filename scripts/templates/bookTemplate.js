// Template pour les medias
class bookTemplate {
    constructor(media) {
        this._media = media;

        this.$warpper = document.createElement('div');
        this.$warpper.classList.add('media-card-warpper');

    }

    get media() {
        return this._media
    }

    createImageBook() {
        const imageBook = `
            <article>
                <img
                    alt="${this._media.title}"
                    src="${this._media.image}"
                />
                <div>
                    <h3 class="title">${this._media.title}</h3>
                    <span class="Likes-count">${this._media.likes}</span>
                </div>
            </article>
        `
        this.$warpper.innerHTML = imageBook
        return this.$warpper
    }

}