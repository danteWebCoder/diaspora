import { estado } from "./../estadoReactivo.js"
import { datosEstadisticas } from "./../../configuracion/estadisticas.js"

export const iniciarEstadisticasTarjetas = async () => {
    if (estado.scroll >= estado.altura && !estado.estadisticas) {
        const tarjetasEstadisticas = document.querySelectorAll(".tarjeta")
        estado.estadisticas = true

        for (let i = 0; i <= tarjetasEstadisticas.length - 1; i++) {
            tarjetasEstadisticas[i].classList.add("tarjeta_visible")
            await new Promise(resolve => setTimeout(resolve, 150))
            const circulo = tarjetasEstadisticas[i].querySelector("circulo-progreso")
            circulo.actualizar(Object.values(datosEstadisticas)[i])
        }
    }
}