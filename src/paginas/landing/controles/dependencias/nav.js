import { estado } from "../reactivo.js"
import { sleep } from "../../../../helpers/utilidades.js"

const navGroup = document.querySelectorAll(".navGroup")
const subMenus = document.querySelectorAll(".subMenu")
const subInputs = document.querySelectorAll(".inputNav")

export const cerrarSubMenus = () => subInputs.forEach(item => item.checked = false)

export const alternarNav = () => {
    if (estado.scroll > estado.altura) {
        navGroup.forEach(async (item, index) => {
            index === 2 && item.classList.add("tempo300")
            item.classList.replace("oculto", "visible")
        })
    }
    if (estado.scroll <= estado.altura) {
        navGroup.forEach((item, index) => {
            index === 2 && item.classList.remove("tempo300")
            item.classList.replace("visible", "oculto")
        })
    }
}

export const resetSubMenus = () => {
    if (estado.scroll <= estado.altura) cerrarSubMenus()
}

const eventosSubMenus = () => subMenus.forEach(item => item.addEventListener("mouseleave", () => cerrarSubMenus()))

const init = () => {
    alternarNav()
    eventosSubMenus()
}

init()