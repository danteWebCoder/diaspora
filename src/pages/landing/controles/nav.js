import { viewPort } from "./monitorViewPort.js"

const grupoNav = document.querySelectorAll(".grupoNav")
const subInputs = document.querySelectorAll(".inputNav")

export const alternarNav = () => {
    const alturaBienvenida = document.querySelector(".presentacion").offsetHeight /* referenciar cuando este disponible en viewPort */
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

export const resetSubMenus = () => {
    const alturaBienvenida = document.querySelector(".presentacion").offsetHeight /* referenciar cuando este disponible en viewPort */
    if (viewPort.scroll <= alturaBienvenida) {
        subInputs.forEach(item => {
            item.checked = false
        })
    }
}