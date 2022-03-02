//Lightbox v2
export function lightbox() {
    const root = document.querySelector("body, html"); //Va servir à ecouter les evenements et cacher toute la page
    const galleryContainer = document.querySelector(".gallery-container");
    const mediasLightbox = document.querySelectorAll(".mediasLightbox"); //Slecetionne tous les medias (images et videos)
    console.log("Ensemble des medias lightbox :", mediasLightbox)
    const l = mediasLightbox.length; //Longeur de la collection
    console.log("Nombre total de medias :", l)

    for (var i = 0; i < l; i++) {
        mediasLightbox[i].addEventListener("click", function (i) { //Pour chaque media, on ecoute le click
            var currentMedia = this; //Chargera le media actuellement visionné
            console.log("Media visionné :", this)
            const screenView = document.createElement('div'); //Zonne d'ouverture du media
            screenView.id = "lightbox-screen";
            galleryContainer.prepend(screenView);
            var mediaFocus = currentMedia.src; //Recupere le media
            var mediaFocusTitle = currentMedia.alt //Recupere le titre du media
            console.log("Titre du media selectionné :", mediaFocusTitle);
            console.log("Chemin du média affiché :", mediaFocus)
            root.style.overflow = 'hidden'; //Cache la page générale
            screenView.innerHTML = `
                            <div class="mediaShow"></div>
                            <button class="btClose btnScreenview">&times;</button>
                            <button class="btNext btnScreenview">&lsaquo;</button>
                            <button class="btPrev btnScreenview">&rsaquo;</button>
                            <p classe="mediaTitle">${mediaFocusTitle}</p>`;
            const first = mediasLightbox[0].src, last = mediasLightbox[l - 1].src; //Determine le 1er et le dernier media de la liste
            //Cible les différents éléments pour la visualisation
            const imgItem = document.querySelector(".mediaShow"), prevBtn = document.querySelector(".btPrev"), nextBtn = document.querySelector(".btNext"), close = document.querySelector(".btClose");
            imgItem.innerHTML = '<img src="' + mediaFocus + '">'; //Affiche le media
            //Conditions qui détermine si c'est le 1er, un ou le dernier media
            if (l > 1) {
                if (mediaFocus == first) {
                    nextBtn.hidden = true;
                    var prevImg = false;
                    var nextImg = currentMedia.nextElementSibling; //!!!Impossible d'accéder au media suivant
                }
                else if (mediaFocus == last) {
                    prevBtn.hidden = true;
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
            //Fonctions de navigation
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

            //Fonction d'appel du media précédent
            function prev() {
                prevImg = currentMedia.previousElementSibling; //Fonctionnne pas
                imgItem.innerHTML = '<img src="' + prevImg.src + '">';
                currentMedia = currentMedia.previousElementSibling;
            }

            //Fonction d'appel du media d'après
            function next() {
                nextImg = currentMedia.nextElementSibling;
                imgItem.innerHTML = '<img src="' + nextImg.src + '">';
                currentMedia = currentMedia.nextElementSibling;
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