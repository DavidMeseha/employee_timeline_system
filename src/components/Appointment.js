import { calculateHeightFromMinutes, calculateMinutesFromHeight, calculateMinutesFromTop, calculateTopFromMinutes } from "../utilities/calculations";
import { memo, useEffect, useRef, useState } from "react";
import ConfirmEdit from "./ConfirmEdit";
import useData from "../Hooks/useData";
import useDisplayManger from "../Hooks/useDisplayManger";

const ConfirmEditMemo = memo(({ confirm, cancel, deleteAppointment }) => {
    return (
        <ConfirmEdit confirm={confirm} cancel={cancel} deleteAppointment={deleteAppointment} />
    )
})

const Appointment = ({ appointment, employee, employeeOrder, startDate, endDate, containerRef, timelineRef, setTableScroll, editing, setEditing, editEmployeeDatesView, reset }) => {
    const colorClasses = ['appointment-red', 'appointment-blue', 'appointment-green']
    const { updateAppointment, deleteAppointment } = useData()
    const { format, selectedEmployees, dates } = useDisplayManger()
    const [targetValue, setTargetValue] = useState('')
    const appointmentRef = useRef()
    const positionRef = useRef()
    const timeRef = useRef()
    const scaleRef = useRef()
    const [isEditable, setIsEditable] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState(null)
    const [originalPos, setOriginalPos] = useState(null)
    const [originalIndex, setOriginalIndex] = useState(null)
    const [recentHeight, setRecentHeight] = useState(null)
    const [activateEditTimeout, setActivateEditTimeout] = useState()

    const leftMargin = 50
    const rightMargin = ('touchstart' in window) ? 15 : 30
    const minWidth = format === 'daily' ? 400 : 150
    let tableWidth = window.innerWidth - rightMargin - leftMargin
    let sectionsCount = format === 'daily' ? selectedEmployees.length : 7
    let widthPerSection = tableWidth / sectionsCount <= minWidth ? minWidth : tableWidth / sectionsCount

    let id = appointment.id

    let editStartDate = new Date(startDate)
    let editEndDate = new Date(endDate)

    let startTime = new Date(editStartDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true })
    let endTime = new Date(editEndDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true })
    let time = startTime + ' - ' + endTime

    let startHours = editStartDate.getHours();
    let startMinutes = editStartDate.getMinutes();
    let startTotalMinutes = (startHours * 60) + startMinutes

    let endHours = editEndDate.getHours() === 0 ? 24 : editEndDate.getHours()
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

    }, [editing, isEditable, containerRef])

    const confirm = () => {
        setIsEditable(false)
        setEditing(null)
        updateAppointment(appointment.id, editStartDate, editEndDate, employee)
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
        let position = parseInt(positionRef.current.style.top.replace('px', ''))
        if (position + newHeight > 2977) {
            newHeight = 2975 - position
            newEndTotalMinutes = calculateMinutesFromHeight(newHeight, startTotalMinutes)
        }
        if (newHeight <= 20) {
            newHeight = 20
            newEndTotalMinutes = calculateMinutesFromHeight(newHeight, startTotalMinutes)
            if ((newEndTotalMinutes / 5) % 1 !== 0) newEndTotalMinutes = ((~~(newEndTotalMinutes / 5)) + 1) * 5
        }

        setRecentHeight(newHeight)

        let newEndHour = ~~(newEndTotalMinutes / 60)
        let newEndMinute = ~~((((newEndTotalMinutes / 60) - newEndHour) * 60) + 0.1)//getting the reminder floot and convert into 60, +0.1 is a fix for the long float

        editEndDate.setHours(newEndHour)
        editEndDate.setMinutes(newEndMinute)
        editEndDate.getHours() === 0 && editEndDate.getMinutes() === 0 ? editEndDate.setDate(editStartDate.getDate() + 1) : editEndDate.setDate(editStartDate.getDate())

        endTime = new Date(editEndDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true })
        time = startTime + ' - ' + endTime
        timeRef.current.innerText = time
    }

    const adjustNewDateAndPosition = () => {
        let newStartTotalMinutes = calculateMinutesFromTop(newPosition)
        if ((newStartTotalMinutes / 5) % 1 !== 0) newStartTotalMinutes = ((~~(newStartTotalMinutes / 5)) + 1) * 5
        let height = parseFloat(appointmentRef.current.style.height.replace('px', ''))
        newPosition = calculateTopFromMinutes(newStartTotalMinutes)
        if (newPosition < 0) {
            newPosition = 0
            newStartTotalMinutes = 0
        }
        if (newPosition + height >= 2976) {
            newPosition = 2975 - height
            newStartTotalMinutes = calculateMinutesFromTop(newPosition)
            if ((newStartTotalMinutes / 5) % 1 !== 0) newStartTotalMinutes = ((~~(newStartTotalMinutes / 5)) + 1) * 5
        }

        let newEndTotalMinutes = calculateMinutesFromHeight(height, newStartTotalMinutes)
        let newStartHour = ~~(newStartTotalMinutes / 60)
        let newStartMinute = newStartTotalMinutes === 0 ? 0 : ~~((((newStartTotalMinutes / 60) - newStartHour) * 60) + 0.1) //getting the reminder floot and convert into 60, +0.1 is a fix for the long float
        let newEndHour = ~~(newEndTotalMinutes / 60)
        let newEndMinute = ~~((((newEndTotalMinutes / 60) - newEndHour) * 60) + 0.1) //getting the reminder floot and convert into 60, +0.1 is a fix for the long float

        editStartDate.setHours(newStartHour)
        editStartDate.setMinutes(newStartMinute)
        editEndDate.setHours(newEndHour)
        editEndDate.setMinutes(newEndMinute)
        editEndDate.getHours() === 0 && editEndDate.getMinutes() === 0 ? editEndDate.setDate(editStartDate.getDate() + 1) : editEndDate.setDate(editStartDate.getDate())

        endTime = new Date(editEndDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true })
        startTime = new Date(editStartDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true })

        time = startTime + ' - ' + endTime
        timeRef.current.innerText = time
    }

    const checkXPosition = (x) => {
        x = x < leftMargin ? 50 : x
        x = (x > window.innerWidth - rightMargin) ? window.innerWidth - rightMargin : x
        let scrollLeft = containerRef.current.scrollLeft
        tableWidth = window.innerWidth - rightMargin - leftMargin
        sectionsCount = format === 'daily' ? selectedEmployees.length : 7
        widthPerSection = tableWidth / sectionsCount <= minWidth ? minWidth : tableWidth / sectionsCount
        let index = ~~(((x - 50) + scrollLeft) / widthPerSection)
        let value = format === 'daily' ? selectedEmployees[index] : dates[index]

        setTargetValue(value)
        return index
    }

    const holdToEditHandle = (e) => {
        if (isScaling) return
        if (editing && editing !== id) return
        if (isEditable) {
            disableScrolling()
            let pos = positionRef.current.style.top
            setDragStart(e.clientY || e.touches[0].clientY)
            setOriginalIndex(checkXPosition(e.clientX || e.touches[0].clientX))
            setOriginalPos(parseFloat(pos.replace('px', '')))
            setIsDragging(true)
            return
        }

        let timeout = setTimeout(() => {
            if (editing) return
            disableScrolling()
            let pos = positionRef.current.style.top
            setDragStart(e.clientY || e.touches[0].clientY)
            setOriginalPos(parseFloat(pos.replace('px', '')))
            setOriginalIndex(checkXPosition(e.clientX || e.touches[0].clientX))
            setIsDragging(true)
            setEditing(id)
            setIsEditable(true)
        }, 1200)

        console.log(timeout)
        setActivateEditTimeout(timeout)
    }

    const dragAppointment = (e) => {
        if (!dragStart || originalPos === null || !isDragging || isScaling || !isEditable) return
        let y = e.clientY || e.touches[0].clientY
        let change = y - dragStart
        newPosition = originalPos + change
        adjustNewDateAndPosition()
        positionRef.current.style.top = `${newPosition}px`

        let colIndex
        let x = e.clientX || e.touches[0].clientX
        colIndex = checkXPosition(x)
        positionRef.current.style.zIndex = 2
        positionRef.current.style.transform = `translateX(${(colIndex - originalIndex) * widthPerSection}px)`
    }

    const holdEndHandle = () => {
        enableScrolling()
        if (newPosition === null || newPosition === undefined || originalPos === null || isScaling || !isEditable) return setIsDragging(false)
        endReposition()
    }

    const endReposition = () => {
        adjustNewDateAndPosition()
        setDragStart(null)
        setOriginalPos(null)
        newPosition = null
        setIsDragging(false)
        positionRef.current.style.top = `${newPosition}px`
        positionRef.current.style.zIndex = 2

        editEmployeeDatesView(employee, appointment.id, editStartDate, editEndDate, targetValue)
    }

    const startScale = (e) => {
        disableScrolling()
        setIsScaling(true)
        setScaleStart(e.clientY || e.touches[0].clientY)
        setOriginalHeight(parseFloat(appointmentRef.current.style.height.replace('px', '')))
    }

    const scaleHandle = (e) => {
        if (!scaleStart || !originalHeight || !isScaling) return
        let y = e.clientY || e.touches[0].clientY
        let change = y - scaleStart
        newHeight = originalHeight + change
        adjustDateAndHight()
        appointmentRef.current.style.height = `${newHeight}px`
    }

    const endScale = () => {
        enableScrolling()
        if (isScaling) setIsScaling(false)
        else return
        if (!recentHeight) return
        newHeight = recentHeight
        adjustDateAndHight()
        setOriginalHeight(null)
        setScaleStart(null)
        setIsDragging(false)
        setRecentHeight(null)
        newHeight = null

        editEmployeeDatesView(employee, appointment.id, editStartDate, editEndDate, targetValue)
    }

    const cancelAppointment = () => {
        setIsEditable(false)
        setEditing(null)
        deleteAppointment(id)
    }

    const mouseDownHandle = (e) => {
        if (!positionRef.current) return
        if (positionRef.current.contains(e.target)) {
            holdToEditHandle(e)
        }

        if (!scaleRef.current) return
        if (scaleRef.current.contains(e.target)) {
            startScale(e)
        }
    }

    const mouseMoveHandle = (e) => {
        if (isDragging) {
            dragAppointment(e)
        }

        if (isScaling) {
            scaleHandle(e)
        }
    }

    const mouseUpHandle = () => {
        if (isDragging) {
            holdEndHandle()
        }

        if (isScaling) {
            endScale()
        }
    }

    const cancelHold = () => {
        if (activateEditTimeout && !isEditable) return clearTimeout(activateEditTimeout)
    }

    useEffect(() => {
        document.addEventListener('mousedown', mouseDownHandle)
        document.addEventListener('touchstart', mouseDownHandle)
        document.addEventListener('mousemove', mouseMoveHandle)
        document.addEventListener('touchmove', mouseMoveHandle)
        document.addEventListener('mouseup', mouseUpHandle)
        document.addEventListener('touchend', mouseUpHandle)
        return () => {
            document.removeEventListener('mousedown', mouseDownHandle)
            document.removeEventListener('touchstart', mouseDownHandle)
            document.removeEventListener('mousemove', mouseMoveHandle)
            document.removeEventListener('touchmove', mouseMoveHandle)
            document.removeEventListener('mouseup', mouseUpHandle)
            document.removeEventListener('touchend', mouseUpHandle)
        }
    }, [scaleStart, originalHeight, isEditable, editing, isDragging, isScaling, appointmentRef, positionRef, scaleRef, recentHeight, targetValue, activateEditTimeout])

    return (
        <>
            {isEditable && <ConfirmEditMemo confirm={confirm} cancel={reset} deleteAppointment={cancelAppointment} />}
            <div onMouseUp={cancelHold} onTouchEnd={cancelHold} ref={positionRef} style={{ position: 'absolute', width: '100%', top: appointmentStart, transition: 'all 0.1s ease 0s' }}>
                <div
                    id={id}
                    ref={appointmentRef}
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

                    {isEditable && <div ref={scaleRef} className="scale-area">
                        <div className="icon">
                            <div></div>
                            <div></div>
                        </div>
                    </div>}
                </div>
            </div >
        </>
    )
};

export default Appointment;