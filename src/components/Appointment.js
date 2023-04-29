import useEmployeesData from "@/Hooks/useEmployeesData";
import { useRef } from "react";

const Appointment = ({ appointment, employee, employeeOrder, startDate, endDate }) => {
    const colorClasses = ['appointment-red', 'appointment-blue', 'appointment-green']
    const {updateAppointmentEnd} = useEmployeesData()

    let startHours = startDate.getHours();
    let startMinutes = startDate.getMinutes();
    let startTotalMinutes = (startHours * 60) + startMinutes

    let endHours = endDate.getHours()
    let endMinutes = endDate.getMinutes()
    let endTotalMinutes = (endHours * 60) + endMinutes

    let appointmentStart = startTotalMinutes + ((startTotalMinutes / 15) * 0.8) - 1
    let appointmentEnd = (endTotalMinutes - startTotalMinutes) + (((endTotalMinutes - startTotalMinutes) / 15) * 0.8)

    let dragStart
    let isDraging = false
    let originalPos
    let newPos
    let newHeight
    const appointmentRef = useRef()

    const reCalculateNewEndDate = () => {
        let newEndTotalMinutes = ~~((newHeight * 15 / 15.8)) + startTotalMinutes
        let newEndHour = ~~(newEndTotalMinutes / 60)
        let newEndMinute = (((newEndTotalMinutes / 60) - newEndHour) * 60) //getting the reminder floot and convert into 60

        endDate.setHours(newEndHour)
        endDate.setMinutes(newEndMinute)

        newHeight = (newEndTotalMinutes - startTotalMinutes) + (((newEndTotalMinutes - startTotalMinutes) / 15) * 0.8)
        appointmentRef.current.style.height = `${newHeight}px`

        //Update Data
        updateAppointmentEnd(employee, appointment.id, endDate)
    }

    const bottomStartDragHandle = () => {
        isDraging = true
        dragStart = window.event.clientY
        originalPos = parseFloat(appointmentRef.current.style.height.replace('px', ''))
    }

    const bottomDragHandle = () => {
        if (!isDraging) return

        let change = window.event.clientY - dragStart
        newHeight = originalPos + change

        appointmentRef.current.style.height = `${newHeight}px`
    }

    const releaseHandle = () => {
        isDraging = false
        reCalculateNewEndDate()
    }

    return (
        <>
            <div ref={appointmentRef} style={{ top: appointmentStart, height: appointmentEnd }} className={`appointment ${colorClasses[employeeOrder]}`} key={Math.floor(Math.random() * 5000)}>
                <div className="appointment-contnet">
                    <p>
                        {
                            new Date(appointment.start).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })
                            + ' - ' +
                            new Date(appointment.end).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })
                        }
                    </p>
                    <h3>{appointment.client}</h3>
                    <p>{appointment.service}</p>
                    <div
                        onMouseDown={bottomStartDragHandle}
                        onMouseMove={bottomDragHandle}
                        onMouseUp={releaseHandle}
                        className="scale-area"
                    >
                        <div className="icon">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Appointment;