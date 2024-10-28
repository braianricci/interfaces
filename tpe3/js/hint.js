class Hint extends Tile {

    isHoveredWithFicha(mouseState) {
        const compareX = mouseState.x > this.x && mouseState.x < this.x + 50;
        const compareY = mouseState.y > this.y && mouseState.y < this.y + 50;

        if (compareX && compareY && mouseState.hasFicha) {
            this.setColor('yellow');
            mouseState.dropZone = this;
            return true;
        } else {
            this.setColor('grey');
            mouseState.dropZone = null;
            return false;
        }
    }

    getCenter() {
        return { x: this.x + this.width / 2, y: this.y + this.height / 2 }
    }
}