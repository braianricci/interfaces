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
        this.player1Name = config['player1-name'];
        this.player2Name = config['player2-name'];
        this.startTime = 200;
        this.remainingTime = this.startTime;
        this.timerIsRunning = false;
    }

    // Crea la cantidad de fichas necesaria para cada jugador en una partida en particular
    createFichas(config, ctx) {
        const fichas = [];
        let num = config['board-rows'] * config['board-columns']
        num = (num + 1) / 2 | 0; // Se deshace de los decimales redondeando el resultado para arriba (Bitwise Operator)

        //deshardcodear las coordenadas pls
        for (let i = 0; i < num; i++) {
            fichas.push(new Ficha(73, 155 - (i * 3), config, 'blue', ctx));
            fichas.push(new Ficha(247, 155 - (i * 3), config, 'red', ctx));
        }

        return fichas;
    }

    // Actualiza el estado de la partida junto con sus elementos e indica si la partida debe continuar
    update(deltaTime) {
        const continueGame = this.board.update(deltaTime, this.mouse, this.selectedFicha != null);
        if (this.timerIsRunning) {
            this.remainingTime -= deltaTime / 1000;
            console.log(this.remainingTime)
            if (this.remainingTime <= 0) {
                this.remainingTime = 0;
                this.timerIsRunning = false;
                this.abort();
            }
        }
        this.fichas.forEach(obj => obj.update(deltaTime, this.mouse));
        return continueGame && this.timerIsRunning;
    }

    // Dibuja los elementos de la partida en el lienzo
    draw() {
        this.board.drawBackground();
        this.fichas.forEach(obj => obj.draw());
        this.board.draw();
        this.drawTimer();
    }

    // Determina cuáles son las fichas seleccionables en un turno y las recorre hasta encontrar la que selecciona el jugador
    click() {
        const playableColor = this.playerOneTurn ? 'blue' : 'red';
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

    getWinner() {
        const color = this.board.getWinner();
        let name;

        switch (color) {
            case 'blue':
                name = this.player1Name;
                break;
            case 'red':
                name = this.player2Name;
                break;
            default:
                name = 'neither';
        }
        return name;
    }

    abort() {
        this.restartTimer();
        this.board.abort();
    }

    drawTimer() {
        this.ctx.fillStyle = "yellow";
        this.ctx.font = "14px Simpsons";
        this.ctx.fillText(Math.ceil(this.remainingTime), 155, 15);
    }

    restartTimer() {
        console.log('timer restarted')
        console.log('old remaining: ' + this.remainingTime + ',starttime: ' + this.startTime)
        this.remainingTime = this.startTime;
        console.log('new remaining' + this.remainingTime)
        this.timerIsRunning = true;
    }
}