import { reactivo } from "../../../helpers/reactividad.js"

export const estado = reactivo({
    "scroll": window.scrollY,
    "altura": window.innerHeight,
    "introActivada": false,
})

window.addEventListener("scroll", () =>  estado.scroll = window.scrollY)
window.addEventListener("resize", () =>  estado.altura = window.innerHeight)
