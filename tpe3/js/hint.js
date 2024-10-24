class Hint extends Tile {
    isHoveredWithFicha(mouseState) {
        if (mouseState.x > this.x && mouseState.x < this.x + 50 && mouseState.hasFicha) {
            if (mouseState.y > this.y && mouseState.y < this.y + 50) {
                this.setColor('yellow');
            }
        }
    }
}