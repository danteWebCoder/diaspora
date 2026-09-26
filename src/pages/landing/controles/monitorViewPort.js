import { reactivo } from "../../../helpers/reactividad.js"

const fn1 = () => console.log("scroll")
const fn2 = () => console.log("resize")
const fn3 = () => console.log("fn")


export const viewPort = reactivo({"scroll": window.scrollY}, [fn1])
console.log(viewPort)
viewPort.incluir({"altura": window.innerHeight}, [fn2]) 
console.log(viewPort)
viewPort.incluir({"altura": window.innerHeight}, [fn3]) 
console.log(viewPort)
console.log(viewPort.propiedades())
console.log(viewPort.acciones("altura"))


window.addEventListener("scroll", () =>  viewPort.scroll = window.scrollY)
window.addEventListener("resize", () =>  viewPort.altura = window.innerHeight)