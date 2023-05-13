import AddDropdown from "@/components/AddDropdown";
import DateSwitch from "@/components/DateSwitch";
import EmployeesDropdown from "@/components/EmployeesDropdown";
import useDisplayManger from "@/Hooks/useDisplayManger";
import useData from "@/Hooks/useData";

const OptionsBar = () => {
    const { employees } = useData()
    const {
        date,displayDate, setDate, nextDate, prevDate,
        selectedEmployees, setSelectedEmployees,
        weekSelectedEmployee, setWeekSelectedEmployee,
        format, setFormat
    } = useDisplayManger()

    return (
        <>
            <div className="options-wrap" >
                <div className='employees-option'>
                    <EmployeesDropdown
                        employees={employees}
                        selected={format === 'daily' ? selectedEmployees : weekSelectedEmployee}
                        format={format}
                        setSelected={format === 'daily' ? setSelectedEmployees : setWeekSelectedEmployee}
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