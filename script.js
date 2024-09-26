let lowestNum, highestNum, answer, guesses, maxGuesses;
const messageElement = document.getElementById('message');
const guessCountElement = document.getElementById('guessCount');

function startGame() {
    const difficulty = document.getElementById('difficultySelect').value;
    switch (difficulty) {
        case 'easy':
            lowestNum = 1;
            highestNum = 50;
            maxGuesses = 10;
            break;
        case 'medium':
            lowestNum = 1;
            highestNum = 100;
            maxGuesses = 7;
            break;
        case 'hard':
            lowestNum = 1;
            highestNum = 200;
            maxGuesses = 5;
            break;
    }

    answer = Math.floor(Math.random() * (highestNum - lowestNum + 1)) + lowestNum;
    guesses = 0;

    document.getElementById('lowestNum').innerText = lowestNum;
    document.getElementById('highestNum').innerText = highestNum;
    messageElement.innerText = '';
    guessCountElement.innerText = '';
    document.getElementById('guessInput').value = '';
    document.getElementById('guessButton').disabled = false;
}

document.getElementById('difficultySelect').addEventListener('change', startGame);
document.getElementById('guessButton').addEventListener('click', processGuess);

// Add event listener for the Enter key
document.getElementById('guessInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        processGuess();
    }
});

function processGuess() {
    const guessInput = document.getElementById('guessInput').value;
    
    if (guessInput === '') {
        messageElement.innerText = '❌ Please enter a number.';
        return;
    }

    const guess = Number(guessInput);
    guesses++;

    if (guess < lowestNum || guess > highestNum) {
        messageElement.innerText = '🚫 That number is out of range.';
    } else if (guess < answer) {
        messageElement.innerText = '⬇️ Too low! Try again!';
    } else if (guess > answer) {
        messageElement.innerText = '⬆️ Too high! Try again!';
    } else {
        messageElement.innerText = `🎉 Correct! The number was ${answer}.`;
        guessCountElement.innerText = `👏 You guessed it in ${guesses} tries!`;
        document.getElementById('guessButton').disabled = true;
    }

    if (guesses >= maxGuesses) {
        messageElement.innerText = `😢 You've run out of guesses! The number was ${answer}.`;
        document.getElementById('guessButton').disabled = true;
    }

    guessCountElement.innerText = `Guesses: ${guesses}`;
}

document.getElementById('resetButton').addEventListener('click', startGame);

// Start the game for the first time
startGame();
