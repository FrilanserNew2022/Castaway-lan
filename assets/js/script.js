import ru from '../locales/ru.js';
import en from '../locales/en.js';

let currentLanguage = navigator.language
function upgrateContent (language = currentLanguage) {
    let translation;
    switch (language) {
        case 'ru-RU':

            translation = ru;
            currentLanguage = 'ru-RU'
            break;
        case 'en-EN':

            translation = en;
            currentLanguage = 'en-EN'
            break;
        default:

            translation = en;
            currentLanguage = 'en-EN'

            break;
    }
    objectDeployment(translation);
}


upgrateContent()

function objectDeployment(object, positionInList = 0) {


    if (typeof object !== 'object') return console.error('this not object');
    let elem = 'error';
    for (let key in object) {
        let elem = object[key];


        if (Array.isArray(elem)) {
            arrayDeployment(elem, key)
        }
        if (typeof elem === 'object' && !Array.isArray(elem) && elem !== null) {
            objectDeployment(elem)
        }
        if(typeof elem === 'string'){
            upgrateElement( document.querySelectorAll(`.${key}`)[positionInList], elem)
        }
    }
    return undefined;
}

function arrayDeployment(array, className) {
    for (let i = 0; i < array.length; i++) {
        const element = (document.querySelectorAll(`.${className}`))[i]
        const elemContent = array[i];
        if(typeof elemContent === 'object') {
            objectDeployment(elemContent, i);
        }
        if (typeof elemContent === 'string'){
            upgrateElement(element, elemContent)
        }
    }
}

function upgrateElement (elem, elemContent, inner = false) {
    elem.innerHTML = elemContent;
}

document.querySelector('.change__language').addEventListener('click', () => {
    if (currentLanguage === 'ru-RU') {
        upgrateContent('en-EN')
    } else {
        upgrateContent('ru-RU')
    }
})