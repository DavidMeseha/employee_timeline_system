import clickRecognition from "@/Hooks/useClickRecognition";
import { useEffect, useRef, useState } from "react";

const TimePickerInput = ({ time, setTime, onChange }) => {
    const [isOpen, setIsOpen] = useState('')
    const [minutes, setMinutes] = useState([])
    const [hours, setHours] = useState([])
    const [dayPeriod, setDayPeriod] = useState('AM')
    const containerRef = useRef()

    useEffect(() => {
        const displayedTime = () => {
            let mins = []
            for (let i = 0; i <= 55; i += 5) {
                let stringValue = i.toString()
                if (stringValue.length === 1) stringValue = '0' + stringValue
                mins.push(stringValue)
            }

            setMinutes(mins)

            let hrs = []
            for (let i = 1; i <= 12; i++) {
                let stringValue = i.toString()
                if (stringValue.length === 1) stringValue = '0' + stringValue
                hrs.push(stringValue)
            }

            setHours(hrs)
        }

        displayedTime()
    }, [])

    const selectMinutes = (value) => {
        if (time === '') return setTime(`01:${value}`)

        let hrs = time.split(':')[0]
        let newTime = hrs + ':' + value
        setTime(newTime)
    }

    const selectHours = (value) => {
        if (time === '') return setTime(`${value}:00`)
        if (dayPeriod === 'PM') value = ((parseInt(value) % 12) + 12).toString()
        let mins = time.split(':')[1]
        let newTime = value + ':' + mins
        setTime(newTime)
    }

    const selectDayPeriod = (value) => {
        if (value === 'AM') {
            if (time === '') return setTime('01:00')

            let mins = time.split(':')[1]
            let hrs = parseInt(time.split(':')[0])
            hrs = hrs % 12
            hrs = hrs.toString()
            hrs = hrs.length === 1 ? '0' + hrs : hrs
            setTime(hrs + ':' + mins)
            setDayPeriod('AM')
        }

        if (value === 'PM') {
            if (time === '') return setTime('13:00')

            let mins = time.split(':')[1]
            let hrs = parseInt(time.split(':')[0])
            hrs = (hrs % 12) + 12
            hrs = hrs.toString()
            hrs = hrs.length === 1 ? '0' + hrs : hrs
            setTime(hrs + ':' + mins)
            setDayPeriod('PM')
        }
    }

    clickRecognition(() => setIsOpen(false), containerRef)

    return (
        <>
            <div ref={containerRef} >
                <input
                    type="time"
                    value={time}
                    onClick={(e) => { e.preventDefault(); setIsOpen(true) }}
                    onFocus={(e) => e.preventDefault()}
                    onChange={onChange}
                    step={300}
                />
                {isOpen && <div className="time-picker">
                    <div style={{ overflow: 'auto' }}>
                        {hours.map((hour, key) => {
                            return (
                                <div key={key} onClick={() => selectHours(hour)} className="value">{hour}</div>
                            )
                        })}
                    </div>
                    <div style={{ overflow: 'auto' }}>
                        {minutes.map((minute, key) => {
                            return (
                                <div key={key} onClick={() => selectMinutes(minute)} className="value">{minute}</div>
                            )
                        })}
                    </div>
                    <div>
                        <div onClick={() => selectDayPeriod('AM')} className="value">AM</div>
                        <div onClick={() => selectDayPeriod('PM')} className="value">PM</div>
                    </div>
                </div>}
            </div>
        </>
    )
};
export default TimePickerInput;