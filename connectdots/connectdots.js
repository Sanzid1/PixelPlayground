const gameState = {
    gridSize: 4,
    boxSize: 50,
    scores: [0, 0],
    currentPlayer: 0,
    gameActive: true,
    vsAI: false,
    difficulty: 'easy',
    horizontalLines: [],
    verticalLines: [],
    boxes: []
};

function initGame() {
    document.getElementById('gameMode').addEventListener('change', handleGameModeChange);
    document.getElementById('gridSize').addEventListener('change', handleGridSizeChange);
    document.getElementById('difficulty').addEventListener('change', handleDifficultyChange);
    resetGame();
}

function handleGameModeChange(e) {
    gameState.vsAI = e.target.value === 'ai';
    document.getElementById('difficulty').style.display = gameState.vsAI ? 'inline' : 'none';
    resetGame();
}

function handleGridSizeChange(e) {
    gameState.gridSize = parseInt(e.target.value);
    gameState.boxSize = gameState.gridSize <= 8 ? 50 : 30;
    resetGame();
}

function handleDifficultyChange(e) {
    gameState.difficulty = e.target.value;
}

function createGameBoard() {
    const container = document.getElementById('gameContainer');
    container.innerHTML = '';
    
    const gridSize = gameState.gridSize;
    const boxSize = gameState.boxSize;
    const totalSize = boxSize * (gridSize - 1) + 20;
    
    container.style.width = `${totalSize}px`;
    container.style.height = `${totalSize}px`;

    // Initialize grid state
    gameState.horizontalLines = Array(gridSize - 1).fill().map(() => Array(gridSize).fill(false));
    gameState.verticalLines = Array(gridSize).fill().map(() => Array(gridSize - 1).fill(false));
    gameState.boxes = Array(gridSize - 1).fill().map(() => Array(gridSize - 1).fill(-1));

    // Create dots
    for(let i = 0; i < gridSize; i++) {
        for(let j = 0; j < gridSize; j++) {
            createDot(i * boxSize + 10, j * boxSize + 10);
        }
    }

    // Create lines
    createLines(gridSize, boxSize);
}

function createDot(left, top) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.left = `${left}px`;
    dot.style.top = `${top}px`;
    document.getElementById('gameContainer').appendChild(dot);
}

function createLines(gridSize, boxSize) {
    // Horizontal lines
    for(let i = 0; i < gridSize - 1; i++) {
        for(let j = 0; j < gridSize; j++) {
            createLine('h', i * boxSize + 10, j * boxSize + 10, boxSize);
        }
    }
    
    // Vertical lines
    for(let i = 0; i < gridSize; i++) {
        for(let j = 0; j < gridSize - 1; j++) {
            createLine('v', i * boxSize + 10, j * boxSize + 10, boxSize);
        }
    }
}

function createLine(type, left, top, size) {
    const line = document.createElement('div');
    line.className = `line ${type === 'h' ? 'horizontal-line' : 'vertical-line'}`;
    
    if(type === 'h') {
        line.style.width = `${size}px`;
        line.style.left = `${left}px`;
        line.style.top = `${top}px`;
    } else {
        line.style.height = `${size}px`;
        line.style.left = `${left}px`;
        line.style.top = `${top}px`;
    }
    
    line.dataset.type = type;
    if(type === 'h') {
        line.dataset.row = Math.floor(top / gameState.boxSize);
        line.dataset.col = Math.floor(left / gameState.boxSize);
    } else {
        line.dataset.row = Math.floor(left / gameState.boxSize);
        line.dataset.col = Math.floor(top / gameState.boxSize);
    }
    line.addEventListener('click', handleLineClick);
    document.getElementById('gameContainer').appendChild(line);
}

function handleLineClick(e) {
    if(!gameState.gameActive) return;
    if(gameState.vsAI && gameState.currentPlayer === 1) return;

    const type = e.target.dataset.type;
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);

    if((type === 'h' && !gameState.horizontalLines[row][col]) ||
       (type === 'v' && !gameState.verticalLines[row][col])) {
        claimLine(row, col, type, e.target);
        checkBoxCompletion(row, col, type);
        updateScores();
        
        if(gameState.vsAI && gameState.gameActive) {
            setTimeout(() => aiMove(), 500);
        }
    }
}

function claimLine(row, col, type, element) {
    if(type === 'h') {
        gameState.horizontalLines[row][col] = true;
    } else {
        gameState.verticalLines[row][col] = true;
    }
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
    element.style.backgroundColor = accentColor;
}

