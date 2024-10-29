class GameState {

    constructor(config, ctx) {
        this.fichas = this.createFichas(config, ctx);
        this.board = new Board(config, ctx);
        this.mouse = { x: 0, y: 0 };
        this.selectedFicha = null;
        this.hoveredDropZone = null;
        this.playerOneTurn = true;
    }

    createFichas(config, ctx) {
        const fichas = [];
        let num = config['board-rows'] * config['board-columns']
        num = (num + 1) / 2 | 0; //bitwise operator para deshacerse de los decimales, redondeando para arriba;

        for (let i = 0; i < num; i++) {
            fichas.push(new Ficha(100, 500 - (i * 10), config, config['player1-color'], ctx));
            fichas.push(new Ficha(700, 500 - (i * 10), config, config['player2-color'], ctx));
        }

        return fichas;
    }

    update(deltaTime) {
        const continueGame = this.board.update(deltaTime, this.mouse, this.selectedFicha != null);
        this.fichas.forEach(obj => obj.update(deltaTime, this.mouse));
        return continueGame;
    }

    draw() {
        this.board.draw();
        this.fichas.forEach(obj => obj.draw());
    }

    click() {
        const playableColor = this.playerOneTurn ? 'red' : 'green';

        for (let ficha of this.fichas) {
            if (this.selectedFicha == null && ficha.getColor() == playableColor) {
                this.selectedFicha = ficha.checkClick(this.mouse, playableColor);
            }
        }
    }

    mouseUp() {
        if (this.selectedFicha != null) {
            this.playerOneTurn = this.board.dropZoneisBeingHovered(this.selectedFicha) ? !this.playerOneTurn : this.playerOneTurn;
            this.selectedFicha.setDragState(false);
            this.selectedFicha = null;
        }
    }
}