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

const animalEscaped = (e) => {
    const badAnimalBtnContainer = e.target.parentNode;
    showCarnivores();
    showVegetables();
    showFoundButton(badAnimalBtnContainer);
}

const showFoundButton = (buttonContainer) => {
    buttonContainer.innerHTML = `<button id="found">Found</button>`;
    initializeFoundButton();
}

const initializeFoundButton = () => {
    const foundButton = document.getElementById('found');
    foundButton.addEventListener('click', () => {
        const animals = document.getElementsByClassName('animal');
        for (let m = 0; m < animals.length; m++) {
            animals[m].children[3].innerHTML = `<button class="escaped">Escape</button>`;
            animals[m].classList.remove('green');
            animals[m].classList.remove('red');
        }
        addEscapedEventListeners();
    })
}

const showCarnivores = () => {
    const carnivores = document.getElementsByClassName('carnivore');
    for (let j = 0; j < carnivores.length; j++) {
        carnivores[j].children[3].innerHTML = '';
        carnivores[j].classList.add('red');
    }
}

const initializeEatmeButtons = () => {
    const eatMeButtons = document.getElementsByClassName('eat-me');
    for (let n = 0; n < eatMeButtons.length; n++) {
        eatMeButtons[n].addEventListener('click', itsAlreadyBeenEaten);
    }
}

const itsAlreadyBeenEaten = (e) => {
    const currentNum = e.target.parentNode.parentNode.children[1].innerHTML;
    const numLeft = currentNum*1 - 1;
    e.target.parentNode.parentNode.children[1].innerHTML = numLeft;
}


const showVegetables = () => {
    const veggies = document.getElementsByClassName('vegetable');
    for (let k = 0; k < veggies.length; k++) {
        veggies[k].children[3].innerHTML = `<button class="eat-me">EAT ME!!!</button>`;
        veggies[k].classList.add('green');
    }
    initializeEatmeButtons();
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