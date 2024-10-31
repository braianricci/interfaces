class GameState {

    constructor(config, ctx) {
        this.fichas = this.createFichas(config, ctx);
        this.board = new Board(config, ctx);
        this.mouse = { x: 0, y: 0 };
        this.selectedFicha = null;
        this.hoveredDropZone = null;
        this.playerOneTurn = true;
        this.ctx = ctx;
    }

    createFichas(config, ctx) {
        const fichas = [];
        let num = config['board-rows'] * config['board-columns']
        num = (num + 1) / 2 | 0; //bitwise operator para deshacerse de los decimales, redondeando para arriba;

        //deshardcodear las coordenadas pls
        for (let i = 0; i < num; i++) {
            fichas.push(new Ficha(73, 155 - (i * 3), config, config['player1-color'], ctx));
            fichas.push(new Ficha(247, 155 - (i * 3), config, config['player2-color'], ctx));
        }

        return fichas;
    }

    update(deltaTime) {
        const continueGame = this.board.update(deltaTime, this.mouse, this.selectedFicha != null);
        this.fichas.forEach(obj => obj.update(deltaTime, this.mouse));
        return continueGame;
    }

    draw() {
        this.fichas.forEach(obj => obj.draw());
        this.board.draw();
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
            this.playerOneTurn = this.board.checkForHover(this.selectedFicha) ? !this.playerOneTurn : this.playerOneTurn;
            this.selectedFicha.setDragState(false);
            this.selectedFicha = null;
        }
    }
}