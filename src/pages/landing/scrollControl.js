/* menu */
const menu = document.querySelector("#contenedorNav")
const presentacion = document.querySelector(".presentacion")
const menuHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--menuHeight"))
const presentacionHeight = parseFloat(window.getComputedStyle(presentacion).getPropertyValue("height"))
const fondoEstatico = document.querySelector("#fondoEstatico")
const fondo1 = getComputedStyle(document.documentElement).getPropertyValue("--landingFondo1")
const fondo2 = getComputedStyle(document.documentElement).getPropertyValue("--landingFondo2")

const seccionVideosFondo = document.querySelector("#seccionVideosFondo")

const mostrarMenu = async () => {
    menu.classList.remove("noVisible")
    menu.classList.add("menuVisible")
    await new Promise(resolve => setTimeout(resolve, 10))
    menu.style.opacity = 1
}

const ocultarMenu = async () => {
    menu.style.opacity = 0
    await new Promise(resolve => setTimeout(resolve, 10))
    menu.classList.add("noVisible")
    menu.classList.remove("menuVisible")
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

pos > presentacionHeight * 1 && mostrarMenu()

window.addEventListener("scroll", async () => {
    const posY = window.scrollY

    /* menu */
    if (posY > presentacionHeight * 1 && posY > pos) {
        mostrarMenu()
        fondoEstatico.style.backgroundImage = fondo2
    }
    if (posY <= presentacionHeight * 1 && posY < pos) {
        ocultarMenu()
        fondoEstatico.style.backgroundImage = fondo1
    }
    /* estadisticas */
    if (pos >= presentacionHeight * 0.8 && !estadisticasCargadas) {
        estadisticasCargadas = true
        iniciarEstadisticasTarjetas()
    }

    pos = posY
})

/* pos al recargar */
