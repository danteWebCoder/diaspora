export const reaccionar = (obj, callbacks) => {
    return new Proxy(obj, {
        set(obj, prop, value) {
            obj[prop] = value
            callbacks.forEach(item => item(value))
            return true
        }
    })
}