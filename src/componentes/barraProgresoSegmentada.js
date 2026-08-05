class BarraSegmentada extends HTMLElement {
    constructor() {
        super()

        this.icono = this.getAttribute("icono") || ""
        this.dom = this.attachShadow({ mode: "open" })
        this.dom.innerHTML = `
            <div class="contenedorPrincipal max">
                <div class="titulo">Titulo de estadistica</div>
                <div class="cajaBarra">
                    <div class="porcentaje center">100%</div>
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
                    text-align: right;
                }

                .cajaBarra {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    height: 50%;

                    .porcentaje {
                        width: 60px;
                        height: 100%;
                        font-size: 18px;
                        font-weight: bolder;
                    }

                    .barra {
                        flex: 1;
                        display: flex;
                        justify-content: space-between;
                        margin: 0 10px;

                        .seccion {
                            height: 100%;
                            width: calc((100% - 38px) / 20);
                            background-color: rgba(0, 0, 0, 0.1);
                        }
                    }

                    .icono {
                        width: 30px;
                        height: 100%;
                        background-image: url("${this.icono}");
                        background-repeat: no-repeat;
                        background-size: contain;
                        background-position: center;
                        opacity: 0.25;
                        cursor: pointer;

                        &:hover {
                            opacity: 0.8;
                        }

                    }
                }
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

    iniciar = async () => {
        this.#generarSecciones()
    }

    async connectedCallback() {
        console.log("d")
        await this.iniciar()
    }
}
customElements.define("barra-segmentada", BarraSegmentada)