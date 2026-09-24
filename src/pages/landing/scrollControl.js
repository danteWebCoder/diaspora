import * as utils from "./../../helpers/utilidades.js"

/* menu */
const menuPantalla = document.querySelector("#menuPantalla")
const nav = document.querySelector("#contenedorNav")
const presentacion = document.querySelector(".presentacion")
const presentacionHeight = parseFloat(window.getComputedStyle(presentacion).getPropertyValue("height"))
const fondoEstatico = document.querySelector("#fondoEstatico")
const fondo1 = getComputedStyle(document.documentElement).getPropertyValue("--landingFondo1")
const fondo2 = getComputedStyle(document.documentElement).getPropertyValue("--landingFondo2")
const lineasBotonMenu = document.querySelectorAll(".lineaBoton")
const tempoMenu = utils.getTempo(menuPantalla)

export const mostrarNav = async () => {
    nav.classList.remove("noVisible")
    lineasBotonMenu.forEach(item => item.classList.add("lineaBotonNegra"))
    await utils.sleep(tempoMenu)
    const navVisible = !nav.classList.contains("noVisible")

}

export const ocultarNav = async () => {
    nav.classList.add("noVisible")
    lineasBotonMenu.forEach(item => item.classList.remove("lineaBotonNegra"))
}

/* estadisticas */
const iniciarEstadisticasTarjetas = async () => {
    const tarjetasEstadisticas = document.querySelectorAll(".tarjeta")
    const estadisticasDatos = {
        "participacion": 90,
        "formacion": 82,
        "presencia": 87,
        "trabajo": 78
    }

    for (const item of tarjetasEstadisticas) {
        item.classList.add("tarjeta_visible")
        await new Promise(resolve => setTimeout(resolve, 200))
    }
    await new Promise(resolve => setTimeout(resolve, 200))
    let cont = 0
    for (const item of tarjetasEstadisticas) {
        const circulo = item.querySelector("circulo-progreso")
        circulo.actualizar(Object.values(estadisticasDatos)[cont])
        cont = cont + 1
        await new Promise(resolve => setTimeout(resolve, 500))
    }
}

/* scrool */
let pos = window.scrollY
let estadisticasCargadas = false

if (pos >= presentacionHeight) {
    mostrarNav()
    fondoEstatico.style.backgroundImage = fondo2
}

window.addEventListener("scroll", async () => {
    const posY = window.scrollY

    /* menu */
    if (posY > presentacionHeight * 1 && posY > pos) {
        mostrarNav()
        fondoEstatico.style.backgroundImage = fondo2
        menuFondo.classList.add("menuFondoBlanco")
    }
    if (posY <= presentacionHeight * 1 && posY < pos) {
        ocultarNav()
        fondoEstatico.style.backgroundImage = fondo1
        menuFondo.classList.remove("menuFondoBlanco")
    }
    /* estadisticas */
    if (pos >= presentacionHeight * 0.8 && !estadisticasCargadas) {
        estadisticasCargadas = true
        iniciarEstadisticasTarjetas()
    }

    pos = posY
})

/* pos al recargar */
