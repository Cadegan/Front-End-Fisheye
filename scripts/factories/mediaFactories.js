function mediaFactories(media) {
    const { id, photographerId, title, image, video, likes} = media;
    const photo = `assets/photographers/${image}`;
    const clip = `assets/photographers/${video}`;

    function getMediaCardDOM() {

        const article = document.createElement('article');
        
        const title = document.createElement('span');
        title.className = 'title';
        title.textContent = title;

        const img = document.createElement('img');
        img.setAttribute("src", photo);

        const movie = document.createElement('video');
        movie.setAttribute("src", clip);

        const likes = document.createElement('span');
        likes.className = 'likes';
        likes.textContent = likes;
        
        const heart = document.createElement('span');

        if (media === 'image') {
            article.appendChild(img);
            article.appendChild(title);
        } else if (media === 'video') {
           article.appendChild(video);
           article.appendChild(title); 
        } else {
            console.log("error")
        }

        return (article);
        
    }
    return { photo, clip, likes, title, id, photographerId, getMediaCardDOM};
}