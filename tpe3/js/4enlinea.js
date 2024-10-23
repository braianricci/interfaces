game = new Game()
function playGame(event) {
    const canvas = document.getElementById('game-canvas');
    const img = document.getElementById('game-img');
    const button = event.target;
    const ctx = canvas.getContext('2d')

    img.style.display = 'none';
    button.style.display = 'none';
    canvas.style.display = 'block'

    canvas.width = 800;
    canvas.height = 600;

    let game = new Game(ctx);
    let ficha = new Ficha(100, 100, 50, ctx);
    ficha.draw();

    canvas.addEventListener('mousedown', (canvasEvent) => {
        game.setDragging(clickFicha(canvasEvent, ficha, canvas));
    });

    canvas.addEventListener('mouseup', () => {
        game.setDragging(false);
    });

    canvas.addEventListener('mousemove', (canvasEvent) => {
        if (game.getDragging()) {
            console.log('moving');
            moveFicha(canvasEvent, ficha, canvas, ctx);
        }
    });
}

function clickFicha(event, ficha, canvas) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    return ficha.isClicked(x, y);
}

function moveFicha(event, ficha, canvas, ctx) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ficha.setPos(x, y);
    ficha.draw();
}