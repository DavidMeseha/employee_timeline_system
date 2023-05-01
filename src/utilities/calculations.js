export const calculateHeightFromMinutes = (endMinutes, startMinutes) => {
    return (endMinutes - startMinutes) + ((endMinutes - startMinutes) / 15)
}

export const calculateMinutesFromHeight = (height, startMinutes) => {
    return ((height * 15) / 16) + startMinutes
}

export const calculateTopFromMinutes = (startMinutes) => {
    return (startMinutes + (startMinutes / 15) - 1
    )
}