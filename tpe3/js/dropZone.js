class DropZone extends Tile {

    constructor(x, y, width, height, color, column, ctx) {
        super(x, y, width, height, color, ctx);
        this.column = column;
    }

    isHoveredWithFicha(mouse) {
        const compareX = mouse.x > this.x && mouse.x < this.x + 50;
        const compareY = mouse.y > this.y && mouse.y < this.y + 50;

        if (compareX && compareY) {
            this.highlight(true);
            return this;
        } else {
            return null;
        }
    }

    getColumn() {
        return this.column;
    }

    highlight(on) {
        const color = on ? 'yellow' : 'grey';
        this.setColor(color);
    }
}