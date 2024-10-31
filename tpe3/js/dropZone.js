class DropZone extends Tile {

    // Construye un objeto que representa visualmente la zona donde el jugador puede soltar una pieza que ingresa en el tablero de juego
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

    // Verifica si el jugador actual posiciona el mouse sobre determinada zona de colocación de piezas en el tablero 
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

    // Actualiza la posición de la pista sobre determinada zona de colocación de piezas en el tablero
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

    // Dibuja una zona de colocación de piezas en el tablero con su respectiva pista visual
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.drawImage(this.image, this.imageX, this.imageY, this.imageW, this.imageH);
    }

    // Carga la imagen que representa la pista visual de una zona de colocación de piezas en el tablero de juego
    initImage() {
        const image = new Image();
        image.src = './img/4enlinea/hint.png';
        return image;
    }

    // Devuelve la columna del tablero de juego a la cual pertenece determinada zona de colocación de piezas
    getColumn() {
        return this.column;
    }

    // Destaca una determinada zona de colocación de piezas en el tablero de juego
    highlight(on) {
        const color = on ? 'orange' : 'grey';
        this.setColor(color);
    }
}