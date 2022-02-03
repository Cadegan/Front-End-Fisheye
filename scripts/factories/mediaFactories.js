function mediaFactories(media) {
    const { id, photographerId, title, image, video, likes } = media;
    const photo = `assets/photos/${image}`;
    const clip = `assets/photos/${video}`;

    function getMediaCardDOM() {

        const article = document.createElement('article');

        const title = document.createElement('span');
        title.className = 'title';
        title.textContent = title;

        const img = document.createElement('img');
        const movie = document.createElement('video');

        const likes = document.createElement('span');
        likes.className = 'likes';
        likes.textContent = likes;

        //const heart = document.createElement('span');

        if (media == 'image') {
            article.appendChild(img);
            article.appendChild(title);
            img.setAttribute("src", photo);
        } else if (media == 'video') {
            article.appendChild(video);
            article.appendChild(title);
            movie.setAttribute("src", clip);
        } else {
            console.log("error")
        }

        return (article);

    }
    return { photo, clip, likes, title, id, photographerId, getMediaCardDOM };
}