//Lightbox v2
export async function lightBox() {
    const root = document.querySelector("body, html");
    const mediasLightbox = document.querySelectorAll(".mediasLightbox");
    console.log("Ensemble des medias lightbox", mediasLightbox)
    const l = mediasLightbox.length;
    console.log("Nombre total de medias", l)

    for (var i = 0; i < l; i++) {
        mediasLightbox[i].addEventListener("click", function (i) {
            var currentMedia = this;
            console.log("Media selectionné", this)
            const screenView = document.createElement('div');
            screenView.id = "lightbox-screen";
            galleryContainer.prepend(screenView);
            var mediaFocus = currentMedia.src;
            console.log("Chemin du média affiché", mediaFocus)
            root.style.overflow = 'hidden';
            screenView.innerHTML = `
                            <div class="mediaShow"></div>
                            <div class="close"></div>
                            <div class="next"></div>
                            <div class="gg-prev"></div>`;
            const first = mediasLightbox[0].src, last = mediasLightbox[l - 1].src;
            const imgItem = document.querySelector(".mediaShow"), prevBtn = document.querySelector(".prev"), nextBtn = document.querySelector(".next"), close = document.querySelector(".close");
            imgItem.innerHTML = '<img src="' + mediaFocus + '">';

            if (l > 1) {
                if (mediaFocus == first) {
                    prevBtn.hidden = true;
                    var prevImg = false;
                    var nextImg = currentMedia.nextElementSibling;
                }
                else if (mediaFocus == last) {
                    nextBtn.hidden = true;
                    var nextImg = false;
                    var prevImg = currentMedia.previousElementSibling;
                }
                else {
                    var prevImg = currentMedia.previousElementSibling;
                    var nextImg = currentMedia.nextElementSibling;
                }
            }
            else {
                prevBtn.hidden = true;
                nextBtn.hidden = true;
            }

            screenView.addEventListener("click", function (e) {
                if (e.target == this || e.target == close) hide();
            });

            root.addEventListener("keydown", function (e) {
                if (e.keyCode == 37 || e.keyCode == 38) prev();
                if (e.keyCode == 39 || e.keyCode == 40) next();
                if (e.keyCode == 27) hide();
            });

            prevBtn.addEventListener("click", prev);
            nextBtn.addEventListener("click", next);

            function prev() {
                prevImg = currentMedia.previousElementSibling;
                imgItem.innerHTML = '<img src="' + prevImg.src + '">';
                currentMedia = currentMedia.previousElementSibling;
                var mainImg = document.querySelector(".mediasLightbox").src;
                nextBtn.hidden = false;
                prevBtn.hidden = mainImg === first;
            }

            function next() {
                nextImg = currentMedia.nextElementSibling;
                imgItem.innerHTML = '<img src="' + nextImg.src + '">';
                currentMedia = currentMedia.nextElementSibling;
                var mainImg = document.querySelector(".mediasLightbox").src;
                prevBtn.hidden = false;
                nextBtn.hidden = mainImg === last;
            }

            function hide() {
                root.style.overflow = 'auto';
                screenView.remove();
            }
        });
    }
}

/*
//Lightbox v1
export default class LightBox {
    constructor(mediasLightbox) {
        this.currentMedia = null;
        this.mediasLightbox = mediasLightbox;
        this.navigation();
    }

    displayMedia(id) {
        this.currentMedia = this.getElementById(id)
        this.display()
    }

    next() {
        const index = this.mediasLightbox.findIndex(
            (media) => media.id === this.currentMedia.id
        );
        if (index == this.mediasLightbox.lengh -1) {
            this.currentMedia = this.mediasLightbox[0]
        } else {
            this.currentMedia = this.mediasLightbox[index + 1]
        }

        this.display()
    }

    preview() {
        const index = this.mediasLightbox.findIndex(
            (media) => media.id === this.currentMedia.id
        );
        if (index == 0) {
            this.currentMedia = this.mediasLightbox[this.mediasLightbox.length - 1]
        } else {
            this.currentMedia = this.mediasLightbox[index - 1]
        }

        this.display()
    }

    navigation() {
        const nextMedia = document.querySelector(".nextBtn");
        nextMedia.addEventListener("click", () => {
            this.next();
        });

        const previewMedia = document.querySelector(".nextBtn");
        previewMedia.addEventListener("click", () => {
            this.preview();
          });

        const closeBtn = document.querySelector(".closeBtn");
        closeBtn.addEventListener("click", () => {
            this.close();
        });
    }

    getMediasById(id) {
        return id.mediasLightbox.filter(media => media.photographerId === +id);
    }

    display () {
        const screenView = document.querySelector(".lightboxScreen");
        

        if (this.currentMedia.image) {
            screenView.innerHTML = 
                '<div <img id="mediaShow" scr="./assets/Photos/'
                + this.currentMedia.photographerId
                + "/"
                + this.currentMedia.image
                + 'alt=""><p class="currentMediaTitle">'
                + this.currentMedia.title
                + "</div>";
        }

        document.querySelector(".lightbox").classList.add("show")
    }

    close () {
        document.querySelector(".lightbox").classList.add("show")
    }
}
*/