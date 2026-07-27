const menu = document.querySelector("#landingMenu")
const wellcome = document.querySelector(".wellcome")
const menuHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--menuHeight"))
const wellcomeHeight = parseFloat(window.getComputedStyle(wellcome).getPropertyValue("height"))
const menuTime = parseFloat(window.getComputedStyle(menu).getPropertyValue("transition")) * 1000
const visibilityPoint = wellcomeHeight * 0.8 - menuHeight

const doVisible = async () => {
    menu.classList.remove("hidden")
    await new Promise(resolve => setTimeout(resolve, 10))
    menu.style.opacity = 1
    visible = true
}

const doHidden = async () => {
    menu.style.opacity = 0
    await new Promise(resolve => setTimeout(resolve, menuTime))
    menu.classList.add("hidden")
    visible = false
}

let visible = false
window.addEventListener("scroll", () => {
    const posY = window.scrollY
    if (posY >= visibilityPoint && !visible) doVisible()
    if (posY < visibilityPoint && visible) doHidden()
})