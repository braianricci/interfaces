class Ficha {

    constructor(x, y, r, color, ctx) {
        this.r = r;
        this.x = x;
        this.y = y;
        this.color = color;
        this.ctx = ctx;
        this.dragged = false;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    update(deltaTime, mouseState) {
        if (mouseState.hasFicha && this.dragged) {
            this.setPos(mouseState.x, mouseState.y);
        }
    }

    drop() {
        this.dragged = false;
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    checkClick(mouseState) {
        const distance = Math.sqrt((mouseState.x - this.x) ** 2 + (mouseState.y - this.y) ** 2);
        this.dragged = distance <= this.r;
        mouseState.hasFicha = this.dragged;
        mouseState.ficha = this;
    }
}