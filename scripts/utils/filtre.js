import { showGallery, media, addLikes, mediaSection } from '../pages/pageProfile.js'


//Filtre menu
let btDropdown = document.querySelector(".btDropdown") //Par défaut sur "Popularité"
let dropdownContent = document.getElementById("dropdownContent")
let dropdownItem = document.getElementsByTagName("dropdownItem")
let dropdownItemValue = btDropdown.textContent;


function dropdownFc() {
    dropdownContent.classList.toggle('show')
    /*console.log("show ::", dropdownContent)
    console.log(document.body)*/
}

btDropdown.addEventListener('click', dropdownFc);

// Fermeture du menu
// On ecoute si un evenement se realise à l'exterieur du menu
// On le cache si c'est le cas
window.onclick = function (event) {
    var filter = []
    if (!event.target.matches('#btDropdown')) {
        let dropdownContentClass = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdownContentClass.length; i++) {
            let dropdownContentOpen = dropdownContentClass[i];
            if (dropdownContentOpen.classList.contains("show")) {
                dropdownContentOpen.classList.remove("show");
            }
            //Le titre du filtre est injecté dans le titre du bouton
            if (event.target.matches('.dropdownItem')) {
                document.getElementById('btDropdown').textContent = event.target.textContent;
                filter = event.target.dataset.filterType;
                mediaSection.innerHTML = ""
                switchFilter(filter)
            }
        }
    }
}

async function switchFilter(selectedFilter) {
    let mediaFiltred = []
    switch (selectedFilter) {
        case "review":
            mediaFiltred = media.sort((a, b) => b.likes - a.likes);
            break;
        case "date":
            mediaFiltred = media.sort((a, b) => {
                return new Date(a.date).valueOf() - new Date(b.date).valueOf();
            });
            break;
        case "title":
            mediaFiltred = media.sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                }
            });
    }
    showGallery(mediaFiltred)
    addLikes()
}

/*
const popularitySelected = document.getElementById('popularity')
const dateSelected = document.getElementById('date')
const titleSelected = document.getElementById('title')


export function filterBy() {
    popularitySelected.addEventListener('click', filterPopularity)
    dateSelected.addEventListener('click', filterDate)
    titleSelected.addEventListener('click', filterTitle)
}

export function filterPopularity() {
    const popularitySelection = gallery.sort((a, b) => b.likes - a.likes);
    showGallery(popularitySelection)
    toggleFc('Popularité')
    addLikes()
}

export function filterDate() {
    const dateSelection = gallery.sort((a, b) => {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf();
    });
    showGallery(dateSelection)
    toggleFc('Date')
    addLikes()
}

export function filterTitle() {
    const titleSelection = gallery.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
        } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
        }
    });
    showGallery(titleSelection)
    toggleFc('Titre')
    addLikes()
}
*/
//let dropdownItem = document.getElementsByTagName("dropdownItem")
//let dropdownItemValue = btDropdown.textContent;
/*
const menuDropdown = document.querySelector(".menu_dropdown") //menu
const btDropdown = document.querySelector(".btDropdown") //Boutton avec le label, sur "Popularité" (bouton lui meme)
const dropdownContent = document.getElementById("dropdownContent") //Contient la liste des options
const firstChoice = dropdownContent.firstElementChild

function dropdownFc () {
    btDropdown.addEventListener('click', () => toggle('Popularité'))
    menuDropdown.addEventListener('keypress', dropFc)
}

dropdownFc ()

function dropFc (e) {
    if (e.keyCode === 13) {
        toggle('Popularité')
        filterBy()
    }
}

function toggle (value) {
    if (!btDropdown.classList.contains('show')) {
        btDropdown.classList.add('show')
    } else {
        btDropdown.classList.remove('show')
        btDropdown.textContent = value
    }
}
*/



