import { viewPort } from "./monitorViewPort.js"
import * as nav from "./nav.js"

const lineasBoton = document.querySelectorAll(".lineaBoton")
const menuInput = document.querySelector("#menuInput")

export const cambiarColorIcono = () => {
    viewPort.scroll >= viewPort.altura
        ? lineasBoton.forEach(item => item.classList.add("lineaBoton_negro"))
        : lineasBoton.forEach(item => item.classList.remove("lineaBoton_negro"))
}

const bloquerScroll = (bol) => {
    document.body.style.overflow = bol ? "hidden" : ""
}

menuInput.addEventListener("change", (e) => {
    nav.cerrarSubMenus()
    bloquerScroll(e.target.checked)
})