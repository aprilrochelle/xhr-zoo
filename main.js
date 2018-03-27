const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

const buildDomString = (animalArray) => {
    let domString = '';
    animalArray.forEach((animal) => {
        domString += `<h1>${animal.name}</h1>`
    });
    printToDom(domString,"animal-holder");
}

function executeOnLoad() {
    const data = JSON.parse(this.responseText);
    buildDomString(data.animals);
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