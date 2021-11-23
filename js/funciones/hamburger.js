// Funcion para el boton hamburguesa
export default function hamburger(btn, menu, enlace) {

    document.addEventListener("click", e => {

        if(e.target.matches(btn)) {
            document.querySelector(btn).classList.toggle("is-active")
            document.querySelector(menu).classList.toggle("is-active")
        }

        if(e.target.matches(enlace)) {
            document.querySelector(btn).classList.remove("is-active")
            document.querySelector(menu).classList.remove("is-active")
        }

    })

}