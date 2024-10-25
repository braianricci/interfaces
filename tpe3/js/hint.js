class Hint extends Tile {

    isHoveredWithFicha(mouseState) {
        const mouseX = mouseState.x > this.x && mouseState.x < this.x + 50;
        const mouseY = mouseState.y > this.y && mouseState.y < this.y + 50;

        if (mouseX && mouseY && mouseState.hasFicha) {
            this.setColor('yellow');
        } else {
            this.setColor('grey');
        }
    }
}