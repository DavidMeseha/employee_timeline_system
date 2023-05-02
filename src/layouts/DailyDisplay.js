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
    const timeLineRef = useRef()
    const [isToday, setIsToday] = useState(true)

    let touchStart, initialScroll

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

    const touchStartHandle = (e) => {
        touchStart = e.touches[0].clientX
        initialScroll = contentRef.current.scrollLeft
    }

    const touchScrollXHandle = (e) => {
        let change = initialScroll + touchStart - e.touches[0].clientX
        contentRef.current.scrollLeft = change
        headRef.current.scrollLeft = change
    }

    const tableHeader = () => {
        return (
            <table>
                <thead>
                    <tr className="employee-names">
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
            </table>
        )
    }

    return (
        <>
            <div style={{ position: 'relative' }}>
                <div className='heading'>
                    <div className="scroll-arrows" onClick={() => scrollBy(200)}><div className="arrow-left-light"></div></div>
                    <div className="employees-wraper" ref={headRef} onScroll={handleScroll}>
                        {tableHeader()}
                    </div>
                    <div className="scroll-arrows" onClick={() => scrollBy(-200)}><div className="arrow-right-light"></div></div>
                </div>
                <div onTouchStart={touchStartHandle} onTouchMove={touchScrollXHandle} ref={timeLineRef} className='timeline-container'>
                    <TimeLines liveIndicator={isToday} />

                    <div className='appointment-table-wraper' ref={contentRef}>
                        <AppointmentsTable employees={employees} selectedEmployees={selectedEmployees} date={date} containerRef={timeLineRef} />
                    </div>
                </div>
            </div >
        </>
    )
};
export default DailyDisplay;