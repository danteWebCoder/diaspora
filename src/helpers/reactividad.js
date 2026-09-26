export const reactivo = (objeto, arrayFn) => {

    const propFn = {}
    propFn[Object.keys(objeto)[0]] = arrayFn

    const proxy = new Proxy(objeto, {
        set(obj, prop, value) {
            obj[prop] = value
            propFn[prop]?.forEach(fn => fn(value))
            return true
        }
    })

    proxy.incluir = (nuevaProp, nuevoArrayFn) => {
        const nombreProp = Object.keys(nuevaProp)[0]
        objeto[nombreProp] ??= nuevaProp[nombreProp]
        propFn[nombreProp] ??= []
        nuevoArrayFn.forEach(fn => propFn[nombreProp].push(fn))
    }

    proxy.propiedades = () => Object.fromEntries(Object.entries(objeto).filter(item => typeof objeto[item[0]] !== "function"))

    proxy.acciones = (prop = null) => {
        if (prop && !propFn[prop]) return null
        return prop ? propFn[prop] : propFn
    }

    proxy.eliminar = () => propFn = null

    return proxy
}