import { estado } from "./../reactivo.js"
import { datosEstadisticas } from "./../../configuracion/estadisticas.js"
import * as utilidad from "../../../../helpers/utilidades.js"

export const iniciarEstadisticasTarjetas = async () => {
    if (estado.scroll >= estado.altura && !estado.introActivada) {
        const tarjetas = document.querySelectorAll(".tarjeta")
        estado.introActivada = true

        for (let i = 0; i <= tarjetas.length - 1; i++) {
            tarjetas[i].classList.add("tarjeta_visible")
            await utilidad.sleep(150)
            const circulo = tarjetas[i].querySelector("circulo-progreso")
            circulo.actualizar(Object.values(datosEstadisticas)[i])
        }
        await utilidad.sleepTempo(tarjetas[0])
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
    await utilidad.sleep(1000) 
    /* a ojo necesita que el componente avise al terminar la actualizacion */
    /* lo mismo para el componente de estadistica circulo */
}

let barrasCargadas = false
const alternarLayout = async () => {
    const cajaImagen = document.querySelector("#cajaImagen")
    const cajaDescripcion = document.querySelector("#cajaDescripcion")
    const contenedorEstadisticasHor = document.querySelector("#contenedorEstadisticasHor")
    const estadisticasHor = contenedorEstadisticasHor.querySelectorAll(".estadisticasHor")
    const imagenExpandida = cajaImagen.classList.contains("cajaImagen_expandida")

    const animacionApertura = async () => {
        cajaImagen.classList.add("cajaImagen_expandida")
        await utilidad.sleepTempo(cajaImagen)

        cajaDescripcion.style.height = "50%"
        contenedorEstadisticasHor.style.top = "50%";
        await utilidad.sleepTempo(cajaDescripcion)

        for (const item of estadisticasHor) {
            item.classList.add("estadisticasHor_izq")
            await utilidad.sleep(150)
        }
        !barrasCargadas && await iniciarEstadisticasHorizontal()
        barrasCargadas = true
        await utilidad.sleepTempo(estadisticasHor[0]) /* no necesario cuando el componente avise */
    }

    const animacionCierre = async () => {
        contenedorEstadisticasHor.style.top = "100%";
        cajaDescripcion.style.height = "100%"
        await utilidad.sleepTempo(cajaImagen)

        for (const item of estadisticasHor) {
            item.classList.remove("estadisticasHor_izq")
        }

        cajaImagen.classList.remove("cajaImagen_expandida")
        await utilidad.sleepTempo(cajaImagen)
    }

    imagenExpandida
        ? await animacionCierre()
        : await animacionApertura()
}

const activarEventoImagen = () => {
    const imagen = document.querySelector("#imagen_info")
    imagen.style.cursor = "pointer"
    let clickBloqueado = false

    imagen.addEventListener("click", async (e) => {
        if (!clickBloqueado) {
            clickBloqueado = true
            await alternarLayout()
            clickBloqueado = false
        }
    })
}

const init = () => {
    iniciarEstadisticasTarjetas()
}

init()