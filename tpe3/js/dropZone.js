class DropZone extends Tile {

    constructor(x, y, width, height, color, column, ctx) {
        super(x, y, width, height, color, ctx);
        this.column = column;

        this.imageX = x + width / 2 - width / 3 / 2;
        this.imageY = y + height / 3;
        this.imageW = width / 3;
        this.imageH = height / 4;
        this.initialY = this.imageY;
        this.range = 2;
        this.direction = -1;
        this.speed = 10;
    }

    isHoveredWithFicha(mouse) {
        const compareX = mouse.x > this.x && mouse.x < this.x + this.width;
        const compareY = mouse.y > this.y && mouse.y < this.y + this.height;

        if (compareX && compareY) {
            this.highlight(true);
            this.range = 4;
            this.speed = 20;
            return this;
        } else {
            this.range = 2;
            this.speed = 10;
            return null;
        }
    }

    update(deltaTime) {
        this.imageY += this.direction * this.speed * (deltaTime / 1000);

        if (this.imageY > this.initialY + this.range) {
            this.imageY = this.initialY + this.range;
            this.direction = -1;
        } else if (this.imageY < this.initialY - this.range) {
            this.imageY = this.initialY - this.range;
            this.direction = 1;
        }
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        this.ctx.drawImage(this.image, this.imageX, this.imageY, this.imageW, this.imageH);
    }

    initImage() {
        const image = new Image();
        image.src = './img/4enlinea/hint.png';
        return image;
    }

    getColumn() {
        return this.column;
    }

    highlight(on) {
        const color = on ? 'orange' : 'grey';
        this.setColor(color);
    }
}