const cajaImagen = document.querySelector("#cajaImagen")
const cajaImagen_tempo = parseFloat(getComputedStyle(cajaImagen).getPropertyValue("transition")) * 1000
const imagen = document.querySelector("#imagen_info")

const cajaDescripcion = document.querySelector("#cajaDescripcion")
const contenedorEstadisticasHor = document.querySelector("#contenedorEstadisticasHor")

const contenedorEstadisticas = document.querySelector("#contenedorEstadisticas")
const listaEstadisticas = document.querySelector("#listaEstadisticas")
const estadisticasHor = contenedorEstadisticasHor.querySelectorAll(".estadisticasHor")

const animacionApertura = async () => {
    cajaImagen.classList.add("cajaImagen_abierta")
    await new Promise(resolve => setTimeout(resolve, cajaImagen_tempo))
    cajaDescripcion.style.height = "50%"
    contenedorEstadisticasHor.style.top = "50%";
    await new Promise(resolve => setTimeout(resolve, cajaImagen_tempo))

    for (const item of estadisticasHor) {
        item.classList.add("estadisticasHor_izq")
        await new Promise(resolve => setTimeout(resolve, cajaImagen_tempo))
    }
    return true
}

const animacionCierre = async () => {
    cajaDescripcion.style.height = "100%"
    contenedorEstadisticasHor.style.top = "100%";
    contenedorEstadisticasHor.classList.remove("altura50")
    await new Promise(resolve => setTimeout(resolve, cajaImagen_tempo))

    for (const item of estadisticasHor) {
        item.classList.remove("estadisticasHor_izq")
    }
    cajaImagen.classList.remove("cajaImagen_abierta")
    return true
}

let open = false
imagen.addEventListener("click", async (e) => {
    open = open ? false : true
    open
        ? await animacionApertura()
        : await animacionCierre()
})