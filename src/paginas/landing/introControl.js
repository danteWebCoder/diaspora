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
        await new Promise(resolve => setTimeout(resolve, 150))
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

const iniciarEstadisticasHorizontal = async () => {
    const estadisticas = document.querySelectorAll("barra-segmentada")
    const estadisticasDatos = {
        "participacion": 90,
        "formacion": 82,
        "presencia": 87,
        "trabajo": 78
    }

    let cont = 0
    for (const item of estadisticas) {
        item.actualizar(Object.values(estadisticasDatos)[cont])
        cont = cont + 1
        await new Promise(resolve => setTimeout(resolve, 500))
    }
}

let expandido = false
let estadisticasAnimadas = false
imagen.addEventListener("click", async (e) => {
    expandido = expandido ? false : true
    if (expandido) {
        await animacionApertura()
        !estadisticasAnimadas && iniciarEstadisticasHorizontal()
        estadisticasAnimadas = true
    } else {
        await animacionCierre()
    }
})