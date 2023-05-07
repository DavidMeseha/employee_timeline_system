import CustomerCard from "@/components/CustomerCard";
import FormDropdown from "@/components/FormDropdown";
import InputTextBox from "@/components/InputTextBox";
import SearchBar from "@/components/SearchBar";
import InputSectionLayout from "@/layouts/InputSectionLayout";
import { useState } from "react";

export default function Appointment() {
    const [service, setService] = useState('')
    const [member, setMember] = useState('')
    const [comment, setComment] = useState('')
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [avilableServices, setAvilableServices] = useState(['service 1', 'service 2'])
    const [members, setMembers] = useState(['Member 1', 'Member 2'])

    return (
        <div className="add-appointment-wrap">
            <div className="add-appointment-form">
                <div className="split">
                    <InputSectionLayout title={'Service & Duration'}>
                        <div className="input-field">
                            <FormDropdown
                                title={'Service'}
                                selected={service}
                                setSelected={setService}
                                placeholder={'Select Service'}
                                options={avilableServices}
                            />
                        </div>
                    </InputSectionLayout>
                    <InputSectionLayout title={'Date & Time'}>
                        <div className="time-date">
                            <div className="input-field">
                                <InputTextBox title={'Date'} type={'date'} />
                            </div>
                            <div className="input-field small-input">
                                <InputTextBox title={'Time'} type={'time'} />
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
                                options={members}
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
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <h3 style={{ color: 'blue' }}>+ Add New Customer</h3>
                        </div>
                        <div className="input-field">
                            <CustomerCard name={'David Magdy'} phone={'01226367275'} />
                        </div>
                    </InputSectionLayout>
                    <InputSectionLayout title={'Summery'}>
                        <div className="input-field">
                            <p className="summery-slice"><span>Date:</span></p>
                            <p className="summery-slice"><span>Time:</span></p>
                            <p className="summery-slice"><span>Price:</span></p>
                        </div>
                        <div className="input-field">
                            <button type="submit" className="confirm-button">Save Appointment (50 min)</button>
                        </div>
                    </InputSectionLayout>
                </div>
            </div>
        </div>
    )
};