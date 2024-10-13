"use strict";
// ----------------------------------------- PARTIAL RENDER ----------------------------------------- //
let main = document.getElementById("content");
let loader = document.getElementById("loader");

listenersLinks();
document.getElementById("home").click();

async function partialRender(event) {
    event.preventDefault();

    // Mostramos feedback visual de carga
    loader.classList.add("show-loader");
    animateLoader(5000);

    // Fetch .html
    let response = await fetch(this.href);
    let content = await response.text();

    // Cargamos el main con el contenido y ocultamos el loader
    await new Promise(resolve => setTimeout(resolve, 5000));
    main.innerHTML = content;
    loader.classList.remove("show-loader");

    // Registra nuevamente los eventos después de cargar el nuevo contenido
    listenersLinks(); // Asegúrate de que esta línea esté aquí

     // Vuelve a asignar eventos para los formularios
     assignFormToggleListeners();

     // Renderizar reCAPTCHA
     renderRecaptcha();
}
// -----------------------------------------                ----------------------------------------- //


function listenersLinks() {
    let links = document.getElementsByClassName("link");
    let cardToggles = document.getElementsByClassName("card-toggle");

    for (let item of links) {
        item.addEventListener("click", partialRender);
    }

    for (let item of cardToggles) {
        item.addEventListener("click", updateCard);
    }
}

async function updateCard(event) {
    event.preventDefault();

    let clicked = event.target;
    let card = clicked.closest('.card');
    let type = clicked.innerHTML;
    let name = clicked.closest('.card-blackout').querySelector('.card-title').innerHTML;
    let img = card.querySelector('.card-img').src;

    let url;

    switch (type) {
        case "Add to Cart":
            url = "goto.html";
            break;
        case "Remove":
        case "Go to Cart":
            url = "add.html";
            break;
    }

    // Fetch .html
    let response = await fetch(url);
    let content = await response.text();

    // Cargamos la card con la nueva
    card.innerHTML = content;
    card.querySelector('.card-title').innerHTML = name;
    card.querySelector('.card-img').src = img;

    listenersLinks();
}

function animateLoader(duration) {
    const bar = document.getElementById("loader-bar");
    bar.style.animationDuration = duration;
    bar.classList.add("loader-bar-animation");

    const element = document.getElementById("loader-number");
    const start = 0;
    const end = 100;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentNumber = Math.floor(progress * (end - start) + start);
        element.textContent = currentNumber;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);

    setTimeout(() => {
        bar.classList.remove("loader-bar-animation");
    }, duration + 600);
}

// Nueva función para asignar los eventos de alternar formularios
function assignFormToggleListeners() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Verificamos si existen los elementos antes de asignar eventos
    if (loginForm && registerForm) {
        // Almacenamos todos los botones para alternar formularios
        const toggleButtons = document.querySelectorAll('.toggle-form');

        toggleButtons.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Evitar que el botón recargue la página

                // Alternar visibilidad de los formularios
                if (loginForm.style.display === 'none' || loginForm.style.display === '') {
                    loginForm.style.display = 'block'; // Mostrar el formulario de inicio de sesión
                    registerForm.style.display = 'none'; // Ocultar el formulario de registro
                } else {
                    loginForm.style.display = 'none'; // Ocultar el formulario de inicio de sesión
                    registerForm.style.display = 'block'; // Mostrar el formulario de registro
                }
            });
        });
    } else {
        console.error("Los formularios no se encontraron.");
    }
}

// Nueva función para renderizar reCAPTCHA
function renderRecaptcha() {
    const recaptchaContainer = document.getElementById('recaptcha-container');
    if (recaptchaContainer) {
        grecaptcha.render(recaptchaContainer, {
            'sitekey': '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
        });
    } else {
        console.error("El contenedor de reCAPTCHA no se encontró.");
    }
}

