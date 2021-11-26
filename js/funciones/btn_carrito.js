// Funcion para el boton de carrito
export default function btnCarrito(btnCarrito, carrito, btnCerrar) {


    document.addEventListener("click", e => {

        if(e.target.matches(btnCarrito)) {
            document.querySelector(carrito).classList.add("is-active");
        }

        if(e.target.matches(btnCerrar)) {
            document.querySelector(carrito).classList.remove("is-active");
        }

    })

}