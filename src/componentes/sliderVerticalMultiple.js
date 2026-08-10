const fuenteSimbolos = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
const fuenteGeneral = "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
const colorSimbolosHover = "rgb(252, 201, 31)"
const tempo1 = 200
const tempo2 = 3500 /* tiempo de aparacion entre grupos */
const tamañoFuente = "15px"
const color = "var(--negro)"
const iconoFondo = "var(--negro)"
const enfasis = "var(--enfasis)"
const tamañoIcono = "28px"

class SliderVerticalMultiple extends HTMLElement {
    #info = null
    #grupos = []
    #pausa = false

    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })
        this.dom.innerHTML = `
            <div class="contenedorPrincipal max">
                <div class="cajaContenidoOculto max"></div>
            </div>`

        const estiloComponente = this.dom.appendChild(document.createElement("style"))
        estiloComponente.textContent = `
            :host {
                width: 100%;
                height: 100%;

                --botonWidth: 30px;
                --logoWidth: 20%;
                --textoWidth: 45%;
                --infoWidth: 35%;
                --cajasMargin: 20px;
            }

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            .contenedorPrincipal {
                position: relative;

                .cajaContenidoOculto {
                    position: relative;
                    top: -50%;

                    .cajaContenidoSlider {
                        position: absolute;
                        display: flex;

                        * {
                            font-size: ${tamañoFuente};
                            font-weight: lighter;
                            color: ${color};
                        }

                        .caja {
                            position: relative;
                            top: 0;
                            height: 100%;
                            opacity: 0;
                            transition: 350ms ease-in-out;
                        }

                        .logoCaja {
                            width: var(--logoWidth);

                            .logo {
                                max-width: 140px;
                            }
                        }

                        .textoCaja {
                            width: var(--textoWidth);
                        }

                        .infoCaja {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            width: var(--infoWidth);
                            height: 100%;
                            padding-left: var(--cajasMargin);

                            .redes {
                                display: flex;
                                justify-content: flex-end;
                                width: 100%;
                                height: ${tamañoIcono};

                                .cajaIconoIndividual {
                                    width: ${tamañoIcono};
                                    aspect-ratio: 1/1;;
                                    margin-left: 12px;
                                    border: 1px solid grey;
                                    border-radius: 4px;
                                    cursor: pointer;

                                    .icono {
                                        width: 90%;
                                        height: 90%;
                                        background-position: center;
                                        background-repeat: no-repeat;
                                        background-size: cover;
                                        filter: brightness(0.2);
                                    }
                                }
                            }

                            .cajaContacto {
                                width: 100%;
                                height: 50px;

                                .contacto {
                                    display: flex;
                                    width: 100%;
                                    height: 50%;

                                    .cajaIcono {
                                        width: ${tamañoIcono};
                                        height: ${tamañoIcono};
                                        margin-right: 14px;

                                        .icono {
                                            width: 80%;
                                            height: 80%;
                                            background-position: center;
                                            background-repeat: no-repeat;
                                            background-size: cover;
                                            filter: brightness(0.2);
                                        }
                                    }

                                    .numero {
                                        display: flex;
                                        align-items: center;
                                        width: calc(100% - ${tamañoIcono} + 14px);
                                        height: 100%;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        
            .max {
                width: 100%;
                height: 100%;
            }

            .centrado {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .transicion { transition: 2000ms ease-in-out; }`
    }

    #crearTag(tag, contenedor, clases = null) {
        const nuevoTag = contenedor.appendChild(document.createElement(tag))
        clases && (nuevoTag.className = clases)
        return nuevoTag
    }

    #importarFuente(href) {
        if (!document.head.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            document.head.appendChild(link);
        }
    }

    #dibujarContenido(modulo) {
        const cajaContenidoOculto = this.dom.querySelector(".cajaContenidoOculto")

        this.#info.forEach(item => {
            const cajaContenido = this.#crearTag("div", cajaContenidoOculto, "cajaContenidoSlider max")
            const grupo = []

            Object.entries(item).forEach(([key, value]) => {
                const caja = this.#crearTag("div", cajaContenido, `${key}Caja caja centrado`)

                if (key === "logo") {
                    const logo = caja.appendChild(document.createElement("img"))
                    logo.classList.add("logo")
                    logo.src = value
                    logo.alt = "logotipo"
                }

                key === "texto" && (caja.textContent = value)

                if (key === "info") {
                    Object.entries(value).forEach(([tipo, value]) => {

                        if (tipo === "redes") {
                            const redes = this.#crearTag("div", caja, "redes")

                            value.forEach(item => {
                                const cajaIconoIndividual = this.#crearTag("div", redes, "cajaIconoIndividual centrado")
                                const icono = this.#crearTag("div", cajaIconoIndividual, "icono")
                                icono.style.backgroundImage = `url("${item.icono}")`
                            })
                        }

                        if (tipo === "contacto") {
                            const cajaContacto = this.#crearTag("div", caja, "cajaContacto")

                            value.forEach((item, index) => {
                                console.log(item)

                                const contacto = this.#crearTag("div", cajaContacto, "contacto")
                                const cajaIcono = this.#crearTag("span", contacto, "cajaIcono centrado")
                                const icono = this.#crearTag("div", cajaIcono, "icono")
                                icono.style.backgroundImage = `url("${item.icono}")`
                                const numero = this.#crearTag("span", contacto, "numero")
                                numero.textContent += item.contacto
                            })
                        }
                    })
                }
                grupo.push(caja)
            })
            this.#grupos.push(grupo)
        })
    }

    async #animarCajas(grupo, modo) {
        const cajaTempo = parseFloat(getComputedStyle(this.dom.querySelector(".caja")).getPropertyValue("transition")) * 1000

        for (const caja of grupo) {
            caja.style.top = modo ? "50%" : "100%"
            caja.style.opacity = modo ? "1" : "0"
            await new Promise(resolve => setTimeout(resolve, tempo1))
        }
        tempo1 < cajaTempo && await new Promise(resolve => setTimeout(resolve, cajaTempo - tempo1 + 50))
        !modo && grupo.forEach(caja => caja.style.top = "0")
    }

    async #animarGrupos() {
        while (true) {
            for (const grupo of this.#grupos) {
                await this.#animarCajas(grupo, true)
                await new Promise(resolve => setTimeout(resolve, tempo2))
                while (this.#pausa) { await new Promise(resolve => { setTimeout(resolve, 100) }) }
                this.#animarCajas(grupo, false)
            }
        }
    }

    async connectedCallback() {
        this.#importarFuente(fuenteSimbolos)
        this.#importarFuente(fuenteGeneral)
        this.#info = (await import(this.getAttribute("info"))).info
        this.#dibujarContenido()
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.#animarGrupos()

        this.addEventListener("mouseenter", () => this.#pausa = true)
        this.addEventListener("mouseleave", () => this.#pausa = false)
    }
}
customElements.define("slider-vertical-multiple", SliderVerticalMultiple)