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
            zone.setColor('grey');
            if (this.hoveredDropZone == null) {
                this.hoveredDropZone = zone.isHoveredWithFicha(mouse);
            }
        }
    }

    dropZoneisBeingHovered(ficha) {
        //const fichaX = ficha.getPos().x;
        //const fichaY = ficha.getPos().y;
        //const drop = this.hoveredDropZone.getPos();

        //if (fichaX > drop.x && fichaX < drop.x + drop.w && fichaY > drop.y && fichaY < drop.y + drop.h) {
        if (this.hoveredDropZone != null) {
            this.addFicha(ficha);
            return true;
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
            ficha.discard();
            this.checkPosibleWin(column, firstEmpty, ficha.getColor());
        } else {
            ficha.resetPos();
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
        const countNeeded = this.config['count-needed'];
        this.recursiveLineCheck(column, row, -1, -1, countNeeded, 1, color);
        this.recursiveLineCheck(column, row, 0, -1, countNeeded, 1, color);
        this.recursiveLineCheck(column, row, 1, -1, countNeeded, 1, color);
        this.recursiveLineCheck(column, row, -1, 0, countNeeded, 1, color);
        this.recursiveLineCheck(column, row, 1, 0, countNeeded, 1, color);
        this.recursiveLineCheck(column, row, -1, 1, countNeeded, 1, color);
        this.recursiveLineCheck(column, row, 0, 1, countNeeded, 1, color);
        this.recursiveLineCheck(column, row, 1, 1, countNeeded, 1, color);
    }

    recursiveLineCheck(x, y, dirX, dirY, countNeeded, currentCount, color) {
        const newX = x + dirX;
        const newY = y + dirY;
        const cell = this.cellExist(newX, newY) ? this.matrix[newX][newY] : null;
        const newColor = cell && cell.getFicha() ? cell.getFicha().getColor() : null;

        if (newColor == color) {
            currentCount++;
            if (countNeeded == currentCount) {
                this.winner = color;
            } else {
                this.recursiveLineCheck(newX, newY, dirX, dirY, countNeeded, currentCount, color);
            }
        }
    }

    cellExist(x, y) {
        return x >= 0 && x < this.matrix.length && y >= 0 && y < this.matrix[0].length
    }
}