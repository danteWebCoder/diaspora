import { viewPort } from "./monitorViewPort.js"
import * as nav from "./nav.js"
import * as menu from "./menu.js"

viewPort.incluir("scroll", [nav.alternarNav, nav.resetSubMenus, menu.cambiarColorIcono])