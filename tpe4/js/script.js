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

/* ╔══════━━━━━━────── • 3 - descarga • ──────━━━━━━══════╗ */

const sectionDescarga = document.querySelector('.section.descarga');
const imagen = document.querySelector('.boys');

if (sectionDescarga && imagen) {
    sectionDescarga.addEventListener('mousemove', (event) => {
        const { left, top, width, height } = sectionDescarga.getBoundingClientRect();
        const offsetX = ((event.clientX - left) / width) * 2 - 1;
        const offsetY = ((event.clientY - top) / height) * 2 - 1;

        // Ajustar la cantidad de movimiento
        const moveAmount = 30;
        imagen.style.transform = `translate(${-offsetX * moveAmount}px, ${-offsetY * moveAmount}px) scale(1.1)`;
    });
}