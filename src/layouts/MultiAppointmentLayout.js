import Appointment from "../components/Appointment";

const MultiApointmentLayout = ({ appointments, employeeOrder, employee, containerRef, tableRef, updateLayout }) => {
    return (
        <div style={{ position: 'absolute', width: 'calc(100% - 10px)', top: 0 }}>
            <div style={{ position: 'relative', display: "flex", gap: 10 }}>
                {appointments?.map((appointment, ai) => {
                    let appointmentDate = new Date(appointment.start)
                    let appointmentEndDate = new Date(appointment.end)
                    return (

                        <Appointment
                            key={ai}
                            appointment={appointment}
                            employeeOrder={employeeOrder}
                            employee={employee}
                            startDate={appointmentDate}
                            endDate={appointmentEndDate}
                            containerRef={containerRef}
                            tableRef={tableRef}
                            updateLayout={updateLayout}
                            appointmentsCount={appointments.length}
                        />
                    )
                })}
            </div>
        </div>
    )
};
export default MultiApointmentLayout;