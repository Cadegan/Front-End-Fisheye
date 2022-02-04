// Recupere les medias des photographes
class photographBook {
    constructor (media) {
        this._id = media.id
        this._photographerId = media.photographerId
        this._title = media.title
        this._image = media.image
        this._video = media.video
        this._likes = media.likes
        this._date = media.date
        this._price = media.price
    }

    get id () {
        return this._id
    }

    get PhotographerId () {
        return this._photographerId
    }

    get title () {
        return this._title
    }

    get image () {
        return `/assets/photos/${this._image}`
    }

    get video () {
        return `/assets/photos/${this._video}`
    }

    get likes () {
        return this._likes
    }

    get date () {
        return this._date
    }

    get price () {
        return this._price
    }
}