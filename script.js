const textContainer = document.getElementById('text-to-type');
const userInput = document.getElementById('user-input');
const speedDisplay = document.getElementById('speed');
const accuracyDisplay = document.getElementById('accuracy');
const difficultySelector = document.getElementById('difficulty');
const themeSelector = document.getElementById('theme');

const texts = {
    easy: ['The sun rises in the east.', 'Typing is fun!', 'Practice makes perfect.'],
    medium: ['The quick brown fox jumps over the lazy dog.', 'Frontend development is creative.'],
    hard: ['To be or not to be, that is the question.', 'A journey of a thousand miles begins with a single step.']
};

let startTime;
let currentText = '';
let typedCharacters = 0;

function setRandomText() {
    const difficulty = difficultySelector.value;
    const options = texts[difficulty];
    currentText = options[Math.floor(Math.random() * options.length)];
    textContainer.textContent = currentText;
    userInput.value = '';
    startTime = null;
}

function calculateSpeed() {
    const elapsedTime = (Date.now() - startTime) / 1000 / 60; // in minutes
    const wordsTyped = typedCharacters / 5; // average word length
    const wpm = Math.round(wordsTyped / elapsedTime);
    speedDisplay.textContent = wpm;
}

function calculateAccuracy() {
    const typedText = userInput.value;
    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === currentText[i]) correctChars++;
    }
    const accuracy = Math.round((correctChars / currentText.length) * 100);
    accuracyDisplay.textContent = accuracy;
}

userInput.addEventListener('input', () => {
    if (!startTime) startTime = Date.now();
    typedCharacters = userInput.value.length;
    calculateSpeed();
    calculateAccuracy();
});

difficultySelector.addEventListener('change', setRandomText);
themeSelector.addEventListener('change', () => {
    document.body.className = themeSelector.value;
});

// Initialize
setRandomText();
