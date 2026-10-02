class cloudBack extends HTMLElement {
    constructor() {
        super()

        this.minSize = 100 /* px */
        this.maxSize = 400 /* px */
        this.items = 80
        this.color = "var(--enfasis)"
        this.pause = false

        this.dom = this.attachShadow({ mode: "open" })
        this.dom.innerHTML = `
            <div class="main"></div>
        `

        const customStyle = this.dom.appendChild(document.createElement("style"))
        customStyle.textContent = `
            :root {
                width: 100%;
                height: 100%;
            }

            * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }

            .main {
                position: relative;
                width: 100%;
                height: 100%;
                filter: blur(60px);
                overflow: hidden;

                .square {
                    position: absolute;
                    border-radius: 50%;
                    background-color: white;
                    opacity: 0.2;
                }
            }

            .animated {
                transition: 20000ms;
            }
        `
    }

    #createItems(main) {
        for (let i = 0; i < this.items; i++) {
            const newItem = main.appendChild(document.createElement("div"))
            newItem.classList.add("square")
        }
        return this.dom.querySelectorAll(".square")
    }

    #randomize(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    #generateSizes(items) {
        items.forEach(item => {
            item.style.width = `${this.#randomize(this.minSize, this.maxSize)}px`
            item.style.aspectRatio = "1/1"
        })
    }

    #getVPSize(main) {
        return { vw: main.offsetWidth, vh: main.offsetHeight }
    }

    #generatePos(item, vpSize) {
        const itemSize = item.offsetWidth
        const randomTopPX = this.#randomize(itemSize * -1, vpSize.vh + itemSize)
        const topPercent = (randomTopPX / vpSize.vh) * 100
        const randomLeftPX = this.#randomize(itemSize * -1, vpSize.vw + itemSize)
        const leftPercent = (randomLeftPX / vpSize.vw) * 100
        item.style.top = `${topPercent}%`
        item.style.left = `${leftPercent}%`
    }

    async #animate(items, vpSize) {
        while (!this.pause) {
            const itemSelected = items[this.#randomize(0, items.length - 1)]
            if (itemSelected.classList.contains("animated")) {
                itemSelected.classList.remove("animated")
            } else {
                itemSelected.classList.add("animated")
                this.#generatePos(itemSelected, vpSize)
            }
            await new Promise(resolve => setTimeout(resolve, 200))
        }
    }

    async init() {
        const main = this.dom.querySelector(".main")
        const vpSize = this.#getVPSize(main)
        const items = this.#createItems(main)
        this.#generateSizes(items)
        items.forEach(item => this.#generatePos(item, vpSize))

        await new Promise(resolve => setTimeout(resolve, 100))
        this.#animate(items, vpSize)
    }

    connectedCallback() {
        this.init()
    }
}
customElements.define("cloud-back", cloudBack)