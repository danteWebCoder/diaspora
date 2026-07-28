/* menu */
const menu = document.querySelector("#landingMenu")
const wellcome = document.querySelector(".wellcome")
const menuHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--menuHeight"))
const wellcomeHeight = parseFloat(window.getComputedStyle(wellcome).getPropertyValue("height"))
const menuTime = parseFloat(window.getComputedStyle(menu).getPropertyValue("transition")) * 1000
/* info image */
const image = document.querySelector("#imageBox .image")
const imageTime = parseFloat(window.getComputedStyle(image).getPropertyValue("transition")) * 1000

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

const fadeIn_imageInfo = async () => {

    image.classList.add("image250")
    await new Promise(resolve => setTimeout(resolve, imageTime))

    image.classList.remove("image250")
    image.classList.add("image80")
    await new Promise(resolve => setTimeout(resolve, imageTime))

/*     image.style.transition = imageTime + "ms ease-in-out"
 */    image.classList.remove("image80")
    image.classList.add("imageMax")
}

let pos = 0
let imageInfo_opened = false
window.addEventListener("scroll", async () => {
    const posY = window.scrollY

    /* menu */
    if (posY >= wellcomeHeight - menuHeight && posY > pos) {
        doVisible()
    }
    if (posY <= wellcomeHeight && posY < pos) {
        doHidden()
    }
    /* info image */
    if (posY >= wellcomeHeight && !imageInfo_opened) {
        imageInfo_opened = true
        fadeIn_imageInfo()
    }

    pos = posY
})