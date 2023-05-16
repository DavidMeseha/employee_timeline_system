import AddDropdown from "@/components/AddDropdown";
import DateSwitch from "@/components/DateSwitch";
import EmployeesDropdown from "@/components/EmployeesDropdown";
import useDisplayManger from "@/Hooks/useDisplayManger";
import useData from "@/Hooks/useData";
import { useEffect, useState } from "react";

const OptionsBar = () => {
    const [selected, setSelected] = useState([])
    const { employees } = useData()
    const {
        date, displayDate, setDate, nextDate, prevDate,
        selectedEmployees, setSelectedEmployees,
        weekSelectedEmployee, setWeekSelectedEmployee,
        format, setFormat
    } = useDisplayManger()

    useEffect(() => {
        format === 'daily' ? setSelected([...selectedEmployees]) : setSelected(weekSelectedEmployee)
    }, [format])

    useEffect(() => {
        format === 'daily' ? setSelectedEmployees([...selected]) : setWeekSelectedEmployee(selected)
    }, [selected])

    return (
        <>
            <div className="options-wrap" >
                <div className='employees-option'>
                    <EmployeesDropdown
                        employees={employees}
                        selected={selected}
                        format={format}
                        setSelected={setSelected}
                    />
                </div>
                <div className='date-option'>
                    <DateSwitch date={date} displayDate={displayDate} setDate={setDate} next={nextDate} prev={prevDate} />
                </div>
                <div className='toggle-view-option'>
                    <button
                        className={`${format === 'daily' ? 'active-display' : 'inactive-display'}`}
                        onClick={() => setFormat('daily')}
                    >Daily</button>
                    <button
                        className={`${format === 'weekly' ? 'active-display' : 'inactive-display'}`}
                        onClick={() => setFormat('weekly')}
                    >weekly</button>
                </div>
                <div className='add-option'>
                    <AddDropdown />
                </div>
            </div>
        </>
    )
};
export default OptionsBar;