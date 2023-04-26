import { useRef, useState } from "react";

const DateSwitch = ({ date, next, prev, setDate }) => {
    let today = new Date().toLocaleDateString('en', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' })

    const [datePicker, setDatePicker] = useState()

    const pickDate = (e) => {
        let newDate = new Date(e.target.value)
        setDatePicker(e.target.value)

        setDate(newDate)
    }

    return (
        <>
            <div className="date-nav">
                <button onClick={prev} style={{ padding: 9 }}><div className="arrow-left"></div></button>
                <label htmlFor="datepicker" className="date">{date || today}
                    <input className="hidden" type="date" id="datepicker" value={datePicker} onChange={pickDate} />
                </label>
                <button onClick={next} style={{ padding: 9 }}><div className="arrow-right"></div></button>
            </div>
        </>
    );
};

export default DateSwitch;