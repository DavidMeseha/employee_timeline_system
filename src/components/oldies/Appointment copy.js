import useEmployeesData from "@/Hooks/useData";
import { calculateHeightFromMinutes, calculateMinutesFromHeight, calculateMinutesFromTop, calculateTopFromMinutes } from "@/utilities/calculations";
import { memo, useEffect, useRef, useState } from "react";
import ConfirmEdit from "../ConfirmEdit";

const ConfirmEditMemo = memo(({ confirm, cancel, deleteAppointment }) => {
    return (
        <ConfirmEdit confirm={confirm} cancel={cancel} deleteAppointment={deleteAppointment} />
    )
})

const Appointment = ({ appointment, employee, employeeOrder, startDate, endDate, containerRef, timelineRef, setTableScroll, editing, setEditing, editEmployeeDatesView, reset }) => {
    const colorClasses = ['appointment-red', 'appointment-blue', 'appointment-green']
    const { updateAppointmentDates, deleteAppointment } = useEmployeesData()
    const appointmentRef = useRef()
    const positionRef = useRef()
    const timeRef = useRef()
    const [isEditable, setIsEditable] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState(null)
    const [originalPos, setOriginalPos] = useState(null)

    let activateEditTimeout
    let id = appointment.id

    let editStartDate = new Date(startDate)
    let editEndDate = new Date(endDate)

    let startTime = new Date(editStartDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true })
    let endTime = new Date(editEndDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true })
    let time = startTime + ' - ' + endTime

    let startHours = editStartDate.getHours();
    let startMinutes = editStartDate.getMinutes();
    let startTotalMinutes = (startHours * 60) + startMinutes

    let endHours = editEndDate.getHours()
    let endMinutes = editEndDate.getMinutes()
    let endTotalMinutes = (endHours * 60) + endMinutes

    let appointmentStart = calculateTopFromMinutes(startTotalMinutes)
    let appointmentEnd = calculateHeightFromMinutes(endTotalMinutes, startTotalMinutes)

    const [scaleStart, setScaleStart] = useState(null)
    const [originalHeight, setOriginalHeight] = useState(null)
    const [isScaling, setIsScaling] = useState(false)
    let newHeight, newPosition

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        if (editing === id) return setIsEditable(true)
        setIsEditable(false)

    }, [editing, isEditable])

    const confirm = () => {
        setIsEditable(false)
        setEditing(null)
        updateAppointmentDates(employee, appointment.id, editStartDate, editEndDate)
    }

    const disableScrolling = () => {
        setTableScroll(false)
        if (('ontouchstart' in window)) {
            timelineRef.current.style.overflow = 'hidden'
            containerRef.current.style.overflow = 'hidden'
        }
        containerRef.current.style.pointerEvents = 'none'
        timelineRef.current.style.pointerEvents = 'none'
    }

    const enableScrolling = () => {
        setTableScroll(true)
        timelineRef.current.style.overflow = 'auto'
        containerRef.current.style.overflow = 'auto'
        timelineRef.current.style.pointerEvents = 'auto'
        containerRef.current.style.pointerEvents = 'auto'
    }

    const adjustDateAndHight = () => {
        let newEndTotalMinutes = calculateMinutesFromHeight(newHeight, startTotalMinutes)
        if ((newEndTotalMinutes / 5) % 1 !== 0) newEndTotalMinutes = ((~~(newEndTotalMinutes / 5)) + 1) * 5
        newHeight = calculateHeightFromMinutes(newEndTotalMinutes, startTotalMinutes)
        let position = parseInt(positionRef.current.style.marginTop.replace('px', ''))
        if (position + newHeight > 2975) {
            newHeight = 2975 - position
            newEndTotalMinutes = calculateMinutesFromHeight(newHeight, startTotalMinutes)
        }


        let newEndHour = ~~(newEndTotalMinutes / 60)
        let newEndMinute = ~~((((newEndTotalMinutes / 60) - newEndHour) * 60) + 0.1)//getting the reminder floot and convert into 60, +0.1 is a fix for the long float

        editEndDate.setHours(newEndHour)
        editEndDate.setMinutes(newEndMinute)

        endTime = new Date(editEndDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true })
        time = startTime + ' - ' + endTime
        timeRef.current.innerText = time
    }

    const adjustNewDateAndPosition = () => {
        let newStartTotalMinutes = calculateMinutesFromTop(newPosition)
        if ((newStartTotalMinutes / 5) % 1 !== 0) newStartTotalMinutes = ((~~(newStartTotalMinutes / 5)) + 1) * 5
        let height = parseFloat(appointmentRef.current.style.height.replace('px', ''))
        newPosition = calculateTopFromMinutes(newStartTotalMinutes)
        if (newPosition + height > 2975) newPosition = 2977 - height
        if (newPosition < 0 && originalPos !== newPosition) newPosition = 10
        newStartTotalMinutes = calculateMinutesFromTop(newPosition)

        let newEndTotalMinutes = calculateMinutesFromHeight(height, newStartTotalMinutes)
        let newStartHour = ~~(newStartTotalMinutes / 60)
        let newStartMinute = ~~((((newStartTotalMinutes / 60) - newStartHour) * 60) + 0.1) //getting the reminder floot and convert into 60, +0.1 is a fix for the long float
        let newEndHour = ~~(newEndTotalMinutes / 60)
        let newEndMinute = ~~((((newEndTotalMinutes / 60) - newEndHour) * 60) + 0.1) //getting the reminder floot and convert into 60, +0.1 is a fix for the long float

        editStartDate.setHours(newStartHour)
        editStartDate.setMinutes(newStartMinute)
        editEndDate.setHours(newEndHour)
        editEndDate.setMinutes(newEndMinute)

        endTime = new Date(editEndDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true })
        startTime = new Date(editStartDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true })
        time = startTime + ' - ' + endTime
        timeRef.current.innerText = time
    }

    const holdToEditHandle = (e) => {
        if (isScaling) return
        if (editing && editing !== id) return

        if (isEditable) {
            disableScrolling()
            let pos = positionRef.current.style.marginTop
            setDragStart(e.clientY || e.touches[0].clientY)
            setOriginalPos(parseFloat(pos.replace('px', '')))
            setIsDragging(true)
            return
        }

        activateEditTimeout = setTimeout(() => {
            if (editing) return
            disableScrolling()
            let pos = positionRef.current.style.marginTop
            setDragStart(e.clientY || e.touches[0].clientY)
            setOriginalPos(parseFloat(pos.replace('px', '')))
            setIsDragging(true)
            setEditing(id)
            setIsEditable(true)
        }, 1000)
    }

    const dragAppointment = (e) => {
        if ((activateEditTimeout && !isEditable && !('ontouchstart' in window))) clearTimeout(activateEditTimeout)
        if (!dragStart || !originalPos || !isDragging || isScaling) return
        let y = e.clientY || e.touches[0].clientY
        let change = y - dragStart
        newPosition = originalPos + change
        adjustNewDateAndPosition()
        positionRef.current.style.marginTop = `${newPosition}px`
    }

    const holdEndHandle = () => {
        enableScrolling()

        if (activateEditTimeout && !isEditable) return clearTimeout(activateEditTimeout)
        if (!newPosition || isScaling || !isEditable) return setIsDragging(false)
        endReposition()
    }

    const endReposition = () => {
        adjustNewDateAndPosition()
        setDragStart(null)
        setOriginalPos(null)
        newPosition = null
        setIsDragging(false)
        positionRef.current.style.marginTop = `${newPosition}px`

        editEmployeeDatesView(employee, appointment.id, editStartDate, editEndDate)
    }

    const startScale = (e) => {
        disableScrolling()
        setIsScaling(true)
        setScaleStart(e.pageY || e.touches[0].clientY)
        setOriginalHeight(parseFloat(appointmentRef.current.style.height.replace('px', '')))
    }

    const scaleHandle = (e) => {
        if (!scaleStart || !originalHeight || !isScaling) return
        let y = e.pageY || e.touches && e.touches[0].clientY
        let change = y - scaleStart
        newHeight = originalHeight + change
        adjustDateAndHight()
        appointmentRef.current.style.height = `${newHeight}px`
    }

    const endScale = () => {
        enableScrolling()
        if (isScaling) setIsScaling(false)
        else return
        if (!newHeight) return
        adjustDateAndHight()
        setOriginalHeight(null)
        setScaleStart(null)
        setIsDragging(false)

        editEmployeeDatesView(employee, appointment.id, editStartDate, editEndDate)
    }

    const cancelAppointment = () => {
        console.log('deleting')
        setIsEditable(false)
        setEditing(null)

        deleteAppointment(employee, id)
    }

    return (
        <>
            {isEditable && <ConfirmEditMemo confirm={confirm} cancel={reset} deleteAppointment={cancelAppointment} />}
            <div onTouchStart={holdToEditHandle} onTouchEnd={holdEndHandle} ref={positionRef} style={{ width: '100%', marginTop: appointmentStart }}>
                <div
                    id={id}
                    ref={appointmentRef}
                    onMouseDown={holdToEditHandle}
                    onMouseUp={holdEndHandle}
                    onMouseLeave={holdEndHandle}
                    onTouchMove={dragAppointment}
                    onMouseMove={dragAppointment}
                    style={{ height: appointmentEnd }}
                    className={`${id === editing && isEditable ? 'editable-appointment' : 'appointment'} ${colorClasses[employeeOrder]}`}
                >
                    <div className="appointment-contnet">
                        <p ref={timeRef}>{time}</p>
                        <h3>{appointment.client}</h3>
                        <p>{appointment.services.map((service) => {
                            return (
                                service.service + ', '
                            )
                        })}</p>
                    </div>

                    {isEditable && <div
                        onMouseDown={startScale}
                        onTouchStart={startScale}
                        onMouseMove={scaleHandle}
                        onTouchMove={scaleHandle}
                        onMouseUp={endScale}
                        onTouchEnd={endScale}
                        onMouseLeave={endScale}
                        className="scale-area"
                    >
                        <div className="icon">
                            <div></div>
                            <div></div>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
};

export default Appointment;