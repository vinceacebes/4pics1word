const nextBtn = document.getElementById("next");
const imageDisplay = document.getElementById("image");
const arrayLength = document.getElementById("array-length");
const textEl = document.getElementById("textbox");
const finishBtn = document.getElementById("finish");
const startBtn = document.getElementById("start");
const scoreEl = document.getElementById("score");
const scoreWrapper = document.getElementById("score-wrapper");


const firstImg = document.getElementById("one");
const secondImg = document.getElementById("two");
const thirdImg = document.getElementById("three");
const fourthImg = document.getElementById("four");

let IMAGE_SET = [
    { images: ["CHEMISTRY.jpg", "Copy of Balance Sheet.png", "FORCE.jpg", "POWER.jpg", "STATISTICS.jpg"], answer: "tao" },
    { images: ["5.jpg", "6.jpg", "7.jpg", "8.jpg"], answer: "malupet" },
];
// initial IMAGE_SET length
let IMAGE_SET_LENGTH = IMAGE_SET.length;

let currentSet;
let score;
let nextCount = 0;

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextSet);
finishBtn.addEventListener("click", finishGame);




function startGame() {
    score = 0;
    nextCount = 0;
    randomSet();

    setInterval(updateCountdown, 1000);

    textEl.classList.remove("hide");
    startBtn.classList.add("hide");
    nextBtn.classList.remove("hide");
}

function nextSet() {
    setInterval(updateCountdown, 1000);
    timerEl.textContent = 5;
    nextCount++;
    checkAnswer();
    if (nextCount < IMAGE_SET_LENGTH) {
        randomSet();
    } else if (nextCount === IMAGE_SET_LENGTH) {
        finishGame();
    }
}

function finishGame() {
    firstImg.src = " ";
    secondImg.src = " ";
    thirdImg.src = " ";
    fourthImg.src = " ";
    nextBtn.classList.add("hide");
    finishBtn.classList.remove("hide");
    textEl.classList.remove("hide");
    scoreEl.textContent += score;
    scoreWrapper.classList.remove("hide");

}

function randomSpot(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    firstImg.src = `./images/${array[0]}`;
    secondImg.src = `./images/${array[1]}`;
    thirdImg.src = `./images/${array[2]}`;
    fourthImg.src = `./images/${array[3]}`;
}

function randomSet() {
    if (IMAGE_SET.length > 0) {
        const randIndex = Math.floor(Math.random() * IMAGE_SET.length);
        currentSet = IMAGE_SET[randIndex];
        randomSpot(currentSet.images);
        IMAGE_SET.splice(randIndex, 1);
    } else {
        finishBtn.classList.remove("hide");
        nextBtn.classList.add("hide");
    }
}

function checkAnswer() {
    const userInput = textEl.value.trim().toLowerCase();
    if (userInput === currentSet.answer) {
        score++;
    }
}

const timerEl = document.getElementById("timer");
let seconds = 5;

function updateCountdown() {

    if (seconds >= 0) {
        timerEl.textContent = seconds;
        seconds--;
    } else if (seconds < 0) {
        clearInterval(setInterval(updateCountdown, 1000));
        seconds = 5;
        nextSet();

    }
}
