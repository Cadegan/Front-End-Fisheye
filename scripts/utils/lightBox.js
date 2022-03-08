// Lightbox v4
// export default class LightBox {

//     //Url de l'image
//     constructor() {
//         const element = this.buildDOM()
//         document.body.appendChild(element)
//     }

//     //Retourne un element HTML
//     buildDOM(url, alt) {
//         const screenView = document.createElement('div')
//         screenView.classList.add('lightbox-screen')
//         screenView.innerHTML = `
        
//             <button class="btClose btnScreenview">&times;</button>
//             <button class="btNext btnScreenview">&lsaquo;</button>
//             <button class="btPrev btnScreenview">&rsaquo;</button>
//             <div class="mediaShow">
//                 <img src="${url}" alt="${alt}">
//                 <div class="mediaTitle"></div>
//             </div>`

//         return screenView
//     }

// }
export class Lightbox {

    constructor(id, medias, title) {
        this.element = this.buildDOM(id)
        this.medias = medias
        this.title = title
        this.loadMedia(id)
        this.onKeyUp = this.onKeyUp.bind(this)
        const galleryContainer = document.querySelector(".gallery-container");
        galleryContainer.prepend(this.element)
        document.addEventListener('keyup', this.onKeyUp)
    }

    loadMedia(id) {
        this.id = null
        const media = new Image()
        const container = this.element.querySelector('.mediaShow')
        container.innerHTML = ''
        media.onload = () => {
            container.appendChild(media)
            this.id = id
        }
        media.src = id
    }

    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.close(e)
        } else if (e.key === 'ArrowLeft') {
            this.prev(e)
        } else if (e.key === 'ArrowRight') {
            this.next(e)
        }
    }

    close(e) {
        e.preventDefault()
        // enableBodyScroll(this.element)
            this.element.parentElement.removeChild(this.element)
            const root = document.querySelector("body, html"); //Va servir à ecouter les evenements et cacher toute la page
            root.style.overflow = ''; //Remet la page générale
        document.removeEventListener('keyup', this.onKeyUp)
    }

    next(e) {
        e.preventDefault()
        let i = this.medias.findIndex(media => media === this.id)
        if (i === this.medias.length - 1) {
            i = -1
        }
        this.loadMedia(this.medias[i + 1])
    }

    prev(e) {
        e.preventDefault()
        let i = this.medias.findIndex(media => media === this.id)
        if (i === 0) {
            i = this.medias.length
        }
        this.loadMedia(this.medias[i - 1])
    }


    buildDOM() {
        const root = document.querySelector("body, html"); //Va servir à ecouter les evenements et cacher toute la page
        var currentMedia = this
        var mediaFocusTitle = currentMedia.alt
        root.style.overflow = 'hidden'; //Cache la page générale
        const dom = document.createElement('div')
        dom.classList.add('lightbox-screen')
        dom.innerHTML = `
        <button class="btClose btnScreenview">&times;</button>
        <button class="btNext btnScreenview">&lsaquo;</button>
        <button class="btPrev btnScreenview">&rsaquo;</button>
        <div class="lightboxScreenContainer">
            <div class="mediaShow"></div>
            <p classe="mediaTitle">${mediaFocusTitle}</p>
        </div>
        `
        dom.querySelector('.btClose').addEventListener('click', this.close.bind(this))
        dom.querySelector('.btNext').addEventListener('click', this.next.bind(this))
        dom.querySelector('.btPrev').addEventListener('click', this.prev.bind(this))
        return dom
    }

}

// Lightbox.init()
     

// //Lightbox v3
// import { media } from '../pages/pageProfile.js'
// console.log(media)
// const screenView = document.querySelector("#lightbox-screen") //Fenetre d'affichage du media à visualiser
// const lightboxScreenContainer = document.querySelector(".lightboxScreenContainer") //Zone du screen view contenant l'image et le titre
// const root = document.querySelector("body, html");
// let mediasLightbox = document.querySelectorAll(".mediasLightbox"); //Slecetionne tous les medias (images et videos)


// // mediasLightbox.forEach(id => {
// //     id.addEventListener("click", () => openLightbox(id))
// // })


// function openLightbox(id) {
//     lightboxMedia(id);
//     screenView.style.display = "flex";
// }

// function hide() {
//     screenView.style.display = "none";
//     lightboxScreenContainer.innerHTML = "";
// }

