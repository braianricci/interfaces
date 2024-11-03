class GameState {
    // Construye un objeto que gestiona los elementos del juego y la interacción con el jugador en su turno
    constructor(config, ctx) {
        this.fichas = this.createFichas(config, ctx);
        this.board = new Board(config, ctx);
        this.mouse = { x: 0, y: 0 };
        this.selectedFicha = null;
        this.hoveredDropZone = null;
        this.playerOneTurn = true;
        this.ctx = ctx;
    }

    // Crea la cantidad de fichas necesaria para cada jugador en una partida en particular
    createFichas(config, ctx) {
        const fichas = [];
        let num = config['board-rows'] * config['board-columns']
        num = (num + 1) / 2 | 0; // Se deshace de los decimales redondeando el resultado para arriba (Bitwise Operator)


        //deshardcodear las coordenadas pls
        for (let i = 0; i < num; i++) {
            fichas.push(new Ficha(73, 155 - (i * 3), config, config['player1-color'], ctx));
            fichas.push(new Ficha(247, 155 - (i * 3), config, config['player2-color'], ctx));
        }

        return fichas;
    }

    // Actualiza el estado de la partida junto con sus elementos e indica si la partida debe continuar
    update(deltaTime) {
        const continueGame = this.board.update(deltaTime, this.mouse, this.selectedFicha != null);
        this.fichas.forEach(obj => obj.update(deltaTime, this.mouse));
        return continueGame;
    }

    // Dibuja los elementos de la partida en el lienzo
    draw() {
        this.board.drawBackground();
        this.fichas.forEach(obj => obj.draw());
        this.board.draw();
    }

    // Determina cuáles son las fichas seleccionables en un turno y las recorre hasta encontrar la que selecciona el jugador
    click() {
        const playableColor = this.playerOneTurn ? 'red' : 'green';
        for (let ficha of this.fichas) {
            if (this.selectedFicha == null && ficha.getColor() == playableColor) {
                this.selectedFicha = ficha.checkClick(this.mouse, playableColor);
            }
        }
    }

    // Verifica dónde suelta el jugador la ficha seleccionada para determinar si se continúa con el siguiente turno
    mouseUp() {
        if (this.selectedFicha != null) {
            this.playerOneTurn = this.board.checkForHover(this.selectedFicha) ? !this.playerOneTurn : this.playerOneTurn;
            this.selectedFicha.setDragState(false);
            this.selectedFicha = null;
        }
    }
}