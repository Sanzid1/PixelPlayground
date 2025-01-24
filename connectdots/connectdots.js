let gameState = {
    gridSize: 4,
    boxes: [],
    horizontalLines: [],
    verticalLines: [],
    scores: [0, 0],
    currentPlayer: 0,
    gameActive: true,
    vsAI: false,
    difficulty: 'easy'
};

// Initialize game
document.getElementById('gameMode').addEventListener('change', (e) => {
    gameState.vsAI = e.target.value === 'ai';
    document.getElementById('difficulty').style.display = gameState.vsAI ? 'inline' : 'none';
    resetGame();
});

document.getElementById('gridSize').addEventListener('change', (e) => {
    gameState.gridSize = parseInt(e.target.value);
    resetGame();
});

document.getElementById('difficulty').addEventListener('change', (e) => {
    gameState.difficulty = e.target.value;
    resetGame();
});

function createGameBoard() {
    const container = document.getElementById('gameContainer');
    container.innerHTML = '';
    const boxSize = gameState.gridSize <= 8 ? 30 : 20;
    const dotSize = gameState.gridSize <= 8 ? 8 : 4;
    const totalSize = boxSize * (gameState.gridSize - 1);

    // Create dots
    for(let i = 0; i < gameState.gridSize; i++) {
        for(let j = 0; j < gameState.gridSize; j++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.left = `${i * boxSize}px`;
            dot.style.top = `${j * boxSize}px`;
            container.appendChild(dot);
        }
    }

    // Initialize lines and boxes
    gameState.horizontalLines = Array(gameState.gridSize - 1).fill()
        .map(() => Array(gameState.gridSize).fill(false));
    gameState.verticalLines = Array(gameState.gridSize).fill()
        .map(() => Array(gameState.gridSize - 1).fill(false));
    gameState.boxes = Array(gameState.gridSize - 1).fill()
        .map(() => Array(gameState.gridSize - 1).fill(-1));

    // Create horizontal lines
    for(let i = 0; i < gameState.gridSize - 1; i++) {
        for(let j = 0; j < gameState.gridSize; j++) {
            const line = document.createElement('div');
            line.className = 'line horizontal-line';
            line.style.left = `${i * boxSize}px`;
            line.style.top = `${j * boxSize - 1}px`;
            line.dataset.row = i;
            line.dataset.col = j;
            line.dataset.type = 'h';
            line.addEventListener('click', handleLineClick);
            container.appendChild(line);
        }
    }

    // Create vertical lines
    for(let i = 0; i < gameState.gridSize; i++) {
        for(let j = 0; j < gameState.gridSize - 1; j++) {
            const line = document.createElement('div');
            line.className = 'line vertical-line';
            line.style.left = `${i * boxSize - 1}px`;
            line.style.top = `${j * boxSize}px`;
            line.dataset.row = i;
            line.dataset.col = j;
            line.dataset.type = 'v';
            line.addEventListener('click', handleLineClick);
            container.appendChild(line);
        }
    }

    container.style.width = `${totalSize}px`;
    container.style.height = `${totalSize}px`;
}

function handleLineClick(e) {
    if(!gameState.gameActive) return;
    if(gameState.vsAI && gameState.currentPlayer === 1 && !isAITurn) return;
    
    const type = e.target.dataset.type;
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    
    if(type === 'h' && !gameState.horizontalLines[row][col] ||
       type === 'v' && !gameState.verticalLines[row][col]) {
        claimLine(row, col, type);
        checkBoxCompletion(row, col, type);
        updateScores();
        
        if(gameState.vsAI && gameState.gameActive) {
            setTimeout(() => aiMove(), 500);
        }
    }
}

function claimLine(row, col, type) {
    if(type === 'h') {
        gameState.horizontalLines[row][col] = true;
    } else {
        gameState.verticalLines[row][col] = true;
    }
    event.target.style.background = '#ffffff';
}

function checkBoxCompletion(row, col, type) {
    let madeBox = false;
    
    // Check adjacent boxes
    if(type === 'h') {
        if(row > 0) madeBox |= checkSingleBox(row - 1, col);
        if(row < gameState.gridSize - 2) madeBox |= checkSingleBox(row, col);
    } else {
        if(col > 0) madeBox |= checkSingleBox(row, col - 1);
        if(col < gameState.gridSize - 2) madeBox |= checkSingleBox(row, col);
    }

    if(!madeBox) {
        gameState.currentPlayer = 1 - gameState.currentPlayer;
        updateTurnDisplay();
    }
}

function checkSingleBox(row, col) {
    if(gameState.boxes[row][col] !== -1) return false;
    
    if(gameState.horizontalLines[row][col] &&
       gameState.horizontalLines[row][col + 1] &&
       gameState.verticalLines[row][col] &&
       gameState.verticalLines[row + 1][col]) {
        gameState.boxes[row][col] = gameState.currentPlayer;
        gameState.scores[gameState.currentPlayer]++;
        return true;
    }
    return false;
}

// AI Logic
function aiMove() {
    let move;
    switch(gameState.difficulty) {
        case 'hard':
            move = findBestMove();
            break;
        case 'medium':
            move = findMediumMove();
            break;
        default:
            move = findRandomMove();
    }
    
    if(move) {
        const [type, row, col] = move;
        claimLine(row, col, type);
        checkBoxCompletion(row, col, type);
        updateScores();
    }
}

function findRandomMove() {
    const available = [];
    // Check horizontal lines
    for(let i = 0; i < gameState.gridSize - 1; i++) {
        for(let j = 0; j < gameState.gridSize; j++) {
            if(!gameState.horizontalLines[i][j]) {
                available.push(['h', i, j]);
            }
        }
    }
    // Check vertical lines
    for(let i = 0; i < gameState.gridSize; i++) {
        for(let j = 0; j < gameState.gridSize - 1; j++) {
            if(!gameState.verticalLines[i][j]) {
                available.push(['v', i, j]);
            }
        }
    }
    return available[Math.floor(Math.random() * available.length)];
}

function findMediumMove() {
    // Look for any potential box completions
    const available = findRandomMove();
    // (Implement logic to find box-completing moves)
    return available; // Simplified for now
}

function findBestMove() {
    // Implement minimax or advanced heuristic
    return findRandomMove(); // Placeholder
}

function updateScores() {
    document.getElementById('score1').textContent = gameState.scores[0];
    document.getElementById('score2').textContent = gameState.scores[1];
    if(gameState.scores[0] + gameState.scores[1] === 
       (gameState.gridSize - 1) ** 2) {
        endGame();
    }
}

function updateTurnDisplay() {
    const playerText = gameState.currentPlayer === 0 ? 
        'Player 1' : (gameState.vsAI ? 'Computer' : 'Player 2');
    document.getElementById('currentPlayer').textContent = 
        `Current: ${playerText}`;
}

function endGame() {
    gameState.gameActive = false;
    // Add winner declaration logic
}

function resetGame() {
    gameState.scores = [0, 0];
    gameState.currentPlayer = 0;
    gameState.gameActive = true;
    updateScores();
    updateTurnDisplay();
    createGameBoard();
}

// Initial setup
resetGame();