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

    update(deltaTime, mouseState) {
        this.checkDropZones(mouseState);
    }

    checkDropZones(mouseState) {
        let hovered = false;

        for (let hint of this.dropZones) {
            if (!hovered) {
                hovered = hint.isHoveredWithFicha(mouseState);
            }
        }
    }

    fill() {
        let posX = this.boardX;
        let posY = this.boardY;

        for (let x = 0; x < this.columns; x++) {

            const hint = new Hint(posX, posY, this.tileWidth, this.tileHeight, 'grey', this.ctx);
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