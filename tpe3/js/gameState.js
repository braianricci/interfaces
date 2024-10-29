class GameState {

    constructor(config, ctx) {
        this.fichas = this.createFichas(config, ctx);
        this.board = new Board(config, ctx);
        this.mouse = { x: 0, y: 0 };
        this.selectedFicha = null;
        this.hoveredDropZone = null;
    }

    createFichas(config, ctx) {
        const fichas = [];
        fichas.push(new Ficha(100, 100, config, config['player1-color'], ctx));
        fichas.push(new Ficha(700, 100, config, config['player2-color'], ctx));
        return fichas;
    }

    update(deltaTime) {
        this.board.update(deltaTime, this.mouse, this.selectedFicha != null);
        this.fichas.forEach(obj => obj.update(deltaTime));
    }

    drawAll() {
        this.board.draw();
        this.fichas.forEach(obj => obj.draw());
    }

    click() {
        console.log(this.fichas)
        for (let ficha of this.fichas) {
            if (this.selectedFicha != null) {
                ficha.checkClick(this.mouse);
            }
        }
    }

    mouseUp() {
        if (this.selectedFicha != null) {
            this.board.isInDropZone(this.selectedFicha);
            this.selectedFicha = null;
        }
    }
}