import AddDropdown from "../components/AddDropdown";
import DaySwitch from "../components/DaySwitch";
import EmployeesDropdown from "../components/EmployeesDropdown";
import useDisplayManger from "../Hooks/useDataManger";

const OptionsBar = () => {
    const { selectedDay, selectedEmployees, employees, setSelectedEmployees, format, setFormat } = useDisplayManger()

    return (
        <>
            <div className="options-wrap" >
                <EmployeesDropdown employees={employees} selected={selectedEmployees} setSelected={setSelectedEmployees} />
                <DaySwitch day={selectedDay} />
                <div>
                    <button
                        className={`display-state-button ${format === 'daily' ? 'active-display' : ''}`}
                        onClick={() => setFormat('daily')}
                    >Daily</button>
                    <button
                        className={`display-state-button ${format === 'weekly' ? 'active-display' : ''}`}
                        onClick={() => setFormat('weekly')}
                    >weekly</button>
                </div>
                <AddDropdown />
            </div>
        </>
    )
};
export default OptionsBar;