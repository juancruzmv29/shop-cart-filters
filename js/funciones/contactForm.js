// Funcion para el formulario de contacto
export default function contactForm() {

    // Creamos variables para los inputs y por cada input voy a crear un span
    const $inputs = document.querySelectorAll(".contact-form [required]"),
        $form = document.querySelector(".contact.form");

    $inputs.forEach(input => {
        const $span = document.createElement("span");
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add("form-contacto-error", "none")
        input.insertAdjacentElement("afterend", $span);
    })


    // Evento mientras estemos escribiendo
    document.addEventListener("keyup", e => {
        if(e.target.matches(".contact-form [required]")) {
            let $input = e.target,
                pattern = $input.pattern || $input.dataset.pattern
            
            // Si en donde hay patron y doonde escribe el usuario hay algo escrito ejecutamos el siguiente codigo
            if(pattern && $input.value !== "") {

                // Creamos una variable para la expresión regular
                let regex = new RegExp(pattern)

                // Si lo que escribe el usuario no coincide con la expresión regular
                return !regex.exec($input.value)
                    ? document.getElementById($input.name).classList.add("form-contacto-error")
                    : document.getElementById($input.name).classList.remove("form-contacto-error")
            }

            // Si no hay patrón va a ejecutar lo siguiente
            if(!pattern) {
                return $input.value === ""
                    ? document.getElementById($input.name).classList.add("form-contacto-error")
                    : document.getElementById($input.name).classList.remove("form-contacto-error")
            }
        }
    });


    // Evento para cuando enviemos el formulario 
    document.addEventListener("submit", e => {

        e.preventDefault();

        const $respuesta = document.querySelector(".respuesta-form-contacto"),
            $loader = document.querySelector(".loader-contacto");

        $loader.classList.remove("none")

        fetch("https://formsubmit.co/ajax/juancruzmv29@hotmail.com", {
            method: "POST",
            body: new FormData(e.target) // El formData ya trae formateado el body
        })
        .then(respuesta => respuesta.ok ? respuesta.json() : Promise.reject(respuesta))
        .then(json => {
            console.log(json)
            $loader.classList.add("none");
            $respuesta.classList.remove("none")
            $form.reset();
        })
        .catch(error => {
            let message = error.statusText || "Ocurrio un error"
            $respuesta.innerHTML = `<p>Error ${error.status}: ${message}</p>`
        })
        .finally(() => setTimeout(() => {
            $respuesta.classList.add("none")
            $respuesta.innerHTML = "";
        }, 3000));
    })

}