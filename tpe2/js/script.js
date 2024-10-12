"use strict";

/// ----------------------------------------- PARTIAL RENDER ----------------------------------------- ///

let main = document.getElementById("content");
let loader = document.getElementById("loader");

listenersLinks();
document.getElementById("home").click();

async function partialRender(event) {
    event.preventDefault();
    let scrollTop = main.offsetTop; //distancia entre "main" y el tope de la pagina

    //vaciamos el main y mostramos feedback visual de carga
    main.replaceChildren();
    loader.classList.add("show-loader");

    return;
    //fetch .html
    let response = await fetch(this.href);
    let content = await response.text();

    //cargamos el main con el contenido y ocultamos el loader
    loader.classList.remove("show-loader");
    main.innerHTML = content;

    listenersLinks();
}

function listenersLinks() {
  let links = document.getElementsByClassName("link");
  let cardToggles= document.getElementsByClassName("card-toggle")

  for (let item of links) {
    item.addEventListener("click", partialRender);
  }

  for(let item of cardToggles) {
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