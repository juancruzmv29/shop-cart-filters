// Barra de navegación 
export default function navegador(navegacion, btnAbrir) {

    // Variables para el overlay
    const overlay = document.createElement("div"),
        $body = document.querySelector("body"),
        $btnCerrar = document.getElementById("borrar-value");

    // overlay.appendChild(navegacion)
    overlay.classList.add("overlay")

    document.addEventListener("click", e => {

        const $inputSearch = document.getElementById("inputSearch");

        // Si apretamos el boton de click para abrir
        if(e.target.matches(btnAbrir)) {
            document.querySelector(navegacion).classList.add("is-active");
            $body.classList.add("is-active");
            $body.appendChild(overlay);
        }


        // Si apretamos el overlay se nos va a sacar el overlay
        if(e.target === overlay) {
            document.querySelector(navegacion).classList.remove("is-active");
            $body.classList.remove("is-active");
            $body.removeChild(overlay);
        }


        // Si apretamos el boton cerrar dell buscador, nos elimina lo que tenemos escrito
        if(e.target === $btnCerrar) {
            $inputSearch.value = "";
        }

    })

    

    // Evento para cuuando estemos escribiendo en el input de búsqueda
    document.addEventListener("keyup", e => {

        const $input = e.target;

        if(e.target.matches("#inputSearch")) {

            if($input.value.length !== 0) {
                $btnCerrar.classList.add("is-active");
            } else {
                $btnCerrar.classList.remove("is-active");
            }
        }
    })

}