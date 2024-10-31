class Tile {

    constructor(x, y, width, height, color, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.ctx = ctx;
        this.ficha = null;
        this.image = this.initImage();
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        /*         this.ctx.fillStyle = this.color;
                this.ctx.fillRect(this.x, this.y, this.width, this.height); */
    }

    initImage() {
        const image = new Image();
        image.src = './img/4enlinea/tile.png';
        return image;
    }

    setColor(color) {
        this.color = color;
    }

    setFicha(ficha) {
        this.ficha = ficha;
        ficha.fall(this.x + this.width / 2, this.y + this.height / 2)
    }

    getFicha() {
        return this.ficha;
    }
}