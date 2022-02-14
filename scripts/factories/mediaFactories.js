function mediaFactories(data) {
    const { id, photographerId, title, image, video, likes } = data;
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
        movie.className = 'photo video'

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

    return { image, video, likes, title, id, photographerId, getMediaCardDOM };
}
