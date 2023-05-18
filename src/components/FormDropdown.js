import clickRecognition from "../Hooks/useClickRecognition";
import { useRef, useState } from "react";

const FormDropdown = ({ title, selected, setSelected, placeholder, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef()

    const close = () => { setIsOpen(false) }
    clickRecognition(close, containerRef)

    return (
        <div ref={containerRef} className="form-dropdown-container">
            <div onClick={() => setIsOpen(!isOpen)} className="dropdown-button">
                <div>
                    <div className='dropdown-title'>{title}</div>
                    <div className="selected">{selected || placeholder}</div>
                </div>
                <div className="arrow-down"></div>
            </div>

            <div className={`dropdown-list ${isOpen ? '' : 'dropdown-closed'}`}>
                {options?.map((option, i) => {
                    return (
                        <div key={i} className='dropdown-item' onClick={() => { setSelected(option); setIsOpen(false) }}>
                            <p>{option}</p>
                        </div>
                    )
                })}
            </div>
        </div >
    )
};
export default FormDropdown;