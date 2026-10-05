class cloudBack extends HTMLElement {
    #items = []

    constructor() {
        super()

        this.minSize = 200 /* px */
        this.maxSize = 400 /* px */
        this.items = 50
        this.color = "var(--enfasis)"
        this.tempo = "10000" /* ms */
        this.blur = "60"
        this.opacity = "0.2"
        this.colors = [
            "cyan",
            "DarkSlateBlue",
            "GreenYellow",
            "magenta",
            "aquamarine",
            "MediumPurple",
            "Teal",
            "SpringGreen",
            "firebrick",
            "mediumseagreen",
            "orange",
        ]

        this.dom = this.attachShadow({ mode: "open" })
        this.dom.innerHTML = `
            <ul class="main"></ul>
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
                list-style: none;
                width: 100%;
                height: 100%;
                filter: blur(${this.blur}px);
                overflow: hidden;

                .item {
                    --itemSize: 0;
                    --originLeft: 0;
                    --originTop: 0;
                    --finalLeft: 0;
                    --finalTop: 0;
                    --bg-color: transparent;

                    position: absolute;
                    top: var(--initialTop);
                    left: var(--initialLeft);
                    width: var(--itemSize);
                    aspect-ratio: 1/1;
                    border-radius: 50%;
                    background-color: var(--bg-color);
                    opacity: ${this.opacity};
                }
            }

            .animated {
                animation: cloud ${this.tempo}ms ease-in-out forwards;
            }

            .paused {
                animation-play-state: paused;
            }

            @keyframes cloud {
                from {
                    top: var(--initialTop);
                    left: var(--initialLeft);
                }
                to {
                    top: var(--finalTop);
                    left: var(--finalLeft);
                }
            }
        `
    }

    #createItems(main) {
        for (let i = 0; i < this.items; i++) {
            const newItem = main.appendChild(document.createElement("li"))
            newItem.classList.add("item")
        }
        return this.dom.querySelectorAll(".item")
    }

    #randomize(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    #getVPSize(main) {
        return { vw: main.offsetWidth, vh: main.offsetHeight }
    }

    #generateNewSize() {
        return this.#randomize(this.minSize, this.maxSize) + "px"
    }

    #generateNewColor() {
        return this.colors[this.#randomize(0, this.colors.length - 1)]
    }

    #generateNewPos(item, vpSize) {
        const itemSize = item.offsetWidth
        const randomTopPX = this.#randomize(itemSize / -2, vpSize.vh - itemSize / 2)
        const topPercent = (randomTopPX / vpSize.vh) * 100
        const randomLeftPX = this.#randomize(itemSize / -2, vpSize.vw - itemSize / 2)
        const leftPercent = (randomLeftPX / vpSize.vw) * 100
        return [topPercent, leftPercent]
    }

    #generateNewVars(item, vpSize) {
        item.style.setProperty("--itemSize", this.#generateNewSize())
        const newPos = this.#generateNewPos(item, vpSize)
        item.style.setProperty("--initialTop", newPos[0] + "%")
        item.style.setProperty("--initialLeft", newPos[1] + "%")
        item.style.setProperty("--bg-color", this.#generateNewColor())
    }

    #getActualPos(item) {
        const pos = getComputedStyle(item)
        return [
            pos.top,
            pos.left
        ]
    }

    async #animate(vpSize) {

        const animation = async (item, vpSize) => {
            const actualPos = this.#getActualPos(item)
            item.style.setProperty("--initialTop", actualPos[0])
            item.style.setProperty("--initialLeft", actualPos[1])

            item.classList.remove("animated")
            item.offsetHeight

            const newPos = this.#generateNewPos(item, vpSize)
            item.style.setProperty("--finalTop", newPos[0] + "%")
            item.style.setProperty("--finalLeft", newPos[1] + "%")

            item.classList.add("animated")
        }

        for (const item of this.#items) {
            item.addEventListener("animationend", async () => animation(item, vpSize))
            animation(item, vpSize)
            await new Promise(resolve => setTimeout(resolve, 200))
        }
    }

    pause(bol) {
        this.#items.forEach(item => item.classList.toggle("paused", bol))
    }

    async init() {
        const main = this.dom.querySelector(".main")
        const vpSize = this.#getVPSize(main)
        this.#items = this.#createItems(main)
        this.#items.forEach(item => this.#generateNewVars(item, vpSize))
        this.#animate(vpSize)
    }

    connectedCallback() {
        this.init()
    }
}
customElements.define("cloud-back", cloudBack)