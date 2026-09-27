import { viewPort } from "./monitorViewPort.js"
import * as nav from "./nav.js"

viewPort.incluir("scroll", [nav.alternarNav, nav.resetSubMenus])