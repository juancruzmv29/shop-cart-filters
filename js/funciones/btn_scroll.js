// Función para el boton de scroll
export default function scrollBtn(btn) {

    const btnSubir = document.querySelector(btn);

    // Evento para cuando hagamos scroll
    window.addEventListener("scroll", e => {
        let scrollY = window.pageYOffset;

        if(scrollY > 400) {
            btnSubir.classList.remove("hidden");
        } else {
            btnSubir.classList.add("hidden");
        }
    })

    // Evento para cuando hagamos click en el boton de scroll
    document.addEventListener("click", e => {
        if(e.target.matches(btn)) {
            window.scrollTo({
                behavior: "smooth",
                top: 0
            })
        }
    })
}