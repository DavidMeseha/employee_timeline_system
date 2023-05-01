import { createContext, useEffect, useReducer } from "react";

const EmployeesContext = createContext({})

const UPDATE_END_DATE = 'UPDATE_END_DATE'
const UPDATE_START_DATE = 'UPDATE_START_DATE'
const SET_EMPLOYEES = 'SET_EMPLOYEES'

let data = [
    {
        id: '01',
        name: 'Marcos Lima',
        appointments: [
            {
                id: '01',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 1 2023 09:30:00',
                end: 'May 1 2023 12:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '02',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 1 2023 09:30:00',
                end: 'May 1 2023 12:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '03',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 1 2023 10:30:00',
                end: 'May 1 2023 13:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '04',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 1 2023 8:30:00',
                end: 'May 1 2023 14:30:00',
                comment: 'Some Comment ....'
            },
        ],
        blocks: [
            {
                start: 'May 1 2023 00:00:00',
                end: 'May 1 2023 04:00:00',
                comment: 'Some Comment.....'
            },
            {
                start: 'April 30 2023 00:00:00',
                end: 'April 30 2023 04:00:00',
                comment: ''
            },
            {
                start: 'April 30 2023 20:00:00',
                end: 'April 30 2023 23:59:00',
                comment: 'day End Comment.....'
            }
        ]
    },
    {
        id: '02',
        name: 'David Lima',
        appointments: [
            {
                id: '01',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 1 2023 09:30:00',
                end: 'May 1 2023 12:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '02',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 1 2023 09:30:00',
                end: 'May 1 2023 12:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '03',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 1 2023 05:30:00',
                end: 'May 1 2023 08:00:00',
                comment: 'Some Comment ....'
            }
        ],
        blocks: [
            {
                start: 'May 1 2023 00:00:00',
                end: 'May 1 2023 04:00:00',
                comment: 'Some Comment.....'
            },
            {
                start: 'April 30 2023 00:00:00',
                end: 'April 30 2023 04:00:00',
                comment: ''
            },
            {
                start: 'April 30 2023 20:00:00',
                end: 'April 30 2023 23:59:00',
                comment: 'day End Comment.....'
            }
        ]
    },
    {
        id: '03',
        name: 'Many Name',
        appointments: [
            {
                id: '01',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 1 2023 09:30:00',
                end: 'May 1 2023 12:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '02',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 1 2023 09:30:00',
                end: 'May 1 2023 12:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '03',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 1 2023 05:30:00',
                end: 'May 1 2023 08:00:00',
                comment: 'Some Comment ....'
            }
        ],
        blocks: [
            {
                start: 'May 1 2023 00:00:00',
                end: 'May 1 2023 04:00:00',
                comment: 'Some Comment.....'
            },
            {
                start: 'April 30 2023 00:00:00',
                end: 'April 30 2023 04:00:00',
                comment: ''
            },
            {
                start: 'April 30 2023 20:00:00',
                end: 'April 30 2023 23:59:00',
                comment: 'day End Comment.....'
            }
        ]
    }
]

function employeesReducer(employees, action) {
    switch (action.type) {
        case UPDATE_END_DATE: {
            let employee = action.payload.name
            let appointmentId = action.payload.id
            let newDate = action.payload.newValue
            let newState = employees

            for (let index = 0; index < newState.length; index++) {
                if (newState[index].name === employee) {
                    for (let appointmentIndex = 0; appointmentIndex < newState[index].appointments.length; appointmentIndex++) {
                        if (newState[index].appointments[appointmentIndex].id === appointmentId) {
                            newState[index].appointments[appointmentIndex].end = newDate
                            break
                        }
                    }

                    break
                }
            }

            return newState
        }

        case SET_EMPLOYEES: {
            let data = action.payload
            return data
        }

        default: return console.log('default')
    }
}

export const EmployeesProvider = ({ children }) => {
    const [employees, employeesDispatch] = useReducer(employeesReducer, [])

    useEffect(() => {
        employeesDispatch({ type: SET_EMPLOYEES, payload: data })
    }, [])

    const extendAppointmentEnd = (employee, appointmentId, newDate) => {
        employeesDispatch({
            type: UPDATE_END_DATE,
            payload: {
                name: employee,
                id: appointmentId,
                newValue: newDate
            }
        })
    }

    return (
        <EmployeesContext.Provider value={{
            employees,
            extendAppointmentEnd,
        }}>
            {children}
        </EmployeesContext.Provider >
    )
};

export default EmployeesContext