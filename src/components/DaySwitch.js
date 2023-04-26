const DaySwitch = ({ date, nextDay, prevDay }) => {


    return (
        <>
            <div className="date-nav">
                <button style={{ padding: 9 }}><div className="arrow-left"></div></button>
                <div className="date">{date}</div>
                <button style={{ padding: 9 }}><div className="arrow-right"></div></button>
            </div>
        </>
    );
};

export default DaySwitch;