import { useEffect, useRef, useState } from "react";

const TimeLines = ({ liveIndicator }) => { //bool
    const sections = 24 * 4
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
            //                      one pixel per minute V     V Line Hight per section V    V middle of the indecator
            liveTimeRef.current.style.top = `${totalMinutes + ((totalMinutes / 15) * 0.8) - 10}px`
        }

        liveTimeTick()
        liveTimeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })

        let clock = setInterval(() => {
            liveTimeTick()
        }, 20000)

        if (!liveIndicator && clock) return clearInterval(clock)

        return () => clearInterval(clock)
    }, [liveIndicator])

    const formatTime = (value) => {
        let time = ''
        let hour = ''
        let hoursInt = ~~(value / 4)

        if (hoursInt.toString().length === 1) hour = '0' + hoursInt
        else hour = '' + hoursInt

        if ((value / 4) - hoursInt === 0.25) time = hour + ':15'
        if ((value / 4) - hoursInt === 0.5) time = hour + ':30'
        if ((value / 4) - hoursInt === 0.75) time = hour + ':45'
        if (value % 4 === 0) time = hour + ':00'

        return time
    }

    const timeRow = (value) => {
        let time = formatTime(value)
        let isFullHour = false

        if (value % 4 === 0) {
            isFullHour = true
        }

        return (
            <div key={value} className="time-stamp">
                <div className="hour">{isFullHour && time}</div>
                <div className="line" style={{ borderBottom: `1px solid ${isFullHour ? '#9f9f9f' : '#dfdfdf'}` }}>
                    <div className="line-time">{time}</div>
                </div>
            </div >
        )
    }

    const timeLine = () => {
        let rows = []
        for (let i = 1; i <= sections; i++) {
            rows.push(timeRow(i))
        }

        return rows
    }

    return (
        <>
            {liveIndicator && <div ref={liveTimeRef} style={{ top: 0 }} className="live-time-stamp">
                <div className="live-hour">{liveTime}</div>
                <div className="live-line"></div>
            </div >}
            {timeLine()}
        </>
    )
};
export default TimeLines;