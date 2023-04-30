import DiagonalStrip from "./DiagonalStrip";

const Blocked = ({ startDate, endDate, comment }) => {
    let startHours = startDate.getHours();
    let startMinutes = startDate.getMinutes();
    let startTotalMinutes = (startHours * 60) + startMinutes

    let endHours = endDate.getHours()
    let endMinutes = endDate.getMinutes()
    let endTotalMinutes = (endHours * 60) + endMinutes

    let blockStart = startTotalMinutes + (startTotalMinutes / 15) - 1
    let blockEnd = (endTotalMinutes - startTotalMinutes) + ((endTotalMinutes - startTotalMinutes) / 15)

    return (
        <>
            <div className='blocked-area' style={{ top: blockStart, height: blockEnd }}>
                <div>
                    <h2>{comment}</h2>
                    <DiagonalStrip />
                </div>
            </div >
        </>
    )
};
export default Blocked;