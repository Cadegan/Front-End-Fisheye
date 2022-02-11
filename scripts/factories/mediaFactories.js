function mediaFactories(media) {
    const { id, photographerId, title, image, video, likes } = media;
    const mediaData = `assets/photos/${image || video}`;
    //const clip = `assets/photos/${video}`;

    function getMediaCardDOM() {

        const article = document.createElement('article');
        article.className = 'media-container'


        const titles = document.createElement('span');
        titles.className = 'title';
        titles.textContent = title;

        const img = document.createElement('img');
        img.className = 'photo'

        const movie = document.createElement('video');
        movie.className = 'video'

        const likeCount = document.createElement('span');
        likeCount.className = 'likes';
        likeCount.textContent = likes;

        const heart = document.createElement('span');
        heart.className = 'heartIcon';
        heart.setAttribute("alt", "Likes");

        const reviewElement = document.createElement('div');
        reviewElement.className = 'reviewElement';
        reviewElement.appendChild(likeCount);
        reviewElement.appendChild(heart);


        const titleContent = document.createElement('div');
        titleContent.className = 'titleContent';
        titleContent.appendChild(titles);
        titleContent.appendChild(reviewElement);
        

        if (image) {
            img.setAttribute('src', mediaData);
            img.setAttribute('aria-label', `${title}`);
            img.setAttribute('tabindex', 0);
            img.dataset.id = id;
            article.appendChild(img);
            article.appendChild(titleContent);
            article.dataset.type = 'image';
            
        } if (video) {
            movie.setAttribute('src', mediaData);
            movie.setAttribute('aria-label', `${title}`);
            movie.setAttribute('tabindex', 0);
            movie.dataset.id = id;
            article.appendChild(movie);
            article.appendChild(titleContent);
            article.dataset.type = 'video';
            movie.setAttribute('controls', 'controls');
        }

        return (article);

    }

    // Lightbox
    const root = document.querySelector("body, html");
    const mediaSection = document.querySelector(".gallery-section");
    const l = mediaData.length;


    function lightbox() {
        for (let i = 0; i < l; i++) {
            mediaData[i].addEventListener("click", function(i) {
                var currentMedia = this;
                const parentItem = currentMedia.parentElement, screenItem = document.createElement('div');
                screenItem.id = 'Lightbox-screen';
                mediaSection.prepend(screenItem);
                if (parentItem.hasAttribute('data-theme')) screenItem.setAttribute('data-theme', "lightTheme");
                var route = currentMedia.scr;
                root.style.innerHTML = 'hidden';
                screenItem.innerHTML = '<div class="gg-image"></div><div class="gg-close gg-btn">&times</div><div class="gg-next gg-btn">&rarr;</div><div class="gg-prev gg-btn">&larr;</div>';
                const first = mediaData[0].scr, last = mediaData[l-1].scr;
                const mediaItem = document.querySelector('gg-image'), prevBtn = document.querySelector('gg-next'), nextBtn = document.querySelector('gg-next'), close = document.querySelector('gg-close');
                mediaItem.innerHTML = '< src="' + route + '">';

                if (l > 1) {
                    if (route == first) {
                        prevBtn.hidden = true;
                        var prevMedia = false;
                        var nextMedia = currentMedia.nextelementSibling;
                    }
                    else if (route == last) {
                        nextBtn.hidden = true;
                        var nextMedia = false;
                        var prevMedia = currentMedia.nextelementSibling;
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

                
            })
        };
    }


    return { image, video, likes, title, id, photographerId, getMediaCardDOM };
}


