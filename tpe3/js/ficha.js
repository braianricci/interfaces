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

    letGo(dropZone) {
        this.dragged = false;
        if (dropZone != null) {
            this.fall(dropZone.getCenter());
        } else {
            this.resetPos();
        }
    }

    fall(dropZonePos) {
        this.x = dropZonePos.x;
        this.y = dropZonePos.y + (this.config['tile-height'] + this.config['tile-spacing']) * this.config['board-rows']
    }

    resetPos() {
        this.x = this.restingX;
        this.y = this.restingY;
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