import useData from "../Hooks/useData";
import FormDropdown from "../components/FormDropdown";
import InputTextBox from "../components/InputTextBox";
import ServiceSelectScreen from "../layouts/ServiceSelectScreen";
import SearchBar from "../components/SearchBar";
import InputSectionLayout from "../layouts/InputSectionLayout";
import { useEffect, useState } from "react";
import Message from "../components/Message";
import DonePopup from "../components/DonePopup";
import Card from "../components/Card";
import { Close } from "../components/Icons";
import { convertDateToYMD } from "../utilities/convertDateToYMD";
import { convert12to24, convert24to12 } from "../utilities/convertTime";
import { useNavigate, useParams } from "react-router-dom";

const AddAppointmentPage = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { employees, services, customers, addNewAppointment } = useData()
    const [totalDuration, setTotalDuration] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [displayDate, setDisplayDate] = useState('')

    const [selectedServices, setSelectedServices] = useState([])
    const [member, setMember] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [customer, setCustomer] = useState({})
    const [comment, setComment] = useState('')

    const [avilableTeamMembers, setAvilableTeamMembers] = useState([])
    const [selectServiceShow, setSelectServiceShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState({ message: '', state: false })
    const [isDone, setIsDone] = useState(false)

    useEffect(() => {
        console.log(params)
        if (params.time) {
            let t = params.time
            setTime(convert12to24(t))
        }
        if (params.employee) setMember(params.employee)
        if (params.date) {
            let aDate = new Date(params.date)
            let display = aDate.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })
            setDate(convertDateToYMD(aDate))
            setDisplayDate(display)
        }
    }, [])

    useEffect(() => {
        const setAvilableOptions = () => {
            let values = []
            employees.forEach(employee => {
                values.push(employee.name)
            });
            setAvilableTeamMembers(values)
        }

        setAvilableOptions()
    }, [employees])

    useEffect(() => {
        let price = 0
        let duration = 0
        selectedServices.forEach(service => {
            price += service.price
            duration += service.duration
        });

        setTotalDuration(duration)
        setTotalPrice(price)
    }, [selectedServices])

    const dateChangeHandle = (e) => {
        setDate(e.target.value)
        let display = new Date(e.target.value).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })
        setDisplayDate(display)
    }

    const removeService = (index) => {
        let values = [...selectedServices]
        values.splice(index, 1)
        setSelectedServices(values)
    }

    const saveAppointment = (e) => {
        e.preventDefault()
        let startHour = parseInt(time.split(':')[0])
        let startMinute = parseInt(time.split(':')[1])
        let startDate = new Date(date)
        startDate.setHours(startHour, startMinute)
        let endHour = startHour
        let endMinute = startMinute + totalDuration
        let endDate = new Date(date)
        endDate.setHours(endHour, endMinute)

        if (member === '') return setErrorMessage({ message: 'No Team Member Selected', state: true })
        if (selectedServices.length < 1) return setErrorMessage({ message: 'No Service Selected', state: true })
        if (!customer.name) return setErrorMessage({ message: 'No Customer Selected', state: true })
        if (endDate.getDate() !== startDate.getDate()) return setErrorMessage({ message: 'Totale appointment end time will exceeded the end of the day', state: true })

        addNewAppointment(member, customer, selectedServices, totalDuration, startDate, endDate, comment)

        setIsDone(true)
        setTimeout(() => {
            setIsDone(false)
            navigate('/')
        }, 1200)
    }

    return (
        <>
            {isDone && <div style={{ position: "fixed", inset: 0, zIndex: 4 }}>
                <DonePopup action={'Appointment'} />
            </div>}
            <Message message={errorMessage.message} state={errorMessage.state} setState={setErrorMessage} />
            {selectServiceShow && <ServiceSelectScreen services={services} setSelected={setSelectedServices} selected={selectedServices} close={() => setSelectServiceShow(false)} />}
            <div className="add-appointment-wrap">
                <form className="add-appointment-form" onSubmit={saveAppointment}>
                    <div className="split">
                        <InputSectionLayout title={'Service & Duration'}>
                            <div className="input-field">
                                <div onClick={() => setSelectServiceShow(true)} className="services-button">
                                    <div>
                                        <h3 style={{ color: "yellow" }}>Services</h3>
                                        <p>{selectedServices.map((service) => {
                                            return (service.service + ', ')
                                        })}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                        <p>{totalDuration} min</p>
                                        <div className="arrow-right"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="input-field item-list-container">
                                {selectedServices.map((service, index) => {
                                    return (
                                        <div key={index} className="service-card item-list">
                                            <div className="service-name">
                                                <div className="service-tag">{service.service[0]}</div>
                                                <h4>{service.service}</h4>
                                            </div>
                                            <div className="exit-duration">
                                                <p>{service.duration} min</p>
                                                <div className="icon" onClick={() => removeService(index)}><Close /></div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </InputSectionLayout>
                        <InputSectionLayout title={'Date & Time'}>
                            <div className="time-date">
                                <div className="input-field">
                                    <InputTextBox title={'Date'} type={'date'} value={date} onChange={dateChangeHandle} />
                                </div>
                                <div className="input-field">
                                    <InputTextBox title={'Time'} type={'time'} value={time} setValue={setTime} />
                                </div>
                            </div>
                        </InputSectionLayout>
                        <InputSectionLayout title={'Team Member & Notes'}>
                            <div className="input-field">
                                <FormDropdown
                                    title={'Team Member'}
                                    selected={member}
                                    setSelected={setMember}
                                    placeholder={'Choose Member'}
                                    options={avilableTeamMembers}
                                />
                            </div>
                            <div className="input-field">
                                <div style={{ display: 'flex' }}>
                                    <div className="wrap-title">
                                        <h4>Note</h4>
                                        <textarea
                                            rows={3}
                                            value={comment}
                                            onChange={(e) => { setComment(e.target.value) }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </InputSectionLayout>
                    </div>
                    <div className="split-fill">
                        <div>
                            <InputSectionLayout title={'Add Customer'}>
                                <div className="input-field">
                                    <SearchBar
                                        setSelected={setCustomer}
                                        customers={customers}
                                    />
                                </div>
                                <div className="input-field">
                                    <h3 style={{ color: 'blue' }}>+ Add New Customer</h3>
                                </div>
                                <div className="input-field">
                                    {customer.name && <Card head={customer.name} sup={customer.phone} />}
                                </div>
                            </InputSectionLayout>
                        </div>
                        <div>
                            <InputSectionLayout title={'Date, Time and Price'}>
                                <div className="input-field date_time-price">
                                    <div className="date-section">
                                        <p className="summery-slice"><span>Date & Time</span></p>
                                        <p className="summery-slice">{displayDate}</p>
                                        <p className="summery-slice">{convert24to12(time) === 'Invalid Date' ? '' : convert24to12(time)}</p>
                                    </div>
                                    <div className="price-section">
                                        <p className="summery-slice"><span>Price</span></p>
                                        <p className="summery-slice"> {totalPrice.toLocaleString('en-US')} L.L</p>
                                    </div>
                                </div>
                                <div className="input-field">
                                    <button type="submit" className="confirm-button">Save Appointment ({totalDuration} min)</button>
                                </div>
                            </InputSectionLayout>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
};

export default AddAppointmentPage;