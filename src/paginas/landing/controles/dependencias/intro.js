import { estado } from "./../reactivo.js"
import { datosEstadisticas } from "./../../configuracion/estadisticas.js"

export const iniciarEstadisticasTarjetas = async () => {
    if (estado.scroll >= estado.altura && !estado.introActivada) {
        const tarjetas = document.querySelectorAll(".tarjeta")
        const tarjetas_tempo = parseFloat(getComputedStyle(tarjetas[0]).getPropertyValue("transition")) * 1000
        estado.introActivada = true

        for (let i = 0; i <= tarjetas.length - 1; i++) {
            tarjetas[i].classList.add("tarjeta_visible")
            await new Promise(resolve => setTimeout(resolve, 150))
            const circulo = tarjetas[i].querySelector("circulo-progreso")
            circulo.actualizar(Object.values(datosEstadisticas)[i])
        }
        await new Promise(resolve => setTimeout(resolve, tarjetas_tempo))
        activacionImagen()
        activarEventoImagen()
    }
}

const activacionImagen = () => {
    const introExpandir = document.querySelector("#introExpandir")
    introExpandir.classList.replace("invisible", "visible")
}

const iniciarEstadisticasHorizontal = async () => {
    const barras = document.querySelectorAll("barra-segmentada")
    for (let i = 0; i <= barras.length - 1; i++) {
        barras[i].actualizar(Object.values(datosEstadisticas)[i])
    }
}

const alternarLayout = (estados) => {
    const cajaImagen = document.querySelector("#cajaImagen")
    const cajaImagen_tempo = parseFloat(getComputedStyle(cajaImagen).getPropertyValue("transition")) * 1000
    const cajaDescripcion = document.querySelector("#cajaDescripcion")
    const cajaDescripcion_tempo = parseFloat(getComputedStyle(cajaDescripcion).getPropertyValue("transition")) * 1000
    const contenedorEstadisticasHor = document.querySelector("#contenedorEstadisticasHor")
    const estadisticasHor = contenedorEstadisticasHor.querySelectorAll(".estadisticasHor")

    const animacionApertura = async () => {
        cajaImagen.classList.add("cajaImagen_abierta")
        await new Promise(resolve => setTimeout(resolve, cajaImagen_tempo))

        cajaDescripcion.style.height = "50%"
        contenedorEstadisticasHor.style.top = "50%";
        await new Promise(resolve => setTimeout(resolve, cajaDescripcion_tempo))

        for (const item of estadisticasHor) {
            item.classList.add("estadisticasHor_izq")
            await new Promise(resolve => setTimeout(resolve, 150))
        }
        !estados.barrasCargadas && iniciarEstadisticasHorizontal()
        estados.barrasCargadas = true
    }

    const animacionCierre = async () => {
        contenedorEstadisticasHor.style.top = "100%";
        cajaDescripcion.style.height = "100%"
        await new Promise(resolve => setTimeout(resolve, cajaImagen_tempo))

        for (const item of estadisticasHor) {
            item.classList.remove("estadisticasHor_izq")
        }

        cajaImagen.classList.remove("cajaImagen_abierta")
    }

    estados.imagenExpandida
        ? animacionApertura()
        : animacionCierre()
}

const activarEventoImagen = () => {
    const imagen = document.querySelector("#imagen_info")
    const estados = {
        imagenExpandida: false,
        barrasCargadas: false
    }

    imagen.addEventListener("click", async (e) => {
        estados.imagenExpandida = !estados.imagenExpandida
        alternarLayout(estados)
    })
}

const init = () => {
    iniciarEstadisticasTarjetas()
}

init()