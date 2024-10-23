function playGame(event) {
    alert("playing" + event.target.tagName)
    const canvas = document.getElementById('game-canvas');
    const img = document.getElementById('game-img');
    const button = event.target;
    const ctx = canvas.getContext('2d')

    img.style.display = 'none';
    button.style.display = 'none';
    canvas.style.display = 'block'

    canvas.width = 800;
    canvas.height = 600;

    let ficha = new Ficha(100, 100, 50, ctx);
    ficha.draw();
}
