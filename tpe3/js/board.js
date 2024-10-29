class Board {

    constructor(config, ctx) {
        this.config = config;
        this.rows = config['board-rows'];
        this.columns = config['board-columns'];
        this.tileWidth = config['tile-width'];
        this.tileHeight = config['tile-height'];
        this.tileSpacing = config['tile-spacing'];
        let boardsize = ((this.tileWidth + this.tileSpacing) * this.columns) - this.tileSpacing;
        this.boardX = (800 - boardsize) / 2;
        this.boardY = config['board-y']
        this.matrix = Array.from({ length: this.columns }, () => Array(this.rows));
        this.dropZones = [];
        this.hoveredDropZone = null;
        this.ctx = ctx;
        this.fill();
    }

    draw() {
        for (let hint of this.dropZones) {
            hint.draw()
        }

        for (let column of this.matrix) {
            for (let tile of column) {
                tile.draw();
            }
        }
    }

    update(deltaTime, mouse, selectedFicha) {
        if (selectedFicha) {
            this.checkDropZones(mouse);
        }
    }

    checkDropZones(mouse) {
        for (let dropZone of this.dropZones) {
            if (this.hoveredDropZone == null) {
                this.hoveredDropZone = dropZone.isHoveredWithFicha(mouse);
            }
        }
    }

    isInDropZone(ficha) {
        const fichaX = ficha.getPos().x;
        const fichaY = ficha.getPos().y;
        const drop = this.hoveredDropZone.getPos();

        if (fichaX > drop.x && fichaX < drop.x + drop.w && fichaY > drop.y && fichaY < drop.y + drop.h) {
            this.addFicha(ficha);
        } else {
            ficha.resetPos();
        }
    }

    // TERMINAR ESTO POR FAVOR POR EL AMOR DE DIOS
    addFicha(ficha) {
        const column = this.hoveredDropZone.getColumn();
        const firstEmpty = checkFirstLibre(column);
        this.matrix[firstEmpty][column].setFicha(ficha);
    }

    fill() {
        let posX = this.boardX;
        let posY = this.boardY;

        for (let x = 0; x < this.columns; x++) {

            const hint = new DropZone(posX, posY, this.tileWidth, this.tileHeight, 'grey', x, this.ctx);
            this.dropZones.push(hint);
            posX += this.tileWidth + this.tileSpacing;
        }
        posX = this.boardX;
        posY = this.boardY + this.tileHeight + this.tileSpacing;

        for (let y = 0; y < this.rows; y++) {

            for (let x = 0; x < this.columns; x++) {

                const tile = new Tile(posX, posY, this.tileWidth, this.tileHeight, 'blue', this.ctx);
                this.matrix[x][y] = tile;
                posX += this.tileWidth + this.tileSpacing;
            }
            posX = this.boardX;
            posY += this.tileHeight + this.tileSpacing;
        }
        console.log('done filling board');
    }
}