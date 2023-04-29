import { createContext, useEffect, useState } from "react";
import useEmployeesData from "@/Hooks/useEmployeesData";

const DisplayManagerContext = createContext({})

export const DisplayManagerProvider = ({ children }) => {
    const {employees} = useEmployeesData()
    const [displayDate, setDisplayDate] = useState()
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [format, setFormat] = useState('daily')

    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const setInitalDisplay = () => {
            setDisplayDate(new Date().toLocaleDateString('en', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }))

            let selectedTemp = []
            employees.forEach(employee => {
                selectedTemp.push(employee.name)
            });
            setSelectedEmployees(selectedTemp)
        }

        setInitalDisplay()
    }, [])

    useEffect(() => {
        const dateDisplayFormat = () => {
            if (format === 'weekly') {
                let endDate = new Date(date)
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

                setDisplayDate(display)
            }

            if (format === 'daily') setDisplayDate(date.toLocaleDateString('en', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }))
        }

        dateDisplayFormat()
    }, [format, date])

    const nextDate = () => {
        let increaseBy = 0
        if (format === 'weekly') increaseBy = 7
        if (format === 'daily') increaseBy = 1

        setDate(new Date(date.setDate(date.getDate() + increaseBy)))
    }

    const prevDate = () => {
        let decreaseBy = 0
        if (format === 'weekly') decreaseBy = 7
        if (format === 'daily') decreaseBy = 1

        setDate(new Date(date.setDate(date.getDate() - decreaseBy)))
    }

    return (
        <DisplayManagerContext.Provider value={{
            format, setFormat,
            displayDate, setDate, date, nextDate, prevDate,
            selectedEmployees, setSelectedEmployees,
        }}>
            {children}
        </DisplayManagerContext.Provider >
    )
}

export default DisplayManagerContext