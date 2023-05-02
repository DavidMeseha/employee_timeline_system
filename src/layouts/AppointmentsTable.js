import Blocked from "@/components/Blocked";
import MultiApointmentLayout from "./MultiAppointmentLayout";
import { useForceUpdate } from "@/Hooks/useForceUpdate";

const AppointmentsTable = ({ employees, selectedEmployees, date, containerRef, setTableScroll }) => {
    const updateLayout = useForceUpdate()

    const groupingIntersectingAppointments = (appointments) => {
        let appointmentsTemp = appointments.slice()
        let groupedAppointments = []; //will contain every appointment that have a group to prevent the repeat
        let groups = []
        let singleGroup = []
        let groupData = {
            startDate: '',
            endDate: '',
            appointments: []
        }
        let minStartDate, maxEndDate

        for (let index = 0; index < appointmentsTemp.length; index++) {
            if (groupedAppointments.includes(appointments[index])) continue

            singleGroup.push(appointmentsTemp[index])
            groupedAppointments.push(appointments[index])

            minStartDate = new Date(appointmentsTemp[index].start)
            maxEndDate = new Date(appointmentsTemp[index].end)

            for (let repeat = 0; repeat < appointments.length; repeat++) {
                for (let addIndex = 1; addIndex < appointments.length; addIndex++) {
                    if (groupedAppointments.includes(appointments[addIndex]) || singleGroup.includes(appointments[addIndex])) continue
                    let startDate = new Date(appointments[addIndex].start)
                    let endDate = new Date(appointments[addIndex].end)

                    if ((startDate >= minStartDate && startDate < maxEndDate) ||
                        (endDate >= minStartDate && startDate < minStartDate) ||
                        (endDate <= maxEndDate && startDate >= minStartDate)) {

                        if (minStartDate > appointments[addIndex].start) minStartDate = appointments[addIndex].start
                        if (maxEndDate < appointments[addIndex].end) maxEndDate = appointments[addIndex].end
                        singleGroup.push(appointments[addIndex])
                        groupedAppointments.push(appointments[addIndex])
                    }
                }
            }

            groupData = {
                startDate: minStartDate,
                endDate: maxEndDate,
                appointments: singleGroup
            }
            groups.push(groupData)

            singleGroup = []
        }

        return groups
    }

    const minWidth = (groups) => {
        let max = 0
        groups.forEach(group => {
            max = group.length > max ? group.length : max
        });

        console.log(max)
        return ((max > 1 ? max : 2) * 150)
    }

    return (
        <table className='appointments-table'>
            <tbody>
                <tr>
                    {selectedEmployees.map((employeeName, eni) => {
                        return (
                            employees.map((employee, ei) => {
                                if (employeeName !== employee.name) return
                                let appointmentGroups = groupingIntersectingAppointments(employee.appointments)
                                return (
                                    <td key={ei + eni} style={{ minWidth: minWidth(appointmentGroups) }}>

                                        {employee.blocks.map((block, bi) => {
                                            let blockedDate = new Date(block.start)
                                            if (blockedDate.getDate() !== date.getDate()) return;

                                            let blockedDateEnd = new Date(block.end)
                                            return (
                                                <Blocked key={bi} startDate={blockedDate} endDate={blockedDateEnd} comment={block.comment || ''} />
                                            )
                                        })}

                                        {appointmentGroups.map((group, gi) => {
                                            let groupDate = new Date(group.startDate)
                                            if (groupDate.getDate() !== date.getDate()) return;
                                            return (
                                                <MultiApointmentLayout
                                                    key={gi}
                                                    appointments={group.appointments}
                                                    employeeOrder={eni}
                                                    employee={employeeName}
                                                    startDate={group.startDate}
                                                    containerRef={containerRef}
                                                    setTableScroll={setTableScroll}
                                                    updateLayout={updateLayout}
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