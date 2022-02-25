function dropdownFc() {
    btDropdown.addEventListener('click', () => toggleFc('Popularité'))
    menuDropdown.addEventListener('keypress', enterNavKey)
    //dropdownContent.classList.toggle('show')
    /*console.log("show ::", dropdownContent)
    console.log(document.body)*/
}

dropdownFc()

function enterNavKey(e) {
    if (e.keyCode === 13) {
        toggleFc('Popularité')
        filterBy()
    }
}

export function toggleFc(value) {
    if (!dropdownContent.classList.contains('show')) {
        menuDropdown.setAttribute('aria-expanded', 'true')
        menuDropdown.addEventListener('keypress', keyNav)
        dropdownContent.classList.toggle('show')
        firstChild.focus()
    } else {
        btDropdown.textContent = value
        dropdownContent.classList.toggle('show')
        menuDropdown.setAttribute('aria-expanded', 'false')
        menuDropdown.removeEventListener('keypress', keyNav)

    }
}

function keyNav(event) {
    event.preventDefault()
    let focusElement = document.activeElement
    focusElement.setAttribute('aria-selected', 'true')
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        focusElement.setAttribute('aria-selected', 'false')
        if (event.key === 'ArrowUp') {
            if (focusElement.previousElementSibling != null) {
                focusElement = focusElement.previousElementSibling
            } else {
                focusElement = focusElement.parentNode.lastElementChild
            }
        } else if (event.key === 'ArrowDown') {
            if (focusElement.nextElement != null) {
                focusElement = focusElement.nextElementSibling
            } else {
                focusElement = focusElement.parentNode.firstElementChild
            }
        }
        focusElement.setAttribute('aria-selected', 'true')
        focusElement.focus()
    } else if (event.key === 'Enter') {
        if (!dropdownContent.classList.contains('show')) {
            toggleFc('Popularité')
        }
    } if (event.target.id === 'popularity') {
        filterPopularity()
    } else if (event.target.id === 'date') {
        filterDate()
    } else if (event.target.id === 'title') {
        filterTitle()
    }
    dropdownFc()
}