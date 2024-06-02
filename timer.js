let countdown;
const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const timesUpAudio = document.getElementById('times-up-audio');
const outerBox = document.querySelector('.outer-box');
const innerBox = document.querySelector('.inner-box');

function timer(minutes) {
    let timeRemaining = minutes * 60;
    displayTime(timeRemaining);

    countdown = setInterval(() => {
        timeRemaining--;
        displayTime(timeRemaining);

        if (timeRemaining <= 0) {
            clearInterval(countdown);
            timesUpAudio.play(); // play the times-up sound
        }

        const percentRemaining = (timeRemaining / (minutes * 60)) * 100;
        innerBox.style.width = `${percentRemaining}%`;
    }, 1000);
}

function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    timerDisplay.textContent = display;
}

startButton.addEventListener('click', () => {
    clearInterval(countdown);  
    innerBox.style.width = '100%';
    timer(1);  // set timer
});