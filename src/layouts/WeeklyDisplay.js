import TimeLines from "@/components/TimeLines";
import useDisplayManger from "@/Hooks/useDisplayManger";
import { useEffect, useRef, useState } from "react";
import Blocked from "@/components/Blocked";
import MultiApointmentLayout from "./MultiAppointmentLayout";
import useEmployeesData from "@/Hooks/useEmployeesData";
import LiveTime from "./LiveTime";
import { groupingIntersectingAppointments } from "@/utilities/groupingAppointments";

const WeeklyDisplay = () => {
    const { employees } = useEmployeesData()
    const { date, format, weekSelectedEmployee, employeesDisplay, setEmployeesDisplay } = useDisplayManger()
    const tableRef = useRef()
    const timelineRef = useRef()
    const [isToday, setIsToday] = useState(true)
    const [tableScroll, setTableScroll] = useState(true)
    const [editing, setEditing] = useState()
    const [dates, setDates] = useState([])

    let touchStart, initialScroll

    const resetEmployees = () => {
        setEmployeesDisplay(employees.slice())
        setEditing(null)
    }

    const editEmployeeDatesView = (employee, appointmentId, newStartDate, newEndDate) => {
        console.log(employees[0].appointments[0])
        let newState = JSON.parse(JSON.stringify(employeesDisplay))
        for (let index = 0; index < newState.length; index++) {
            if (newState[index].name === employee) {
                let appointments = newState[index].appointments.slice()
                for (let appointmentIndex = 0; appointmentIndex < appointments.length; appointmentIndex++) {
                    if (newState[index].appointments[appointmentIndex].id === appointmentId) {
                        newState[index].appointments[appointmentIndex].end = newEndDate.toString()
                        newState[index].appointments[appointmentIndex].start = newStartDate.toString()
                    }
                }
            }
        }
        console.log(newState[0].appointments[0])
        setEmployeesDisplay(newState)
    }

    useEffect(() => {
        const displayDates = () => {
            let set = []
            let recentDate = new Date(date)
            set.push(new Date(recentDate.setDate(date.getDate())))
            for (let dayNumber = 1; dayNumber < 7; dayNumber++) {
                set.push(new Date(recentDate.setDate(set[dayNumber - 1].getDate() - 1)))
            }
            setDates(set.reverse())
        }

        displayDates()
        setEditing(null)
        if (date.getDate() === new Date().getDate()) setIsToday(true)
        else setIsToday(false)
    }, [date, format])

    const handleScrollFromTable = (e) => {
        if (!tableScroll) return
        timelineRef.current.scrollTop = e.target.scrollTop
    }

    const handleScrollFromTimeline = (e) => {
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
                <div className="table-wrap" ref={tableRef} onScroll={handleScrollFromTable}>
                    <table className="weekly-table">
                        <thead>
                            <tr className="date-heading">
                                {dates.map((date) => {
                                    let day = date.getDate()
                                    let today = new Date()
                                    let isToday = false
                                    if (today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()) isToday = true
                                    return (
                                        <td>
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
                                {employeesDisplay.map((employee, ei) => {
                                    if (weekSelectedEmployee !== employee.name) return
                                    let appointmentGroups = groupingIntersectingAppointments(employee.appointments)
                                    return (
                                        dates.map((date, di) => {
                                            return (
                                                <td key={di + ei}>
                                                    {employee.blocks.map((block, bi) => {
                                                        let blockedDate = new Date(block.start)
                                                        if (blockedDate.getDate() !== date.getDate() || blockedDate.getMonth() !== date.getMonth() || blockedDate.getFullYear() !== date.getFullYear()) return;

                                                        let blockedDateEnd = new Date(block.end)
                                                        return (
                                                            <Blocked key={bi} startDate={blockedDate} endDate={blockedDateEnd} comment={block.comment || ''} />
                                                        )
                                                    })}

                                                    {appointmentGroups.map((group, gi) => {
                                                        let groupDate = new Date(group.startDate)
                                                        if (groupDate.getDate() !== date.getDate() || groupDate.getMonth() !== date.getMonth() || groupDate.getFullYear() !== date.getFullYear()) return;
                                                        return (
                                                            <MultiApointmentLayout
                                                                key={ei + di + gi}
                                                                employees={employeesDisplay}
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
                                                                reset={resetEmployees}
                                                            />
                                                        )
                                                    })}
                                                </td>
                                            )
                                        })
                                    )
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div ref={(e) => timelineRef.current = e} onScroll={handleScrollFromTimeline} onTouchStart={touchStartHandle} onTouchMove={touchScrollXHandle} className="weekly-timeline">
                    <TimeLines liveIndicator={isToday} />
                </div>
            </div>}
        </>
    )
};
export default WeeklyDisplay;