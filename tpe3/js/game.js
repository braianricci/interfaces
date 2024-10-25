class Game {

    constructor(ctx) {
        this.ctx = ctx;
        this.dragging = false;
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