// Add these variables with the other game state variables
let lastUpdateTime = 0;
let baseInterval = 150; // Base time between moves (milliseconds)
let level = 1;

// Modify the update function like this
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
