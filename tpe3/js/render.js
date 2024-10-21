"use strict";

listenersLinks();
document.getElementById("goto").click();

async function partialRender(event) {

    const main = document.getElementById("content");
    const duration = 1000;
    const delay = event.target.classList.contains("await-animation") ? 2000 : 0;
    const url = event.target.getAttribute("data-url") || event.target.getAttribute("href");

    event.preventDefault();

    setTimeout(async () => {
        const response = await fetch(url);
        const content = await response.text();

        animateLoader(duration);
        main.innerHTML = content;

        switch (url) {
            case "home.html":
                startCarousel(1);
                fillHome();
                break;
            case "form.html":
                listenersForm();
                renderRecaptcha();
                break;
        }

        listenersLinks();
    }, delay);
}

function listenersLinks() {

    let links = document.getElementsByClassName("link");
    let cardToggles = document.getElementsByClassName("card-toggle");
    let bannerInputs = document.getElementsByClassName("carousel-radio");
    let playButton = document.getElementsByClassName("play-game-button");
    let formButtons = document.getElementsByClassName("await-animation");

    for (let item of links) {
        item.addEventListener("click", partialRender);
    }
    for (let item of cardToggles) {
        item.addEventListener("click", updateCard);
    }
    for (let item of bannerInputs) {
        item.addEventListener("change", moveCarousel)
    }
    for (let item of playButton) {
        item.addEventListener("click", playGame);
    }
    for (let item of formButtons) {
        item.addEventListener("click", animateFormButtons);
    }
}

async function updateCard(event) {
    event.preventDefault();

    let clicked = event.target;
    let card = clicked.closest('.card');
    let type = clicked.innerHTML;
    let name = clicked.closest('.card-blackout').querySelector('.card-title').innerHTML;
    let img = card.querySelector('.card-img').src;
    let price = card.querySelector('.card-price').innerHTML;

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
    card.querySelector('.card-price').innerHTML = price;

    listenersLinks();
}

function animateLoader(duration) {
    const bar = document.getElementById("loader-bar");
    const loader = document.getElementById("loader");
    const body = document.getElementsByTagName("body");

    window.scrollTo(0, 0);
    body[0].style.overflowY = "hidden";
    bar.classList.add("loader-bar-animation");
    loader.classList.add("show-loader");
    bar.style.animationDuration = duration;

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
        body[0].style.overflowY = "visible";
        bar.classList.remove("loader-bar-animation");
        loader.classList.remove("show-loader");
    }, duration + 600);
}

function listenersForm() {
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

function animateFormButtons(event) {

    const tickMark = '<svg width="48" height="35" viewBox="0 0 58 45" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" fill-rule="nonzero" d="M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65"></path></svg>';

    event.target.innerHTML = tickMark;
    event.target.classList.add("submit-btn-focus");
}

function listenerCards() {
    let cards = document.getElementsByClassName("card");

    for (let card of cards) {
        let blackout = card.children[1];

        card.addEventListener("mouseenter", () => {
            blackout.classList.remove('card-blackout-hidden');
            blackout.classList.add('card-blackout-visible');
        });

        card.addEventListener("mouseleave", () => {
            blackout.classList.add('card-blackout-hidden');
            blackout.classList.remove('card-blackout-visible');
        })
    }
}

/* function operateSidebar() {
    const sidebar = document.getElementById("sidebar");

    if (sidebarClosed) {
        sidebar.style.width = "250px";
        sidebarClosed = false;
    } else {
        sidebar.style.width = "0px";
        sidebarClosed = true;
    } 
}*/

/* function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
    sidebarClosed = true;
}

function toggleProd() {
    document
        .getElementById("sidebar-sub")
        .classList.toggle("sidebar-sub-display");
} */

async function startCarousel(position) {

    const inputs = document.getElementById("carousel-inputs");
    const input = inputs.querySelector(`input[value="${position}"]`);

    if (input) {

        const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });

        input.dispatchEvent(event);
    }

    position = (position % 4) + 1;
    setTimeout(() => startCarousel(position), 5000);
}

function moveCarousel(event) {

    const carousel = document.getElementById("carousel");
    const value = event.target.value;
    const item = document.getElementById("carousel-" + value);

    item.classList.add("carousel-animation");
    setTimeout(() => {
        item.classList.remove("carousel-animation");
    }, 2000);


    carousel.style.setProperty("--position", value);
}

async function fillHome() {

    let games = document.getElementById("games");

    let sectionResponse = await fetch("cardsection.html");
    let cardSectCode = await sectionResponse.text();

    games.innerHTML = cardSectCode.repeat(6);

    let titleElements = games.querySelectorAll('.card-section-title');
    let rowsEl = games.querySelectorAll('.card-row');

    const titles = ["Recomendados", "En tu libreria", "Accion", "Carreras", "Aventura", "Deportes"];

    let cardResponse = await fetch("add.html");
    let card = await cardResponse.text();

    for (let i = 0; i < titles.length; i++) {
        let row = "";

        for (let j = 0; j < titles.length; j++) {
            row += '<div class="card">' + card + '</div>';
        }
        titleElements[i].innerHTML = titles[i]
        rowsEl[i].innerHTML = row;
    }

    let imgElements = document.getElementsByClassName("card-img");
    let cardTitleElements = document.getElementsByClassName("card-title");
    let cardPriceElements = document.getElementsByClassName("card-price");

    let response = await fetch("img/games/paths.json");
    const paths = await response.json();


    for (let i = 0; i < imgElements.length; i++) {

        imgElements[i].src = paths.images[i]['path'];
        cardTitleElements[i].innerHTML = paths.images[i]['name'];
        cardPriceElements[i].innerHTML = paths.images[i]['price'];
        if (paths.images[i]['price'] == "Free!") {
            let card = imgElements[i].closest('.card');
            makeFree(card);
        }
    }

    listenersLinks();
}

async function makeFree(card) {

    let title = card.querySelector('.card-title').innerHTML;
    let img = card.querySelector('.card-img').src;

    let response = await fetch("play.html");
    let code = await response.text();

    card.innerHTML = code;

    card.querySelector('.card-title').innerHTML = title;
    card.querySelector('.card-img').src = img;

    listenersLinks();
}

// Nueva función para mostrar y ocultar el sidebar
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

menuBtn.addEventListener('click', function () {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Cerrar el menú si se hace clic en el overlay
overlay.addEventListener('click', function () {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});