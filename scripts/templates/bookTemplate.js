// Template pour les medias
class photographBook {
    constructor (media) {
      this._media = media;  
    }

    get media () {
        return this.media
    }

    createImageBook () {
        const imageBook = 
        `   <article>
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