export const display = {
    scroll: window.scrollY,
    altura: window.innerHeight
}

window.addEventListener("scroll", () =>  display.scroll = window.scrollY)
window.addEventListener("resize", () =>  display.altura = window.innerHeight)