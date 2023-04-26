import { createContext, useEffect, useState } from "react";

const DisplayManagerContext = createContext({})

export const DisplayManagerProvider = ({ children }) => {
    const [employees, setEmployees] = useState([])
    const [selectedDay, setSelectedDay] = useState()
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [format, setFormat] = useState('daily')

    useEffect(() => {
        const setInitalDisplay = () => {
            let data = [
                { id: '01', name: 'David Magdy' },
                { id: '02', name: 'Bola Vector' },
                { id: '03', name: 'Saif Sayed' }
            ]

            setEmployees(data)

            setSelectedDay(new Date().toLocaleDateString('en', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }))

            let selectedTemp = []
            data.forEach(employee => {
                selectedTemp.push(employee.name)
            });
            setSelectedEmployees(selectedTemp)
        }

        setInitalDisplay()
    }, [])

    return (
        <DisplayManagerContext.Provider value={{
            employees,
            format, setFormat,
            selectedDay, setSelectedDay,
            selectedEmployees, setSelectedEmployees
        }}>
            {children}
        </DisplayManagerContext.Provider >
    )
}

export default DisplayManagerContext