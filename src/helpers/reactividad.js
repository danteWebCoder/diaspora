export const reactivo = (objeto, arrayFn = null) => {

    let propFn = {}
    arrayFn && (propFn[Object.keys(objeto)[0]] = arrayFn)

    const {proxy, revoke} = Proxy.revocable(objeto, {
        set(obj, prop, value) {
            obj[prop] = value
            propFn?.[prop]?.forEach(fn => fn(value))
            return true
        }
    })

    proxy.incluir = (nuevaProp, nuevoArrayFn) => {
        const propString = typeof nuevaProp === "string"
        const nombreProp = propString ? nuevaProp : Object.keys(nuevaProp)[0]
        
        if (objeto[nombreProp] && !propString) {
            console.error(`reactivo incluir: ${nombreProp} ya fue declarada anteriormente`)
            return null
        }
        !propString && (objeto[nombreProp] = Object.values(nuevaProp)[0])
        propFn[nombreProp] ??= []
        nuevoArrayFn.forEach(fn => propFn[nombreProp].push(fn))
    }

    proxy.propiedades = () => Object.fromEntries(Object.entries(objeto).filter(item => typeof objeto[item[0]] !== "function"))

    proxy.acciones = (prop = null) => {
        if(!propFn) return null
        if (prop && !propFn[prop]) return null
        return prop ? propFn[prop] : propFn
    }

    proxy.eliminar = () => {
        propFn = null
        revoke()
    } 

    return proxy
}