import { Close as CloseIcon } from "../components/Icons";
import FormDropdown from "../components/FormDropdown";
import { useEffect, useRef, useState } from "react";
import DonePopup from "../components/DonePopup";
import InputTextBox from "../components/InputTextBox";
import useData from "../Hooks/useData";
import Message from "../components/Message";
import clickRecognition from "../Hooks/useClickRecognition";

const BlockedTimeForm = ({ close }) => {
    const { addNewBlockedTimeForEmployee } = useData()
    const { employees } = useData()
    const [employee, setEmployee] = useState('')
    const [avilableEmployees, setAvilableEmployees] = useState([])
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [comment, setComment] = useState('')
    const [showDone, setShowDone] = useState(false)
    const [errorMessage, setErrorMessage] = useState({ message: '', state: false })
    const containerRef = useRef()

    useEffect(() => {
        const initialState = () => {
            let employeesOptions = []
            employees.forEach(employee => {
                employeesOptions.push(employee.name)
            });
            setAvilableEmployees(['All Employees', ...employeesOptions])
        }

        initialState()
    }, [employees])

    const submit = (e) => {
        e.preventDefault()
        let end = endTime === '00:00' ? '23:59' : endTime
        let startHour = startTime.split(':')[0]
        let startMinute = startTime.split(':')[1]

        let endHour = end.split(':')[0]
        let endMinute = end.split(':')[1]

        let startDate = new Date(date)
        startDate.setHours(startHour, startMinute)

        let endDate = new Date(date)
        endDate.setHours(endHour, endMinute)

        if (startTime === '00:00' && parseInt(endHour) >= 12) return setErrorMessage({ message: 'The End of Bloked time exceeds middle of the day', state: true })
        if (end === '23:59' && parseInt(startHour) <= 12) return setErrorMessage({ message: 'The End of Bloked time exceeds middle of the day', state: true })
        if (employee === '') return setErrorMessage({ message: 'No Employee Selected', state: true })
        if (startDate >= endDate) return setErrorMessage({ message: 'The End-Date must be after the Start-Date', state: true })

        addNewBlockedTimeForEmployee(employee, startDate, endDate, comment)

        setShowDone(true)
        setTimeout(() => {
            setShowDone(false)
            close()
        }, 1200)
    }

    clickRecognition(close, containerRef)

    return (
        <>
            <Message message={errorMessage.message} state={errorMessage.state} setState={setErrorMessage} />
            <div className="blocked-form-wrap">
                <form ref={containerRef} className="blocked-form-container" onSubmit={submit}>
                    {showDone && <DonePopup action={'Blocked Time'} />}
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
                                setValue={(setStartTime)}
                                required={true}
                            />
                            <InputTextBox
                                title={'End Time'}
                                type={'time'}
                                value={endTime}
                                setValue={setEndTime}
                                required={true}
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