import contactForm from "./funciones/contactForm.js";
import hamburger from "./funciones/hamburger.js";
import navegador from "./funciones/navegador.js";




document.addEventListener("DOMContentLoaded", e => {

    hamburger(".hamburger", ".navegacion-menu", ".navegacion-link a")

    navegador(".navegador", ".btn-search i")

    contactForm()

})