/* menu */
const menu = document.querySelector("#contenedorNav")
const presentacion = document.querySelector(".presentacion")
const menuHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--menuHeight"))
const wellcomeHeight = parseFloat(window.getComputedStyle(presentacion).getPropertyValue("height"))


const visibilizar = async () => {
    menu.classList.remove("oculto")
    menu.classList.add("menuVisible")
    await new Promise(resolve => setTimeout(resolve, 10))
    menu.style.opacity = 1
}

const ocultar = async () => {
    menu.style.opacity = 0
    await new Promise(resolve => setTimeout(resolve, 10))
    menu.classList.add("oculto")
    menu.classList.remove("menuVisible")
}

let pos = 0
let imageInfo_opened = false
window.addEventListener("scroll", async () => {
    const posY = window.scrollY

    /* menu */
    if (posY > wellcomeHeight && posY > pos) {
        visibilizar()
    }
    if (posY <= wellcomeHeight && posY < pos) {
        ocultar()
    }
    pos = posY
})