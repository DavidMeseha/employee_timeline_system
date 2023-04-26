import AddDropdown from "@/components/AddDropdown";
import DateSwitch from "@/components/DateSwitch";
import EmployeesDropdown from "@/components/EmployeesDropdown";
import useDisplayManger from "@/Hooks/useDataManger";

const OptionsBar = () => {
    const { selectedDate, selectedEmployees, employees, setSelectedEmployees, format, setFormat } = useDisplayManger()

    return (
        <>
            <div className="options-wrap" >
                <EmployeesDropdown employees={employees} selected={selectedEmployees} setSelected={setSelectedEmployees} />
                <DateSwitch date={selectedDate} />
                <div>
                    <button
                        className={`${format === 'daily' ? 'active-display' : 'inactive-display'}`}
                        onClick={() => setFormat('daily')}
                    >Daily</button>
                    <button
                        className={`${format === 'weekly' ? 'active-display' : 'inactive-display'}`}
                        onClick={() => setFormat('weekly')}
                    >weekly</button>
                </div>
                <AddDropdown />
            </div>
        </>
    )
};
export default OptionsBar;