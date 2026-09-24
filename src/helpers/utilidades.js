export const getTempo = (elemento) => {
    const transicion = getComputedStyle(elemento).getPropertyValue("transition-duration")
    if (transicion.includes("ms")) {
        return parseFloat(transicion)
    }
    return parseFloat(transicion) * 1000
}

export const sleep = async (ms) => {
    await new Promise(resolve => setTimeout(resolve, ms))
}