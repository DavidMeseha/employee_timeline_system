const Appointment = ({ appointment }) => {
    let startHours = parseInt(appointment.start.split(':')[0])
    let startMinutes = parseInt(appointment.start.split(':')[1])
    let startTotalMinutes = (startHours * 60) + startMinutes
    console.log(startHours, startMinutes, startTotalMinutes)

    let endHours = parseInt(appointment.end.split(':')[0])
    let endMinutes = parseInt(appointment.end.split(':')[1])
    let endTotalMinutes = (endHours * 60) + endMinutes

    let appointmentStart = startTotalMinutes + ((startTotalMinutes / 15) * 0.8) - 2
    let appointmentEnd = (endTotalMinutes - startTotalMinutes) + (((endTotalMinutes - startTotalMinutes) / 15) * 0.8)

    return (
        <div style={{ top: appointmentStart, height: appointmentEnd }} className="appointment"></div>
    )
};

export default Appointment;