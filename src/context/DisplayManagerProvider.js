import { createContext, useEffect, useState } from "react";

const DisplayManagerContext = createContext({})

export const DisplayManagerProvider = ({ children }) => {
    const [employees, setEmployees] = useState([])
    const [displayDate, setDisplayDate] = useState()
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [format, setFormat] = useState('daily')

    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const setInitalDisplay = () => {
            let data = [
                { id: '01', name: 'Marcos' },
                { id: '02', name: 'David' },
                { id: '03', name: 'Many Name so on' }
            ]

            setEmployees(data)

            setDisplayDate(new Date().toLocaleDateString('en', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }))

            let selectedTemp = []
            data.forEach(employee => {
                selectedTemp.push(employee.name)
            });
            setSelectedEmployees(selectedTemp)
        }

        setInitalDisplay()
    }, [])

    useEffect(() => {
        const dateDisplayFormat = () => {
            console.log(date)
            if (format === 'weekly') {
                let endDate = date
                let endMonth = endDate.toLocaleDateString('en', { month: 'long' })
                let endYear = endDate.toLocaleDateString('en', { year: 'numeric' })
                let endDay = endDate.getDate()

                let startDate = new Date(endDate.setDate(endDate.getDate() - 7))
                let startMonth = startDate.toLocaleDateString('en', { month: 'long' })
                let startYear = startDate.toLocaleDateString('en', { year: 'numeric' })
                let startDay = startDate.getDate()

                let display = ''
                if (startMonth === endMonth) display = `${startDay} - ${endDay} ${endMonth} ${endYear}`
                if (startMonth !== endMonth) {
                    if (startYear === endYear) display = `${startDay} ${startMonth} - ${endDay} ${endMonth} ${endYear}`
                    else display = `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`

                }

                setDisplayDate(displayDate)
            }

            if (format === 'daily') setDisplayDate(date.toLocaleDateString('en', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }))
        }

        dateDisplayFormat()
    }, [format, date])

    const nextDate = () => {

    }

    const prevDate = () => {

    }

    return (
        <DisplayManagerContext.Provider value={{
            employees,
            format, setFormat,
            displayDate, setDate,
            selectedEmployees, setSelectedEmployees
        }}>
            {children}
        </DisplayManagerContext.Provider >
    )
}

export default DisplayManagerContext