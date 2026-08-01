const projects = document.querySelector("#navProject")
const menus = [projects]

const toogleMenuMox = async (menu, menuItems, open) => {
    const menuTime = parseFloat(getComputedStyle(menu).getPropertyValue("transition")) * 1000
    const itemHeight = parseFloat(getComputedStyle(menuItems[0]).getPropertyValue("height"))
    const subMenu = menu.querySelector(".subMenu")
    /* defaults */
    const subMenuTop = parseFloat(getComputedStyle(subMenu).getPropertyValue("top"))
    const subMenuWidth = getComputedStyle(subMenu).getPropertyValue("width")
    const itemTransition = getComputedStyle(menuItems[0]).getPropertyValue("transition")
    /* dinamic */
    const dinamicHeight = (menuItems.length * itemHeight) + subMenuTop * 2 + "px"

    if (open) {
        menu.style.opacity = 1
        menu.style.height = dinamicHeight
        await new Promise(resolve => setTimeout(resolve, menuTime))
        moveMenuItems(menuItems, true)
    } else {
        menu.style.height = 0
        await new Promise(resolve => setTimeout(resolve, menuTime))
        menu.style.opacity = 0
        menuItems.forEach(item => item.style.transition = "none")
        void menuItems[0].offsetHeight
        await moveMenuItems(menuItems, false)
        menuItems.forEach(item => item.style.transition = itemTransition)
    }
}

const moveMenuItems = async (items, toRight) => {
    for (const item of items) {
        const point = toRight ? "0%" : "100%"
        item.style.right = point;
        void items[0].offsetHeight
        toRight && await new Promise(resolve => setTimeout(resolve, 100))
    }
}

menus.forEach(item => {
    item.addEventListener("mouseover", async (e) => {
        const menu = document.querySelector(`#${e.target.id}-menu`) || null
        const menuItems = menu?.querySelectorAll("li") || null
        menuItems && await toogleMenuMox(menu, menuItems, true)
    })

    item.addEventListener("mouseleave", async (e) => {
        const menu = document.querySelector(`#${e.target.id}-menu`) || null
        const menuItems = menu?.querySelectorAll("li")
        menuItems && await toogleMenuMox(menu, menuItems, false)
    })
})
