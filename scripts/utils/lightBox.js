// Lightbox

function lightbox() {
    const root = document.querySelector("body, html");
    const mediaSection = document.querySelector(".gallery-section");
    const medias = document.querySelectorAll(".photo")
    const l = medias.length;

    for (var i = 0; i < l; i++) {
        medias[i].addEventListener("click", function (i) {
            var currentMedia = this;
            const parentItem = currentMedia.parentElement, screenItem = document.createElement('div');
            screenItem.id = 'Lightbox-screen';
            mediaSection.prepend(screenItem);
            var route = currentMedia.scr;
            root.style.innerHTML = 'hidden';
            screenItem.innerHTML = '<div class="gg-media"></div><div class="gg-close gg-btn">&times</div><div class="gg-next gg-btn">&rarr;</div><div class="gg-prev gg-btn">&larr;</div>';
            //const first = medias[0].scr, last = medias[l - 1].scr;
            const mediaItem = document.querySelector('gg-media'), prevBtn = document.querySelector('gg-next'), nextBtn = document.querySelector('gg-next'), close = document.querySelector('gg-close');
            mediaItem.innerHTML = '< src="' + route + '">';
        });
    }
}

/*
// Lightbox
 
    const root = document.querySelector("body, html");
    const gallery = document.querySelector(".gallery-section");
    const medias = document.querySelectorAll(".photo")
    const l = medias.length;
    
    for (var i = 0; i < l; i++) {
        medias[i].addEventListener("click", function(i) {
            var currentMedia = this;
            const parentItem = currentMedia.parentElement, screenItem = document.createElement('div');
            screenItem.id = 'Lightbox-screen';
            gallery.prepend(screenItem);
            if (parentItem.hasAttribute('data-theme')) screenItem.setAttribute('data-theme', "lightTheme");
            var route = currentMedia.scr;
            root.style.innerHTML = 'hidden';
            screenItem.innerHTML = '<div class="gg-media"></div><div class="gg-close gg-btn">&times</div><div class="gg-next gg-btn">&rarr;</div><div class="gg-prev gg-btn">&larr;</div>';
            const first = medias[0].scr, last = medias[l-1].scr;
            const mediaItem = document.querySelector('gg-media'), prevBtn = document.querySelector('gg-next'), nextBtn = document.querySelector('gg-next'), close = document.querySelector('gg-close');
            mediaItem.innerHTML = '< src="' + route + '">';

            if (l > 1) {
                if (route == first) {
                    prevBtn.hidden = true;
                    var prevMedia = false;
                    var nextMedia = currentMedia.nextElementSibling;
                }
                else if (route == last) {
                    nextBtn.hidden = true;
                    var nextMedia = false;
                    var prevMedia = currentMedia.nextElementSibling;
                }
                else {
                    var prevMedia = currentMedia.previousElementSibling;
                    var nextMedia = currentMedia.nextElementSibling;
                }
            }
            else {
                prevBtn.hidden = true;
                nextBtn.hidden = true;
            }

            screenItem.addEventListener("click", function(e) {
                if (e.target == this || e.target == close) hide();
            });

            root.addEventListener("keydown", function(e) {
                if (e.keyCode == 37 || e.keyCode == 38) prev();
                if (e.keyCode == 39 || e.keyCode == 40) next();
                if (e.keyCode == 27) hide();
            });

            prevBtn.addEventListener("click", prev);
            nextBtn.addEventListener("click", next);

            function prev() {
                prevMedia = currentMedia.previousElementSibling;
                mediaItem.innerHTML = '< src"' + prevMedia.src + '">';
                currentMedia = currentMedia.previousElementSibling;
                var mainMedia = document.querySelector(".gg-media > src").src;
                nextBtn.hidden = false;
                prevBtn.hidden = mainMedia === first;
            };

            function next() {
                nextMedia = currentMedia.nextElementSibling;
                mediaItem.innerHTML = '< src"' + nextMedia.src + '">';
                currentMedia = currentMedia.nextElementSibling;
                var mainMedia = document.querySelector(".gg-media > src").src;
                prevBtn.hidden = false;
                nextBtn.hidden = mainMedia === last;
            };

            function hide() {
                root.style.overflow = "auto";
                screenItem.remove();
            };

        })
    };
*/