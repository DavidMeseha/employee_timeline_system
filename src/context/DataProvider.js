import { createContext, useEffect, useReducer, useState } from "react";
import _ from 'lodash'

const DataContext = createContext({})

const UPDATE_DATE = 'UPDATE_END_DATE'
const ADD_BLOCKED_DATE_TIME = 'ADD_BLOCKED_DATE_TIME'
const ADD_APPOINTMENT = 'ADD_APPOINTMENT'
const SET_EMPLOYEES = 'SET_EMPLOYEES'

let employeesData = [
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

let customersData = [
    {
        name: 'Marcos brother',
        phone: '01234566789'
    },
    {
        name: 'Mady Man',
        phone: '01234566789'
    },
    {
        name: 'Paul father',
        phone: '987456321'
    },
    {
        name: 'Paul Someone',
        phone: '987456321'
    },
    {
        name: 'Someone else',
        phone: '01234566789'
    }
]

let servicesData = [
    {
        service: 'Hair Cut',
        price: 500_000_000,
        duration: 70
    },
    {
        service: 'Beard Cut',
        price: 10_000_000,
        duration: 50
    },
    {
        service: 'Some Service',
        price: 900_000_000,
        duration: 120
    },
    {
        service: 'Cut Cut',
        price: 10_000_000,
        duration: 30
    },
    {
        service: 'Do Somthing',
        price: 100_000_000,
        duration: 100
    },
]

let NEXT_APPOINTMENT_ID = 13;

function employeesReducer(employees, action) {
    switch (action.type) {
        case UPDATE_DATE: {
            let newState = _.cloneDeep(employees)
            let employee = action.payload.employee
            let appointmentId = action.payload.id
            let newEndDate = action.payload.endDate
            let newStartDate = action.payload.startDate

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

        case ADD_APPOINTMENT: {
            console.log(action.payload)
            let newState = _.cloneDeep(employees)
            let employee = action.payload.employee
            let customer = action.payload.customer
            let service = action.payload.service
            let endDate = action.payload.endDate
            let startDate = action.payload.startDate
            let comment = action.payload.comment
            let id = NEXT_APPOINTMENT_ID
            NEXT_APPOINTMENT_ID++

            let newAppointment = {
                id: id.toString(),
                client: customer.name,
                service: service.service,
                start: startDate,
                end: endDate,
                comment
            }

            for (let index = 0; index < newState.length; index++) {
                if (newState[index].name === employee) {
                    console.log(newState[index].appointments)
                    let newAppointments = [...newState[index].appointments]
                    newAppointments.push(newAppointment)
                    newState[index].appointments = newAppointments
                    break
                }
            }

            console.log(newState)

            return newState
        }

        case ADD_BLOCKED_DATE_TIME: {
            let newState = _.cloneDeep(employees)
            let employee = action.payload.name
            let endDate = action.payload.endDate
            let startDate = action.payload.startDate
            let comment = action.payload.comment
            let newBlockedTime = {
                start: startDate,
                end: endDate,
                comment: comment
            }

            if (employee === 'All Employees') {
                newState.forEach(employee => {
                    employee.blocks.push(newBlockedTime)
                });
            } else {
                for (let index = 0; index < newState.length; index++) {
                    if (newState[index].name === employee) {
                        let newBlocks = [...newState[index].blocks]
                        newBlocks.push(newBlockedTime)
                        newState[index].blocks = newBlocks
                        break
                    }
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

export const DataProvider = ({ children }) => {
    const [employees, employeesDispatch] = useReducer(employeesReducer, [])
    const [customers, setCustomers] = useState([])
    const [services, setServices] = useState([])

    useEffect(() => {
        console.log('setEmp')
        employeesDispatch({ type: SET_EMPLOYEES, payload: employeesData })
        setCustomers(customersData)
        setServices(servicesData)
    }, [])

    const updateAppointmentDates = (employee, appointmentId, newStartDate, newEndDate) => {
        employeesDispatch({
            type: UPDATE_DATE,
            payload: {
                name: employee,
                id: appointmentId,
                startDate: newStartDate,
                endDate: newEndDate
            }
        })
    }

    const addNewBlockedTimeForEmployee = (employee, startDate, endDate, comment) => {
        employeesDispatch({
            type: ADD_BLOCKED_DATE_TIME,
            payload: {
                name: employee,
                startDate: startDate,
                endDate: endDate,
                comment: comment
            }
        })
    }

    const addNewAppointment = (employee, customer, service, startDate, endDate, comment) => {
        employeesDispatch({
            type: ADD_APPOINTMENT,
            payload: { employee, startDate, endDate, customer, service, comment }
        })
    }

    return (
        <DataContext.Provider value={{
            employees, customers, services,
            updateAppointmentDates,
            addNewBlockedTimeForEmployee,
            addNewAppointment
        }}>
            {children}
        </DataContext.Provider >
    )
};

export default DataContext