export const groupingIntersectingAppointments = (appointments) => {
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

        for (let repeat = 0; repeat <= appointments.length * 2; repeat++) {
            for (let addIndex = 1; addIndex < appointments.length; addIndex++) {
                if (groupedAppointments.includes(appointments[addIndex]) || singleGroup.includes(appointments[addIndex])) continue
                let startDate = new Date(appointments[addIndex].start)
                let endDate = new Date(appointments[addIndex].end)

                if ((startDate >= minStartDate && startDate < maxEndDate) ||
                    (endDate > minStartDate && startDate < minStartDate) ||
                    (endDate <= maxEndDate && startDate > minStartDate) ||
                    (endDate > maxEndDate && startDate < minStartDate)) {

                    if (minStartDate > startDate) minStartDate = startDate
                    if (maxEndDate < endDate) maxEndDate = endDate
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
