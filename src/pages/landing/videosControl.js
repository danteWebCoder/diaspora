const videoInputs = document.querySelectorAll(".opcionOculta[name='video']")
const videos = {
    0: {
        url: `<iframe class="max" src="https://www.youtube.com/embed/E-E2wjfvbEE?si=4cwaqcL9twEyrbWU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        titulo: "Titulo video 1"
    },
    1: {
        url: `<iframe class="max" src="https://www.youtube.com/embed/CF2fwuf9TNk?si=8NpgUP1p_KH4FAh4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        titulo: "Titulo video 2"
    },
    2: {
        url: `<iframe class="max" src="https://www.youtube.com/embed/bocxIfCGB7g?si=4_PqmSOBMvCpjvtB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        titulo: "Titulo video 3"
    },
    3: {
        url: `<iframe class="max" src="https://www.youtube.com/embed/Zik1cAnvVT0?si=jCHGXShpZWMBgoIp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        titulo: "Titulo video 4"
    }
}

const cambiarVideo = (index) => {
    const reproductor = document.querySelector("#reproductor")
    reproductor.innerHTML = videos[index].url
}

const cambiarTitulo = (index) => {
    const cajaTituloVideo = document.querySelector("#cajaTituloVideo")
    cajaTituloVideo.textContent = videos[index].titulo
}

videoInputs.forEach(radio => {
    radio.addEventListener("change", (e) => {
        const index = Array.from(videoInputs).indexOf(e.target)
        cambiarVideo(index)
        cambiarTitulo(index)
    })
})

/* video por defecto */
videoInputs[0].dispatchEvent(new Event("change"))