function checkBoxCompletion(row, col, type) {
    let madeBox = false;
    const checks = type === 'h' ? 
        [[row-1, col], [row, col]] : 
        [[row, col-1], [row, col]];

    checks.forEach(([r, c]) => {
        if(r >= 0 && c >= 0 && r < gameState.gridSize-1 && c < gameState.gridSize-1) {
            if(checkSingleBox(r, c)) madeBox = true;
        }
    });

    if(!madeBox) {
        gameState.currentPlayer = 1 - gameState.currentPlayer;
        updateTurnDisplay();
    }
}

function checkSingleBox(row, col) {
    if(gameState.boxes[row][col] !== -1) return false;
    
    if(gameState.horizontalLines[row][col] &&
       gameState.horizontalLines[row][col+1] &&
       gameState.verticalLines[row][col] &&
       gameState.verticalLines[row+1][col]) {
           
        gameState.boxes[row][col] = gameState.currentPlayer;
        gameState.scores[gameState.currentPlayer]++;
        
        const box = document.createElement('div');
        box.className = `box ${gameState.currentPlayer === 1 ? 'ai' : ''}`;
        box.style.left = `${col * gameState.boxSize + 10}px`;
        box.style.top = `${row * gameState.boxSize + 10}px`;
        box.style.width = `${gameState.boxSize}px`;
        box.style.height = `${gameState.boxSize}px`;
        document.getElementById('gameContainer').appendChild(box);
        
        return true;
    }
    return false;
}

// Enhanced AI Logic
function findRandomMove() {
    const available = getAllMoves();
    return available[Math.floor(Math.random() * available.length)];
}

function aiMove() {
    let move;
    switch(gameState.difficulty) {
        case 'hard':
            move = findSmartMove();
            break;
        case 'medium':
            move = findStrategicMove();
            break;
        default:
            move = findRandomMove();
    }
    
    if(move) {
        const [type, row, col] = move;
        const selector = `[data-type="${type}"][data-row="${row}"][data-col="${col}"]`;
        const element = document.querySelector(selector);
        
        if(element) {
            claimLine(row, col, type, element);
            checkBoxCompletion(row, col, type);
            updateScores();
        }
    }
}

function findSmartMove() {
    // Implementation of advanced AI logic
    const available = getAllMoves();
    
    // 1. Check for immediate box completion
    for(const move of available) {
        if(checkMoveCreatesBox(move)) return move;
    }
    
    // 2. Avoid giving opponent boxes
    const safeMoves = available.filter(move => !checkMoveGivesOpponentBox(move));
    if(safeMoves.length > 0) return safeMoves[Math.floor(Math.random() * safeMoves.length)];
    
    // 3. Random move as fallback
    return available[Math.floor(Math.random() * available.length)];
}

function findStrategicMove() {
    // Implementation of strategic AI logic
    const available = getAllMoves();
    // Add your strategic move logic here
    return available[Math.floor(Math.random() * available.length)];
}

function getAllMoves() {
    const moves = [];
    for(let i = 0; i < gameState.gridSize - 1; i++) {
        for(let j = 0; j < gameState.gridSize; j++) {
            if(!gameState.horizontalLines[i][j]) moves.push(['h', i, j]);
        }
    }
    for(let i = 0; i < gameState.gridSize; i++) {
        for(let j = 0; j < gameState.gridSize - 1; j++) {
            if(!gameState.verticalLines[i][j]) moves.push(['v', i, j]);
        }
    }
    return moves;
}

function updateScores() {
    document.getElementById('score1').textContent = gameState.scores[0];
    document.getElementById('score2').textContent = gameState.scores[1];
    
    if(gameState.scores[0] + gameState.scores[1] === (gameState.gridSize-1) ** 2) {
        endGame();
    }
}

function updateTurnDisplay() {
    const playerText = gameState.currentPlayer === 0 ? 
        'Player 1' : (gameState.vsAI ? 'Computer' : 'Player 2');
    document.getElementById('currentPlayer').textContent = `Current: ${playerText}`;
}

function resetGame() {
    gameState.scores = [0, 0];
    gameState.currentPlayer = 0;
    gameState.gameActive = true;
    gameState.horizontalLines = [];
    gameState.verticalLines = [];
    gameState.boxes = [];
    createGameBoard();
    updateTurnDisplay();
    updateScores();
}

function endGame() {
    gameState.gameActive = false;
    let winner = gameState.scores[0] > gameState.scores[1] ? 'Player 1' : 
                gameState.scores[1] > gameState.scores[0] ? 'Player 2' : 'Draw';
    alert(`Game Over! Winner: ${winner}`);
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);