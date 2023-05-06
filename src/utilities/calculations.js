export const calculateHeightFromMinutes = (endMinutes, startMinutes) => {
    return ((endMinutes - startMinutes) * 2) + ((endMinutes - startMinutes) / 15)
}

export const calculateMinutesFromHeight = (height, startMinutes) => {
    return ((height * 15) / 31) + startMinutes
}

export const calculateTopFromMinutes = (startMinutes) => {
    return startMinutes * 2 + (startMinutes / 15) - 1
}

export const calculateMinutesFromTop = (topPixels) => {
    return ((topPixels/2) * 30) / 31
}