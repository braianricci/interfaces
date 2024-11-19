/*controla tamaño del header y su logo*/
function headerControl(wTop) {
    const header = document.getElementById('header');
    const logo = header.getElementsByTagName('img')[0];
    const startScroll = 2000;
    const maxScroll = 900;
    const fullLogoHeight = 360;
    const minLogoHeight = 60;
    const fullHeaderHeight = 103;
    const minHeaderHeight = 60;

    if (wTop > startScroll) {
        const clampedScroll = Math.min(wTop - startScroll, maxScroll);
        const newLogoHeight = fullLogoHeight - ((fullLogoHeight - minLogoHeight) * clampedScroll) / maxScroll;
        const newHeaderHeight = fullHeaderHeight - ((fullHeaderHeight - minHeaderHeight) * clampedScroll) / maxScroll;

        logo.style.height = newLogoHeight + 'px';
        header.style.height = newHeaderHeight + 'px';
    }
}

function heroParallax(wTop) {
    const hero = document.getElementsByClassName('hero-parallax');
    const start = 0;
    const end = 2000;

    const progress = Math.min(Math.max((wTop - start) / (end - start), 0), 1);

    for (const element of hero) {
        const animationName = getComputedStyle(element).animationName;
        console.log(animationName)

        element.style.animation = `${animationName} 1s linear 0s 1 normal both paused`;
        element.style.animationDelay = `-${progress}s`;
    }
}

/*recibe las secciones que se estan mostrando
 busca en cada una los elementos con parallax vertical 
 y los anima usando section.yTop como referencia */
function verticalParallax(sections, wBottom) {
    for (const section of sections) {
        const current = document.getElementById('section' + section.id);
        const layers = current.getElementsByClassName('parallax');

        for (const layer of layers) {
            let speed = layer.getAttribute('data-speed');
            let yPos = -((wBottom - section.yTop) * speed / 100);

            layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
        }
    }
}

/*anima las cards de la seccion 2 en caso de que entren en pantalla*/
function cardsUp(sectionTop, wBottom) {
    const cards = document.getElementsByClassName('card');

    if (wBottom > sectionTop + 150) {
        for (const card of cards) {
            card.classList.add('card-up');
        }
    } else {
        for (const card of cards) {
            card.classList.remove('card-up');
        }
    }
}

/*mueve la imagen de los personajes de la seccion 3 en la direccion contraria al mouse*/
function mouseParallax(event, section, image) {

    const { left, top, width, height } = section.getBoundingClientRect();
    const offsetX = ((event.clientX - left) / width) * 2 - 1;
    const offsetY = ((event.clientY - top) / height) * 2 - 1;

    // Ajustar la cantidad de movimiento
    const moveAmount = 60;
    image.style.transform = `translate(${-offsetX * moveAmount}px, ${-offsetY * moveAmount}px) scale(1.2)`;
}

/*muestra en la seccion 4 un personaje dependiendo del texto*/
function stickyScroll() {
    const characters = document.getElementsByClassName('character');
    const items = document.getElementsByClassName('item');
    const stickyBottom = document.getElementsByClassName('left')[0].getBoundingClientRect().bottom;
    let shown = 0;

    for (const item of items) {
        const itemTop = item.getBoundingClientRect().top;
        shown = itemTop < stickyBottom ? item.getAttribute('data-image') : shown;
    }

    Array.from(characters).forEach(char => char.classList.remove('active-char'));
    characters[shown].classList.add('active-char');
}

/* const imageContainers = document.querySelectorAll('.masamigos .left .img-sticky');
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
}); */