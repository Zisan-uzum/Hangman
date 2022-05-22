getWord = async () => {
    const response = await fetch(
        "https://random-word-api.herokuapp.com/word?number=1"
    );
    const object = await response.json();

    generateBlanks(object[0]);
    generateWarning(object[0].length);
    generateButtons();
};
generateWarning = (wordLength) => {
    document.getElementById(
        "left-mistake"
    ).textContent = `${wordLength} lives left`;
};
generateBlanks = (word) => {
    const blankLetters = document.getElementById("blank-letters");

    for (let i = 0; i < word.length; i++) {
        blankLetters.innerHTML += "<p class='blanks'>_</p>";
    }
};
generateButtons = () => {
    const keyboard = document.getElementById("keyboard");
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    for (let index in alphabet) {
        keyboard.innerHTML += `<button class = 'keyboard-letters'>${alphabet[index]}</button>`;
    }
};

getWord();
