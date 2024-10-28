async function loadConfig() {
    const response = await fetch('js/config.json');
    const config = await response.json();

    playGame(config);
}

function playGame(config) {

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');

    let gameObjects = createGameObjects(config, ctx);
    let fichas = createFichas(config, ctx);
    let mouseState = { x: 0, y: 0, hasFicha: false, ficha: null, dropZone: null };
    let lastTime = 0;

    setup(canvas);
    addMouseEventListeners(canvas, fichas, mouseState);

    function update(deltaTime) {
        gameObjects.forEach(obj => obj.update(deltaTime, mouseState));
        fichas.forEach(obj => obj.update(deltaTime, mouseState));
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameObjects.forEach(obj => obj.draw());
        fichas.forEach(obj => obj.draw());
    }

    function gameLoop(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        update(deltaTime);
        draw();

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}

function createGameObjects(config, ctx) {
    let gameObjects = [];
    gameObjects.push(new Board(config, ctx))
    return gameObjects;
}

function createFichas(config, ctx) {
    let fichas = [];
    fichas.push(new Ficha(100, 100, config, config['player1-color'], ctx));
    fichas.push(new Ficha(700, 100, config, config['player2-color'], ctx));
    return fichas;
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

function addMouseEventListeners(canvas, fichas, mouseState) {

    canvas.addEventListener('mousedown', () => {
        for (let ficha of fichas) {
            if (!mouseState.hasFicha) {
                ficha.checkClick(mouseState);
            }
        }
    });

    canvas.addEventListener('mouseup', () => {
        if (mouseState.hasFicha) {
            mouseState.ficha.letGo(mouseState.dropZone);
            mouseState.ficha = null;
            mouseState.hasFicha = false;
        }
    });

    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        mouseState.x = event.clientX - rect.left;
        mouseState.y = event.clientY - rect.top;
    });
}