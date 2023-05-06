import { useEffect, useRef, useState } from "react"

const LiveTime = ({ liveIndicator }) => {
    const liveTimeRef = useRef()
    const [liveTime, setLiveTime] = useState()

    useEffect(() => {
        if (!liveTimeRef.current) return

        const liveTimeTick = () => {
            let date = new Date()
            let hours = date.getHours()
            let minutes = date.getMinutes()
            let totalMinutes = minutes + (hours * 60)

            setLiveTime(date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })) //01:01 || 15:05 || 10:25

            //                                                      for every 15min
            //                 one pixel per minute-V         V-Line Hight per section V-middle of the indecator
            liveTimeRef.current.style.top = `${totalMinutes + ((totalMinutes / 15)) - 10 + 110}px`
        }

        liveTimeTick()
        liveTimeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })

        let clock = setInterval(() => {
            liveTimeTick()
        }, 20000)

        if (!liveIndicator && clock) return clearInterval(clock)

        return () => clearInterval(clock)
    }, [liveIndicator])

    if (liveIndicator)
        return (
            <div ref={liveTimeRef} style={{ top: 0, width: '100vw', left: -40 }} className="live-time-stamp">
                <div className="live-hour">{liveTime}</div>
                <div className="live-line"></div>
            </div >
        )
};
export default LiveTime;