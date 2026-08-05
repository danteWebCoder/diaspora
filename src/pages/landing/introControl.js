const cajaImagen = document.querySelector("#cajaImagen")
const cajaImagen_tempo = parseFloat(getComputedStyle(cajaImagen).getPropertyValue("transition")) * 1000
const imagen = document.querySelector("#imagen_info")

const cajaDescripcion = document.querySelector("#cajaDescripcion")
const cajaEstadisticasReducidas = document.querySelector("#cajaEstadisticasReducidas")

const contenedorEstadisticas = document.querySelector("#contenedorEstadisticas")
const listaEstadisticas = document.querySelector("#listaEstadisticas")

const animacionApertura = async () => {
    cajaImagen.classList.add("cajaImagen_abierta")
    await new Promise(resolve => setTimeout(resolve, cajaImagen_tempo))
    cajaDescripcion.classList.add("altura50")
    cajaEstadisticasReducidas.classList.add("altura50")
    return true
}

const animacionCierre = async () => {
    cajaDescripcion.classList.remove("altura50")
    cajaEstadisticasReducidas.classList.remove("altura50")
    await new Promise(resolve => setTimeout(resolve, cajaImagen_tempo))
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