async function loadConfig() {
    const response = await fetch('js/config.json');
    const config = await response.json();

    playGame(config);
}

function playGame(config) {

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const gameState = new GameState(config, ctx);
    let lastTime = 0;

    setup(canvas);
    addMouseEventListeners(canvas, gameState);

    function gameLoop(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        const continueGame = gameState.update(deltaTime);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameState.draw();

        if (continueGame) {
            requestAnimationFrame(gameLoop);
        } else {
            console.log('we have a winner: ' + gameState.board.winner)
        }
    }

    requestAnimationFrame(gameLoop);
}

function setup(canvas) {
    const img = document.getElementById('game-img');
    const button = document.getElementById('play-game-button');

    img.style.display = 'none';
    button.style.display = 'none';
    canvas.style.display = 'block'
    canvas.width = 800;
    canvas.height = 600;
}

function addMouseEventListeners(canvas, gameState) {

    canvas.addEventListener('mousedown', () => {
        gameState.click();
    });

    canvas.addEventListener('mouseup', () => {
        gameState.mouseUp();
    });

    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        gameState.mouse.x = event.clientX - rect.left;
        gameState.mouse.y = event.clientY - rect.top;
    });
}