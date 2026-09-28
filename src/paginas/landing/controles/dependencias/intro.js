import { estado } from "./../estadoReactivo.js"
import { datosEstadisticas } from "./../../configuracion/estadisticas.js"

export const iniciarEstadisticasTarjetas = async () => {
    if (estado.scroll >= estado.altura && !estado.estadisticas) {
        const tarjetas = document.querySelectorAll(".tarjeta")
        estado.estadisticas = true

        for (let i = 0; i <= tarjetas.length - 1; i++) {
            tarjetas[i].classList.add("tarjeta_visible")
            await new Promise(resolve => setTimeout(resolve, 150))
            const circulo = tarjetas[i].querySelector("circulo-progreso")
            circulo.actualizar(Object.values(datosEstadisticas)[i])
        }
    }
}

const iniciarEstadisticasHorizontal = async () => {
    const barras = document.querySelectorAll("barra-segmentada")
    for (let i = 0; i <= barras.length - 1; i++) {
        barras[i].actualizar(Object.values(datosEstadisticas)[i])
    }
}

const cajaImagen = document.querySelector("#cajaImagen")
const cajaImagen_tempo = parseFloat(getComputedStyle(cajaImagen).getPropertyValue("transition")) * 1000
const cajaDescripcion = document.querySelector("#cajaDescripcion")
const contenedorEstadisticasHor = document.querySelector("#contenedorEstadisticasHor")
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


const imagen = document.querySelector("#imagen_info")
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

const init = () => {
    iniciarEstadisticasTarjetas()
}

init()