class Board {

    constructor(rows, columns, ctx) {
        this.rows = rows;
        this.columns = columns;
        this.matrix = Array.from({ length: rows }, () => Array(columns));
        this.dropZones = [];
        this.ctx = ctx;
        this.fill();
    }

    draw() {
        for (let hint of this.dropZones) {
            hint.draw()
        }

        for (let row of this.matrix) {
            for (let tile of row) {
                tile.draw();
            }
        }
    }

    update(deltaTime, mouseState) {
        this.checkDropZones(mouseState);
    }

    checkDropZones(mouseState) {
        for (let hint of this.dropZones) {
            hint.isHoveredWithFicha(mouseState);
        }
    }

    fill() {
        let posX = 0;
        let posY = 0;

        for (let x = 0; x < this.columns; x++) {

            const hint = new Hint(posX, posY, 50, 50, 'grey', this.ctx);
            this.dropZones.push(hint);
            posX += 52;
        }
        posX = 0
        posY = 52;

        for (let x = 0; x < this.columns; x++) {

            for (let y = 0; y < this.rows; y++) {

                const tile = new Tile(posX, posY, 50, 50, 'blue', this.ctx);
                this.matrix[x][y] = tile;
                posY += 52;
            }
            posY = 52;
            posX += 52;
        }
        console.log('done filling board');
    }
}