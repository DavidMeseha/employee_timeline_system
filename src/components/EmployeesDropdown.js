import { useEffect, useRef, useState } from "react";
import CheckBox from "./CheckBox";
import clickRecognition from "@/Hooks/useClickRecognition";

const EmployeesDropdown = ({ employees, selected, setSelected, format }) => {
    const [isOpen, setIsOpen] = useState(false);

    const allCheckboxRef = useRef()
    const checkboxesRef = useRef();
    const containerRef = useRef()
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

        allCheckboxRef.current.checked = true
        checkboxesRef.current.forEach(checkBox => {
            checkBox.checked = true;
            selectedTemp.push(checkBox.value);
        });

        setSelected(selectedTemp)
    }

    const selectOne = (value) => {
        checkboxesRef.current.forEach(checkBox => {
            if (checkBox.value === value) checkBox.checked = true;
            else checkBox.checked = false;
        })
        setSelected(value)
    }

    const unSelectAll = () => {
        checkboxesRef.current.forEach(checkBox => {
            checkBox.checked = false;
        });

        setSelected([])
    }
    
    useEffect(() => {
        if (!checkboxesRef.current) return;
        console.log('selecting')

        if (format === 'daily') {
            selectAll()
        }

        if (format === 'weekly') {
            selectOne(selected || checkboxesRef.current[0].value)
            setSelected(selected || checkboxesRef.current[0].value)
        }
    }, [format, allCheckboxRef.current, checkboxesRef])

    const checkBoxChangeHandle = (e) => {
        if (format === 'daily') {
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

        if (format === 'weekly') {
            selectOne(e.target.value)
        }
    }

    clickRecognition(() => setIsOpen(false), containerRef)

    return (
        <div className="dropdown-container" ref={containerRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="dropdown-button">
                <div className="selected">{selected?.length === employees?.length ? 'All Employees' : format === 'weekly' ? selected : 'Selected'}</div>
                <div className="arrow-down"></div>
            </div>

            <div className={`dropdown-list ${isOpen ? '' : 'dropdown-closed'}`}>
                {format === 'daily' && < div className='dropdown-item'>
                    <CheckBox onChange={toggleAll} refFn={allCheckboxRef} value={'All Employees'} name={'All Employees'} />
                </div>}

                {employees?.map((employee, i) => {
                    return (
                        <div key={i} className='dropdown-item'>
                            <CheckBox onChange={checkBoxChangeHandle} refFn={(e) => setCheckBoxRef(e)} value={employee.name} name={employee.name} />
                        </div>
                    )
                })}
            </div>
        </div >
    )
};

export default EmployeesDropdown;