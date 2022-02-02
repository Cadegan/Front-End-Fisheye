function mediaFactories(media) {
    const { id, photographerId, title, image, video, likes} = media;
    const photo = `assets/photographers/${image}`;
    const clip = `assets/photographers/${video}`;

    function getMediaCardDOM() {

        const article = document.createElement('article');
        
        const title = document.createElement('span');
        const img = document.createElement('img');
        img.setAttribute("src", photo);
        const movie = document.createElement('video');
        movie.setAttribute("src", clip);
        const likes = document.createElement('span');
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
        
    }
    return { photo, clip, likes, title, id, getMediaCardDOM};
}