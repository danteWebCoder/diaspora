import { estado } from "../estadoReactivo.js"

const grupoNav = document.querySelectorAll(".grupoNav")
const subMenus = document.querySelectorAll(".subMenu")
const subInputs = document.querySelectorAll(".inputNav")

export const cerrarSubMenus = () => subInputs.forEach(item => item.checked = false)

export const alternarNav = () => {
    if (estado.scroll > estado.altura) {
        grupoNav.forEach(item => item.classList.replace("oculto", "visible"))
    }
    if (estado.scroll <= estado.altura) {
        grupoNav.forEach(item => item.classList.replace("visible", "oculto"))
    }
}

export const resetSubMenus = () => {
    if (estado.scroll <= estado.altura) cerrarSubMenus()
}

const eventosSubMenus = () => subMenus.forEach(item => item.addEventListener("mouseleave", () => cerrarSubMenus()))

const init = () => {
    eventosSubMenus()
}

init()