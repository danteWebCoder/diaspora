import { estado } from "./reactivo.js"
import * as nav from "./dependencias/nav.js"
import * as menu from "./dependencias/menu.js"
import * as intro from "./dependencias/intro.js"
import * as video from "./videos.js"

estado.incluir("scroll", [
    nav.alternarNav,
    nav.resetSubMenus,
    menu.cambiarColorIcono,
    intro.iniciarEstadisticasTarjetas,
    video.changeBackground
])