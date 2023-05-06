import { createContext, useEffect, useReducer } from "react";
import _ from 'lodash'

const EmployeesContext = createContext({})

const UPDATE_DATE = 'UPDATE_END_DATE'
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
                start: 'May 5 2023 10:30:00',
                end: 'May 5 2023 13:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '03',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 5 2023 10:30:00',
                end: 'May 5 2023 13:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '04',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 5 2023 8:30:00',
                end: 'May 5 2023 14:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '11',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 3 2023 8:30:00',
                end: 'May 3 2023 14:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '12',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 3 2023 8:30:00',
                end: 'May 3 2023 14:30:00',
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
                id: '05',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 5 2023 09:30:00',
                end: 'May 5 2023 12:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '06',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 5 2023 09:30:00',
                end: 'May 5 2023 12:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '07',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 5 2023 05:30:00',
                end: 'May 5 2023 08:00:00',
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
                id: '08',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 5 2023 09:30:00',
                end: 'May 5 2023 12:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '09',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 5 2023 09:30:00',
                end: 'May 5 2023 12:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '10',
                client: 'Marcos R.',
                service: 'Haircut',
                start: 'May 5 2023 09:30:00',
                end: 'May 5 2023 12:30:00',
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
    }
]

function employeesReducer(employees, action) {
    switch (action.type) {
        case UPDATE_DATE: {
            let employee = action.payload.name
            let appointmentId = action.payload.id
            let newEndDate = action.payload.value.endDate
            let newStartDate = action.payload.value.startDate
            let newState = _.cloneDeep(employees)

            for (let index = 0; index < newState.length; index++) {
                if (newState[index].name === employee) {
                    for (let appointmentIndex = 0; appointmentIndex < newState[index].appointments.length; appointmentIndex++) {
                        if (newState[index].appointments[appointmentIndex].id === appointmentId) {
                            newState[index].appointments[appointmentIndex].end = newEndDate
                            newState[index].appointments[appointmentIndex].start = newStartDate
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
        console.log('setEmp')
        employeesDispatch({ type: SET_EMPLOYEES, payload: data })
    }, [])

    const updateAppointmentDates = (employee, appointmentId, newStartDate, newEndDate) => {
        console.log('setting')
        employeesDispatch({
            type: UPDATE_DATE,
            payload: {
                name: employee,
                id: appointmentId,
                value: { startDate: newStartDate, endDate: newEndDate }
            }
        })
    }

    return (
        <EmployeesContext.Provider value={{
            employees,
            updateAppointmentDates,
        }}>
            {children}
        </EmployeesContext.Provider >
    )
};

export default EmployeesContext