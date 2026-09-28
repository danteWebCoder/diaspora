import { reactivo } from "../../../helpers/reactividad.js"

export const viewPort = reactivo({
    "scroll": window.scrollY,
    "altura": window.innerHeight
})

window.addEventListener("scroll", () =>  viewPort.scroll = window.scrollY)
window.addEventListener("resize", () =>  viewPort.altura = window.innerHeight)