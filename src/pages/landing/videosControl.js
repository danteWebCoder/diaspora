const cajasMiniaturas = [...document.querySelectorAll(".cajaMiniatura")]
const miniaturas = [...cajasMiniaturas].map(caja => getComputedStyle(caja).getPropertyValue("background-image"))
const reproductor = document.querySelector("#cajaReproductor")

console.log(miniaturas, cajasMiniaturas)

const videos = [
    `<iframe class="max" src="https://www.youtube.com/embed/E-E2wjfvbEE?si=4cwaqcL9twEyrbWU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    `<iframe class="max" src="https://www.youtube.com/embed/CF2fwuf9TNk?si=8NpgUP1p_KH4FAh4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    `<iframe class="max" src="https://www.youtube.com/embed/bocxIfCGB7g?si=4_PqmSOBMvCpjvtB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
]

const restaurarMiniaturas = (indexSeleccion) => {
    cajasMiniaturas.forEach((item, index) => {
        if (index !== indexSeleccion) {
            console.log(item)
            item.innerHTML = ""
        }
    })
}

const cambiarVideo = (index, mobile) => {
    !mobile && (reproductor.innerHTML = videos[index])
    if (mobile) {
        restaurarMiniaturas(index)
        cajasMiniaturas[index].innerHTML = videos[index]
    }
}

cajasMiniaturas.forEach(caja => {
    caja.addEventListener("click", (e) => {
        const mobile = window.innerWidth <= 700 ? true : false
        console.log(mobile)
        cambiarVideo(Array.from(cajasMiniaturas).indexOf(e.target), mobile)
    })
})

/* video por defecto */
const mobile = window.innerWidth <= 700 ? true : false
cajasMiniaturas[0].dispatchEvent(new Event("click"))