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
        this.falling = false;
        this.image = this.initImage();
        this.speed = 0;
        this.acc = 555;
        this.tileY = 0;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        if (this.dragged || !this.selectable) {
            this.ctx.drawImage(this.image, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
            /*             this.ctx.beginPath();
                        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                        this.ctx.fill();
                        this.ctx.closePath(); */
        } else {
            this.ctx.drawImage(this.image, this.x - this.r, this.y - this.r, this.r * 2, this.r);
            /*             this.ctx.beginPath();
                        this.ctx.ellipse(this.x, this.y, this.r, this.r / 2, 0, 0, 2 * Math.PI);
                        this.ctx.fill();
                        this.ctx.stroke(); */
        }
    }

    update(deltaTime, mouse) {
        if (this.dragged) {
            this.setPos(mouse.x, mouse.y);
        }
        if (this.falling) {
            this.speed += this.acc * (deltaTime / 1000);
            this.y += this.speed * (deltaTime / 1000);
            this.setPos(this.x, this.y);
            if (this.y >= this.tileY) {
                this.setPos(this.x, this.tileY);
                this.falling = false;
            }
        }
    }

    initImage() {
        const image = new Image();
        if (this.color == 'red') {
            image.src = this.config['player1-img'];
        } else {
            image.src = this.config['player2-img'];
        }

        return image;
    }

    fall(x, y) {
        this.falling = true;
        this.x = x;
        this.tileY = y;
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