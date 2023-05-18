import { useNavigate } from "react-router-dom";
import useDisplayManger from "../Hooks/useDisplayManger";
import { calculateTopFromMinutes } from "../utilities/calculations";
import { useEffect, useState } from "react";

const TimeLines = ({ liveIndicator, selectedEmployees, tableRef, dates, liveTimeRef }) => { //bool
    const navigate = useNavigate()
    const { format, date } = useDisplayManger()
    const [liveTime, setLiveTime] = useState()
    const sections = 24 * 4

    useEffect(() => {
        if (!liveTimeRef.current) return

        const liveTimeTick = () => {
            let date = new Date()
            let hours = date.getHours()
            let minutes = date.getMinutes()
            let totalMinutes = minutes + (hours * 60)

            setLiveTime(date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true }))
            liveTimeRef.current.style.top = `${calculateTopFromMinutes(totalMinutes) - 6}px`
        }

        liveTimeTick()

        let clock = setInterval(() => {
            liveTimeTick()
        }, 20001)

        if (!liveIndicator && clock) return clearInterval(clock)

        return () => clearInterval(clock)
    }, [liveIndicator])

    const formatTime = (value) => {
        let time = ''
        let hour = ''
        let hoursInt = ~~(value / 4)
        let dayPeriod = 'AM'
        if (hoursInt > 11) {
            dayPeriod = 'PM'
            hoursInt = hoursInt % 12 === 0 ? 12 : hoursInt % 12
        }
        if (value === 24 * 4) dayPeriod = 'AM'

        if (hoursInt.toString().length === 1) hour = (hoursInt === 0 ? 12 : '0' + hoursInt)
        else hour = '' + (hoursInt === 0 ? 12 : hoursInt)

        if ((value / 4) - hoursInt === 0.25 || ((value) / 4) - 12 - hoursInt === 0.25) time = hour + ':15 ' + dayPeriod
        if ((value / 4) - hoursInt === 0.5 || ((value) / 4) - 12 - hoursInt === 0.5) time = hour + ':30 ' + dayPeriod
        if ((value / 4) - hoursInt === 0.75 || ((value) / 4) - 12 - hoursInt === 0.75) time = hour + ':45 ' + dayPeriod
        if (value % 4 === 0) time = hour + ':00 ' + dayPeriod

        return time
    }

    const timeRow = (value) => {
        let time = formatTime(value)
        let isFullHour = false

        if (value % 4 === 0) {
            isFullHour = true
        }

        const sendClickedData = (e, time) => {
            const rightMargin = 50
            const leftMargin = ('touchstart' in window) ? 15 : 30
            const minWidth = format === 'daily' ? 400 : 150
            let scrollLeft = tableRef.current.scrollLeft
            let clickPosition = e.clientX
            let tableWidth = window.innerWidth - rightMargin - leftMargin
            let sectionsCount = format === 'daily' ? selectedEmployees.length : 7
            let widthPerSection = tableWidth / sectionsCount <= minWidth ? minWidth : tableWidth / sectionsCount
            let index = ~~(((clickPosition - 50) + scrollLeft) / widthPerSection)
            let employee = format === 'daily' ? selectedEmployees[index] : selectedEmployees
            let selectedDate = (format === 'daily' ? date : dates[index]).toLocaleDateString('en', { day: '2-digit', month: '2-digit', year: 'numeric' })

            navigate(`/add-appointment/${time}/${employee}/${selectedDate.replace('/', '-').replace('/', '-')}`)
        }

        return (
            <div onClick={(e) => sendClickedData(e, time)} key={value} className="time-stamp">
                <div className="hour">{isFullHour && time}</div>
                <div className="line">
                    <div className="line-time">{time}</div>
                    <div style={{ height: 1, backgroundColor: `${isFullHour ? '#c1c1c1' : '#e5e5e5'}` }}></div>
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