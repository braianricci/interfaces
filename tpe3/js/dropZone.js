class DropZone extends Tile {

    constructor(x, y, width, height, color, column, ctx) {
        super(x, y, width, height, color, ctx);
        this.column = column;
    }

    isHoveredWithFicha(mouse) {
        const compareX = mouse.x > this.x && mouse.x < this.x + 50;
        const compareY = mouse.y > this.y && mouse.y < this.y + 50;

        if (compareX && compareY) {
            this.setColor('yellow');
            return this;
        } else {
            this.setColor('grey');
            return null;
        }
    }

    getCenter() {
        return { x: this.x + this.width / 2, y: this.y + this.height / 2 }
    }
}