import TimeLines from "@/components/TimeLines";
import useDisplayManger from "@/Hooks/useDisplayManger";
import { useEffect, useRef, useState } from "react";
import AppointmentsTable from "./AppointmentsTable";
import useEmployeesData from "@/Hooks/useEmployeesData";

const DailyDisplay = () => {
    const { employees } = useEmployeesData()
    const { date, selectedEmployees } = useDisplayManger()
    const contentRef = useRef()
    const headRef = useRef()
    const [isToday, setIsToday] = useState(true)

    useEffect(() => {
        if (date.getDate() === new Date().getDate()) setIsToday(true)
        else setIsToday(false)
    }, [date])

    const handleScroll = (e) => {
        contentRef.current.scrollLeft = e.target.scrollLeft
    }

    const scrollBy = (offset) => {
        headRef.current.scrollLeft += offset
    }

    return (
        <>
            <div style={{ position: 'relative' }}>
                <div className='heading'>
                    <div className="scroll-arrows" onClick={() => scrollBy(40)}><div className="arrow-left-light"></div></div>
                    <div className="employees-wraper" ref={headRef} onScroll={handleScroll}>
                        <table>
                            <thead>
                                <tr className="employees-name">
                                    {selectedEmployees.map((employeeName, i) => {
                                        let tag = employeeName.split(' ')[0][0]
                                        return (
                                            <td key={i} style={{ width: `${100 / selectedEmployees.length}%` }}>
                                                <div className="name-tag">{tag}</div>
                                                <div>{employeeName}</div>
                                            </td>
                                        )
                                    })}
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="scroll-arrows" onClick={() => scrollBy(-40)}><div className="arrow-right-light"></div></div>
                </div>
                <div className='timeline-container'>
                    <TimeLines liveIndicator={isToday} />
                    <div className='appointment-table-wraper' ref={contentRef}>
                        <AppointmentsTable employees={employees} selectedEmployees={selectedEmployees} date={date} />
                    </div>
                </div>
            </div >
        </>
    )
};
export default DailyDisplay;