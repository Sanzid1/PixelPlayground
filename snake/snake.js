const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const GRID_SIZE = 20;
const GRID_COUNT = 20;

// Game state
let snake = [
    { x: 10, y: 10 }
];
let food = { x: 15, y: 15 };
let dx = 1;
let dy = 0;
let score = 0;
let gameLoop;
let gameActive = false;

// Canvas setup
canvas.width = GRID_SIZE * GRID_COUNT;
canvas.height = GRID_SIZE * GRID_COUNT;

// Input handling
document.addEventListener('keydown', (e) => {
    if (!gameActive) return;
    
    switch(e.key) {
        case 'ArrowUp':
            if (dy === 0) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy === 0) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx === 0) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx === 0) { dx = 1; dy = 0; }
            break;
    }
});

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = spawnFood();
    dx = 1;
    dy = 0;
    score = 0;
    gameActive = true;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('gameOver').classList.add('hidden');
    
    if (gameLoop) cancelAnimationFrame(gameLoop);
    gameLoop = requestAnimationFrame(update);
}

function spawnFood() {
    while(true) {
        const newFood = {
            x: Math.floor(Math.random() * GRID_COUNT),
            y: Math.floor(Math.random() * GRID_COUNT)
        };
        
        if (!snake.some(segment => 
            segment.x === newFood.x && segment.y === newFood.y)) {
            return newFood;
        }
    }
}

function update() {
    if (!gameActive) return;
    
    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // Check collisions
    if (head.x < 0 || head.x >= GRID_COUNT ||
        head.y < 0 || head.y >= GRID_COUNT ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }
    
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = `Score: ${score}`;
        food = spawnFood();
    } else {
        snake.pop();
    }
    
    draw();
    gameLoop = requestAnimationFrame(update);
}

function draw() {
    // Clear canvas
    ctx.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary-color');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    ctx.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-color');
    snake.forEach((segment) => {
        ctx.fillRect(
            segment.x * GRID_SIZE,
            segment.y * GRID_SIZE,
            GRID_SIZE - 1,
            GRID_SIZE - 1
        );
    });
    
    // Draw food
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(
        food.x * GRID_SIZE,
        food.y * GRID_SIZE,
        GRID_SIZE - 1,
        GRID_SIZE - 1
    );
}

function endGame() {
    gameActive = false;
    cancelAnimationFrame(gameLoop);
    document.getElementById('gameOver').classList.remove('hidden');
    document.getElementById('finalScore').textContent = score;
}

// Initialize game only after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    const gameOverElement = document.getElementById('gameOver');
    const newGameButton = document.getElementById('newGameButton');
    
    if (gameOverElement && newGameButton) {
        // Show canvas but don't start game until New Game is clicked
        draw();
        gameOverElement.classList.add('hidden');
        newGameButton.addEventListener('click', () => {
            resetGame();
            gameActive = true; // Ensure game is active when starting
        });
    } else {
        console.error('Required game elements not found in the DOM');
    }
});