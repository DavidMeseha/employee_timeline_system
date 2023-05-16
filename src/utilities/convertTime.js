export const convert24to12 = (time) => {
    let aDate = new Date()
    aDate.setHours(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]))
    let convertedTime = aDate.toLocaleTimeString('en', { hour12: true, hour: '2-digit', minute: '2-digit' })

    return convertedTime
}

export const convert12to24 = (time) => {
    let timeValue = time
    let hour = timeValue.split(':')[0]
    let mins = timeValue.split(':')[1].split(' ')[0]
    let dayTime = timeValue.split(' ')[1]
    if (dayTime === 'PM' && hour !== '12') {
        hour = parseInt(hour) + 12
    }
    if (hour === '12' && dayTime === 'AM') hour = '00'

    let convertedTime = hour + ':' + mins

    return convertedTime
}