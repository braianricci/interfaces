class Hint extends Tile {

    isHoveredWithFicha(mouseState) {
        const compareX = mouseState.x > this.x && mouseState.x < this.x + 50;
        const compareY = mouseState.y > this.y && mouseState.y < this.y + 50;

        if (compareX && compareY && mouseState.hasFicha) {
            this.setColor('yellow');
        } else {
            this.setColor('grey');
        }
    }
}