class Ficha {

    constructor(x, y, r, ctx) {
        this.r = r;
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    isClicked(mouseX, mouseY) {
        const distance = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
        return distance <= this.r;
    }
}