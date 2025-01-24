const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const nextCanvas = document.getElementById('nextPiece');
const nextCtx = nextCanvas.getContext('2d');

// Game constants
const BLOCK_SIZE = 30;
const COLS = 10;
const ROWS = 20;
const SHAPES = {
    I: [[1,1,1,1]], 
    O: [[1,1],[1,1]],
    T: [[0,1,0],[1,1,1]],
    L: [[1,0],[1,0],[1,1]],
    J: [[0,1],[0,1],[1,1]],
    S: [[0,1,1],[1,1,0]],
    Z: [[1,1,0],[0,1,1]]
};
const COLORS = [
    '#FF0D72', '#0DC2FF', '#0DFF72',
    '#F538FF', '#FF8E0D', '#FFE138',
    '#3877FF'
];

// Game state
let board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
let currentPiece = null;
let nextPiece = null;
let heldPiece = null;
let score = 0;
let level = 1;
let gameLoop;
let gameActive = false;

// Canvas setup
canvas.width = BLOCK_SIZE * COLS;
canvas.height = BLOCK_SIZE * ROWS;
nextCanvas.width = BLOCK_SIZE * 4;
nextCanvas.height = BLOCK_SIZE * 4;

// Piece class
class Piece {
    constructor(shape) {
        this.shape = SHAPES[shape];
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.x = Math.floor(COLS/2) - Math.floor(this.shape[0].length/2);
        this.y = 0;
    }
}

// Game initialization
function resetGame() {
    board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
    score = 0;
    level = 1;
    gameActive = true;
    nextPiece = new Piece(Object.keys(SHAPES)[Math.floor(Math.random()*7)]);
    heldPiece = null;
    spawnPiece();
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('level').textContent = `Level: ${level}`;
    document.getElementById('gameOver').classList.add('hidden');
    
    if (gameLoop) cancelAnimationFrame(gameLoop);
    gameLoop = requestAnimationFrame(update);
}

function spawnPiece() {
    currentPiece = nextPiece || new Piece(Object.keys(SHAPES)[Math.floor(Math.random()*7)]);
    nextPiece = new Piece(Object.keys(SHAPES)[Math.floor(Math.random()*7)]);
    drawNextPiece();
}

function drawNextPiece() {
    nextCtx.fillStyle = var(--primary-color);
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    
    nextCtx.fillStyle = nextPiece.color;
    nextPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                nextCtx.fillRect(
                    (x + 1) * BLOCK_SIZE,
                    (y + 1) * BLOCK_SIZE,
                    BLOCK_SIZE - 1,
                    BLOCK_SIZE - 1
                );
            }
        });
    });
}

// Game logic
function update() {
    if (!gameActive) return;
    
    if (!moveDown()) {
        lockPiece();
        clearLines();
        spawnPiece();
        if (checkCollision(currentPiece.x, currentPiece.y + 1, currentPiece.shape)) {
            endGame();
            return;
        }
    }
    
    draw();
    gameLoop = requestAnimationFrame(update);
}

function moveDown() {
    if (!checkCollision(currentPiece.x, currentPiece.y + 1, currentPiece.shape)) {
        currentPiece.y++;
        return true;
    }
    return false;
}

function lockPiece() {
    currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                board[currentPiece.y + y][currentPiece.x + x] = currentPiece.color;
            }
        });
    });
}

function clearLines() {
    let linesCleared = 0;
    
    for (let y = ROWS - 1; y >= 0; y--) {
        if (board[y].every(cell => cell !== 0)) {
            board.splice(y, 1);
            board.unshift(Array(COLS).fill(0));
            linesCleared++;
            y++;
        }
    }
    
    if (linesCleared > 0) {
        score += [100, 300, 500, 800][linesCleared - 1] * level;
        level = Math.floor(score / 1000) + 1;
        document.getElementById('score').textContent = `Score: ${score}`;
        document.getElementById('level').textContent = `Level: ${level}`;
    }
}

// Input handling
document.addEventListener('keydown', (e) => {
    if (!gameActive) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            moveHorizontal(-1);
            break;
        case 'ArrowRight':
            moveHorizontal(1);
            break;
        case 'ArrowUp':
            rotatePiece();
            break;
        case 'ArrowDown':
            softDrop();
            break;
        case ' ':
            hardDrop();
            break;
        case 'c':
            holdPiece();
            break;
    }
});

function moveHorizontal(dir) {
    if (!checkCollision(currentPiece.x + dir, currentPiece.y, currentPiece.shape)) {
        currentPiece.x += dir;
        draw();
    }
}

function rotatePiece() {
    const rotated = currentPiece.shape[0].map((_, i) =>
        currentPiece.shape.map(row => row[i]).reverse()
    );
    
    if (!checkCollision(currentPiece.x, currentPiece.y, rotated)) {
        currentPiece.shape = rotated;
        draw();
    }
}

function softDrop() {
    moveDown();
    draw();
}

function hardDrop() {
    while(moveDown());
    lockPiece();
    clearLines();
    spawnPiece();
    draw();
}

function holdPiece() {
    if (!heldPiece) {
        heldPiece = currentPiece;
        spawnPiece();
    } else {
        [currentPiece, heldPiece] = [heldPiece, currentPiece];
    }
    currentPiece.x = Math.floor(COLS/2) - Math.floor(currentPiece.shape[0].length/2);
    currentPiece.y = 0;
    draw();
}

// Collision detection
function checkCollision(x, y, shape) {
    return shape.some((row, dy) => 
        row.some((value, dx) => {
            const newX = x + dx;
            const newY = y + dy;
            return value !== 0 && 
                (newX < 0 || newX >= COLS || 
                 newY >= ROWS ||
                 (newY >= 0 && board[newY][newX] !== 0));
        })
    );
}

// Drawing
function draw() {
    // Clear canvas
    ctx.fillStyle = var(--primary-color);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw board
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                ctx.fillStyle = value;
                ctx.fillRect(
                    x * BLOCK_SIZE,
                    y * BLOCK_SIZE,
                    BLOCK_SIZE - 1,
                    BLOCK_SIZE - 1
                );
            }
        });
    });
    
    // Draw current piece
    ctx.fillStyle = currentPiece.color;
    currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                ctx.fillRect(
                    (currentPiece.x + x) * BLOCK_SIZE,
                    (currentPiece.y + y) * BLOCK_SIZE,
                    BLOCK_SIZE - 1,
                    BLOCK_SIZE - 1
                );
            }
        });
    });
}

function endGame() {
    gameActive = false;
    cancelAnimationFrame(gameLoop);
    document.getElementById('gameOver').classList.remove('hidden');
    document.getElementById('finalScore').textContent = score;
}

// Start game
resetGame();