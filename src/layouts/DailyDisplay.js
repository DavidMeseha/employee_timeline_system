import TimeLines from "@/components/TimeLines";
import useDisplayManger from "@/Hooks/useDisplayManger";
import { useEffect, useRef, useState } from "react";
import Blocked from "@/components/Blocked";
import MultiApointmentLayout from "./MultiAppointmentLayout";
import useEmployeesData from "@/Hooks/useEmployeesData";
import { groupingIntersectingAppointments } from "@/utilities/groupingAppointments";

const DailyDisplay = () => {
    const { employees } = useEmployeesData()
    const { date, format, selectedEmployees, employeesDisplay, setEmployeesDisplay } = useDisplayManger()
    const tableRef = useRef()
    const timelineRef = useRef()
    const [isToday, setIsToday] = useState(true)
    const [tableScroll, setTableScroll] = useState(true)
    const [editing, setEditing] = useState()

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
        resetEmployees()
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
                <div style={{ width: '100vw', background: 'black', height: 110, position: 'absolute', top: 0, zIndex: 1 }}></div>
                <div className="scroll-arrows left" onClick={() => scrollBy(200)}><div className="arrow-left-light"></div></div>
                <div className="scroll-arrows right" onClick={() => scrollBy(-200)}><div className="arrow-right-light"></div></div>
                <div className="table-wrap" ref={tableRef} onScroll={handleScrollFromTable}>
                    <table className="timeline-table">
                        <thead>
                            <tr className="heading">
                                {selectedEmployees.map((employeeName, i) => {
                                    let tag = employeeName.split(' ')[0][0]
                                    return (
                                        <td key={i} style={{ width: `${100 / selectedEmployees.length}%` }}>
                                            <div>
                                                <div className="name-tag">{tag}</div>
                                                <div>{employeeName}</div>
                                            </div>
                                        </td>

                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody className="data-table">
                            <tr>
                                {selectedEmployees.map((employeeName, eni) => {
                                    return (
                                        employeesDisplay.map((employee, ei) => {
                                            if (employeeName !== employee.name) return
                                            let appointmentGroups = groupingIntersectingAppointments(employee.appointments)

                                            return (
                                                <td key={ei + eni}>
                                                    {employee.blocks.map((block, bi) => {
                                                        let blockedDate = new Date(block.start)
                                                        if (blockedDate.getDate() !== date.getDate()) return;

                                                        let blockedDateEnd = new Date(block.end)
                                                        return (
                                                            <Blocked key={bi} startDate={blockedDate} endDate={blockedDateEnd} comment={block.comment || ''} />
                                                        )
                                                    })}

                                                    {appointmentGroups.map((group, gi) => {
                                                        let groupDate = new Date(group.startDate)
                                                        if (groupDate.getDate() !== date.getDate()) return;
                                                        return (
                                                            <MultiApointmentLayout
                                                                key={ei + eni + gi}
                                                                employees={employeesDisplay}
                                                                appointments={group.appointments}
                                                                employeeOrder={eni}
                                                                employee={employeeName}
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
                <div ref={(e) => timelineRef.current = e} onScroll={handleScrollFromTimeline} onTouchStart={touchStartHandle} onTouchMove={touchScrollXHandle} className="daily-timeline">
                    <TimeLines liveIndicator={isToday} />
                </div>
            </div>}
        </>
    )
};
export default DailyDisplay;