// function lightboxMedia(id) {
//     const media = document.querySelector(`[data-id="${id}"]`);
//     const mediaClone = media.cloneNode();
//     if (media.nodeName == "video") {
//         mediaClone.setAttribute("controls", true);
//     }
//     lightboxScreenContainer.innerHTML = "";
//     mediaClone.setAttribute("tabindex", "0");

//     lightboxScreenContainer.appendChild(mediaClone)
//     // currentMediaShowing.focus();
// }

// //Diffrents medias à afficher
// function changeMedia(index) {
//     let indexMedia = media.findIndex(
//         (id) => id == lightboxScreenContainer.firstChild.dataset.id);
//     if (indexMedia + index < 0) {
//         indexMedia = media.length - 1;
//     } else if (indexMedia + index == media.length) {
//         indexMedia = 0;
//     } else {
//         indexMedia = index;
//     }
//     mediaFocus(media[indexMedia]);
// }

// //Fonctions de navigation
// screenView.addEventListener("click", function (e) {
//     if (e.target == this || e.target == close) hide();
// });

// document.addEventListener("keydown", (e) => {
//     if (e.key == "ArrowLeft") {
//         changeMedia(-1);
//     } else if (e.key == "ArrowRight") {
//         changeMedia(1)
//     }
// });

// root.addEventListener("keydown", function (e) {
//     if (e.keyCode == 37 || e.keyCode == 38) changeMedia(-1);
//     if (e.keyCode == 39 || e.keyCode == 40) changeMedia(1);
//     if (e.keyCode == 27) hide();
// });

//Lightbox v2
export function lightbox() {
    const root = document.querySelector("body, html"); //Va servir à ecouter les evenements et cacher toute la page
    const galleryContainer = document.querySelector(".gallery-container");
    const mediasLightbox = document.querySelectorAll(".mediasLightbox"); //Slecetionne tous les medias (images et videos)
    console.log("Ensemble des medias lightbox :", mediasLightbox)
    const l = mediasLightbox.length; //Longeur de la collection
    console.log("Nombre total de medias :", l)

    for (var i = 0; i < l; i++) {
        mediasLightbox[i].addEventListener("click", function loadMedia(i) { //Pour chaque media, on ecoute le click
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
                            <button class="btClose btnScreenview">&times;</button>
                            <button class="btNext btnScreenview">&lsaquo;</button>
                            <button class="btPrev btnScreenview">&rsaquo;</button>
                            <div class="lightboxScreenContainer">
                                <div class="mediaShow"></div>
                                <p classe="mediaTitle">${mediaFocusTitle}</p>
                            </div>`;
            const first = mediasLightbox[0].src, last = mediasLightbox[l - 1].src; //Determine le 1er et le dernier media de la liste
            //Cible les différents éléments pour la visualisation
            const imgItem = document.querySelector(".mediaShow"), prevBtn = document.querySelector(".btPrev"), nextBtn = document.querySelector(".btNext"), close = document.querySelector(".btClose");
            imgItem.innerHTML = '<img src="' + mediaFocus + '">'; //Affiche le media
            //Conditions qui détermine si c'est le 1er, un ou le dernier media
            if (l > 1) {
                if (mediaFocus == first) {
                    nextBtn.hidden = true;
                    var prevImg = false;
                    // var nextImg = currentMedia.nextElementSibling; //!!!Impossible d'accéder au media suivant
                }
                else if (mediaFocus == last) {
                    prevBtn.hidden = true;
                    var nextImg = false;
                    // var prevImg = currentMedia.previousElementSibling;
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

            function changeMedia(index) {
                let indexMedia = mediasLightbox.findIndex(
                    (id) => id == imgItem.firstChild.dataset.id
                );
                if (indexMedia + index < 0) {
                    indexMedia = mediasLightbox.length - 1;
                } else if (indexMedia + index == mediasLightbox.length) {
                    indexMedia = 0;
                } else {
                    indexMedia += index;
                }
                loadMedia(mediasLightbox[indexMedia]);
            }

            //Fonction d'appel du media précédent
            function prev() {
                var index = mediasLightbox.findIndex(this);

                if (index == this.mediasLightbox.length - 1) {
                    this.currentMedia = this.mediasLightbox[0];
                } else {
                    this.currentMedia = this.mediasLightbox[index + 1];
                }

                // prevImg = currentMedia.previousElementSibling; //Fonctionnne pas
                // imgItem.innerHTML = '<img src="' + prevImg.src + '">';
                // currentMedia = currentMedia.previousElementSibling;
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