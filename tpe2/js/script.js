"use strict";

/// ----------------------------------------- PARTIAL RENDER ----------------------------------------- ///

let main = document.getElementById("content");
let loader = document.getElementById("loader");

ListenersLinks();
document.getElementById("home").click();

async function PartialRender(event) {
    event.preventDefault();
    let scrollTop = main.offsetTop; //distancia entre "main" y el tope de la pagina

    //vaciamos el main y mostramos feedback visual de carga
    main.replaceChildren();
    loader.classList.add("show-loader");

    //fetch .html
    let response = await fetch(this.href);
    let content = await response.text();

    //cargamos el main con el contenido y ocultamos el loader
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

  for (let item of links) {
    item.addEventListener("click", PartialRender);
  }
}

function ListenerCards() {
    let cards = document.getElementsByClassName("card");

    for(let card of cards) {
        let blackout = card.querySelector(".card-blackout-container");

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