/*
//V4 fonctionnel
switch (filter) {
    case "review":
        media.sort((a, b) => b.likes - a.likes);
        break;
    case "date":
        media.sort((a, b) => {
            return new Date(a.date).valueOf() - new Date(b.date).valueOf();
        });
        break;
    case "title":
        media.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            }
        });
}
*/
/*
//filtre v3

let mediasToFilter = getPhotographerProfile();
//Filtre par likes
async function filterReview() {
    return mediasToFilter.sort((a, b) => b.likes - a.likes);
}
//Filtre par date
async function filterDate() {
    return mediasToFilter.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
        } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
        }
    });
}
//Filtre par titre
async function filterTitle() {
    return mediasToFilter.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
        } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
        }
    });
}

async function filterOptions() {
    const filterSelected = document.getElementById("btDropdown")
    if (filterSelected.value === "popularity") {
        mediasToFilter = await filterReview();
    }
    if (filterSelected.value === "date") {
        mediasToFilter = await filterDate();
    }
    if (filterSelected.value === "title") {
        mediasToFilter = await filterTitle();
    }
    console.log(mediasToFilter)
}

//Filtre v2
function filterSelected (media) {
    var btDropdown = document.querySelector(".btDropdown")

    btDropdown.addEventListener("change", (event) => {
        if (event.target.value === "Popularité") {
            media.sort( function (a, b) {
                console.log(event.target.value);
                return b.likes - a.likes
            });
        } else if (event.target.value === "Date") {
            media.sort( function (a, b) {
                console.log(event.target.value);
                return new Date(a.date).valueOf() - new Date(b.date).valueOf();
            });
        } else if (event.target.value === "Titre") {
            media.sort(function (a, b) {
                console.log(event.target.value);
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                }
            });
        }
        console.log(event.target.value);
        const mediaSection = document.querySelector(".gallery-section");
        mediaSection.innerHTML = "";

        displayData(media)

    });
}

//Filtre v1
function filterSelected () {
    if (btDropdown.textContent === 'Popularité') {
        const filter = 'review';
        return filter;
    }
    if (btDropdown.textContent === 'Date') {
        const filter = 'date';
        return filter;
    }
    if (btDropdown.textContent === 'Titre') {
        const filter = 'title';
        return filter;
    }
}

filterSelected();

// Filtre v0

function filterSelected (option) {
    var filter = option.getAttribute('filter-type');
    return filter;
}


const popularitySelected = document.getElementById('popularity')
const dateSelected = document.getElementById('date')
const titleSelected = document.getElementById('title')

function filterSelectedFunction  () {
    popularitySelected.addEventListener('click', filterPopularity)
    dateSelected.addEventListener('click', filterDate)
    titleSelected.addEventListener('click', filterTitle)
}

function filterPopularity () {
    const popularitySelection = media.sort((a, b) => b.likes - a.likes);
    galleryFiltred(popularitySelection)
}

function filterDate () {
    const dateSelection = media.sort((a, b) => {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf();
    });
    galleryFiltred(dateSelection)
}

function filterTitle () {
    const titleSelection = media.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
        } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
        }
    });
    filterTitle(titleSelection)
}



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

/*

    const dropdownIcon = () => {
        const dropdown = document.createElement('span');
        dropdown.innerHTML = `<svg width="14px" height="7px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Delivery" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g id="Transactions-(Landing)" transform="translate(-1360.000000, -29.000000)" fill="#CDCFD3" fill-rule="nonzero">
        <g id="Group-4" transform="translate(1360.000000, 29.000000)">
            <polygon id="Shape" points="0 0 5 5 10 0"></polygon>
        </g>
    </g>
    </g>
</svg>`;
        return dropdown;
    }


    const menuOptions = [{
        id: 1,
        choixId: 'Popularité',

    },
    {
        id: 2,
        choixId: 'Date',

    },
    {
        id: 3,
        choixId: 'Titre',

    }
    ]

    const printArea = document.querySelector("#content");

    const dropdown = () => {
        const component = document.createElement("div");

        const input = createInput();
        const dropdown = showDropdown();

        component.appendChild(input);
        component.appendChild(dropdown);
        printArea.appendChild(component);
    };

    const createInput = () => {
        const input = document.createElement("div");
        input.classList = "input";
        input.addEventListener("click", toggleDropdown);

        const inputPlaceholder = document.createElement("div");
        inputPlaceholder.classList = "input__placeholder";

        const placeholder = document.createElement("p");
        placeholder.textContent = "Popularité";
        placeholder.classList.add('placeholder')

        inputPlaceholder.appendChild(placeholder);
        inputPlaceholder.appendChild(dropdownIcon());
        input.appendChild(inputPlaceholder);

        return input;
    };

    const showDropdown = () => {
        const structure = document.createElement("div");
        structure.classList.add("structure", "hide");

        menuOptions.forEach(choix => {
            const {
                id,
                choixId,

            } = choix;
            const option = document.createElement("div");
            option.addEventListener("click", () => selectOption(choixId));
            option.setAttribute("id", id);

            const n = document.createElement("h5");
            n.textContent = choixId;

            option.appendChild(n);
            structure.appendChild(option);
        });
        return structure;
    };

    const toggleDropdown = () => {
        const dropdown = document.querySelector(".structure");
        dropdown.classList.toggle("hide");

        const input = document.querySelector(".input");
        input.classList.toggle("input__active");
    };

    const selectOption = (choixId) => {
        const text = document.querySelector('.placeholder');
        text.textContent = choixId;
        text.classList.add('input__selected')
        toggleDropdown();
    };

    dropdown();
}
*/