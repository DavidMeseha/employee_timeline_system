import Appointment from "../components/Appointment";

const MultiApointmentLayout = ({ appointments, employeeOrder, employee, containerRef, setTableScroll, timelineRef, editing, setEditing, editEmployeeDatesView, reset }) => {
    let displayed = []
    let stack = []

    return (
        <div style={{ position: 'absolute', width: 'calc(100% - 10px)', top: 0 }}>
            <div style={{ position: 'relative', display: "flex", gap: 5 }}>
                {appointments?.map((startingAppointment) => {
                    stack = []
                    if (displayed.includes(startingAppointment)) return
                    displayed.push(startingAppointment)

                    return (
                        <div style={{ position: 'relative', width: '100%' }}>
                            {appointments.map((appointment) => {
                                let appointmentDate = new Date(appointment.start)
                                let appointmentEndDate = new Date(appointment.end)
                                let stackItem

                                if (appointment === startingAppointment) {
                                    stackItem = {
                                        start: appointmentDate,
                                        end: appointmentEndDate
                                    }

                                    stack.push(stackItem)
                                }

                                if (displayed.includes(appointment) && appointment !== startingAppointment) return

                                if (appointment !== startingAppointment) {
                                    let isOverlaping = false
                                    stack.forEach(item => {
                                        if (!(appointmentEndDate <= item.start)) {
                                            if (!(appointmentDate >= item.end)) isOverlaping = true
                                        }
                                    });

                                    if (isOverlaping) return

                                    stackItem = {
                                        start: appointmentDate,
                                        end: appointmentEndDate
                                    }
                                    stack.push(stackItem)

                                    displayed.push(appointment)
                                }

                                return (
                                    <Appointment
                                        key={appointment.id}
                                        appointment={appointment}
                                        employeeOrder={employeeOrder}
                                        employee={employee}
                                        startDate={appointmentDate}
                                        endDate={appointmentEndDate}
                                        containerRef={containerRef}
                                        timelineRef={timelineRef}
                                        setTableScroll={setTableScroll}
                                        editing={editing}
                                        setEditing={setEditing}
                                        editEmployeeDatesView={editEmployeeDatesView}
                                        reset={reset}
                                        appointmentsCount={appointments.length}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
};
export default MultiApointmentLayout;