import { convertDateToYMD } from "@/utilities/convertDateToYMD";

const DateSwitch = ({ date, displayDate, next, prev, setDate }) => {
    let today = new Date().toLocaleDateString('en', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' })

    const pickDate = (e) => {
        let newDate = new Date(e.target.value)
        setDate(newDate)
    }

    return (
        <>
            <div className="date-nav">
                <button onClick={prev} style={{ padding: 9, borderRadius: 0 }}><div className="arrow-left"></div></button>
                <label htmlFor="datepicker" className="date">{displayDate || today}
                    <input className="hidden-date hidden" type="date" id="datepicker" onChange={pickDate} value={convertDateToYMD(date)} />
                </label>
                <button onClick={next} style={{ padding: 9 }}><div className="arrow-right"></div></button>
            </div>
        </>
    );
};

export default DateSwitch;