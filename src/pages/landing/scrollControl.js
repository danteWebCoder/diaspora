const menu = document.querySelector("#menu")
const maxHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--menuHeight_max"))
let menuState = "max"

console.log(maxHeight)

const minimizeMenu = (posY) => {
    if (menuState === "max") {
        if (posY >= maxHeight) {
            menu.classList.replace("menu_maxHeight", "menu_minHeight")
        }
    }
}

window.addEventListener("scroll", () => {
    const posY = window.scrollY
    console.log(posY)
})