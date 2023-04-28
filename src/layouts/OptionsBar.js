import AddDropdown from "@/components/AddDropdown";
import DateSwitch from "@/components/DateSwitch";
import EmployeesDropdown from "@/components/EmployeesDropdown";
import useDisplayManger from "@/Hooks/useDataManger";

const OptionsBar = () => {
    const {
        employees,
        displayDate, setDate, nextDate, prevDate,
        selectedEmployees, setSelectedEmployees,
        format, setFormat
    } = useDisplayManger()

    return (
        <>
            <div className="options-wrap" >
                <div className='employees-option'>
                    <EmployeesDropdown employees={employees} selected={selectedEmployees} setSelected={setSelectedEmployees} />
                </div>
                <div className='date-option'>
                    <DateSwitch date={displayDate} setDate={setDate} next={nextDate} prev={prevDate} />
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