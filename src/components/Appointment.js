import useEmployeesData from "@/Hooks/useEmployeesData";
import { calculateHeightFromMinutes, calculateMinutesFromHeight } from "@/utilities/calculations";
import { useRef } from "react";

const Appointment = ({ appointment, employee, employeeOrder, startDate, endDate, containerRef, updateLayout }) => {
    const colorClasses = ['appointment-red', 'appointment-blue', 'appointment-green']
    const { extendAppointmentEnd } = useEmployeesData()

    let startTime = new Date(startDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })
    let endTime = new Date(endDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })
    let time = startTime + ' - ' + endTime

    let startHours = startDate.getHours();
    let startMinutes = startDate.getMinutes();
    let startTotalMinutes = (startHours * 60) + startMinutes

    let endHours = endDate.getHours()
    let endMinutes = endDate.getMinutes()
    let endTotalMinutes = (endHours * 60) + endMinutes

    let appointmentEnd = calculateHeightFromMinutes(endTotalMinutes, startTotalMinutes)

    let dragStart
    let dragTimeout
    let isDraging = false
    let originalPos
    let newHeight

    const appointmentRef = useRef()
    const timeRef = useRef()

    const adjustDateHight = () => {
        let newEndTotalMinutes = calculateMinutesFromHeight(newHeight, startTotalMinutes)
        if ((newEndTotalMinutes / 5) % 1 !== 0) newEndTotalMinutes = ((~~(newEndTotalMinutes / 5)) + 1) * 5
        newHeight = calculateHeightFromMinutes(newEndTotalMinutes, startTotalMinutes)

        let newEndHour = ~~(newEndTotalMinutes / 60)
        //getting the reminder floot and convert into 60, +0.1 is a fix for the long float
        let newEndMinute = ~~((((newEndTotalMinutes / 60) - newEndHour) * 60) + 0.1)

        endDate.setHours(newEndHour)
        endDate.setMinutes(newEndMinute)

        endTime = new Date(endDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })
        time = startTime + ' - ' + endTime

        timeRef.current.innerText = time
    }

    const bottomStartTouchDragHandle = (e) => {
        e.preventDefault()
        dragStart = e.touches[0].pageY
        dragTimeout = setTimeout(() => {
            isDraging = true
            originalPos = parseFloat(appointmentRef.current.style.height.replace('px', ''))
            if ('ontouchstart' in window) {
                containerRef.current.style.overflowY = 'hidden' //disable Scrolling for touch conflect
                document.body.style.overflow = 'hidden'
            }
        }, 1000)
    }

    const bottomStartmouseDragHandle = (e) => {
        e.preventDefault()
        dragStart = e.clientY
        isDraging = true
        originalPos = parseFloat(appointmentRef.current.style.height.replace('px', ''))
    }

    const bottomDragHandle = (e) => {
        e.preventDefault()
        if (!isDraging) {
            dragStart = e.clientY || e.touches[0].pageY
            return
        }
        let y = e.clientY || e.touches[0].pageY
        let change = y - dragStart
        newHeight = originalPos + change

        adjustDateHight()
        extendAppointmentEnd(employee, appointment.id, endDate)
        appointmentRef.current.style.height = `${newHeight}px`
    }

    const releaseHandle = (e) => {
        e.preventDefault()
        if (dragTimeout) clearTimeout(dragTimeout)
        if (dragStart === e.clientY || dragStart === e.changedTouches[0].clientY || dragStart === 0 || !isDraging) return
        isDraging = false
        adjustDateHight()

        if ('ontouchstart' in window) {
            containerRef.current.style.overflowY = 'scroll' //re-activate scrolling
            document.body.style.overflow = 'auto'
        }

        updateLayout()
    }

    return (
        <>
            <div ref={appointmentRef} style={{ height: appointmentEnd }} className={`appointment ${colorClasses[employeeOrder]}`} key={Math.floor(Math.random() * 5000)}>
                <div className="appointment-contnet">
                    <p ref={timeRef}>{time}</p>
                    <h3>{appointment.client}</h3>
                    <p>{appointment.service}</p>
                    <div
                        onMouseDown={bottomStartmouseDragHandle}
                        onTouchStart={bottomStartTouchDragHandle}
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