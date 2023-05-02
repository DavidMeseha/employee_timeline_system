import useEmployeesData from "@/Hooks/useEmployeesData";
import { calculateHeightFromMinutes, calculateMinutesFromHeight, calculateMinutesFromTop, calculateTopFromMinutes } from "@/utilities/calculations";
import { useRef, useState } from "react";

const Appointment = ({ appointment, employee, employeeOrder, startDate, endDate, containerRef, tableRef, updateLayout, appointmentsCount }) => {
    const colorClasses = ['appointment-red', 'appointment-blue', 'appointment-green']
    const { updateAppointmentStartDate } = useEmployeesData()
    const [isEditable, setIsEditable] = useState(false)
    let activateEditTimeout

    let startTime = new Date(startDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })
    let endTime = new Date(endDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })
    let time = startTime + ' - ' + endTime

    let startHours = startDate.getHours();
    let startMinutes = startDate.getMinutes();
    let startTotalMinutes = (startHours * 60) + startMinutes

    let endHours = endDate.getHours()
    let endMinutes = endDate.getMinutes()
    let endTotalMinutes = (endHours * 60) + endMinutes

    let appointmentStart = calculateTopFromMinutes(startTotalMinutes)
    let appointmentEnd = calculateHeightFromMinutes(endTotalMinutes, startTotalMinutes)

    let scaleStart, dragStart
    let originalPos, originalHeight
    let newHeight, newPosition
    let isScaling, isDragging

    const appointmentRef = useRef()
    const positionRef = useRef()
    const timeRef = useRef()

    const disableScrollingForTouch = () => {
        if ('ontouchstart' in window) {
            containerRef.current.style.overflowY = 'hidden' //disable Scrolling for touch conflect
            tableRef.current.style.overflowX = 'hidden'
            document.body.style.overflow = 'hidden'
        }
    }

    const enableScrolling = () => {
        if ('ontouchstart' in window) {
            containerRef.current.style.overflowY = 'scroll' //re-activate scrolling
            tableRef.current.style.overflowX = 'scroll'
            document.body.style.overflow = 'auto'
        }
    }

    const adjustDateAndHight = () => {
        let newEndTotalMinutes = calculateMinutesFromHeight(newHeight, startTotalMinutes)
        if ((newEndTotalMinutes / 5) % 1 !== 0) newEndTotalMinutes = ((~~(newEndTotalMinutes / 5)) + 1) * 5
        newHeight = calculateHeightFromMinutes(newEndTotalMinutes, startTotalMinutes)

        let newEndHour = ~~(newEndTotalMinutes / 60)
        let newEndMinute = ~~((((newEndTotalMinutes / 60) - newEndHour) * 60) + 0.1)//getting the reminder floot and convert into 60, +0.1 is a fix for the long float

        endDate.setHours(newEndHour)
        endDate.setMinutes(newEndMinute)

        endTime = new Date(endDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })
        time = startTime + ' - ' + endTime
        timeRef.current.innerText = time
    }

    const adjustNewDateAndPosition = () => {
        let newStartTotalMinutes = calculateMinutesFromTop(newPosition)
        if ((newStartTotalMinutes / 5) % 1 !== 0) newStartTotalMinutes = ((~~(newStartTotalMinutes / 5)) + 1) * 5
        let height = parseFloat(appointmentRef.current.style.height.replace('px', ''))
        newPosition = calculateTopFromMinutes(newStartTotalMinutes)

        let newEndTotalMinutes = calculateMinutesFromHeight(height, newStartTotalMinutes)
        let newStartHour = ~~(newStartTotalMinutes / 60)
        let newStartMinute = ~~((((newStartTotalMinutes / 60) - newStartHour) * 60) + 0.1) //getting the reminder floot and convert into 60, +0.1 is a fix for the long float

        let newEndHour = ~~(newEndTotalMinutes / 60)
        let newEndMinute = ~~((((newEndTotalMinutes / 60) - newEndHour) * 60) + 0.1) //getting the reminder floot and convert into 60, +0.1 is a fix for the long float

        startDate.setHours(newStartHour)
        startDate.setMinutes(newStartMinute)
        endDate.setHours(newEndHour)
        endDate.setMinutes(newEndMinute)

        endTime = new Date(endDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })
        startTime = new Date(startDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })
        time = startTime + ' - ' + endTime
        timeRef.current.innerText = time
    }

    const holdToEditHandle = (e) => {
        if (isScaling) return
        if (isEditable || !('ontouchstart' in window)) {
            dragStart = e.clientY || e.touches[0].clientY
            originalPos = positionRef.current.style.marginTop
            originalPos = parseFloat(originalPos.replace('px', ''))
            isDragging = true
            return
        }
        activateEditTimeout = setTimeout(() => {
            setIsEditable(true)
        }, 1000)
    }

    const dragAppointment = (e) => {
        if (!dragStart || !originalPos || !isDragging) return
        if ((activateEditTimeout && !isEditable && !('ontouchstart' in window)) || isScaling) return clearTimeout(activateEditTimeout)
        let y = e.clientY || e.touches[0].clientY
        let change = y - dragStart
        newPosition = originalPos + change
        disableScrollingForTouch()
        adjustNewDateAndPosition()
        positionRef.current.style.marginTop = `${newPosition}px`
    }

    const holdEndHandle = () => {
        if (activateEditTimeout && (!isEditable || !('ontouchstart' in window))) return clearTimeout(activateEditTimeout)
        if (!newPosition || isScaling) return
        endReposition()
    }

    const endReposition = () => {
        adjustNewDateAndPosition()
        enableScrolling()
        setIsEditable(false)
        updateLayout()
        dragStart = null
        originalPos = null
        newPosition = null

        updateAppointmentStartDate(employee, appointment.id, startDate, endDate)
    }

    const bottomStartTouchDragHandle = (e) => {
        e.preventDefault()
        if (!isEditable) return
        isScaling = true
        scaleStart = e.touches[0].clientY
        originalHeight = parseFloat(appointmentRef.current.style.height.replace('px', ''))

        disableScrollingForTouch()
    }

    const bottomStartmouseDragHandle = (e) => {
        isScaling = true
        scaleStart = e.clientY
        originalHeight = parseFloat(appointmentRef.current.style.height.replace('px', ''))
    }

    const bottomDragHandle = (e) => {
        if (!scaleStart || !originalHeight || !isScaling) return
        let y = e.clientY || e.touches[0].clientY
        let change = y - scaleStart
        newHeight = originalHeight + change

        adjustDateAndHight(newHeight, startTotalMinutes)
        appointmentRef.current.style.height = `${newHeight}px`
    }

    const endScale = () => {
        if (!newHeight || !isScaling) return
        adjustDateAndHight(newHeight, startTotalMinutes)
        setIsEditable(false)
        updateLayout()
        enableScrolling()

        isScaling = false
        originalHeight = null
        scaleStart = null

        updateAppointmentStartDate(employee, appointment.id, startDate, endDate)
    }

    return (
        <>
            <div ref={positionRef} style={{ width: `${100 / appointmentsCount}%`, marginTop: appointmentStart }}>
                <div
                    ref={appointmentRef}
                    onTouchStart={holdToEditHandle}
                    onMouseDown={holdToEditHandle}
                    onTouchEnd={holdEndHandle}
                    onMouseUp={holdEndHandle}
                    onTouchMove={dragAppointment}
                    onMouseMove={dragAppointment}
                    style={{ height: appointmentEnd }}
                    className={`${isEditable && (('ontouchstart' in window)) ? 'editable-appointment' : 'appointment'} ${colorClasses[employeeOrder]}`}
                >
                    <div className="appointment-contnet">
                        <p ref={timeRef}>{time}</p>
                        <h3>{appointment.client}</h3>
                        <p>{appointment.service}</p>
                        {(isEditable || !('ontouchstart' in window)) && <div
                            onMouseDown={bottomStartmouseDragHandle}
                            onTouchStart={bottomStartTouchDragHandle}
                            onMouseMove={bottomDragHandle}
                            onTouchMove={bottomDragHandle}
                            onMouseUp={(e) => endScale(e.clientY)}
                            onTouchEnd={(e) => endScale(e.changedTouches[0].clientY)}
                            onTouchCancel={(e) => endScale(e.changedTouches[0].clientY)}
                            onMouseLeave={(e) => endScale(e.clientY)}
                            className="scale-area"
                        >
                            <div className="icon">
                                <div></div>
                                <div></div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Appointment;