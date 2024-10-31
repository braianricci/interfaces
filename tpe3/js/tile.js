class Tile {

    // Construye un objeto que representa una casilla específica del tablero de juego y gestiona la lógica de su contenido
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

    // Dibuja una casilla específica del tablero de juego en el lienzo
    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        /*         this.ctx.fillStyle = this.color;
                this.ctx.fillRect(this.x, this.y, this.width, this.height); */
    }

    // Carga la imagen que representa una casilla del tablero de juego
    initImage() {
        const image = new Image();
        image.src = './img/4enlinea/tile.png';
        return image;
    }

    // Actualiza el color de una casilla específica del tablero de juego 
    setColor(color) {
        this.color = color;
    }

    // Recibe una pieza, que está ingresando a una columna determinada del tablero de juego, en una casilla específica de la misma
    setFicha(ficha) {
        this.ficha = ficha;
        ficha.fall(this.x + this.width / 2, this.y + this.height / 2)
    }

    // Devuelve el contenido de una casilla específica del tablero de juego
    getFicha() {
        return this.ficha;
    }
}