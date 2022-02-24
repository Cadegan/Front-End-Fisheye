
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