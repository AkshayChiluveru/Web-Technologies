let gameResult = document.getElementById("gameResult");
let userInput = document.getElementById("userInput");
let randomNumber = Math.ceil(Math.random() * 100);

function checkGuess() {
    let guessedNumber = parseInt(userInput.value);

    if (guessedNumber > randomNumber) {
        gameResult.textContent = "Too High, Try Again!!!";
        gameResult.style.backgroundColor = "#1e217c"
    }
    else if (guessedNumber < randomNumber) {
        gameResult.textContent = "Too Low, Try Again!!!";
        gameResult.style.backgroundColor = "#1e217c";
    }
    else if (guessedNumber === randomNumber) {
        gameResult.textContent = "Congratulations! You got it right numberr!!!";
        gameResult.style.backgroundColor = "green";
    }
    else {
        gameResult.textContent = "Give a valid Input";
        gameResult.style.backgroundColor = "red";
    }
    console.log(randomNumber)
}