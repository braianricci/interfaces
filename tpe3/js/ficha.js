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
        if (this.dragged) {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
            console.log('here')
        } else {
            this.ctx.beginPath();
            this.ctx.ellipse(this.x, this.y, this.r, this.r / 2, 0, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    update(deltaTime) {
        if (this.dragged) {
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

    checkClick(mouse) {
        const distance = Math.sqrt((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2);
        this.dragged = distance <= this.r;
    }

    getPos() {
        return { x: this.x, y: this.y }
    }
}