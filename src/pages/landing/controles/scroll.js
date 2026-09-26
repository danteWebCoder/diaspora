import { viewPort } from "./monitorViewPort.js"

const nav = document.querySelectorAll(".navGroup")

const alternarNav = () => {
    const alturaBienvenida = document.querySelector(".presentacion").offsetHeight
    console.log(viewPort.scroll)
}

viewPort.incluir("scroll", [alternarNav])