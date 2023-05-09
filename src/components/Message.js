import { useEffect, useState } from "react";

const Message = ({ message, state, setState }) => {
    const [exit, setExit] = useState(false)

    useEffect(() => {
        if (!state) return

        setTimeout(() => {
            setExit(true)

            setTimeout(() => {
                setState(false)
                setExit(false)
            }, 1000)
        }, 4500)

    }, [state])

    return (
        <>
            {state && <div className='message-position' style={{ opacity: exit ? 0 : 1, zIndex:6 }}>
                <div className='error'>
                    <p>{message}.</p>
                </div >
            </div>}
        </>
    )
};
export default Message;