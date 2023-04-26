const DateSwitch = ({ date, nextDay, prevDay }) => {
    let today = new Date().toLocaleDateString('en', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' })

    return (
        <>
            <div className="date-nav">
                <button style={{ padding: 9 }}><div className="arrow-left"></div></button>
                <div className="date">{date || today}</div>
                <button style={{ padding: 9 }}><div className="arrow-right"></div></button>
            </div>
        </>
    );
};

export default DateSwitch;