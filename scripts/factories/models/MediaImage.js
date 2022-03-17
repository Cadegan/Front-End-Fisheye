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