import { useState } from "react";

const AddDropdown = () => {
    const [isOpen, setIsOpen] = useState()

    return (
        <div className="dropdown-container">
            <div onClick={() => setIsOpen(!isOpen)} className="dropdown-button">
                <div className="selected">Add</div>
                <div className="arrow-down"></div>
            </div>

            <div className={`dropdown-list ${isOpen ? '' : 'dropdown-closed'}`}>
                <div className='dropdown-item'>
                    <div>New Appointment</div>
                </div>
                <div className='dropdown-item'>
                    <div>New Bloked Time</div>
                </div>
            </div>
        </div>
    )
};
export default AddDropdown;