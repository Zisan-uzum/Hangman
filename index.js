getWord = async () => {
    const response = await fetch(
        "https://random-word-api.herokuapp.com/word?number=1"
    );
    const object = await response.json();

    generateBlanks(object[0]);
    generateWarning(object[0].length);
    generateButtons(object[0]);
};
generateWarning = (wordLength) => {
    document.getElementById(
        "left-mistake"
    ).innerHTML = `<p><span id="mistake">${wordLength}</span> lives left</p>`;
};
generateBlanks = (word) => {
    const blankLetters = document.getElementById("blank-letters");

    for (let i = 0; i < word.length; i++) {
        blankLetters.innerHTML += "<p class='blanks'>_</p>";
    }
};
generateButtons = (word) => {
    const knownCount = 0;
    const keyboard = document.getElementById("keyboard");
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    for (let index in alphabet) {
        keyboard.innerHTML += `<button id = '${alphabet[index]}' class = 'keyboard-letters'>${alphabet[index]}</button>`;
    }
    document.querySelectorAll(".keyboard-letters").forEach((button) => {
        button.addEventListener("click", () => {
            //console.log(button.getAttribute("id"));
            button.disabled = true;
            guessWord(button.getAttribute("id"), word, knownCount);
        });
    });
};
guessWord = (letter, word, knownCount) => {
    if (word.split("").includes(letter)) {
        knownCount++;
        const indexes = word.split("").reduce((prev, curr, index) => {
            if (curr === letter) {
                prev.push(index);
            }
            return prev;
        }, []);
        indexes.forEach((index) => {
            document.querySelectorAll(".blanks")[index].innerHTML = `${letter}`;
        });
    } else {
        if (parseInt(document.getElementById("mistake").textContent) === 0) {
            const keyboard = document.getElementById("keyboard");
            const buttons = document.querySelectorAll(".keyboard-letters");
            for (let button of buttons) {
                button.style.display = "none";
            }
            knownCount === word.length
                ? (keyboard.innerHTML = `<h1>Congratulations</h1>`)
                : (keyboard.innerHTML = `<h1>Game Over</h1>`);
            return;
        }
        document.getElementById("mistake").textContent = (
            parseInt(document.getElementById("mistake").textContent) - 1
        ).toString();
    }
};
document.getElementById("reset-button").addEventListener("click", () => {
    if (
        document.getElementById("keyboard").innerHTML ===
        (`<h1>Game Over</h1>` || `<h1>Congratulations</h1>`)
    ) {
        window.location.reload(true);
    }
});
getWord();
