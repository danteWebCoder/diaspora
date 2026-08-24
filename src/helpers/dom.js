export const add = (element, box, classes = null, id = null) => {
    const newElement = box.appendChild(document.createElement(element))
    classes && (newElement.className = classes)
    id && (newElement.id = id)
    return newElement
}