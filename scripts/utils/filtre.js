async function filterMedia(filter) {
    await fetch("/data/photographersData.json")
        .then(res => res.json())
        .then((data) => {
            media = data.media.filter(media => media.photographerId === +id);
            let mediaFitred = [];
            switch (filter) {
                case "popularity":
                    mediaFitred = media.sort((a, b) => b.likes - a.likes);
                    break;
                case "date":
                    mediaFitred = media.sort((a, b) => {
                        return new Date(a.date).valueOf() - new Date(b.date).valueOf();
                    });
                    break;
                case "titre":
                    mediaFitred = media.sort((a, b) => {
                        if (a.title.toLowerCase() < b.title.toLowerCase()) {
                            return -1;
                        } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                            return 1;
                        }
                    });
            }

            displayMedia(mediaFitred);
        });
}