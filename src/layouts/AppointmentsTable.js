import Appointment from "@/components/Appointment";
import Blocked from "@/components/Blocked";

const AppointmentsTable = ({ employees, selectedEmployees, date, containerRef }) => {
    return (
        <table className='appointments-table'>
            <tbody>
                <tr>
                    {selectedEmployees.map((employeeName, i) => {
                        return (
                            employees.map((employee) => {
                                if (employeeName !== employee.name) return
                                return (
                                    <td key={Math.floor(Math.random() * 5000)}>

                                        {employee.blocks.map((block, i) => {
                                            let blockedDate = new Date(block.start)
                                            if (blockedDate.getDate() !== date.getDate()) return;

                                            let blockedDateEnd = new Date(block.end)
                                            return (
                                                <Blocked key={i} startDate={blockedDate} endDate={blockedDateEnd} comment={block.comment || ''} />
                                            )
                                        })}


                                        {employee.appointments?.map((appointment, ai) => {
                                            let appointmentDate = new Date(appointment.start)
                                            if (appointmentDate.getDate() !== date.getDate()) return;

                                            let appointmentEndDate = new Date(appointment.end)
                                            return (
                                                <Appointment
                                                    key={ai}
                                                    appointment={appointment}
                                                    employeeOrder={i}
                                                    employee={employeeName}
                                                    startDate={appointmentDate}
                                                    endDate={appointmentEndDate}
                                                    containerRef={containerRef}
                                                />
                                            )
                                        })}
                                    </td>
                                )
                            })
                        )
                    })}
                </tr>
            </tbody>
        </table>
    )
};
export default AppointmentsTable;