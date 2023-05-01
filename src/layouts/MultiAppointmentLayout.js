import { calculateTopFromMinutes } from "@/utilities/calculations";
import Appointment from "../components/Appointment";

const MultiApointmentLayout = ({ appointments, employeeOrder, employee, startDate, containerRef, updateLayout }) => {
    let setStartHours = startDate.getHours();
    let setStartMinutes = startDate.getMinutes();
    let setStartTotalMinutes = (setStartHours * 60) + setStartMinutes

    let appointmentSetStart = calculateTopFromMinutes(setStartTotalMinutes)

    return (
        <div style={{ position: 'absolute', width: '100%', top: appointmentSetStart }}>
            <div style={{ position: 'relative', display: "flex" }}>
                {appointments?.map((appointment, ai) => {
                    let appointmentDate = new Date(appointment.start)
                    let appointmentEndDate = new Date(appointment.end)

                    let appointmentStartDefrence = ((appointmentDate.getHours() * 60) + appointmentDate.getMinutes()) - setStartTotalMinutes
                    let position = calculateTopFromMinutes(appointmentStartDefrence)
                    return (
                        <div style={{ width: `${100 / appointments.length}%`, marginTop: position }}>
                            <Appointment
                                key={ai}
                                appointment={appointment}
                                employeeOrder={employeeOrder}
                                employee={employee}
                                startDate={appointmentDate}
                                endDate={appointmentEndDate}
                                containerRef={containerRef}
                                updateLayout={updateLayout}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
};
export default MultiApointmentLayout;