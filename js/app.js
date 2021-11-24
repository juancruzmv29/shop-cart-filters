import scrollBtn from "./funciones/btn_scroll.js";
import contactForm from "./funciones/contacto_form.js";
import hamburger from "./funciones/hamburger.js";
import navegador from "./funciones/navegador.js";
import registroForm from "./funciones/registro_form.js";
import usuarioForm from "./funciones/usuario_form.js";




document.addEventListener("DOMContentLoaded", (e) => {

    hamburger(".hamburger", ".navegacion-menu", ".navegacion-link a");

    navegador(".navegador", ".btn-search i");

    contactForm();

    fetchData();

    // Si hay algo en llocalStorage
    if(localStorage.getItem("carrito")) {

        // Parseamos lo que haya en carrito
        carrito = JSON.parse(localStorage.getItem("carrito", carrito))

        // Y mandamos a pintar el carrito que teniamos 
    }

    usuarioForm();

    registroForm();

    scrollBtn(".btn-subir");

});


// Funciones para consultar los productos
// Contantes
const $templateCard = document.querySelector(".template-card").content,
    $items = document.querySelector(".items"),
    $cards = document.getElementById("cards"),
    $fragment = document.createDocumentFragment();

let carrito = {};

// Funcion para consultar los productos
const fetchData = async () => {
    
    try {
        const respuesta = await fetch("celulares.json"),
            json = await respuesta.json();
    
        console.log(json);
        pintarCards(json)
    } catch (error) {
        console.log(error);
    }
}

// Evento para agregar un producto al carrito
$cards.addEventListener("click", e => {
    agregarCarrito(e);
})

// Evento para hacer una accion dentro del carrito de los items comprados
/* $items.addEventListener("click", e => {
    btnAccion(e);
}) */

// Funcion para agregar al carrito
const agregarCarrito = e => {

    if(e.target.classList.contains("btn-dark")) {
        setCarrito(e.target.parentElement)
    }

    e.stopPropagation();
}


// Funcion para pintar los cards
const pintarCards = (json) => {
    console.log(json)
    json.celulares.forEach(producto => {
        let $clone = $templateCard.cloneNode(true)
        $clone.querySelector(".img-card").setAttribute("src", producto.img);
        $clone.querySelector(".body-marca").textContent = producto.marca;
        $clone.querySelector(".body-modelo").textContent = producto.modelo;
        $clone.querySelector(".body-precio").textContent += producto.precio;

        $fragment.appendChild($clone)
    })
    $cards.appendChild($fragment);
}


// Funcion para agregar todo el elemento padre al carrito
const setCarrito = objeto => {

    // Creamos un producto al cual vamos a ppintar al carrito y extraemos sus propiedades
    const producto = {
        id: objeto.querySelector(".btn-dark").dataset.id,
        marca: objeto.querySelector(".body-marca").textContent,
        modelo: objeto.querySelector(".body-modelo").textContent,
        precio: objeto.querySelector(".body-precio").textContent,
        cantidad: 1
    }

    // Si ya se repite el id del producto en el carrito
    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    // Al carrito le añadimos el producto que creamos arriba
    carrito[producto.id] = {...producto};

    // Por último llamamos a la funcion pintarCarrito
    pintarCarrito()

}

// Funcion para pintar el carrito
const pintarCarrito = () => {

    // Items va a comenzar en 0
    $items.innerHTML = "";

    Object.values(carrito).forEach(producto => {

        let $clone = $templateCarrito.cloneNode(true);
        $clone.querySelector(".marca-producto").textContent = producto.marca;
        $clone.querySelector(".modelo-producto").textContent = producto.modelo;
        $clone.querySelector(".cantidad-producto").textContent = producto.cantidad;
        $clone.querySelector(".btn-sumar").dataset.id = producto.id;
        $clone.querySelector(".btn-restar").dataset.id = producto.id;
        $clone.querySelector(".precio-producto").textContent = producto.precio * producto.cantidad;

        $fragment.appendChild($clone)
    });

    $items.appendChild($fragment);

    // Agregamos los items al footer en donde despues vamos a hacer las acciones de sumar o restar la cantidad
    pintarFooter();

    // Invocamos a localStorage asi agregamos los items al storage
    localStorage.setItem("carrito", JSON.stringify(carrito));

}


