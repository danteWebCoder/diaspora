class BarraSegmentada extends HTMLElement {
    constructor() {
        super()

        this.icono = this.getAttribute("icono") || ""
        this.titulo = this.getAttribute("titulo") || "Titulo no definido"
        this.dom = this.attachShadow({ mode: "open" })
        this.dom.innerHTML = `
            <div class="contenedorPrincipal max">
                <div class="titulo">${this.titulo}</div>
                <div class="cajaBarra">
                    <div class="porcentaje center">0%</div>
                    <div class="barra"></div>
                    <div class="icono center"></div>
                </div>
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

                .titulo {
                    width: 100%;
                    height: 50%;
                    font-size: 14px;
                    font-weight: bolder;
                    text-indent: 60px;
                }

                .cajaBarra {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    height: 50%;

                    .porcentaje {
                        width: 50px;
                        height: 100%;
                        font-size: 18px;
                        font-weight: bolder;
                    }

                    .barra {
                        flex: 1;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin: 0 10px;

                        .seccion {
                            height: 80%;
                            width: calc((100% - 38px) / 20);
                            background-color: rgba(0, 0, 0, 0.1);
                            border-radius: 20%;
                        }

                        .seccionMarcada {
                            animation: color 600ms forwards;
                        }
                    }

                    .icono {
                        width: 30px;
                        height: 100%;
                        background-image: url("${this.icono}");
                        background-repeat: no-repeat;
                        background-size: 90%;
                        background-position: center;
                        opacity: 0.25;
                        cursor: pointer;

                        &:hover {
                            opacity: 0.8;
                        }

                    }
                }
            }

            @keyframes color {
                0% {background-color: var(--enfasisClaro);}
                10% {background-color: var(--enfasisClaro);}
                100% {background-color: var(--enfasis);}
            }


            .max {
                width: 100%;
                height: 100%;
            }

            .center {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `
    }

    #generarSecciones = () => {
        const barra = this.dom.querySelector(".barra")
        const anchoBarra = barra.offsetWidth

        for (let i = 0; i < 20; i++) {
            const seccion = document.createElement("div")
            seccion.classList.add("seccion")
            barra.appendChild(seccion)
        }
    }

    #actualizarPorcentaje = async (num) => {
        console.log(num)
        const porcentaje = this.dom.querySelector(".porcentaje")
        for (let i = 0; i <= num; i++) {
            porcentaje.textContent = i + "%"
            await new Promise(resolve => setTimeout(resolve, 10))
        }
    }

    #actualizarProgreso = async (num) => {
        const secciones = this.dom.querySelectorAll(".seccion")
        for (let i = 0; i < num; i++) {
            const seccionActual = secciones[19 - (i / 5)] || null
            if (seccionActual) {
                seccionActual.classList.add("seccionMarcada")
                await new Promise(resolve => setTimeout(resolve, 40))
            }
        }
    }

    actualizar = async (num) => {
        await this.#actualizarPorcentaje(num)
        await this.#actualizarProgreso(num)
    }

    iniciar = async () => {
        this.#generarSecciones()
    }

    async connectedCallback() {
        await this.iniciar()
    }
}
customElements.define("barra-segmentada", BarraSegmentada)