class Ficha {

    constructor(x, y, config, color, ctx) {
        this.config = config;
        this.r = config["ficha-radio"];
        this.restingX = x;
        this.restingY = y;
        this.x = this.restingX;
        this.y = this.restingY;
        this.color = color;
        this.ctx = ctx;
        this.selectable = true;
        this.dragged = false;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        if (this.dragged || !this.selectable) {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
        } else {
            this.ctx.beginPath();
            this.ctx.ellipse(this.x, this.y, this.r, this.r / 2, 0, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    update(deltaTime, mouse) {
        if (this.dragged) {
            this.setPos(mouse.x, mouse.y);
        }
    }

    fall(x, y) {
        this.x = x;
        this.y = y;
    }

    resetPos() {
        this.x = this.restingX;
        this.y = this.restingY;
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    checkClick(mouse) {
        const distance = Math.sqrt((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2);
        this.setDragState(distance <= this.r && this.selectable);
        return this.dragged ? this : null;
    }

    getPos() {
        return { x: this.x, y: this.y }
    }

    setDragState(state) {
        this.dragged = state;
    }

    discard() {
        this.selectable = false;
    }

    getColor() {
        return this.color;
    }
}