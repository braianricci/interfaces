// Carga de forma asíncrona un archivo de configuración JSON con aspectos clave del juego
async function loadConfig() {
    const response = await fetch('js/config.json');
    const config = await response.json();

    playGame(config);
}

// Inicializa los elementos del juego y comienza con un ciclo de actualizaciones que constituyen el flujo de la partida
function playGame(config) {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const gameState = new GameState(config, ctx);
    const graphics = new Graphics(config, ctx);
    let lastTime = 0;

    setup(canvas, config);
    addMouseEventListeners(canvas, gameState);
    // Actualiza y renderiza el estado actual de la partida, avisando si la misma debe continuar o ya finalizó
    function gameLoop(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        const continueGame = gameState.update(deltaTime);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        graphics.draw();
        gameState.draw();
        if (continueGame) {
            requestAnimationFrame(gameLoop);
        } else {
            console.log('we have a winner: ' + gameState.board.winner)
        }
    }
    // Programa la ejecución de gameLoop(timestamp) en el proximo frame de la pantalla
    requestAnimationFrame(gameLoop);
}

// Sustituye la portada del juego con el entorno donde se ejecuta el juego (lienzo)
function setup(canvas, config) {
    const img = document.getElementById('game-img');
    const button = document.getElementById('play-game-button');
    img.style.display = 'none';
    button.style.display = 'none';
    canvas.style.display = 'block'
    canvas.width = config['canvas-width'];
    canvas.height = config['canvas-height'];
}

// Añade los controles del juego al mouse para poder interactuar con él
function addMouseEventListeners(canvas, gameState) {
    canvas.addEventListener('mousedown', () => {
        gameState.click();
    });
    canvas.addEventListener('mouseup', () => {
        gameState.mouseUp();
    });
    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        gameState.mouse.x = (event.clientX - rect.left) * scaleX;
        gameState.mouse.y = (event.clientY - rect.top) * scaleY;
    });
}