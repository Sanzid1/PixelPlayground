// Game constants
const GRID_SIZE = 32; // Size of each grid cell in pixels
const GRID_WIDTH = 10; // Number of cells horizontally
const GRID_HEIGHT = 20; // Number of cells vertically
const DROP_INTERVAL = 1000; // Time in milliseconds between drops (1 second)

// Game state variables
let canvas;
let ctx;
let nextPieceCanvas;
let nextPieceCtx;
let gameBoard = [];
let currentPiece = null;
let nextPiece = null;
let score = 0;
let level = 1;
let gameActive = false;
let gameLoop;
let lastDropTime = 0;
let holdEnabled = true;
let heldPiece = null;

// Tetromino shapes and colors
const SHAPES = [
    // I
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    // J
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    // L
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    // O
    [
        [1, 1],
        [1, 1]
    ],
    // S
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    // T
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    // Z
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ]
];

const COLORS = [
    '#00FFFF', // I - Cyan
    '#0000FF', // J - Blue
    '#FF7F00', // L - Orange
    '#FFFF00', // O - Yellow
    '#00FF00', // S - Green
    '#800080', // T - Purple
    '#FF0000'  // Z - Red
];

// Initialize the game
function initGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    nextPieceCanvas = document.getElementById('nextPiece');
    nextPieceCtx = nextPieceCanvas.getContext('2d');
    
    // Set up keyboard controls
    document.addEventListener('keydown', handleKeyPress);
    
    // Initialize game board
    resetGame();
}

// Reset the game to initial state
function resetGame() {
    // Clear any existing game loop
    if (gameLoop) {
        cancelAnimationFrame(gameLoop);
    }
    
    // Reset game state
    gameBoard = Array(GRID_HEIGHT).fill().map(() => Array(GRID_WIDTH).fill(0));
    score = 0;
    level = 1;
    lastDropTime = 0;
    gameActive = true;
    holdEnabled = true;
    heldPiece = null;
    
    // Hide game over screen
    document.getElementById('gameOver').classList.add('hidden');
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('level').textContent = `Level: ${level}`;
    
    // Spawn initial pieces
    nextPiece = getRandomPiece();
    spawnPiece();
    
    // Start game loop
    gameLoop = requestAnimationFrame(update);
}

// Handle keyboard input
function handleKeyPress(e) {
    if (!gameActive) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowUp':
            rotatePiece();
            break;
        case ' ':
            hardDrop();
            break;
        case 'c':
        case 'C':
            holdPiece();
            break;
    }
    
    // Prevent default behavior for arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
    }
}

// Get a random tetromino piece
function getRandomPiece() {
    const randomIndex = Math.floor(Math.random() * SHAPES.length);
    return {
        shape: SHAPES[randomIndex],
        color: COLORS[randomIndex],
        x: Math.floor(GRID_WIDTH / 2) - Math.floor(SHAPES[randomIndex][0].length / 2),
        y: 0,
        type: randomIndex
    };
}

// Spawn a new piece at the top of the board
function spawnPiece() {
    currentPiece = nextPiece;
    nextPiece = getRandomPiece();
    
    // Draw the next piece preview
    drawNextPiece();
    
    // Check if the new piece immediately collides (game over)
    if (checkCollision(currentPiece.x, currentPiece.y, currentPiece.shape)) {
        endGame();
    }
}

// Hold the current piece
function holdPiece() {
    if (!holdEnabled) return;
    
    holdEnabled = false;
    
    if (heldPiece === null) {
        heldPiece = {
            shape: SHAPES[currentPiece.type],
            color: COLORS[currentPiece.type],
            type: currentPiece.type
        };
        spawnPiece();
    } else {
        const temp = {
            shape: SHAPES[currentPiece.type],
            color: COLORS[currentPiece.type],
            type: currentPiece.type
        };
        
        currentPiece = {
            shape: heldPiece.shape,
            color: heldPiece.color,
            type: heldPiece.type,
            x: Math.floor(GRID_WIDTH / 2) - Math.floor(heldPiece.shape[0].length / 2),
            y: 0
        };
        
        heldPiece = temp;
        
        // Check if the held piece immediately collides (shouldn't happen normally)
        if (checkCollision(currentPiece.x, currentPiece.y, currentPiece.shape)) {
            endGame();
        }
    }
}

// Move the current piece left
function moveLeft() {
    if (!checkCollision(currentPiece.x - 1, currentPiece.y, currentPiece.shape)) {
        currentPiece.x--;
    }
}

// Move the current piece right
function moveRight() {
    if (!checkCollision(currentPiece.x + 1, currentPiece.y, currentPiece.shape)) {
        currentPiece.x++;
    }
}

// Move the current piece down
function moveDown() {
    if (!checkCollision(currentPiece.x, currentPiece.y + 1, currentPiece.shape)) {
        currentPiece.y++;
        return true;
    }
    return false;
}

// Hard drop the current piece
function hardDrop() {
    while (moveDown()) {
        // Keep moving down until collision
    }
    lockPiece();
    clearLines();
    spawnPiece();
}

