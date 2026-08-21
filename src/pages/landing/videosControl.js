const miniaturasVideos = document.querySelectorAll("img[alt='miniaturaVideo']")
const videos = {
    0: {
        enlace: `<iframe class="max" src="https://www.youtube.com/embed/E-E2wjfvbEE?si=4cwaqcL9twEyrbWU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        titulo: "Titulo 0",
        info: "info video 0"
    },
    1: {
        enlace: `<iframe class="max" src="https://www.youtube.com/embed/CF2fwuf9TNk?si=8NpgUP1p_KH4FAh4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        titulo: "Titulo 1",
        info: "info video 1"
    },
    2: {
        enlace: `<iframe class="max" src="https://www.youtube.com/embed/bocxIfCGB7g?si=4_PqmSOBMvCpjvtB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        titulo: "Titulo 2",
        info: "info video 2"
    },
    3: {
        enlace: `<iframe class="max" src="https://www.youtube.com/embed/Zik1cAnvVT0?si=jCHGXShpZWMBgoIp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        titulo: "Titulo 3",
        info: "info video 3"
    }
}


const titulo = document.querySelector("#tituloVideo")
const info = document.querySelector("#infoVideo")

const cambiarVideo = (index) => {
    const reproductor = document.querySelector("#cajaReproductor")
    reproductor.innerHTML = videos[index].enlace
    titulo.textContent = videos[index].titulo
    info.textContent = videos[index].info
}



miniaturasVideos.forEach(radio => { radio.addEventListener("click", (e) => cambiarVideo(Array.from(miniaturasVideos).indexOf(e.target))) })

/* video por defecto */
miniaturasVideos[0].dispatchEvent(new Event("click"))