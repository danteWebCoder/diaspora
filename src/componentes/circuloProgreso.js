class CirculoProgreso extends HTMLElement {
    #seccionesDibujadas = null

    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })
        this.dom.innerHTML = `
            <div class="contenedorPrincipal max centrado">
                <ul class="circulo centrado">
                    <div class="porcentaje"></div>
                </ul>
            </div>
        `

        const estiloComponente = this.dom.appendChild(document.createElement("style"))
        estiloComponente.textContent = `
            :host {
                width: 100%;
                height: 100%;
            }

            * {
                margin: 0;
                padding: 0;
            }

            .contenedorPrincipal {
                display: flex;

                .circulo {
                    position: relative;
                    list-style: none;
                    width: 100%;
                    aspect-ratio: 1/1;
                    border: 1px solid rgb(200, 200, 200);
                    border-radius: 50%;

                    .porcentaje {
                        position: absolute;
                        width: auto;
                        height: auto;
                        font-size: 28px;
                        font-variant-numeric: tabular-nums;
                    }

                    .seccion {
                        position: absolute;
                        width: calc(100% - (32px + 10px)); /* 2 * border + separacion circulo  */
                        aspect-ratio: 1/1;
                        border-width: 16px;
                        border-style: solid;
                        border-color: rgba(0, 0, 0, 0.1);
                        border-radius: 50%;
                        clip-path: polygon(43% 0, 57% 0, 50% 50%, 50% 50%);
                    }

                    .seccionMarcada {
                        animation: color 600ms forwards;
                    }
                }

            }

            @keyframes color {
                0% {border-color: var(--enfasisClaro);}
                100% {border-color: var(--enfasis);}
            }

            .centrado {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .max {
                width: 100%;
                height: 100%;
            }
        `

        this.iniciar()
    }

    #dibujarSecciones = async () => {
        const circulo = this.dom.querySelector(".circulo")
        for (let i = 0; i < 20; i++) {
            const nuevaSeccion = document.createElement("li")
            nuevaSeccion.classList.add("seccion")
            circulo.appendChild(nuevaSeccion)
        }
        return Array.from(circulo.querySelectorAll(".seccion"))
    }

    #posicionarSecciones = () => {
        const desplazamiento = 360 / 20
        this.#seccionesDibujadas.forEach((item, index) => {
            item.style.transform = `rotate(calc(${index} * ${desplazamiento} * 1deg))`
        })
    }

    #actualizarPorcentaje = async (num) => {
        const porcentaje = this.dom.querySelector(".porcentaje")

        for (let i = 0; i <= num; i++) {
            porcentaje.textContent = i + "%"
            await new Promise(resolve => setTimeout(resolve, 20))
        }
    }

    #actualizarProgreso = async (num) => {
        const secciones = ((num * 20) / 100)
        for (let i = 0; i <= secciones; i++) {
            const seccion = this.#seccionesDibujadas[i]
            seccion.classList.add("seccionMarcada")
            await new Promise(resolve => setTimeout(resolve, 50))
        }
    }

    actualizar = async (num) => {
        await this.#actualizarPorcentaje(num)
        await this.#actualizarProgreso(num)
        return true
    }

    iniciar = async () => {
        this.#seccionesDibujadas = await this.#dibujarSecciones()
        this.#posicionarSecciones()
    }
}
customElements.define("circulo-progreso", CirculoProgreso) 