export const convertDateToYMD = (date) => {
    let aDate = new Date(date)
    let month = aDate.toLocaleDateString('en', { month: '2-digit' })
    let year = aDate.toLocaleDateString('en', { year: 'numeric' })
    let day = aDate.toLocaleDateString('en', { day: '2-digit' })

    return (year + '-' + month + '-' + day)
}