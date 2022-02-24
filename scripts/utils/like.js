//document.getElementById("totalLikesNumber").innerHTML = totalLikesNumberShow;
function likesMedia () {
    const heartIcon = document.querySelectorAll(".heartIcon")
    heartIcon.forEach((event) => {
        event.addEventListener("click", () => {
            /*
            let mediaLike = Number(document.getElementsByClassName(".heartIcon").innerHTML)
            mediaLike++
            document.getElementsByClassName(".heartIcon").innerHTML = mediaLike
            */
            event.stopPropagation()
            let mediaLike = likes;
            document.getElementsByClassName(".heartIcon").innerHTML = mediaLike
            mediaLike += 1;
            addLikes();
        }), { once: true }
    })
}

export function totalLikesNumber () {
    var totalLikesNumber = 0;
    const totalLikesNumberShow = document.getElementById("totalLikesNumber")
    heartIcon.forEach((event) => {

    })

}


//Fonction qui affiche les totaux des likes
export function addLikes() {
    const totalLikesNumberShow = document.getElementById("totalLikesNumber")
    totalLikesNumberShow.innerHTML = Number(totalLikesNumberShow.innerHTML) + 1;
} 



//media factories
function mediaFactories(data) {
    const { id, photographerId, title, image, video, likes, date } = data;

        let mediaLike = likes;
        const likeCount = document.createElement('span');
        likeCount.className = 'likes';
        likeCount.textContent = likes;

        const heart = document.createElement('i');
        heart.className = 'heartIcon';
        heart.setAttribute("alt", "Likes");
        heart.tabIndex = 0;

        heart.addEventListener("click", (event) => {
            event.stopPropagation()
            mediaLike += 1;
            likeCount.innerText = mediaLike;
            addLikes();
        }, { once: true }
        );

        return {likes};

    }

//Fonction des likes


media.forEach((media) => {
    //Charge les likes des medias et les additionne
    const { likes } = media;
    totalLikesNumberShow += likes;
    //Charge les medias selon le mediaFactories
    const mediaModel = mediaFactories(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
})
//Affiches le total des likes
