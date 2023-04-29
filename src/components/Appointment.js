import useEmployeesData from "@/Hooks/useEmployeesData";
import { useRef, useState } from "react";

const Appointment = ({ appointment, employee, employeeOrder, startDate, endDate, containerRef }) => {
    const colorClasses = ['appointment-red', 'appointment-blue', 'appointment-green']
    const { updateAppointmentEnd } = useEmployeesData()

    const [endTime, setEndTime] = useState(new Date(appointment.end).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false }))

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
    let newHeight

    const appointmentRef = useRef()

    const reCalculateNewEndDate = () => {
        if (dragStart - originalPos) return
        let newEndTotalMinutes = ~~((newHeight * 15 / 15.8)) + startTotalMinutes
        let newEndHour = ~~(newEndTotalMinutes / 60)
        let newEndMinute = (((newEndTotalMinutes / 60) - newEndHour) * 60) //getting the reminder floot and convert into 60

        endDate.setHours(newEndHour)
        endDate.setMinutes(newEndMinute)

        newHeight = (newEndTotalMinutes - startTotalMinutes) + (((newEndTotalMinutes - startTotalMinutes) / 15) * 0.8)
    }

    const bottomStartDragHandle = (y) => {
        isDraging = true
        dragStart = y
        originalPos = parseFloat(appointmentRef.current.style.height.replace('px', ''))
        containerRef.current.style.overflowY = 'hidden' //disable Scrolling for touch conflect
    }

    const bottomDragHandle = (y) => {
        if (!isDraging) return

        let change = y - dragStart

        newHeight = originalPos + change

        appointmentRef.current.style.height = `${newHeight}px`
    }

    const releaseHandle = () => {
        isDraging = false

        reCalculateNewEndDate()
        appointmentRef.current.style.height = `${newHeight}px`
        containerRef.current.style.overflowY = 'scroll' //re-activate scrolling

        updateAppointmentEnd(employee, appointment.id, endDate)

        setEndTime(new Date(appointment.end).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false }))
    }

    return (
        <>
            <div ref={appointmentRef} style={{ top: appointmentStart, height: appointmentEnd }} className={`appointment ${colorClasses[employeeOrder]}`} key={Math.floor(Math.random() * 5000)}>
                <div className="appointment-contnet">
                    <p>
                        {
                            new Date(appointment.start).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })
                            + ' - ' +
                            endTime
                        }
                    </p>
                    <h3>{appointment.client}</h3>
                    <p>{appointment.service}</p>
                    <div
                        onMouseDown={() => bottomStartDragHandle(window.event.clientY)}
                        onTouchStart={(e) => bottomStartDragHandle(e.touches[0].clientY)}
                        onMouseMove={() => bottomDragHandle(window.event.clientY)}
                        onTouchMove={(e) => bottomDragHandle(e.touches[0].clientY)}
                        onMouseUp={releaseHandle}
                        onTouchEnd={releaseHandle}
                        onTouchCancel={releaseHandle}
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