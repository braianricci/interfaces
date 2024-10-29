class Board {

    constructor(config, ctx) {
        this.config = config;
        this.rows = config['board-rows'];
        this.columns = config['board-columns'];
        this.tileWidth = config['tile-width'];
        this.tileHeight = config['tile-height'];
        this.tileSpacing = config['tile-spacing'];
        let boardsize = ((this.tileWidth + this.tileSpacing) * this.columns) - this.tileSpacing;
        this.boardX = (config['canvas-width'] - boardsize) / 2;
        this.boardY = config['board-y']
        this.matrix = Array.from({ length: this.columns }, () => Array(this.rows));
        this.dropZones = [];
        this.hoveredDropZone = null;
        this.winner = null;
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

    update(deltaTime, mouse, isFichaSelected) {
        if (this.winner == null) {
            if (isFichaSelected) {
                this.checkDropZones(mouse);
            }
            return true;
        } else {
            return false;
        }
    }

    checkDropZones(mouse) {
        this.hoveredDropZone = null;
        for (const zone of this.dropZones) {
            zone.highlight(false);
            if (this.hoveredDropZone == null) {
                this.hoveredDropZone = zone.isHoveredWithFicha(mouse);
            }
        }
    }

    checkForHover(ficha) {
        if (this.hoveredDropZone != null) {
            return this.addFicha(ficha);
        } else {
            ficha.resetPos();
            return false;
        }
    }

    addFicha(ficha) {
        const column = this.hoveredDropZone.getColumn();
        const firstEmpty = this.searchFreeTile(column);

        this.hoveredDropZone.setColor('grey');
        this.hoveredDropZone = null;

        if (firstEmpty != -1) {
            this.matrix[column][firstEmpty].setFicha(ficha);
            this.checkPosibleWin(column, firstEmpty, ficha.getColor());
            ficha.discard();
            return true;
        } else {
            ficha.resetPos();
            return false;
        }
    }

    searchFreeTile(column) {
        for (let x = this.matrix[column].length - 1; x >= 0; x--) {
            if (this.matrix[column][x].getFicha() == null) {
                return x;
            }
        }
        return -1;
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
    }

    checkPosibleWin(column, row, color) {
        const winCount = this.config['win-count'];
        const directions = [
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: 0 }, { x: 1, y: 0 },
            { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }
        ];

        for (const { x, y } of directions) {
            this.recursiveLineCheck(column, row, x, y, winCount, 1, color);
        }
    }

    recursiveLineCheck(x, y, dirX, dirY, winCount, currentCount, color) {
        const newX = x + dirX;
        const newY = y + dirY;
        if (newX < 0 || newX >= this.matrix.length || newY < 0 || newY >= this.matrix[0].length) {
            return;
        }
        const cell = this.matrix[newX][newY];
        const newColor = cell && cell.getFicha() ? cell.getFicha().getColor() : null;

        if (newColor == color) {
            currentCount++;
            if (winCount == currentCount) {
                this.winner = color;
            } else {
                this.recursiveLineCheck(newX, newY, dirX, dirY, winCount, currentCount, color);
            }
        }
    }
}