const projects = document.querySelector("#proyectos")
const menus = {
    "proyectos": {
        boton: document.querySelector("#proyectos"),
        subMenu: document.querySelector("#subMenuProyectos")
    }
}


const alternarMenu = async (menu, menuItems, estado) => {
    const menuTempo = parseFloat(getComputedStyle(menu).getPropertyValue("transition")) * 1000
    const itemHeight = parseFloat(getComputedStyle(menuItems[0]).getPropertyValue("height"))
    const subMenuLista = menu.querySelector(".subMenuLista")
    /* defaults */
    const subMenuTop = parseFloat(getComputedStyle(subMenuLista).getPropertyValue("top"))
    const subMenuWidth = getComputedStyle(subMenuLista).getPropertyValue("width")
    const itemTransition = getComputedStyle(menuItems[0]).getPropertyValue("transition")
    /* dinamic */
    const subMenuAlturaDinamica = (menuItems.length * itemHeight) + subMenuTop * 2 + "px"

    if (estado) {
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

/* menus.forEach(item => {
    item.addEventListener("click", (e) => {
        console.log
    })

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
 */


const obtenerEstado = (subMenu) => {
    return subMenu.dataset.abierto
}

const alternarEstado = (estado, subMenu, alturaSubmenu) => {
    if (estado === "true") {
        delete subMenu.dataset.abierto
        subMenu.style.opacity = "0"
        subMenu.style.height = "0"
    } else {
        subMenu.dataset.abierto = true
        subMenu.style.opacity = "1"
        subMenu.style.height = alturaSubmenu + "px"
    }
}

const calcularAltura = (subMenu) => {
    const items = subMenu.querySelectorAll(".subItem").length
    const altura = subMenu.querySelector(".subItem").offsetHeight
    return 40 + altura * items
}

Object.values(menus).forEach(item => {
    item.boton.addEventListener("click", (e) => {
        const subMenu = menus[e.target.id].subMenu
        const estado = obtenerEstado(subMenu)
        const alturaSubmenu = calcularAltura(subMenu)
        alternarEstado(estado, subMenu, alturaSubmenu)
    })
})