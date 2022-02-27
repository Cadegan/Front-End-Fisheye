//Fonction likes
//Aquisition et affichage les totaux des likes
export function getAllLikes() {
    //Initialise la variable
    let totalLikesNumber = 0;
    //Cible tous les coeurs
    const heartIcon = document.querySelectorAll('.heartIcon')
    //Cible l'affichage des totaux
    const totalLikesShow = document.getElementById("totalLikesNumber")
    //Pour chaque chiffre trouver dans l'élément textuel avant les coeurs
    // on les additionne et les stock dans la variable "totalLikesNumber"
    heartIcon.forEach((review) => {
        const x = parseInt(review.previousElementSibling.innerHTML)
        totalLikesNumber += x
    })
    console.log(totalLikesNumber)
    //Retourne et affiche les totaux
    return totalLikesShow.innerHTML = totalLikesNumber  
}


//Like par media
export function addLikes() {
    //Cible tous les coeur et ecoute les clicks
    const heartIcon = document.querySelectorAll('.heartIcon')
    heartIcon.forEach((icon) => {
        icon.addEventListener("click", () => {
            //A chaque click, on ajoute un +1 au chiffre et le stock
            let mediaLikes = parseInt(icon.previousElementSibling.innerHTML)
            mediaLikes++
            //Charge et affiche le nouveau chiffre dans "mediaLikes"
            icon.previousElementSibling.innerHTML = mediaLikes
            getAllLikes()
        }, { once: true }) // N'autorise qu'un click
    })
}

/* V0
export async function getAllLikes() {

    let likes = 0;
    for (let i = 0; i < media.length; i++) {
        likes += media[i].likes;
    }
    console.log("Totaux des likes : " + likes);
    return likes;
}

export async function showAllLikes() {
    const allLikes = await getAllLikes();
    const likes = document.getElementById("totalLikesNumber")
    likes.innerHTML = `${allLikes}`
}
*/