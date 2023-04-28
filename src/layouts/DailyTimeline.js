import Appointment from "@/components/Appointment";
import TimeLines from "@/components/TimeLines";
import useDisplayManger from "@/Hooks/useDataManger";
import { useEffect, useState } from "react";

const DailyTimeLine = () => {
    const { date, selectedEmployees, employees } = useDisplayManger()
    const [isToday, setIsToday] = useState(true)

    useEffect(() => {
        if (date.getDate() === new Date().getDate()) setIsToday(true)
        else setIsToday(false)
    }, [date])

    return (
        <>
            <div style={{ position: 'relative' }}>
                <div className='filler'></div>
                <div className='heading-table'>
                    <table>
                        <thead>
                            <tr className="employees-name">
                                {selectedEmployees.map((employeeName) => {
                                    let tag = employeeName.split(' ')[0][0]
                                    return (
                                        <td style={{ width: `${100 / selectedEmployees.length}%` }}>
                                            <div className="name-tag">{tag}</div>
                                            <div>{employeeName}</div>
                                        </td>
                                    )
                                })}
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className='timeline-container'>
                    <TimeLines liveIndicator={isToday} />
                    <table className='appointments-table'>
                        <tbody>
                            <tr>
                                {selectedEmployees.map((employeeName) => {
                                    return (
                                        employees.map((employee) => {
                                            if (employeeName !== employee.name) return

                                            return (
                                                <td>
                                                    {employee.appointments?.map((appointment) => {
                                                        if (new Date(appointment.date).getDate() !== date.getDate()) return
                                                        <Appointment appointment={appointment} />
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
            </div >
        </>
    )
};
export default DailyTimeLine;