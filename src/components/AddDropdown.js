import clickRecognition from "@/Hooks/useClickRecognition";
import BlockedTimeForm from "@/layouts/BlockedTimeForm";
import Link from "next/link";
import { useRef, useState } from "react";

const AddDropdown = () => {
    const [isOpen, setIsOpen] = useState()
    const [blockFormIsOpen, setBlockFormIsOpen] = useState(false)
    const containerRef = useRef()

    clickRecognition(() => setIsOpen(false), containerRef)

    return (
        <>
            {blockFormIsOpen && <BlockedTimeForm close={() => setBlockFormIsOpen(false)} />}
            <div ref={containerRef} className="dropdown-container">
                <div onClick={() => setIsOpen(!isOpen)} className="dropdown-button">
                    <div className="selected">Add</div>
                    <div className="arrow-down"></div>
                </div>

                <div className={`dropdown-list ${isOpen ? '' : 'dropdown-closed'}`}>
                    <div className='dropdown-item'>
                        <Link href={{ pathname: '/appointment' }}>New Appointment</Link>
                    </div>
                    <div className='dropdown-item' onClick={() => setBlockFormIsOpen(true)}>
                        <div>New Bloked Time</div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default AddDropdown;