let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let vsAI = false;
let difficulty = 'easy';

// Game initialization
document.getElementById('gameMode').addEventListener('change', (e) => {
    vsAI = e.target.value === 'ai';
    document.getElementById('difficulty').style.display = vsAI ? 'inline' : 'none';
    resetGame();
});

document.getElementById('difficulty').addEventListener('change', (e) => {
    difficulty = e.target.value;
    resetGame();
});

function createBoard() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';
    
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-index', index);
        cellElement.addEventListener('click', handleCellClick);
        cellElement.textContent = cell;
        board.appendChild(cellElement);
    });
}

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    
    if (!gameActive || gameBoard[index] !== '' || 
        (vsAI && currentPlayer === 'O')) return;

    makeMove(index);
    
    if (vsAI && gameActive) {
        setTimeout(() => aiMove(), 500);
    }
}

function makeMove(index) {
    gameBoard[index] = currentPlayer;
    document.querySelector(`[data-index="${index}"]`).textContent = currentPlayer;
    
    if (checkWin()) {
        document.getElementById('status').textContent = 
            `${vsAI && currentPlayer === 'X' ? 'Player' : currentPlayer} Wins!`;
        gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
        document.getElementById('status').textContent = "Draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').textContent = 
            `${currentPlayer}'s Turn`;
    }
}

// AI Logic
function aiMove() {
    let index;
    switch(difficulty) {
        case 'hard':
            index = minimaxAI();
            break;
        case 'medium':
            index = getMediumMove();
            break;
        default: // easy
            index = getRandomMove();
    }
    makeMove(index);
}

function getRandomMove() {
    const emptyCells = gameBoard
        .map((cell, index) => cell === '' ? index : null)
        .filter(cell => cell !== null);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function getMediumMove() {
    // Try to win or block immediately
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = 'O';
            if (checkWin()) {
                gameBoard[i] = '';
                return i;
            }
            gameBoard[i] = 'X';
            if (checkWin()) {
                gameBoard[i] = '';
                return i;
            }
            gameBoard[i] = '';
        }
    }
    return getRandomMove();
}

function minimaxAI() {
    // Minimax algorithm implementation
    let bestScore = -Infinity;
    let bestMove;
    
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = 'O';
            let score = minimax(gameBoard, 0, false);
            gameBoard[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

function minimax(board, depth, isMaximizing) {
    const scores = {
        'O': 1,
        'X': -1,
        'draw': 0
    };

    const result = checkWin(true);
    if (result !== null) return scores[result];

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Game Logic
function checkWin(checkOnly = false) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            if (!checkOnly) gameActive = false;
            return gameBoard[a];
        }
    }
    
    if (gameBoard.every(cell => cell !== '') && !checkOnly) {
        gameActive = false;
        return 'draw';
    }
    return null;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').textContent = "X's Turn";
    createBoard();
}

// Initialize game
createBoard();