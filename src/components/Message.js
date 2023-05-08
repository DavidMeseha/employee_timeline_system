import { useEffect, useState } from "react";

const Message = ({ message, type, state, setState, action }) => {
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
            {state && <div className='message-position' style={{ opacity: exit ? 0 : 1 }}>
                <div className='message'>
                    <p>{message}.</p>
                </div >
            </div>}
        </>
    )
};
export default Message;