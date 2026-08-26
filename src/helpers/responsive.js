const mediaQueries = document.documentElement.getAttribute("data-responsive").split(" ").map(Number).sort((a, b) => b - a)
let mediaQueryActual = mediaQueries.findLast(item => window.innerWidth <= item) || null
console.log(mediaQueryActual)

window.addEventListener("resize", (e) => {
    const query = mediaQueries.findLast(item => window.innerWidth <= item)
    if (query && mediaQueryActual !== query) {
        mediaQueryActual = query
        console.log(mediaQueryActual)
        cambiarMedia(mediaQueryActual)
    }
})

const aplicarClases = (elemento, add, remove) => {
    add && add.forEach(item => elemento.classList.add(item))
    remove && remove.forEach(item => elemento.classList.remove(item))
    console.log(elemento, add, remove)
}

const cambiarMedia = (media) => {
    const elementos = document.querySelectorAll(`[media-${media}]`)
    elementos.forEach(elemento => {
        console.log(elemento)

        const clases = elemento.getAttribute(`media-${media}`)
        const add = clases.match(/add:\s*\[([^\]]+)\]/)?.[1]?.split(",").map(c => c.trim()) || []
        const remove = clases.match(/remove:\s*\[([^\]]+)\]/)?.[1]?.split(",").map(c => c.trim()) || []
        aplicarClases(elemento, add, remove)
    })
}