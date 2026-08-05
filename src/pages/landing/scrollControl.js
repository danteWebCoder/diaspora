/* menu */
const menu = document.querySelector("#contenedorNav")
const presentacion = document.querySelector(".presentacion")
const menuHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--menuHeight"))
const presentacionHeight = parseFloat(window.getComputedStyle(presentacion).getPropertyValue("height"))
/* estadisticas */
const participacion = document.querySelector("#participacion")
const formacion = document.querySelector("#formacion")
const presencia = document.querySelector("#presencia")
const trabajo = document.querySelector("#trabajo")

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

let pos = 0
let estadisticasCargadas = false
window.addEventListener("scroll", async () => {
    const posY = window.scrollY

    /* menu */
    if (posY > presentacionHeight && posY > pos) {
        visibilizar()
    }
    if (posY <= presentacionHeight && posY < pos) {
        ocultar()
    }
    pos = posY

    if (pos >= presentacionHeight * 0.8 && !estadisticasCargadas) {
        participacion.actualizar(90)
        formacion.actualizar(82)
        presencia.actualizar(87)
        trabajo.actualizar(78)
        estadisticasCargadas = true
    }
})