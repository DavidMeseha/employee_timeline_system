import TimeLines from "../components/TimeLines";
import useDisplayManger from "../Hooks/useDisplayManger";
import { useEffect, useRef, useState } from "react";
import Blocked from "../components/Blocked";
import MultiApointmentLayout from "./MultiAppointmentLayout";
import { groupingIntersectingAppointments } from "../utilities/groupingAppointments";
import useData from "../Hooks/useData";
import _ from 'lodash'

const WeeklyDisplay = () => {
    const { employees } = useData()
    const { date, format, weekSelectedEmployee, dates, setDates } = useDisplayManger()
    const [employee, setEmployee] = useState()
    const tableRef = useRef()
    const timelineRef = useRef()
    const [isToday, setIsToday] = useState(false)
    const [tableScroll, setTableScroll] = useState(true)
    const [editing, setEditing] = useState()
    const liveTimeRef = useRef()

    let touchStart, initialScroll

    const resetEmployee = () => {
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].name === weekSelectedEmployee) {
                setEmployee({ ...employees[i] })
                break
            }
        }
        setEditing(null)
    }

    const editEmployeeDatesView = (appointmentEmployee, appointmentId, newStartDate, newEndDate, targetDate) => {
        let newState = _.cloneDeep(employee)
        let appointments = newState.appointments.slice()
        newStartDate = new Date(newStartDate.setFullYear(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()))
        newEndDate = new Date(newEndDate.setFullYear(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()))
        for (let appointmentIndex = 0; appointmentIndex < appointments.length; appointmentIndex++) {
            if (newState.appointments[appointmentIndex].id === appointmentId) {
                newState.appointments[appointmentIndex].end = newEndDate
                newState.appointments[appointmentIndex].start = newStartDate
            }
        }

        setEmployee(newState)
    }

    useEffect(() => {
        const scrollToLiveTime = () => {
            if (!isToday) {
                tableRef.current.scrollTop = 0
                timelineRef.current.scrollTop = 0
                return
            }
            if (!liveTimeRef.current) return

            let top = parseInt(liveTimeRef.current.style.top.replace('px', '')) - 200
            tableRef.current.scrollTop = top
            timelineRef.current.scrollTop = top
        }

        scrollToLiveTime()
    }, [liveTimeRef, isToday, date])

    useEffect(() => {
        resetEmployee()
    }, [employees, weekSelectedEmployee])

    useEffect(() => {
        const displayDates = () => {
            setIsToday(false)
            let set = []
            let recentDate = new Date(date)
            set.push(new Date(recentDate.setDate(date.getDate())))
            for (let dayNumber = 1; dayNumber < 7; dayNumber++) {
                set.push(new Date(recentDate.setDate(set[dayNumber - 1].getDate() - 1)))
                if (recentDate.getDate() === new Date().getDate()) setIsToday(true)
            }
            setDates(set.reverse())
        }

        displayDates()
    }, [date, format, weekSelectedEmployee])

    const handleScrollFromTable = (e) => {
        e.preventDefault()
        if (!tableScroll) return
        timelineRef.current.scrollTop = e.target.scrollTop
    }

    const handleScrollFromTimeline = (e) => {
        e.preventDefault()
        if (!tableScroll) return
        tableRef.current.scrollTop = e.target.scrollTop
    }

    const scrollBy = (offset) => {
        if (!tableScroll) return
        tableRef.current.scrollLeft += offset
    }

    const touchStartHandle = (e) => {
        if (!tableScroll) return
        touchStart = e.touches[0].clientX
        initialScroll = tableRef.current.scrollLeft
    }

    const touchScrollXHandle = (e) => {
        if (!tableScroll) return
        let change = initialScroll + touchStart - e.touches[0].clientX
        tableRef.current.scrollLeft = change
    }

    return (
        <>
            {<div className="timeline-container">
                <div className="white-scroll-arrows left" onClick={() => scrollBy(200)}><div className="arrow-left"></div></div>
                <div className="white-scroll-arrows right" onClick={() => scrollBy(-200)}><div className="arrow-right"></div></div>
                <div className="weekly-employee-name"><h4>{weekSelectedEmployee}</h4></div>
                <div className="table-wrap" style={{ paddingBottom: 120 }} ref={tableRef} onScroll={handleScrollFromTable}>
                    <table className="weekly-table">
                        <thead>
                            <tr className="date-heading">
                                {dates.map((date, key) => {
                                    let day = date.getDate()
                                    let today = new Date()
                                    let isToday = false
                                    if (today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()) isToday = true
                                    return (
                                        <td key={key}>
                                            <div className='date-title'>
                                                <div className={isToday ? "day-number-selected" : "day-number"}>{day}</div>
                                                <div className={isToday ? "date-name-selected" : "date-name"}>{date.toLocaleDateString('en', { weekday: 'long' })}</div>
                                            </div>
                                        </td>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody className="data-table">
                            <tr>
                                {dates.map((date, di) => {
                                    let appointmentGroups = groupingIntersectingAppointments(employee?.appointments || [])
                                    return (
                                        <td key={di}>
                                            {employee?.blocks?.map((block, bi) => {
                                                let blockedDate = new Date(block.start)
                                                if (blockedDate.getDate() !== date.getDate() || blockedDate.getMonth() !== date.getMonth() || blockedDate.getFullYear() !== date.getFullYear()) return;

                                                let blockedDateEnd = new Date(block.end)
                                                return (
                                                    <Blocked key={block.id} startDate={blockedDate} endDate={blockedDateEnd} comment={block.comment || ''} employee={weekSelectedEmployee} id={block.id} />
                                                )
                                            })}

                                            {appointmentGroups.map((group, gi) => {
                                                let groupDate = new Date(group.startDate)
                                                if (groupDate.getDate() !== date.getDate() || groupDate.getMonth() !== date.getMonth() || groupDate.getFullYear() !== date.getFullYear()) return;
                                                return (
                                                    <MultiApointmentLayout
                                                        key={di + gi}
                                                        employees={employee}
                                                        appointments={group.appointments}
                                                        employeeOrder={0}
                                                        employee={weekSelectedEmployee}
                                                        startDate={group.startDate}
                                                        containerRef={tableRef}
                                                        timelineRef={timelineRef}
                                                        setTableScroll={setTableScroll}
                                                        editing={editing}
                                                        setEditing={setEditing}
                                                        editEmployeeDatesView={editEmployeeDatesView}
                                                        reset={resetEmployee}
                                                    />
                                                )
                                            })}
                                        </td>
                                    )
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div ref={(e) => timelineRef.current = e} onScroll={handleScrollFromTimeline} onTouchStart={touchStartHandle} onTouchMove={touchScrollXHandle} className="weekly-timeline">
                    <TimeLines liveIndicator={isToday} selectedEmployees={weekSelectedEmployee} dates={dates} tableRef={tableRef} liveTimeRef={liveTimeRef} />
                </div>
            </div >}
        </>
    )
};
export default WeeklyDisplay;