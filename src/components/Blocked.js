import DiagonalStrip from "./DiagonalStrip";

const commentStyle = {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 40px',
}

const Blocked = ({ startDate, endDate, comment }) => {
    let startHours = startDate.getHours();
    let startMinutes = startDate.getMinutes();
    let startTotalMinutes = (startHours * 60) + startMinutes

    let endHours = endDate.getHours()
    let endMinutes = endDate.getMinutes()
    let endTotalMinutes = (endHours * 60) + endMinutes

    let blockStart = startTotalMinutes + ((startTotalMinutes / 15) * 0.8) - 1
    let blockEnd = (endTotalMinutes - startTotalMinutes) + (((endTotalMinutes - startTotalMinutes) / 15) * 0.8)

    console.log(blockEnd)
    return (
        <>
            <div style={{ position: 'absolute', top: blockStart, right: 20, left: 70, height: blockEnd }}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <h2 style={commentStyle}>{comment}</h2>
                    <DiagonalStrip />
                </div>
            </div >
        </>
    )
};
export default Blocked;