import { estado } from "./reactivo.js"
import { videos } from "../configuracion/listaVideos.js"

const cajasMiniaturas = [...document.querySelectorAll(".cajaMiniatura")]
/* const miniaturas = [...cajasMiniaturas].map(caja => getComputedStyle(caja).getPropertyValue("background-image"))
 */const reproductor = document.querySelector("#reproductor")

const restaurarMiniaturas = (indexSeleccion) => {
    cajasMiniaturas.forEach((item, index) => {
        index !== indexSeleccion && (item.innerHTML = "")
    })
}

const cambiarVideo = (index, mobile) => {
    !mobile && (reproductor.innerHTML = videos[index])
    if (mobile) {
        restaurarMiniaturas(index)
        cajasMiniaturas[index].innerHTML = videos[index]
    }
}

cajasMiniaturas.forEach(caja => {
    caja.addEventListener("click", (e) => {
        const mobile = window.innerWidth <= 700 ? true : false
        console.log(mobile)
        cambiarVideo(Array.from(cajasMiniaturas).indexOf(e.target), mobile)
    })
})

/* video por defecto */
const mobile = window.innerWidth <= 700 ? true : false
cajasMiniaturas[0].dispatchEvent(new Event("click"))