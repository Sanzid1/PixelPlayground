// Game constants
const GRID_SIZE = 20; // Size of each grid cell in pixels
const GRID_COUNT = 20; // Number of cells in each direction

// Game state variables
let canvas;
let ctx;
let snake = [];
let food = {};
let dx = 0;
let dy = -1;
let score = 0;
let gameActive = false;
let gameLoop;
let lastUpdateTime = 0;
let baseInterval = 150; // Base time between moves (milliseconds)
let level = 1;

// Initialize the game
function initGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    resetGame();
    // Set up keyboard controls
    document.addEventListener('keydown', handleKeyPress);
}

// Reset the game to initial state
function resetGame() {
    // Clear any existing game loop
    if (gameLoop) {
        cancelAnimationFrame(gameLoop);
    }
    
    // Reset game state
    snake = [
        { x: 10, y: 10 } // Start in the middle
    ];
    dx = 0;
    dy = -1; // Start moving up
    score = 0;
    level = 1;
    lastUpdateTime = 0;
    gameActive = true;
    
    // Hide game over screen
    document.getElementById('gameOver').classList.add('hidden');
    document.getElementById('score').textContent = `Score: ${score}`;
    
    // Spawn initial food
    food = spawnFood();
    
    // Start game loop
    gameLoop = requestAnimationFrame(update);
}

// Handle keyboard input
function handleKeyPress(e) {
    if (!gameActive) return;
    
    // Prevent snake from reversing direction
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
}

// Spawn food at random position
function spawnFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * GRID_COUNT),
            y: Math.floor(Math.random() * GRID_COUNT)
        };
        // Make sure food doesn't spawn on snake
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    return newFood;
}

// Draw everything on the canvas
function draw() {
    // Clear canvas
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    ctx.fillStyle = '#4CAF50';
    snake.forEach((segment, index) => {
        // Make head a different color
        if (index === 0) {
            ctx.fillStyle = '#8BC34A';
        } else {
            ctx.fillStyle = '#4CAF50';
        }
        
        ctx.fillRect(
            segment.x * GRID_SIZE,
            segment.y * GRID_SIZE,
            GRID_SIZE - 1,
            GRID_SIZE - 1
        );
    });
    
    // Draw food
    ctx.fillStyle = '#FF5722';
    ctx.fillRect(
        food.x * GRID_SIZE,
        food.y * GRID_SIZE,
        GRID_SIZE - 1,
        GRID_SIZE - 1
    );
}

// Update game state
function update(timestamp) {
    if (!gameActive) return;
    
    // Only move snake if enough time has passed
    if (!lastUpdateTime) lastUpdateTime = timestamp;
    
    const interval = baseInterval / level;
    if (timestamp - lastUpdateTime > interval) {
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
            level = Math.floor(score / 50) + 1; // Increase level every 50 points
            document.getElementById('score').textContent = `Score: ${score}`;
            food = spawnFood();
        } else {
            snake.pop();
        }
        
        lastUpdateTime = timestamp;
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
