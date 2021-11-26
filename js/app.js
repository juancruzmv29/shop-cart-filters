import btnCarrito from "./funciones/btn_carrito.js";
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
        pintarCarrito();
    }

    usuarioForm();

    registroForm();

    scrollBtn("#btn-subir");

    btnCarrito(".btn-carrito i", ".carrito" ,".btn-cerrar-carrito i")

});


// Funciones para consultar los productos
// Contantes
const $templateCard = document.querySelector(".template-card").content,
    $templateCarrito = document.getElementById("template-carrito").content,
    $templateFooter = document.getElementById("template-footer").content,
    $items = document.getElementById("items"),
    $cards = document.getElementById("cards"),
    $footerCarrito = document.getElementById("footer-carrito"),
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
$items.addEventListener("click", e => {
    btnAccion(e);
})

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
    json.forEach((producto) => {
        let $clone = $templateCard.cloneNode(true);
        $clone.querySelector("img").setAttribute("src", producto.img);
        $clone.querySelector("h3").textContent = producto.marca;
        $clone.querySelector("h4").textContent = producto.modelo;
        $clone.querySelector("span").textContent = producto.precio;
        $clone.querySelector("button").dataset.id = producto.id;

        $fragment.appendChild($clone)
    })
    $cards.appendChild($fragment);
}


// Funcion para agregar todo el elemento padre al carrito
const setCarrito = objeto => {

    // Creamos un producto al cual vamos a ppintar al carrito y extraemos sus propiedades
    const producto = {
        id: objeto.querySelector(".btn-dark").dataset.id,
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
    pintarCarrito();

}

// Funcion para pintar el carrito
const pintarCarrito = () => {

    // Items va a comenzar en 0
    $items.innerHTML = "";

    Object.values(carrito).forEach(producto => {
        $templateCarrito.querySelector(".modelo-producto").textContent = producto.modelo;
        $templateCarrito.querySelector(".cantidad-producto").textContent = producto.cantidad;
        $templateCarrito.querySelector(".btn-sumar").dataset.id = producto.id;
        $templateCarrito.querySelector(".btn-restar").dataset.id = producto.id;
        $templateCarrito.querySelector(".precio-producto").textContent = producto.precio * producto.cantidad;

        let $clone = $templateCarrito.cloneNode(true)

        $fragment.appendChild($clone)
    });

    $items.appendChild($fragment);

    // Agregamos los items al footer en donde despues vamos a hacer las acciones de sumar o restar la cantidad
    pintarFooter();

    // Invocamos a localStorage asi agregamos los items al storage
    localStorage.setItem("carrito", JSON.stringify(carrito));

}

// Funcion para pintar el footer
const pintarFooter = () => {

    // El template de footer va a empezar vacío
    $footerCarrito.innerHTML = "";

    if(Object.keys(carrito).length === 0) {
        $footerCarrito.innerHTML = `
            <th scope="row" class="carrito-vacio">Carrito vacío - comience a comprar!</th>
        `;
        return; // Y si no hay nada retornamos
    }

    // Creamos variables para la cantidad y el precio
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0);
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + precio * cantidad, 0)

    console.log(carrito)
    // Creamos el clon para el templateFooter
    let $clone = $templateFooter.cloneNode(true);
    $clone.querySelector("td").textContent = nCantidad;
    $clone.querySelector("span").textContent = nPrecio;

    $fragment.appendChild($clone);

    $footerCarrito.appendChild($fragment);


    // Creamos una variable para el boton de vaciar Carrito
    const $btnVaciar = document.getElementById("btn-vaciar");
    $btnVaciar.addEventListener("click", e => {
        carrito = {};

        pintarCarrito();
    })
}

// Funcion para el boton acción
const btnAccion = e => {

    // Si presionamos el boton de sumar cantidad ejecuta el siguiente codigo
    if(e.target.classList.contains("btn-sumar")) {
        carrito[e.target.dataset.id] // Este seria el producto

        // Creamos la variable del producto con el id
        const producto = carrito[e.target.dataset.id];
        // Sumamos cantidad
        producto.cantidad++;
        // El indice va a ser una nueva copia del producto
        carrito[e.target.dataset.id] = {...producto};

        // Y llamamos a pintar el carrito
        pintarCarrito();
    }

    // Si presionamos el boton de restar cantidad ejecuta el siguiente codigo
    if(e.target.classList.contains("btn-restar")) {

        // Creamos la vairbale del producto
        const producto = carrito[e.target.dataset.id]
        // Restamos la cantidad
        producto.cantidad--;

        // Si la cantidad de ese producto llega a 0 borramos el producto
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }

        // Y de nuuevo pintamos el carrito
        pintarCarrito();
    }
}


