import { useEffect, useRef, useState } from "react";
import CheckBox from "./CheckBox";

const EmployeesDropdown = ({ employees, selected, setSelected }) => {
    const [isOpen, setIsOpen] = useState(false);

    const allCheckboxRef = useRef()
    const checkboxesRef = useRef();
    checkboxesRef.current = [];

    const setCheckBoxRef = (e) => {
        if (!e || e === null) return;
        checkboxesRef.current.push(e);
    }

    const toggleAll = () => {
        if (allCheckboxRef.current.checked) selectAll()
        else unSelectAll()
    }

    const selectAll = () => {
        let selectedTemp = [];

        checkboxesRef.current.forEach(checkBox => {
            checkBox.checked = true;
            selectedTemp.push(checkBox.value);
        });

        setSelected(selectedTemp)
    }

    const unSelectAll = () => {
        checkboxesRef.current.forEach(checkBox => {
            checkBox.checked = false;
        });

        setSelected([])
    }

    useEffect(() => {
        if (checkboxesRef.current === []) return;

        selectAll()
        allCheckboxRef.current.checked = true
    }, [employees])

    const checkBoxChangeHandle = (e) => {
        let selectedTemp = selected.slice() || []

        if (e.target.checked) {
            selectedTemp.push(e.target.value)
        } else {
            selectedTemp.splice(selectedTemp.indexOf(e.target.value), 1)
        }

        if (selectedTemp.length === employees.length) allCheckboxRef.current.checked = true
        else allCheckboxRef.current.checked = false
        
        setSelected(selectedTemp)
    }

    return (
        <div className="dropdown-container">
            <div onClick={() => setIsOpen(!isOpen)} className="dropdown-button">
                <div className="selected">{selected?.length === employees?.length ? 'All Employees' : 'Selected'}</div>
                <div className="arrow-down"></div>
            </div>

            <div className={`dropdown-list ${isOpen ? '' : 'dropdown-closed'}`}>
                <div className='dropdown-item'>
                    <CheckBox onChange={toggleAll} refFn={allCheckboxRef} value={'All Employees'} name={'All Employees'} />
                </div>
                {employees?.map((employee, i) => {
                    return (
                        <div key={i} className='dropdown-item'>
                            <CheckBox onChange={checkBoxChangeHandle} refFn={(e) => setCheckBoxRef(e)} value={employee.name} name={employee.name} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default EmployeesDropdown;