"use strict";

/// ----------------------------------------- PARTIAL RENDER ----------------------------------------- ///

let main = document.getElementById("content");
let loader = document.getElementById("loader");

let btnOpen = document.getElementById("btn-open");
let btnClose = document.getElementById("btn-close");
let btnProd = document.getElementById("btn-prod");

let sidebarClosed = true;
btnOpen.addEventListener("click", OperateSidebar);
btnClose.addEventListener("click", CloseSidebar);
btnProd.addEventListener("click", ToggleProd);

ListenersLinks();
document.getElementById("home").click();

async function partialRender(event) {

    event.preventDefault();

    //mostramos feedback visual de carga
    loader.classList.add("show-loader");
    animateLoader(5000);

    //fetch .html
    let response = await fetch(this.href);
    let content = await response.text();


    //cargamos el main con el contenido y ocultamos el loader
    await new Promise(resolve => setTimeout(resolve, 5000));
    main.innerHTML = content;
    loader.classList.remove("show-loader");
    main.innerHTML = content;

    ListenerCards();

    //agregamos EventListeners a los nuevos elementos con las siguientes funciones
    //ListenersLinks();

    //this.href en chrome devuelve una url completa, no la direccion relativa, por eso usamos this.getAttribute("href") para comparar
    /*switch (this.getAttribute("href")) {
      case "productos.html":
        if (this.id == "index") scrollTop = 0;
        break;
      case "mochilas.html":
      case "mates.html":
      case "gorras.html":
      case "rinioneras.html":
      case "cintos.html":
      case "bolsos.html":
        ListenersProducts();
        break;
      case "contacto.html":
        ListenersCaptcha();
        break;
      case "carrito.html":
        ListenersCart();
    }*/
}

function ListenersLinks() {
    let links = document.getElementsByClassName("link");

    listenersLinks();
}

function listenersLinks() {
    let links = document.getElementsByClassName("link");
    let cardToggles = document.getElementsByClassName("card-toggle")

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
for (let item of links) {
    item.addEventListener("click", PartialRender);
}
}

function ListenerCards() {
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

function OperateSidebar() {
    const sidebar = document.getElementById("sidebar");

    if (sidebarClosed) {
        sidebar.style.width = "250px";
        sidebarClosed = false;
    } else {
        sidebar.style.width = "0px";
        sidebarClosed = true;
    }
}

function CloseSidebar() {
    document.getElementById("sidebar").style.width = "0";
    sidebarClosed = true;
}

function ToggleProd() {
    document
        .getElementById("sidebar-sub")
        .classList.toggle("sidebar-sub-display");
}