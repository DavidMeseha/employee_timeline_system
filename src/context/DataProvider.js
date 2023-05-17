import { createContext, useEffect, useReducer, useState } from "react";
import _ from 'lodash'

const DataContext = createContext({})

const UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT'
const ADD_BLOCKED_DATE_TIME = 'ADD_BLOCKED_DATE_TIME'
const ADD_APPOINTMENT = 'ADD_APPOINTMENT'
const SET_EMPLOYEES = 'SET_EMPLOYEES'
const DELETE_APPOINTMENT = 'DELETE_APPOINTMENT'
const DELETE_BLOCKED = 'DELETE_BLOCKED'

let employeesData = [
    {
        id: '01',
        name: 'Marcos Lima',
        appointments: [
            {
                id: '01',
                client: 'Marcos R.',
                services: [
                    {
                        service: 'Hair Cut',
                        price: 500_000_000,
                        duration: 70
                    }
                ],
                total: 500_000_000,
                start: 'May 5 2023 10:30:00',
                end: 'May 5 2023 13:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '03',
                client: 'Marcos R.',
                services: [
                    {
                        service: 'Hair Cut',
                        price: 500_000_000,
                        duration: 70
                    },
                ],
                total: 500_000_000,
                start: 'May 5 2023 10:30:00',
                end: 'May 5 2023 13:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '04',
                client: 'Marcos R.',
                services: [
                    {
                        service: 'Hair Cut',
                        price: 500_000_000,
                        duration: 70
                    },
                ],
                total: 500_000_000,
                start: 'May 5 2023 8:30:00',
                end: 'May 5 2023 14:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '11',
                client: 'Marcos R.',
                services: [
                    {
                        service: 'Hair Cut',
                        price: 500_000_000,
                        duration: 70
                    },
                ],
                total: 500_000_000,
                start: 'May 3 2023 8:30:00',
                end: 'May 3 2023 14:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '12',
                client: 'Marcos R.',
                services: [
                    {
                        service: 'Hair Cut',
                        price: 500_000_000,
                        duration: 70
                    },
                ],
                total: 500_000_000,
                start: 'May 3 2023 8:30:00',
                end: 'May 3 2023 14:30:00',
                comment: 'Some Comment ....'
            },
        ],
        blocks: [
            {
                id: '01',
                start: 'May 1 2023 00:00:00',
                end: 'May 1 2023 04:00:00',
                comment: 'Some Comment.....'
            },
            {
                id: '02',
                start: 'April 30 2023 00:00:00',
                end: 'April 30 2023 04:00:00',
                comment: ''
            },
            {
                id: '03',
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
                services: [
                    {
                        service: 'Hair Cut',
                        price: 500_000_000,
                        duration: 70
                    },
                ],
                total: 500_000_000,
                start: 'May 5 2023 09:30:00',
                end: 'May 5 2023 12:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '06',
                client: 'Marcos R.',
                services: [
                    {
                        service: 'Hair Cut',
                        price: 500_000_000,
                        duration: 70
                    },
                ],
                total: 500_000_000,
                start: 'May 5 2023 09:30:00',
                end: 'May 5 2023 12:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '07',
                client: 'Marcos R.',
                services: [
                    {
                        service: 'Hair Cut',
                        price: 500_000_000,
                        duration: 70
                    },
                ],
                total: 500_000_000,
                start: 'May 5 2023 05:30:00',
                end: 'May 5 2023 08:00:00',
                comment: 'Some Comment ....'
            }
        ],
        blocks: [
            {
                id: '04',
                start: 'May 1 2023 00:00:00',
                end: 'May 1 2023 04:00:00',
                comment: 'Some Comment.....'
            },
            {
                id: '05',
                start: 'April 30 2023 00:00:00',
                end: 'April 30 2023 04:00:00',
                comment: ''
            },
            {
                id: '06',
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
                services: [
                    {
                        service: 'Hair Cut',
                        price: 500_000_000,
                        duration: 70
                    },
                ],
                total: 500_000_000,
                start: 'May 5 2023 09:30:00',
                end: 'May 5 2023 12:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '09',
                client: 'Marcos R.',
                services: [
                    {
                        service: 'Hair Cut',
                        price: 500_000_000,
                        duration: 70
                    },
                ],
                total: 500_000_000,
                start: 'May 5 2023 09:30:00',
                end: 'May 5 2023 12:30:00',
                comment: 'Some Comment ....'
            },
            {
                id: '10',
                client: 'Marcos R.',
                services: [
                    {
                        service: 'Hair Cut',
                        price: 500_000_000,
                        duration: 70
                    },
                ],
                total: 500_000_000,
                start: 'May 5 2023 09:30:00',
                end: 'May 5 2023 12:30:00',
                comment: 'Some Comment ....'
            },
        ],
        blocks: [
            {
                id: '07',
                start: 'May 1 2023 00:00:00',
                end: 'May 1 2023 04:00:00',
                comment: 'Some Comment.....'
            },
            {
                id: '08',
                start: 'April 30 2023 00:00:00',
                end: 'April 30 2023 04:00:00',
                comment: ''
            },
            {
                id: '09',
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
let NEXT_BLOCKED_ID = 13;

function employeesReducer(employees, action) {
    switch (action.type) {
        case UPDATE_APPOINTMENT: {
            let newState = _.cloneDeep(employees)
            let employee = action.payload.employee
            let appointmentId = action.payload.id
            let newEndDate = action.payload.endDate
            let newStartDate = action.payload.startDate
            let appointment

            for (let index = 0; index < newState.length; index++) {
                let appointments = newState[index].appointments.slice()
                for (let appointmentIndex = 0; appointmentIndex < appointments.length; appointmentIndex++) {
                    if (appointments[appointmentIndex].id === appointmentId) {
                        appointments[appointmentIndex].end = newEndDate
                        appointments[appointmentIndex].start = newStartDate

                        if (employee !== newState[index].name) {
                            appointment = appointments[appointmentIndex]
                            appointments.splice(appointmentIndex, 1)
                            newState[index].appointments = appointments


                            for (let index = 0; index < newState.length; index++) {
                                if (newState[index].name === employee) newState[index].appointments.push(appointment)
                            }
                        }

                        break
                    }
                }

            }

            return newState
        }

        case ADD_APPOINTMENT: {
            let newState = _.cloneDeep(employees)
            let employee = action.payload.employee
            let customer = action.payload.customer
            let services = action.payload.services
            let endDate = action.payload.endDate
            let startDate = action.payload.startDate
            let comment = action.payload.comment
            let total = action.payload.total
            let id = NEXT_APPOINTMENT_ID
            NEXT_APPOINTMENT_ID++

            let newAppointment = {
                id: id.toString(),
                client: customer.name,
                services: services,
                total,
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

            return newState
        }

        case DELETE_BLOCKED: {
            console.log(action.payload)
            let newState = _.cloneDeep(employees)
            let employee = action.payload.employee
            let id = action.payload.id

            for (let index = 0; index < newState.length; index++) {
                if (newState[index].name === employee) {
                    let blocks = [...newState[index].blocks]
                    for (let blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
                        if (blocks[blockIndex].id === id) {
                            blocks.splice(blockIndex, 1)
                            newState[index].blocks = blocks
                            break
                        }
                    }
                }
            }

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

        case DELETE_APPOINTMENT: {
            let newState = _.cloneDeep(employees)
            console.log(action.payload)
            let id = action.payload.appointmentId

            for (let index = 0; index < newState.length; index++) {
                let appointments = [...newState[index].appointments]
                for (let appointmentIndex = 0; appointmentIndex < appointments.length; appointmentIndex++) {
                    if (appointments[appointmentIndex].id === id) {
                        appointments.splice(appointmentIndex, 1)
                        newState[index].appointments = appointments
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
        employeesDispatch({ type: SET_EMPLOYEES, payload: employeesData })
        setCustomers(customersData)
        setServices(servicesData)
    }, [])

    const updateAppointment = (appointmentId, newStartDate, newEndDate, targetEmployee) => {
        employeesDispatch({
            type: UPDATE_APPOINTMENT,
            payload: {
                employee: targetEmployee,
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

    const addNewAppointment = (employee, customer, services, total, startDate, endDate, comment) => {
        employeesDispatch({
            type: ADD_APPOINTMENT,
            payload: { employee, startDate, endDate, customer, services, comment, total }
        })
    }

    const deleteAppointment = (employee, appointmentId) => {
        employeesDispatch({
            type: DELETE_APPOINTMENT,
            payload: { appointmentId }
        })
    }

    const deleteBlocked = (employee, id) => {
        employeesDispatch({
            type: DELETE_BLOCKED,
            payload: { employee, id }
        })
    }

    return (
        <DataContext.Provider value={{
            employees, customers, services,
            updateAppointment,
            addNewBlockedTimeForEmployee,
            addNewAppointment, deleteAppointment,
            deleteBlocked
        }}>
            {children}
        </DataContext.Provider >
    )
};

export default DataContext