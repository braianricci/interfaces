class Game {

    constructor(ctx) {
        this.ctx = ctx;
        this.dragging = false;
    }

    drawAll(collection) {
    }

    dragStart() {
        alert(dragging);
        this.dragging = true;
    }

    dragEnd() {
        this.dragging = false;
    }

    setDragging(state) {
        this.dragging = state;
    }

    getDragging() {
        return this.dragging;
    }
}