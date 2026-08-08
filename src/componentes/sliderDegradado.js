const fuenteSimbolos = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap";
const fuenteGeneral = "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
const colorSimbolosHover = "rgb(252, 201, 31)"
const tempo1 = 1000
const tempo2 = 5000 /* tiempo de aparacion entre grupos */

class SliderDegradado extends HTMLElement {

    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })
        this.dom.innerHTML = `
            <div class="contenedorPrincipal max centrado">
                <div class="cajaSlider max"></div>
                <div class="degradado"><div class="botonSlider centrado izq">&lt;</div></div>
                <div class="degradado"><div class="botonSlider centrado">&gt;</div></div>
            </div>`

        const estiloComponente = this.dom.appendChild(document.createElement("style"))
        estiloComponente.textContent = `
            :host {
                width: 100%;
                height: 100%;

                --degradadoWidth: 80px;
                --itemsMargin: 20px;
                --logoWidth: 30%;
                --textoWidth: 40%;
                --infoWidth: 30%;
            }

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            .contenedorPrincipal {
                position: relative;
                border: 1px solid blue;

                .cajaSlider {
                    position: relative;
                    overflow: hidden;

                    .cajaGrupo {
                        position: absolute;
                        display: flex;
                        justify-content: space-between;
                        border: 1px solid red;

                        .itemGrupo {
                            height: 100%;
                            border: 1px solid gray;
                        }

                        .logoItem {
                            width: var(--logoWidth);
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                        }

                        .textoItem {
                            width: var(--textoWidth);
                        }

                        .infoItem {
                            width: var(--infoWidth);
                        }
                    }
                }

                .degradado {
                    position: absolute;
                    width: var(--degradadoWidth);
                    height: 100%;
                    border: 1px solid gray;

                    &:nth-child(1 of &) {
                        left: 0;
                        background: linear-gradient(90deg, var(--blanco) 40px, var(--blancoTransparente) 100%);
                    }

                    &:nth-child(2 of &) {
                        right: 0;
                        background: linear-gradient(90deg, var(--blancoTransparente) 0%, var(--blanco) calc(100% - 40px));
                        display: flex;
                        justify-content: flex-end;
                    }

                    .botonSlider {
                        width: 30px;
                        height: 100%;
                        background-color: red;
                        font-family: "DM Sans";
                        font-size: 28px;
                        color: var(--blanco);
                        background-color: var(--negro);
                        border-radius: 4px;
                        opacity: 0;
                        cursor: pointer;
                        transition: opacity 200ms;

                        &:hover {
                            color: ${colorSimbolosHover};
                        }
                    }
                }

                &:hover .degradado .botonSlider {
                    opacity: 1;
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

            .transicion {
                transition: 2000ms ease-in-out;
            }
        `
    }

    #importarFuente(href) {
        if (!document.head.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            document.head.appendChild(link);
        }
    }

    #crearCajas(modulo) {
        const cajaSlider = this.dom.querySelector(".cajaSlider")
        const contenido = []
        modulo.info.forEach((item, index) => {
            const cajaGrupo = cajaSlider.appendChild(document.createElement("div"))
            cajaGrupo.classList.add("cajaGrupo", "max")

            Object.entries(item).forEach(([key, value]) => {
                const itemGrupo = cajaGrupo.appendChild(document.createElement("div"))
                itemGrupo.classList.add(`${key}Item`, "itemGrupo", "transicion")
                key === "logo" && (itemGrupo.style.backgroundImage = `url(${value})`)
                key === "texto" && (itemGrupo.textContent = value)
                key === "info" && (itemGrupo.textContent = value)
            })
            contenido.push(cajaGrupo)
        })
        return contenido
    }

    async #animarCajas(gruposDerecha) {
        const gruposIzquierda = []
        for (const grupo of gruposDerecha) {
            let cont = 0
            for (const caja of grupo) {
                console.log(cont)
                cont === 0 && (caja.style.left = "var(--logoPos)")
                cont === 1 && (caja.style.left = "var(--textoPos)")
                cont === 2 && (caja.style.left = "var(--infoPos)")
                cont = cont !== 2 ? cont + 1 : 0
                await new Promise(resolve => setTimeout(resolve, tempo1))
            }
            await new Promise(resolve => setTimeout(resolve, tempo2))
        }
    }

    async connectedCallback() {
        this.#importarFuente(fuenteSimbolos)
        this.#importarFuente(fuenteGeneral)
        const contenido = await this.#crearCajas(await import(this.getAttribute("info")))
        await new Promise(resolve => setTimeout(resolve, 1000))
    }
}
customElements.define("slider-degradado", SliderDegradado)