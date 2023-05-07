import useEmployeesData from "@/Hooks/useEmployeesData";
import { Close as CloseIcon } from "@/components/Icons";
import FormDropdown from "@/components/FormDropdown";
import { useEffect, useRef, useState } from "react";
import DonePopup from "@/components/DonePopup";
import InputTextBox from "@/components/InputTextBox";

const BlockedTimeForm = ({ close }) => {
    const { addNewBlockedTimeForEmployee } = useEmployeesData()
    const { employees } = useEmployeesData()
    const [employee, setEmployee] = useState('')
    const [avilableEmployees, setAvilableEmployees] = useState([])
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [comment, setComment] = useState('')
    const [showDone, setShowDone] = useState(false)

    useEffect(() => {
        const initialState = () => {
            let employeesOptions = []
            employees.forEach(employee => {
                employeesOptions.push(employee.name)
            });
            setAvilableEmployees(employeesOptions)
        }

        initialState()
    }, [employees])

    const submit = (e) => {
        e.preventDefault()
        let startHour = startTime.split(':')[0]
        let startMinute = startTime.split(':')[1]

        let endHour = endTime.split(':')[0]
        let endMinute = endTime.split(':')[1]

        let startDate = new Date(date)
        startDate.setHours(startHour, startMinute)

        let endDate = new Date(date)
        endDate.setHours(endHour, endMinute)

        addNewBlockedTimeForEmployee(employee, startDate, endDate, comment)

        setShowDone(true)
        setTimeout(() => {
            setShowDone(false)
            close()
        }, 1200)
    }

    return (
        <>
            <div className="blocked-form-wrap">
                <form className="blocked-form-container" onSubmit={submit}>
                    {showDone && <DonePopup />}
                    <div className="form-heading">
                        <h3>Add Blocked Time</h3>
                        <div onClick={close} className="icon"><CloseIcon /></div>
                    </div>
                    <div className="input-field">
                        <FormDropdown
                            title={'Employee Name'}
                            placeholder={'Select Employee'}
                            selected={employee}
                            setSelected={setEmployee}
                            options={avilableEmployees}
                        />
                    </div>
                    <div className="input-field">
                        <InputTextBox
                            title={'Date'}
                            type={'date'}
                            value={date}
                            required={true}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <div className="time-input-wrap">
                            <InputTextBox
                                title={'Start Time'}
                                type={'time'}
                                value={startTime}
                                required={true}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                            <InputTextBox
                                title={'End Time'}
                                type={'time'}
                                value={endTime}
                                required={true}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div style={{ display: 'flex' }}>
                            <div className="wrap-title">
                                <h4>Note</h4>
                                <textarea
                                    rows={3}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <button type="submit" className="confirm-button">Save</button>
                    </div>
                </form>
            </div >
        </>
    )
};
export default BlockedTimeForm;