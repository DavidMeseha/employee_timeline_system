import { calculateHeightFromMinutes, calculateTopFromMinutes } from "@/utilities/calculations";
import DiagonalStrip from "./DiagonalStrip";

const Blocked = ({ startDate, endDate, comment }) => {
    let startHours = startDate.getHours();
    let startMinutes = startDate.getMinutes();
    let startTotalMinutes = (startHours * 60) + startMinutes

    let endHours = endDate.getHours()
    let endMinutes = endDate.getMinutes()
    let endTotalMinutes = (endHours * 60) + endMinutes

    let blockStart = calculateTopFromMinutes(startTotalMinutes)
    let blockEnd = calculateHeightFromMinutes(endTotalMinutes, startTotalMinutes)

    return (
        <>
            <div className='blocked-area' style={{ top: blockStart, height: blockEnd }}>
                <div>
                    <p>{comment}</p>
                    <DiagonalStrip />
                </div>
            </div >
        </>
    )
};
export default Blocked;