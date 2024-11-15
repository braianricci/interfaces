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


/* ╔══════━━━━━━────── • 4 - masamigos • ──────━━━━━━══════╗ */

const imageContainers = document.querySelectorAll('.masamigos .left .img-sticky');
const contentItems = document.querySelectorAll('.masamigos .content-item');

// Ocultar todas las imágenes excepto la primera
imageContainers.forEach((img, index) => {
    if (index === 0) {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    } else {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
    }
    img.style.position = 'absolute';
    img.style.top = '50%';
    img.style.left = '50%';
    img.style.transform = 'translate(-50%, -50%)';
});

// Crear un observador para cada elemento de contenido
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Obtener el índice de la imagen correspondiente del atributo data-image
        const imageIndex = entry.target.getAttribute('data-image');

        if (entry.isIntersecting) {
            // Mostrar la imagen correspondiente con transición
            imageContainers.forEach((img, idx) => {
                if (idx === parseInt(imageIndex)) {
                    img.style.opacity = '1';
                    img.style.transform = 'translate(-50%, -50%) scale(1)';
                } else {
                    img.style.opacity = '0';
                    img.style.transform = 'translate(-50%, -50%) scale(0.9)';
                }
            });
        }
    });
}, {
    // Ajustar el threshold para determinar cuándo se considera visible el elemento
    threshold: 0.9
});

// Observar cada elemento de contenido
contentItems.forEach(item => {
    observer.observe(item);
});