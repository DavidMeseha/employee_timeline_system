import Appointment from "../components/Appointment";

const MultiApointmentLayout = ({ appointments, employeeOrder, employee, containerRef, setTableScroll, timelineRef, editing, setEditing, editEmployeeDatesView, reset }) => {
    return (
        <div style={{ position: 'absolute', width: 'calc(100% - 10px)', top: 0 }}>
            <div style={{ position: 'relative', display: "flex", gap: 5 }}>
                {appointments?.map((appointment, ai) => {
                    let appointmentDate = new Date(appointment.start).toString()
                    let appointmentEndDate = new Date(appointment.end).toString()

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
        </div>
    )
};
export default MultiApointmentLayout;