// Rotate the current piece
function rotatePiece() {
    const rotated = rotateMatrix(currentPiece.shape);
    if (!checkCollision(currentPiece.x, currentPiece.y, rotated)) {
        currentPiece.shape = rotated;
    } else {
        // Try wall kicks
        // Try moving right
        if (!checkCollision(currentPiece.x + 1, currentPiece.y, rotated)) {
            currentPiece.x++;
            currentPiece.shape = rotated;
        }
        // Try moving left
        else if (!checkCollision(currentPiece.x - 1, currentPiece.y, rotated)) {
            currentPiece.x--;
            currentPiece.shape = rotated;
        }
        // Try moving up (for I piece mostly)
        else if (!checkCollision(currentPiece.x, currentPiece.y - 1, rotated)) {
            currentPiece.y--;
            currentPiece.shape = rotated;
        }
    }
}

// Rotate a matrix 90 degrees clockwise
function rotateMatrix(matrix) {
    const N = matrix.length;
    const result = Array(N).fill().map(() => Array(N).fill(0));
    
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            result[j][N - 1 - i] = matrix[i][j];
        }
    }
    
    return result;
}

// Check if the current piece collides with walls or other pieces
function checkCollision(x, y, shape) {
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                const boardX = x + col;
                const boardY = y + row;
                
                // Check boundaries
                if (boardX < 0 || boardX >= GRID_WIDTH || boardY >= GRID_HEIGHT) {
                    return true;
                }
                
                // Check collision with locked pieces
                if (boardY >= 0 && gameBoard[boardY][boardX]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// Lock the current piece in place
function lockPiece() {
    for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
            if (currentPiece.shape[row][col]) {
                const boardX = currentPiece.x + col;
                const boardY = currentPiece.y + row;
                
                if (boardY >= 0) {
                    gameBoard[boardY][boardX] = currentPiece.color;
                }
            }
        }
    }
    
    // Re-enable hold after locking a piece
    holdEnabled = true;
}

// Clear completed lines
function clearLines() {
    let linesCleared = 0;
    
    for (let row = GRID_HEIGHT - 1; row >= 0; row--) {
        if (gameBoard[row].every(cell => cell !== 0)) {
            // Remove the line
            gameBoard.splice(row, 1);
            // Add a new empty line at the top
            gameBoard.unshift(Array(GRID_WIDTH).fill(0));
            linesCleared++;
            row++; // Check the same row again after shifting
        }
    }
    
    if (linesCleared > 0) {
        // Update score based on lines cleared
        const points = [0, 40, 100, 300, 1200][linesCleared] * level;
        score += points;
        document.getElementById('score').textContent = `Score: ${score}`;
        
        // Update level
        level = Math.floor(score / 1000) + 1;
        document.getElementById('level').textContent = `Level: ${level}`;
    }
}

// Draw the next piece preview
function drawNextPiece() {
    // Clear the canvas
    nextPieceCtx.fillStyle = '#222';
    nextPieceCtx.fillRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height);
    
    const shape = nextPiece.shape;
    const blockSize = 20;
    const offsetX = (nextPieceCanvas.width - shape[0].length * blockSize) / 2;
    const offsetY = (nextPieceCanvas.height - shape.length * blockSize) / 2;
    
    // Draw the piece
    nextPieceCtx.fillStyle = nextPiece.color;
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                nextPieceCtx.fillRect(
                    offsetX + col * blockSize,
                    offsetY + row * blockSize,
                    blockSize - 1,
                    blockSize - 1
                );
            }
        }
    }
}

// Draw everything on the canvas
function draw() {
    // Clear canvas
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the game board
    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            if (gameBoard[row][col]) {
                ctx.fillStyle = gameBoard[row][col];
                ctx.fillRect(
                    col * GRID_SIZE,
                    row * GRID_SIZE,
                    GRID_SIZE - 1,
                    GRID_SIZE - 1
                );
            }
        }
    }
    
    // Draw the current piece
    if (currentPiece) {
        ctx.fillStyle = currentPiece.color;
        for (let row = 0; row < currentPiece.shape.length; row++) {
            for (let col = 0; col < currentPiece.shape[row].length; col++) {
                if (currentPiece.shape[row][col]) {
                    ctx.fillRect(
                        (currentPiece.x + col) * GRID_SIZE,
                        (currentPiece.y + row) * GRID_SIZE,
                        GRID_SIZE - 1,
                        GRID_SIZE - 1
                    );
                }
            }
        }
    }
}

// Update game state
function update(timestamp) {
    if (!gameActive) return;
    
    // Only move down if enough time has passed
    if (!lastDropTime) lastDropTime = timestamp;
    
    const interval = DROP_INTERVAL / level;
    if (timestamp - lastDropTime > interval) {
        if (!moveDown()) {
            lockPiece();
            clearLines();
            spawnPiece();
        }
        lastDropTime = timestamp;
    }
    
    draw();
    gameLoop = requestAnimationFrame(update);
}

// End the game
function endGame() {
    gameActive = false;
    document.getElementById('gameOver').classList.remove('hidden');
    document.getElementById('finalScore').textContent = score;
}

// Initialize the game when the page loads
window.addEventListener('load', initGame);
