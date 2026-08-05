const projects = document.querySelector("#proyectos")
const menus = [projects]

const alternarMenu = async (menu, menuItems, abierto) => {
    const menuTempo = parseFloat(getComputedStyle(menu).getPropertyValue("transition")) * 1000
    const itemHeight = parseFloat(getComputedStyle(menuItems[0]).getPropertyValue("height"))
    const subMenuLista = menu.querySelector(".subMenuLista")
    /* defaults */
    const subMenuTop = parseFloat(getComputedStyle(subMenuLista).getPropertyValue("top"))
    const subMenuWidth = getComputedStyle(subMenuLista).getPropertyValue("width")
    const itemTransition = getComputedStyle(menuItems[0]).getPropertyValue("transition")
    /* dinamic */
    const subMenuAlturaDinamica = (menuItems.length * itemHeight) + subMenuTop * 2 + "px"

    if (abierto) {
        menu.style.opacity = 1
        menu.style.height = subMenuAlturaDinamica
        await new Promise(resolve => setTimeout(resolve, menuTempo))
        moverItemsLista(menuItems, true)
    } else {
        menu.style.height = 0
        await new Promise(resolve => setTimeout(resolve, menuTempo))
        menuItems.forEach(item => item.style.transition = "none")
        menu.style.opacity = 0
        void menuItems[0].offsetHeight
        await moverItemsLista(menuItems, false)
        menuItems.forEach(item => item.style.transition = itemTransition)
    }
}

const moverItemsLista = async (items, toRight) => {
    for (const item of items) {
        const point = toRight ? "0%" : "100%"
        item.style.right = point;
        void items[0].offsetHeight
        toRight && await new Promise(resolve => setTimeout(resolve, 100))
    }
}

menus.forEach(item => {
    item.addEventListener("mouseover", async (e) => {
        const menu = document.querySelector(`#${e.target.id}-subMenu`) || null
        const menuItems = menu?.querySelectorAll("li") || null
        menuItems && await alternarMenu(menu, menuItems, true)
    })

    item.addEventListener("mouseleave", async (e) => {
        const menu = document.querySelector(`#${e.target.id}-subMenu`) || null
        const menuItems = menu?.querySelectorAll("li")
        menuItems && await alternarMenu(menu, menuItems, false)
    })
})
