const mail = document.querySelector("#mail")
const condiciones = document.querySelector("#condicionesInput")
const enviar = document.querySelector("#enviar")

const validar = (email) => {
    const validacion = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return validacion.test(email) && condiciones.checked
}

const alternarBotonEnvio = () => {
    const valido = validar(mail.value)
    valido && enviar.classList.add("botonActivado")
    !valido && enviar.classList.remove("botonActivado")
    enviar.disabled = !valido
}

mail.addEventListener("input", () => alternarBotonEnvio())
condiciones.addEventListener("input", () => alternarBotonEnvio())