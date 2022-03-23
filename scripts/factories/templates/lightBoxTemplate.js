// Template pour les medias
export class LightBoxTemplate {
  constructor (media) {
    if (media.image) {
      return new Image(media)
    } else if (media.video) {
      return new Video(media)
    }
  }
}

// Si c'est une image
class Image {
  constructor (media) {
    this._media = media
  }

  createMediaLightbox () {
    return `
                <a alt="${this._media.title}" scr="${this._media.image}" data-id="${this._media.id}">
                <p>alt="${this._media.title}"</p>
        `
  }
}

class Video {
  constructor (media) {
    this._media = media
  }

  createMediaLightbox () {
    return `
                <a scr="${this._media.video}" data-id="${this._media.id}" type="video">
                <p>alt="${this._media.title}"</p>
        `
  }
}
