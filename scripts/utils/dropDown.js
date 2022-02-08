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
    // Creates the input outline
    const input = document.createElement("div");
    input.classList = "input";
    input.addEventListener("click", toggleDropdown);

    // Creates the input placeholder content
    const inputPlaceholder = document.createElement("div");
    inputPlaceholder.classList = "input__placeholder";

    const placeholder = document.createElement("p");
    placeholder.textContent = "Select user";
    placeholder.classList.add('placeholder')

    // Appends the placeholder and chevron (stored in assets.js)
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