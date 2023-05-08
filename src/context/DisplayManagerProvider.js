import { createContext, useEffect, useState } from "react";
import _ from 'lodash'
import useData from "@/Hooks/useData";

const DisplayManagerContext = createContext({})

export const DisplayManagerProvider = ({ children }) => {
    const { employees } = useData()
    const [displayDate, setDisplayDate] = useState()
    const [employeesDisplay, setEmployeesDisplay] = useState([])
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [weekSelectedEmployee, setWeekSelectedEmployee] = useState('')
    const [format, setFormat] = useState('daily')
    const [date, setDate] = useState(new Date())

    const selectAll = () => {
        let selectedTemp = []
        employees.forEach(employee => {
            selectedTemp.push(employee.name)
        });
        setSelectedEmployees(selectedTemp)
    }

    const dateDisplayFormat = () => {
        if (format === 'weekly') {
            let endDate = new Date(date)
            let endMonth = endDate.toLocaleDateString('en', { month: 'long' })
            let endYear = endDate.toLocaleDateString('en', { year: 'numeric' })
            let endDay = endDate.getDate()

            let startDate = new Date(endDate.setDate(endDate.getDate() - 6))
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
            setWeekSelectedEmployee(selectedEmployees[0])
            return
        }

        if (format === 'daily') setDisplayDate(date.toLocaleDateString('en', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }))
        selectAll()
    }

    useEffect(() => {
        const setInitalDisplay = () => {
            setEmployeesDisplay(_.cloneDeep(employees))
            setWeekSelectedEmployee(employees[0]?.name)
            selectAll()
        }
        setInitalDisplay()
    }, [employees])

    useEffect(() => {
        if (format === 'weekly') {
            let startDate = new Date()
            let days = 0
            while (days < 7) {
                if (startDate.toLocaleDateString('en', { weekday: 'long' }) === 'Sunday') {
                    console.log(startDate)
                    console.log(startDate.toLocaleDateString('en', { weekday: 'long' }))
                    setDate(startDate)
                    break
                }
                startDate = new Date(startDate.setDate(startDate.getDate() + 1))
                days++
            }
        }
        else setDate(new Date())

        dateDisplayFormat()
    }, [format])

    useEffect(() => { dateDisplayFormat() }, [date])

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
            employeesDisplay, setEmployeesDisplay,
            selectedEmployees, setSelectedEmployees,
            weekSelectedEmployee, setWeekSelectedEmployee
        }}>
            {children}
        </DisplayManagerContext.Provider >
    )
}

export default DisplayManagerContext