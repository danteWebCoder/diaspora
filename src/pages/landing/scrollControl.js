/* menu */
const menu = document.querySelector("#landingMenu")
const wellcome = document.querySelector(".wellcome")
const menuHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--menuHeight"))
const wellcomeHeight = parseFloat(window.getComputedStyle(wellcome).getPropertyValue("height"))
const menuTime = parseFloat(window.getComputedStyle(menu).getPropertyValue("transition")) * 1000
/* info image */
/* const infoSection = document.querySelector("#infoSection")
const infoSection_height = parseFloat(getComputedStyle(infoSection).getPropertyValue("height"))
 */const image = document.querySelector("#imageBox .image")


const doVisible = async () => {
    menu.classList.remove("hidden")
    await new Promise(resolve => setTimeout(resolve, 10))
    menu.style.opacity = 1
}

const doHidden = async () => {
    menu.style.opacity = 0
    await new Promise(resolve => setTimeout(resolve, menuTime))
    menu.classList.add("hidden")
}

const fadeIn_imageInfo = () => {

}

let pos = 0
window.addEventListener("scroll", () => {
    const posY = window.scrollY

    /* menu */
    if (posY >= wellcomeHeight - menuHeight && posY > pos) {
        doVisible()
        pos = posY
    }
    if (posY <= wellcomeHeight && posY < pos) {
        doHidden()
        pos = posY
    }
    /* info image */
    if (posY >= wellcomeHeight) {
        image.classList.replace("imageMin", "imageMax")
        pos = posY
    }
    if (posY < wellcomeHeight) {
        image.classList.replace("imageMax", "imageMin")
        pos = posY
    }
})