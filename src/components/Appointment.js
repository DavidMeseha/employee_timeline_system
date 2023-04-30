import useEmployeesData from "@/Hooks/useEmployeesData";
import { useEffect, useRef, useState } from "react";

const Appointment = ({ appointment, employee, employeeOrder, startDate, endDate, containerRef }) => {
    const colorClasses = ['appointment-red', 'appointment-blue', 'appointment-green']
    const { extendAppointmentEnd } = useEmployeesData()

    let startTime = new Date(startDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })
    let endTime = new Date(endDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })
    const [time, setTime] = useState(startTime + ' - ' + endTime)

    const calculateHeightFromMinutes = (endTotalMinutes) => {
        return (endTotalMinutes - startTotalMinutes) + ((endTotalMinutes - startTotalMinutes) / 15)
    }

    const calculateMinutesFromHeight = (height) => {
        return ((height * 15) / 16) + startTotalMinutes
    }

    let startHours = startDate.getHours();
    let startMinutes = startDate.getMinutes();
    let startTotalMinutes = (startHours * 60) + startMinutes

    let endHours = endDate.getHours()
    let endMinutes = endDate.getMinutes()
    let endTotalMinutes = (endHours * 60) + endMinutes

    let appointmentStart = startTotalMinutes + (startTotalMinutes / 15) - 1
    let appointmentEnd = calculateHeightFromMinutes(endTotalMinutes)

    let dragStart
    let dragTimeout
    let isDraging = false
    let originalPos
    let newHeight

    const appointmentRef = useRef()

    const adjustDateHight = () => {
        let newEndTotalMinutes = calculateMinutesFromHeight(newHeight)
        if ((newEndTotalMinutes / 5) % 1 !== 0) newEndTotalMinutes = ((~~(newEndTotalMinutes / 5)) + 1) * 5
        newHeight = calculateHeightFromMinutes(newEndTotalMinutes)

        let newEndHour = ~~(newEndTotalMinutes / 60)
        //getting the reminder floot and convert into 60, +0.1 is a fix for th long disimals
        let newEndMinute = ~~((((newEndTotalMinutes / 60) - newEndHour) * 60) + 0.1)

        endDate.setHours(newEndHour)
        endDate.setMinutes(newEndMinute)
    }

    const bottomStartDragHandle = (e) => {
        dragStart = e.clientY || e.touches[0].clientY
        dragTimeout = setTimeout(() => {
            isDraging = true
            originalPos = parseFloat(appointmentRef.current.style.height.replace('px', ''))
            if ('ontouchstart' in window) containerRef.current.style.overflowY = 'hidden' //disable Scrolling for touch conflect
        }, 1000)
    }

    const bottomDragHandle = (e) => {
        e.preventDefault()
        if (!isDraging) {
            dragStart = e.clientY || e.touches[0].clientY
            return
        }

        let y = e.clientY || e.touches[0].clientY
        let change = y - dragStart
        newHeight = originalPos + change

        adjustDateHight()
        //endTime = newEndHour + ':' + (newEndMinute.toString().length === 1 ? '0' + newEndMinute : '' + newEndMinute)
        //setTime('' + startTime + ' - ' + endTime)

        extendAppointmentEnd(employee, appointment.id, endDate)
        appointmentRef.current.style.height = `${newHeight}px`
    }

    const releaseHandle = (e) => {
        if (dragTimeout) clearTimeout(dragTimeout)
        if (dragStart === e.clientY || dragStart === 0 || !isDraging) return
        isDraging = false
        adjustDateHight()
        if ('ontouchstart' in window) containerRef.current.style.overflowY = 'scroll' //re-activate scrolling
        
        endTime = new Date(endDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })
        setTime(startTime + ' - ' + endTime)
    }

    return (
        <>
            <div ref={appointmentRef} style={{ top: appointmentStart, height: appointmentEnd }} className={`appointment ${colorClasses[employeeOrder]}`} key={Math.floor(Math.random() * 5000)}>
                <div className="appointment-contnet">
                    <p>{time}</p>
                    <h3>{appointment.client}</h3>
                    <p>{appointment.service}</p>
                    <div
                        onMouseDown={bottomStartDragHandle}
                        onTouchStart={bottomStartDragHandle}
                        onMouseMove={bottomDragHandle}
                        onTouchMove={bottomDragHandle}
                        onMouseUp={releaseHandle}
                        onTouchEnd={releaseHandle}
                        onTouchCancel={releaseHandle}
                        onMouseLeave={releaseHandle}
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