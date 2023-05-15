export const convert24to12 = (time) => {
    let hour = time.split(':')[0]
    let minute = time.split(':')[1]
    let dayTime = 'AM'
    if (hour === '12') dayTime = 'PM'
    if (hour === '00') hour = '12'
    if (parseInt(hour) > 12) {
        dayTime = 'PM'
        hour = (parseInt(hour) - 12).toString()
    }
    if (hour.length === 1) hour = '0' + hour
    let convertedTime = hour + ':' + minute + ' ' + dayTime

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