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
                {
                    id: '01', name: 'Marcos Lima',
                    appointments: [
                        {
                            client: 'Marcos R.',
                            date: '4-27-2023',
                            start: '5:15',
                            end: '7:30',
                            comment: 'Some Comment ....'
                        },
                        {
                            client: 'Marcos R.',
                            date: '4-27-2023',
                            start: '10:15',
                            end: '14:30',
                            comment: 'Some Comment ....'
                        },
                        {
                            client: 'Marcos R.',
                            date: '4-28-2023',
                            start: '10:15',
                            end: '14:30',
                            comment: 'Some Comment ....'
                        }
                    ]
                },
                {
                    id: '02',
                    name: 'David Lima',
                    appointments: [
                        {
                            client: 'Marcos R.',
                            date: '4-27-2023',
                            start: '9:15',
                            end: '11:30',
                            comment: 'Some Comment ....'
                        }
                    ]
                },
                {
                    id: '03',
                    name: 'Many Name',
                    appointments: [
                        {
                            client: 'Marcos R.',
                            date: '4-26-2023',
                            start: '2:15',
                            end: '4:00',
                            comment: 'Some Comment ....'
                        }
                    ]
                }
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
            employees,
            format, setFormat,
            displayDate, setDate, date, nextDate, prevDate,
            selectedEmployees, setSelectedEmployees
        }}>
            {children}
        </DisplayManagerContext.Provider >
    )
}

export default DisplayManagerContext