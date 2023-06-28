import { shuffleArray } from './utils.js';
import data from './data.js';
import Dog from './dog.js';

let isWaiting = false;
let dogs = data.slice();
shuffleArray(dogs);
let i = 0;

let newDogIndex = getNewDog();
let newDog = new Dog(dogs[newDogIndex]);

function getNewDog() {
    if (i === data.length) {
        i = 0;
        endTinDog();
        shuffleArray(dogs);
    }

    let newIndex = i;
    i++;

    return newIndex;
}

function endTinDog() {
    document.getElementsByClassName('end')[0].classList.remove('hidden');
    document.getElementsByClassName('end')[0].classList.add('displayed');
    document.getElementById('badge').classList.add('hidden');
    document.getElementById('image').classList.add('hidden');
}

document.addEventListener('click', (e) => {
    if (e.target.dataset.img === 'heart') {
        newDog.setHasBeenLiked(true);
        matchDog();
    } else if (e.target.dataset.img === 'cross') {
        newDog.setHasBeenLiked(false);
        matchDog();
    } else if (e.target.dataset.btn === 'reset') {
        resetData();
    } else if (e.target.dataset.btn === 'rewatch') {
        reWatchData();
    } else if (e.target.dataset.img === 'left') {
        leftBtn();
    } else if (e.target.dataset.img === 'redo') {
        redoBtn();
    } else if (e.target.dataset.img === 'right') {
        rightBtn();
    }
});

function leftBtn() {
    if(!isWaiting){
        isWaiting = true;
        if (i > 1) {
            console.log(i)
            i -= 2;
            newDogIndex = i;
            newDog = new Dog(dogs[newDogIndex]);
            render();
            i++;
        }
        isWaiting = false;
    }
}

function redoBtn() {
    if (!isWaiting) {
        isWaiting = true;
        newDog.setHasBeenLiked('');
        const badgeEl = document.getElementById('badge');
        badgeEl.innerHTML = ``;
        isWaiting = false
    }
}

function rightBtn() {
    if (!isWaiting) {
        isWaiting = true;
        dogs[newDogIndex] = newDog;

        newDogIndex = getNewDog();
        newDog = new Dog(dogs[newDogIndex]);
        render();
        isWaiting = false
    }
}


function matchDog() {
    if(!isWaiting){
        isWaiting = true;
        dogs[newDogIndex] = newDog;
        const badgeEl = document.getElementById('badge');
        badgeEl.innerHTML = newDog.getBadgeHtml();
        
        setTimeout(() => {
            newDogIndex = getNewDog();
            newDog = new Dog(dogs[newDogIndex]);
            isWaiting = false;
            render();
        }, 1000);
    }
}

function resetData() {
    i = 0;
    dogs = data.slice();
    shuffleArray(dogs);
    newDogIndex = getNewDog();
    newDog = new Dog(dogs[newDogIndex]);

    document.getElementsByClassName('end')[0].classList.add('hidden');
    document.getElementsByClassName('end')[0].classList.remove('displayed');
    document.getElementById('badge').classList.remove('hidden');
    document.getElementById('image').classList.remove('hidden');
    render();
}

function reWatchData() {
    const endElement = document.querySelector('.end');
    endElement.classList.add('hidden');
    endElement.classList.remove('displayed');
    document.getElementById('badge').classList.remove('hidden');
    document.getElementById('image').classList.remove('hidden');
}

function render() {
    const imageElement = document.querySelector('#image');
    imageElement.innerHTML = newDog.getDogHtml();
    document.getElementById('badge').innerHTML = newDog.getBadgeHtml();
}

render();