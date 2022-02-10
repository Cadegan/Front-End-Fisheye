function mediaFactories(media) {
    const { id, photographerId, title, image, video, likes } = media;
    const photo = `assets/photos/${image}`;
    const clip = `assets/photos/${video}`;

    function getMediaCardDOM() {

        const article = document.createElement('article');
        article.className = 'media-container'


        const titles = document.createElement('span');
        titles.className = 'title';
        titles.textContent = title;

        const img = document.createElement('img');
        const movie = document.createElement('video');

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
        

        if (typeof image === 'string') {
            article.appendChild(img);
            article.appendChild(titleContent);
            img.setAttribute("src", photo);
        } else if (typeof video === 'string') {
            article.appendChild(video);
            article.appendChild(titleContent);
            movie.setAttribute("src", clip);
        } else {
            console.log("error")
        }

        return (article);

    }
    return { photo, clip, likes, title, id, photographerId, getMediaCardDOM };
}