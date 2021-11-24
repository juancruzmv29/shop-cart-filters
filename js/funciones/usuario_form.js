// Funcion para el formulario de usuario
export default function usuarioForm() {

    // Variables para input 
    const $inputs = document.querySelectorAll(".usuario-form [required]");

    // Por cada input agregamos un span
    $inputs.forEach(input => {
        const $span = document.createElement("span");
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add("form-usuario-error", "none")
        input.insertAdjacentElement("afterend", $span);
    })


    // Evento para cuando escribamos 
    document.addEventListener("keyup", e => {

        if(e.target.matches(".usuario-form [required]")) {

            // Creamos variables para el input 
            const $input = e.target,
                pattern = $input.pattern || $input.dataset.pattern;
            

            if(pattern && $input.value !== "") {

                // Creammos una variable para la expresiónn regular
                let regex = new RegExp(pattern)

                // Si lo que escribe el usuario no coincide con la expresión regular ejecuta lo siguiente
                return !regex.exec($input.value)
                    ? document.getElementById($input.name).classList.add("is-activo")
                    : document.getElementById($input.name).classList.remove("is-activo")
            }

        }
    })


    // Evento para cuando demos click en el boton de mostrar password

    document.addEventListener("click", e => {

        if(e.target.matches("form .campo-usuario-form .input-password span")) {
            // Creamos una variable para el input del password
            const $inputPassword = document.getElementById("password");

            // El e.target va a ser el span
            if(e.target.classList.contains("mostrar")) {

                e.target.classList.remove("mostrar");

                e.target.textContent = "Ocultar";

                $inputPassword.type = "text";
            } else {

                e.target.classList.add("mostrar");

                e.target.textContent = "Mostrar";

                $inputPassword.type = "password";
            }
        }

    })

}