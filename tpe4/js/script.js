'use strict';

start()

/*inicializa las secciones calculando su yTop y yBottom
y agrega eventListeners, se ejecuta una unica vez*/
function start() {

    //parallax vertical
    const sections = document.querySelectorAll('.section');
    const debug = document.getElementById('debugTab');
    let positions = [];

    sections.forEach((section, id) => {
        const rect = section.getBoundingClientRect();
        const yTop = rect.top;
        const yBottom = rect.bottom;
        id += 1
        positions.push({ id, yTop, yBottom });
    });

    window.addEventListener('scroll', () => {
        updateOffset(positions, debug);
    });

    //parallax mouse
    const descarga = document.getElementById('section3');
    const boys = descarga.getElementsByTagName('img')[0];

    descarga.addEventListener('mousemove', (event) => {
        mouseParallax(event, descarga, boys);
    });

}

/*al actualizarse la posicion de scroll, chequea cuales 
sections son visibles y llama animaciones relacionadas al scroll*/
function updateOffset(positions, debug) {

    let wTop = window.scrollY;
    let wBottom = wTop + window.visualViewport.height;
    let shownSections = [];

    for (let i = 0; i < positions.length; i++) {
        if (positions[i].yTop < wBottom && positions[i].yBottom > wTop) {
            shownSections.push(positions[i]);
        }
    }

    //animations:
    headerControl(wTop);
    verticalParallax(shownSections, wBottom);

    //debug tab
    const ids = shownSections.map(obj => obj.id);
    debug.innerHTML = '&emsp;Viewport top y value: ' + wTop +
        '<br>&emsp;Viewport height: ' + window.visualViewport.height +
        '<br>&emsp;Viewport bottom: ' + wBottom +
        '<br>&emsp;Current section(s): ' + ids;
}