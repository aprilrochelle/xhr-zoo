const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

const buildDomString = (animalArray) => {
    let domString = '';
    animalArray.forEach((animal) => {
        if (animal.isCarnivore) {
            domString += `<div class="animal carnivore">`;
        } else {
            domString += `<div class="animal vegetable">`;
        }
        domString +=    `<h1>${animal.name}</h1>`;
        domString +=    `<h3>${animal.number}</h3>`;
        domString +=    `<img class="animal-image" src="${animal.imageURL}">`;
        domString +=    `<div class="button-container">`;
        domString +=        `<button class="escaped">Escaped</button>`;
        domString +=    `</div>`;
        domString += `</div>`;
    });
    printToDom(domString,"animal-holder");
}

const addEscapedEventListeners = () => {
    const escapeBtns = document.getElementsByClassName('escaped');
    for (let i = 0; i < escapeBtns.length; i++) {
        escapeBtns[i].addEventListener('click', animalEscaped);
    }
}

const animalEscaped = () => {

    showCarnivores();
    showVegetables();
}

const showCarnivores = () => {
    
}

const showVegetables = () => {

}

function executeOnLoad() {
    const data = JSON.parse(this.responseText);
    buildDomString(data.animals);
    addEscapedEventListeners();
}

function executeIfFail() {
    console.log('Ooops!');
    alert('Something is effed up.');
}

const startApp = () =>{
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeOnLoad);
    myRequest.addEventListener("error", executeIfFail);
    myRequest.open("GET", "animals.json");
    myRequest.send();
}

startApp();