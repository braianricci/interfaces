class Graphics {

    constructor(config, ctx) {
        this.config = config;
        this.ctx = ctx;
        this.background = this.initBackground();
        this.bart = this.initBart();
        this.milhouse = this.initMilhouse();
    }

    initBackground() {
        const background = new Image();
        background.src = './img/4enlinea/background.png';
        return background;
    }

    initBart() {
        const bart = new Image();
        bart.src = './img/4enlinea/bart.png';
        return bart;
    }

    initMilhouse() {
        const milhouse = new Image();
        milhouse.src = './img/4enlinea/milhouse.png';
        return milhouse;
    }

    draw() {
        this.ctx.drawImage(this.background, 0, 0, this.config['canvas-width'], this.config['canvas-height']);
        this.ctx.drawImage(this.bart, 250, 46, 55, 134);
        this.ctx.drawImage(this.milhouse, 10, 44, 63, 136);
    }
}