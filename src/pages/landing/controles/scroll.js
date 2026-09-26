import { viewPort } from "./monitorViewPort.js"

const grupoNav = document.querySelectorAll(".grupoNav")

const alternarNav = () => {
    const alturaBienvenida = document.querySelector(".presentacion").offsetHeight
    if (viewPort.scroll > alturaBienvenida) {
        grupoNav.forEach(item => {
            item.classList.replace("oculto", "visible")
        })
    }

    if (viewPort.scroll <= alturaBienvenida) {
        grupoNav.forEach(item => {
            item.classList.replace("visible", "oculto")
        })
    }
}

viewPort.incluir("scroll", [alternarNav])