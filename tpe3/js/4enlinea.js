function playGame() {

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');

    let gameObjects = createGameObjects(ctx);
    let fichas = createFichas(ctx);
    let mouseState = { x: 0, y: 0, clicked: false, hasFicha: false };
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

function createGameObjects(ctx) {
    let gameObjects = [];
    gameObjects.push(new Board(4, 4, ctx))
    return gameObjects;
}

function createFichas(ctx) {
    let fichas = [];
    fichas.push(new Ficha(100, 100, 30, 'red', ctx));
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
        mouseState.clicked = true;
        for (let ficha of fichas) {
            ficha.isClicked(mouseState);
        }
    });

    canvas.addEventListener('mouseup', () => {
        mouseState.clicked = false;
    });

    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        mouseState.x = event.clientX - rect.left;
        mouseState.y = event.clientY - rect.top;
    });
}