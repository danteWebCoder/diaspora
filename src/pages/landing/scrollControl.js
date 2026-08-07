/* menu */
const menu = document.querySelector("#contenedorNav")
const presentacion = document.querySelector(".presentacion")
const menuHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--menuHeight"))
const presentacionHeight = parseFloat(window.getComputedStyle(presentacion).getPropertyValue("height"))

const visibilizar = async () => {
    menu.classList.remove("noVisible")
    menu.classList.add("menuVisible")
    await new Promise(resolve => setTimeout(resolve, 10))
    menu.style.opacity = 1
}

const ocultar = async () => {
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
window.addEventListener("scroll", async () => {
    const posY = window.scrollY

    /* menu */
    if (posY > presentacionHeight * 0.9 && posY > pos) {
        visibilizar()
    }
    if (posY <= presentacionHeight * 0.9 && posY < pos) {
        ocultar()
    }
    /* estadisticas */
    if (pos >= presentacionHeight * 0.8 && !estadisticasCargadas) {
        estadisticasCargadas = true
        iniciarEstadisticasTarjetas()
    }

    pos = posY
})

/* pos al recargar */
