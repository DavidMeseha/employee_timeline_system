export const processTime = (time) => {
    let value = time
    let minutes = parseInt(value.split(':')[1])
    let hour = value.split(':')[0]
    if ((minutes / 5) % 1 === 0) return value
    if ((minutes / 5) % 1 !== 0) minutes = ((((~~(minutes / 5)) + 1) * 5)) % 60
    value = hour + ':' + minutes
    return value
}