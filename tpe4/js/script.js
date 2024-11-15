'use strict';

start()

function start() {

    const sections = document.getElementsByClassName('section');
    const debug = document.getElementById('debugTab');
    let positions = [];

    for (let section of sections) {
        const rect = section.getBoundingClientRect();
        const yPosition = rect.top + window.scrollY;
        positions.push(yPosition);
    }
    console.log(positions)

    window.addEventListener('scroll', () => {
        updateOffset(positions, debug);
    });
}

function updateOffset(positions, debug) {

    let debugInfo = window.scrollY;
    console.log(window.scrollY);

    debug.innerHTML = '&emsp;Current scroll y value: ' + debugInfo;
}
