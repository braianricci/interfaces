"use strict";

let main = document.getElementById("content");
let loader = document.getElementById("loader");

listenersLinks();

document.getElementById("home").click();

async function partialRender(event) {

    event.preventDefault();
    const duration = 2000;
    //mostramos feedback visual de carga
    loader.classList.add("show-loader");
    animateLoader(duration);

    //fetch .html
    let response = await fetch(this.href);
    let content = await response.text();


    //cargamos el main con el contenido y ocultamos el loader
    await new Promise(resolve => setTimeout(resolve, duration));
    main.innerHTML = content;
    loader.classList.remove("show-loader");


    listenersLinks();

    switch (this.getAttribute("href")) {
        case "home.html":
            startCarousel(1);
            break;
    }
}

function listenersLinks() {
    let links = document.getElementsByClassName("link");
    let cardToggles = document.getElementsByClassName("card-toggle");
    let bannerInputs = document.getElementsByClassName("carousel-radio");

    for (let item of links) {
        item.addEventListener("click", partialRender);
    }

    for (let item of cardToggles) {
        item.addEventListener("click", updateCard);
    }

    for (let item of bannerInputs) {
        item.addEventListener("change", moveCarousel)
    }
}

async function updateCard(event) {

    event.preventDefault();

    let clicked = event.target;
    let card = clicked.closest('.card')
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
    }

    //fetch .html
    let response = await fetch(url);
    let content = await response.text();

    //cargamos la card con la nueva
    card.innerHTML = content;
    card.querySelector('.card-title').innerHTML = name;
    card.querySelector('.card-img').src = img;

    listenersLinks();
}

function animateLoader(duration) {

    const bar = document.getElementById("loader-bar");
    bar.classList.add("loader-bar-animation");
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
        bar.classList.remove("loader-bar-animation");
    }, duration + 600);
}

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