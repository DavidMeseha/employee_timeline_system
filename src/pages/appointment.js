import useData from "@/Hooks/useData";
import CustomerCard from "@/components/CustomerCard";
import FormDropdown from "@/components/FormDropdown";
import InputTextBox from "@/components/InputTextBox";
import ServiceSelectScreen from "@/layouts/ServiceSelectScreen";
import SearchBar from "@/components/SearchBar";
import InputSectionLayout from "@/layouts/InputSectionLayout";
import { processTime } from "@/utilities/timeBy5Cap";
import { useEffect, useState } from "react";
import Message from "@/components/Message";
import DonePopup from "@/components/DonePopup";
import { useRouter } from "next/router";

export default function Appointment() {
    const router = useRouter()
    const { employees, services, customers, addNewAppointment } = useData()
    const [selectService, setSelectService] = useState(false)
    const [service, setService] = useState('')
    const [member, setMember] = useState('')
    const [date, setDate] = useState('')
    const [displayDate, setDisplayDate] = useState('')
    const [time, setTime] = useState('')
    const [displayTime, setDisplayTime] = useState('')
    const [customer, setCustomer] = useState({})
    const [comment, setComment] = useState('')
    const [searchCustomer, setSearchCustomer] = useState('m')
    const [searchResult, setSearchResult] = useState([])
    const [avilableCustomers, setAvilableCustomers] = useState([])
    const [avilableTeamMembers, setAvilableTeamMembers] = useState([])
    const [errorMessage, setErrorMessage] = useState({ message: '', state: false })
    const [showDone, setShowDone] = useState(false)

    useEffect(() => {
        const setAvilableOptions = () => {
            let values = []
            employees.forEach(employee => {
                values.push(employee.name)
            });
            setAvilableTeamMembers(values)

            values = []
            customers.forEach(customer => {
                values.push({ ...customer })
            })
            setAvilableCustomers(values)
        }

        setAvilableOptions()
    }, [employees, customers])

    const searchOnChangeHandle = (e) => {
        let value = e.target.value
        setSearchCustomer(value)
        if (value === '') return setSearchResult([])
        let values = []
        avilableCustomers.forEach(customer => {
            if (customer.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0) values.push(customer)
        });

        setSearchResult(values)
    }

    const timeOnChangeHandle = (e) => {
        let value = processTime(e.target.value)
        setTime(value)
        let aDate = new Date()
        aDate.setHours(parseInt(value.split(':')[0]), parseInt(value.split(':')[1]))
        let display = aDate.toLocaleTimeString('en', { hour12: true, hour: 'numeric', minute: '2-digit' })
        setDisplayTime(display)
    }

    const dateChangeHandle = (e) => {
        setDate(e.target.value)
        let display = new Date(e.target.value).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })
        setDisplayDate(display)
    }

    const saveAppointment = (e) => {
        e.preventDefault()
        let startHour = parseInt(time.split(':')[0])
        let startMinute = parseInt(time.split(':')[1])
        let startDate = new Date(date)
        startDate.setHours(startHour, startMinute)
        let endHour = startHour
        let endMinute = startMinute + service.duration
        let endDate = new Date(date)
        endDate.setHours(endHour, endMinute)

        console.log(startDate, ' ', startDate)

        if (member === '') return setErrorMessage({ message: 'No Team Member Selected', state: true })
        if (!service.service) return setErrorMessage({ message: 'No Service Selected', state: true })
        if (!customer.name) return setErrorMessage({ message: 'No Customer Selected', state: true })

        addNewAppointment(member, customer, service, startDate, endDate, comment)

        setShowDone(true)
        setTimeout(() => {
            setShowDone(false)
            close()
            router.push('/')
        }, 1200)
    }

    return (
        <>
            <Message message={errorMessage.message} state={errorMessage.state} setState={setErrorMessage} />
            {selectService && <ServiceSelectScreen services={services} setService={setService} close={() => setSelectService(false)} />}
            <div className="add-appointment-wrap">
                <form className="add-appointment-form" onSubmit={saveAppointment}>
                    {showDone && <DonePopup />}
                    <div className="split">
                        <InputSectionLayout title={'Service & Duration'}>
                            <div className="input-field">
                                <div onClick={() => setSelectService(true)} className="services-button">
                                    <div>
                                        <h3 style={{ color: "yellow" }}>Services</h3>
                                        <p>{service.service || 'Select Service'}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                        <p>{service.duration ? service.duration + ' ' + 'min' : ''}</p>
                                        <div className="arrow-right"></div>
                                    </div>
                                </div>
                            </div>
                        </InputSectionLayout>
                        <InputSectionLayout title={'Date & Time'}>
                            <div className="time-date">
                                <div className="input-field">
                                    <InputTextBox title={'Date'} type={'date'} value={date} onChange={dateChangeHandle} />
                                </div>
                                <div className="input-field small-input">
                                    <InputTextBox title={'Time'} type={'time'} value={time} onChange={timeOnChangeHandle} />
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
                    <div className="split">
                        <InputSectionLayout title={'Add Customer'}>
                            <div className="input-field">
                                <SearchBar
                                    value={searchCustomer}
                                    onChange={searchOnChangeHandle}
                                    searchResult={searchResult}
                                    setSearchResult={setSearchResult}
                                    setCustomer={setCustomer}
                                />
                            </div>
                            <div className="input-field">
                                <h3 style={{ color: 'blue' }}>+ Add New Customer</h3>
                            </div>
                            <div className="input-field">
                                <CustomerCard name={customer?.name || 'select customer'} phone={customer?.phone || '__________'} />
                            </div>
                        </InputSectionLayout>
                        <InputSectionLayout title={'Date, Time and Price'}>
                            <div className="input-field">
                                <p className="summery-slice"><span>Date:</span> {displayDate}</p>
                                <p className="summery-slice"><span>Time:</span> {displayTime}</p>
                                <p className="summery-slice"><span>Price:</span> {service?.price?.toLocaleString('en-US') || 0} L.L</p>
                            </div>
                            <div className="input-field">
                                <button type="submit" className="confirm-button">Save Appointment ({service.duration ? service.duration + ' ' + 'min' : '0 min'})</button>
                            </div>
                        </InputSectionLayout>
                    </div>
                </form>
            </div>
        </>
    )
};