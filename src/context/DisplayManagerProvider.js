import { createContext, useEffect, useState } from "react";

const DisplayManagerContext = createContext({})

export const DisplayManagerProvider = ({ children }) => {
    const [employees, setEmployees] = useState([])
    const [selectedDate, setSelectedDate] = useState()
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [format, setFormat] = useState('daily')

    let date = new Date()

    useEffect(() => {
        const setInitalDisplay = () => {
            let data = [
                { id: '01', name: 'Marcos' },
                { id: '02', name: 'David' },
                { id: '03', name: 'Many Name so on' }
            ]

            setEmployees(data)

            setSelectedDate(new Date().toLocaleDateString('en', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }))

            let selectedTemp = []
            data.forEach(employee => {
                selectedTemp.push(employee.name)
            });
            setSelectedEmployees(selectedTemp)
        }

        setInitalDisplay()
    }, [])

    useEffect(() => {
        if (format === 'weekly') {
            let endDate = date
            let endMonth = endDate.toLocaleDateString('en', { month: 'long' })
            let endYear = endDate.toLocaleDateString('en', { year: 'numeric' })
            let endDay = endDate.getDate()

            let startDate = new Date(endDate.setDate(endDate.getDate() - 7))
            let startMonth = startDate.toLocaleDateString('en', { month: 'long' })
            let startYear = startDate.toLocaleDateString('en', { year: 'numeric' })
            let startDay = startDate.getDate()

            let displayDate = ''
            if (startMonth === endMonth) displayDate = `${startDay} - ${endDay} ${endMonth} ${endYear}`
            if (startMonth !== endMonth) {
                if (startYear === endYear) displayDate = `${startDay} ${startMonth} - ${endDay} ${endMonth} ${endYear}`
                else displayDate = `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`

            }

            setSelectedDate(displayDate)
        }

        if (format === 'daily') setSelectedDate(new Date().toLocaleDateString('en', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }))
    }, [format])

    return (
        <DisplayManagerContext.Provider value={{
            employees,
            format, setFormat,
            selectedDate, setSelectedDate,
            selectedEmployees, setSelectedEmployees
        }}>
            {children}
        </DisplayManagerContext.Provider >
    )
}

export default DisplayManagerContext