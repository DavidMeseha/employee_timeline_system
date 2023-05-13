import { calculateHeightFromMinutes, calculateTopFromMinutes } from "@/utilities/calculations";
import DiagonalStrip from "./DiagonalStrip";
import { useState } from "react";

const Blocked = ({ startDate, endDate, comment }) => {
    const [editable, setEditable] = useState(false)

    let startHours = startDate.getHours();
    let startMinutes = startDate.getMinutes();
    let startTotalMinutes = (startHours * 60) + startMinutes

    let endHours = endDate.getHours()
    let endMinutes = endDate.getMinutes()
    let endTotalMinutes = (endHours * 60) + endMinutes

    let blockStart = calculateTopFromMinutes(startTotalMinutes)
    let blockEnd = calculateHeightFromMinutes(endTotalMinutes, startTotalMinutes)

    let timeoutId

    const holdStartHandle = () => {
        timeoutId = setTimeout(()=>{
            setEditable(true)
        },1000)
    }

    return (
        <>
            <div onMouseDown={clickStartHandle} className='blocked-area' style={{ top: blockStart, height: blockEnd }}>
                <div>
                    <p>{comment}</p>
                    <DiagonalStrip />
                </div>
            </div >
        </>
    )
};
export default Blocked;