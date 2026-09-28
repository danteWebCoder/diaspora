import { viewPort } from "./monitorViewPort.js"

const grupoNav = document.querySelectorAll(".grupoNav")
const subMenus = document.querySelectorAll(".subMenu")
const subInputs = document.querySelectorAll(".inputNav")

const cerrarSubMenus = () => {
    subInputs.forEach(item => {
        item.checked = false
    })
}

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
        cerrarSubMenus()
    }
}

const eventosSubMenus = () => {
    subMenus.forEach(item => {
        item.addEventListener("mouseleave", () => cerrarSubMenus())
    })
}

const init = () => {
    eventosSubMenus()
}

init()