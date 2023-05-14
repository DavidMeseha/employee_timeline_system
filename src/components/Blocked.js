import { calculateHeightFromMinutes, calculateTopFromMinutes } from "@/utilities/calculations";
import DiagonalStrip from "./DiagonalStrip";
import { useRef, useState, useEffect } from "react";
import ConfirmEdit from "./ConfirmEdit";
import useData from "@/Hooks/useData";

const Blocked = ({ startDate, endDate, comment, id, employee }) => {
    const [editable, setEditable] = useState(false)
    const { deleteBlocked } = useData()
    const containerRef = useRef()
    const confirmRef = useRef()

    let startHours = startDate.getHours();
    let startMinutes = startDate.getMinutes();
    let startTotalMinutes = (startHours * 60) + startMinutes

    let endHours = endDate.getHours()
    let endMinutes = endDate.getMinutes()
    let endTotalMinutes = (endHours * 60) + endMinutes

    let blockStart = calculateTopFromMinutes(startTotalMinutes)
    let blockEnd = calculateHeightFromMinutes(endTotalMinutes, startTotalMinutes)

    let timeoutId

    useEffect(() => {
        const clickCheck = (e) => {
            console.log(editable)
            if (!editable) return
            if (!containerRef.current || !confirmRef.current) return
            if (!containerRef.current.contains(e.target) || !confirmRef.current.contains(e.target)) setEditable(false)
        }

        document.addEventListener('mousedown', clickCheck)
        return () => document.addEventListener('mousedown', clickCheck)
    }, [editable, containerRef, confirmRef])

    const holdStartHandle = () => {
        if (editable) return
        timeoutId = setTimeout(() => {
            setEditable(true)
        }, 1000)
    }

    const holdEndHandle = () => {
        if (!editable && timeoutId) return clearTimeout(timeoutId)
    }

    const deleteBlockedHandle = () => {
        deleteBlocked(employee, id)
    }

    const cancel = () => {
        setEditable(false)
    }

    //clickRecognition(() => setEditable(false), containerRef)

    return (
        <>
            {editable && <ConfirmEdit confirmRef={confirmRef} cancel={cancel} deleteAppointment={deleteBlockedHandle} action={'Delete Blocked Time'} />}
            <div ref={containerRef} onMouseDown={holdStartHandle} onMouseUp={holdEndHandle} className='blocked-area' style={{ top: blockStart, height: blockEnd, backgroundColor: editable ? '#c1c1c1' : 'transparent' }}>
                <div>
                    <p>{comment}</p>
                    <DiagonalStrip />
                </div>
            </div >
        </>
    )
};
export default Blocked;