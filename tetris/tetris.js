// Add these variables with the other game state variables
let lastDropTime = 0;
let level = 1;
const DROP_INTERVAL = 1000; // Time in milliseconds between drops (1 second)

// Modify the update function like this
function update(timestamp) {
    if (!gameActive) return;
    
    // Only move down if enough time has passed
    if (timestamp - lastDropTime > DROP_INTERVAL / level) {
        if (!moveDown()) {
            lockPiece();
            clearLines();
            spawnPiece();
            if (checkCollision(currentPiece.x, currentPiece.y + 1, currentPiece.shape)) {
                endGame();
                return;
            }
        }
        lastDropTime = timestamp;
    }
    
    draw();
    gameLoop = requestAnimationFrame(update);
}
