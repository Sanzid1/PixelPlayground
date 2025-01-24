const words = {
    countries: ['BRAZIL', 'CANADA', 'EGYPT', 'FRANCE', 'JAPAN', 'INDIA', 'ITALY', 'MEXICO'],
    colors: ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE', 'PINK', 'BROWN'],
    fruits: ['APPLE', 'BANANA', 'CHERRY', 'GRAPE', 'MANGO', 'ORANGE', 'PEACH', 'PEAR']
};

let selectedWord = '';
let correctLetters = new Set();
let wrongLetters = new Set();
let errorsLeft = 6;

function newGame() {
    const category = document.getElementById('category').value;
    const wordList = words[category];
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    correctLetters.clear();
    wrongLetters.clear();
    errorsLeft = 6;
    
    // Reset UI
    document.querySelectorAll('.figure-part, .gallows-part').forEach(part => {
        part.style.display = 'none';
    });
    document.querySelectorAll('#keyboard button').forEach(button => {
        button.disabled = false;
        button.className = '';
    });
    document.getElementById('status').textContent = '';
    
    updateDisplay();
    createKeyboard();
}

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(button);
    });
}

function handleGuess(letter) {
    letter = letter.toUpperCase();
    const button = [...document.getElementById('keyboard').children]
        .find(btn => btn.textContent === letter);
        
    if (button.disabled) return;
    
    button.disabled = true;
    
    if (selectedWord.includes(letter)) {
        correctLetters.add(letter);
        button.classList.add('correct');
    } else {
        wrongLetters.add(letter);
        errorsLeft--;
        button.classList.add('incorrect');
        updateHangman();
    }
    
    checkGameStatus();
    updateDisplay();
}

function updateHangman() {
    const parts = ['base', 'post', 'beam', 'rope', 'head', 'body', 
                 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
    const errorsMade = 6 - errorsLeft;
    
    parts.slice(0, errorsMade + 3).forEach((part, index) => {
        if (index < 4) {
            document.getElementById(part).style.display = 'block';
        } else if (index - 3 <= errorsMade) {
            document.getElementById(part).style.display = 'block';
        }
    });
}

function updateDisplay() {
    document.getElementById('wordDisplay').textContent = 
        selectedWord.split('').map(letter => 
            correctLetters.has(letter) ? letter : '_'
        ).join(' ');
}

function checkGameStatus() {
    if (errorsLeft === 0) {
        document.getElementById('status').textContent = 
            `Game Over! The word was: ${selectedWord}`;
        disableKeyboard();
    } else if ([...selectedWord].every(letter => 
               correctLetters.has(letter))) {
        document.getElementById('status').textContent = 'Congratulations! You Won!';
        disableKeyboard();
    }
}

function disableKeyboard() {
    document.querySelectorAll('#keyboard button').forEach(button => {
        button.disabled = true;
    });
}

// Event listeners
document.addEventListener('keydown', e => {
    if (/^[a-z]$/i.test(e.key)) {
        handleGuess(e.key.toUpperCase());
    }
});

// Initialize game
newGame();