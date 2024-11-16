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
    console.log('Section positions: ' + positions)

    window.addEventListener('scroll', (event) => {
        updateOffset(positions, debug, event);
    });
}

function updateOffset(positions, debug, event) {

    let y = window.scrollY;
    let shownSection = 1;

    for (let i = 1; i < positions.length; i++) {
        if (y + window.visualViewport.height > positions[i]) {
            shownSection++;
        }
    }
    const bottom = y + window.visualViewport.height;

    switch (shownSection) {
        case 0: case 1:
            break;
        case 2:
            animate(shownSection)
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            animate(shownSection)
            break;
        case 6:
            animate(shownSection)
            break;
        case 7:
            break;
        case 8:
            break;
        default:
            console.log('section not found')
    }

    //debug tab
    debug.innerHTML = '&emsp;Viewport top y value: ' + y +
        '<br>&emsp;Viewport height: ' + window.visualViewport.height +
        '<br>&emsp;Viewport bottom: ' + bottom +
        '<br>&emsp;Current section: ' + shownSection;
}

/* ╔══════━━━━━━────── • 2 - masdivertida • ──────━━━━━━══════╗ */

function animate(id) {
    const windowY = window.scrollY;
    const section = document.getElementById('section' + id);
    const prevId = id - 1;
    const prev = document.getElementById('section' + prevId);
    const sectionTop = section.getBoundingClientRect().top;
    const layers = [
        ...section.getElementsByClassName('parallax'),
        ...prev.getElementsByClassName('parallax')
    ];

    for (let i = 0; i < layers.length; i++) {
        let layer = layers[i];
        let speed = layer.getAttribute('data-speed');
        let yPos = -(Math.abs(windowY, sectionTop) * speed / 100);

        layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
    }
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
        const moveAmount = 40;
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