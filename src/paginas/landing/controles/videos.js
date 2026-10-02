import { estado } from "./reactivo.js"
import { videos } from "../configuracion/listaVideos.js"

/* videos */
/* const videoList = [...document.querySelectorAll(".cajaMiniatura")]
const reproductor = document.querySelector("#reproductor")

const restaurarMiniaturas = (indexSeleccion) => {
    videoList.forEach((item, index) => {
        index !== indexSeleccion && (item.innerHTML = "")
    })
}

const cambiarVideo = (index, mobile) => {
    !mobile && (reproductor.innerHTML = videos[index])
    if (mobile) {
        restaurarMiniaturas(index)
        videoList[index].innerHTML = videos[index]
    }
}

videoList.forEach(caja => {
    caja.addEventListener("click", (e) => {
        const mobile = window.innerWidth <= 700 ? true : false
        console.log(mobile)
        cambiarVideo(Array.from(videoList).indexOf(e.target), mobile)
    })
})
 */

/* background */
let backgroundChanged = false
export const changeBackground = () => {
    const backLayer = document.querySelector("#staticBack")
    const topChangeLimit = backLayer.offsetHeight
    const videoSection = document.querySelector("section.video")
    const bottomChangeLimit = videoSection.offsetTop - backLayer.offsetHeight

    if (estado.scroll > topChangeLimit) {
        !backgroundChanged && backLayer.classList.replace("back1", "back2")
    } 

    if (estado.scroll < bottomChangeLimit) {
        backLayer && backLayer.classList.replace("back2", "back1")
    }
}

/* video por defecto */
const mobile = window.innerWidth <= 700 ? true : false
/* videoList[0].dispatchEvent(new Event("click")) */