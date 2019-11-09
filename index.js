function createEmployeeRecord(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1], 
        title: employeeInfo[2], 
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(function(employeeInfo){
        return createEmployeeRecord(employeeInfo)
    })
}

function createTimeInEvent(record, date) {
    record.timeInEvents.push(
        {
            type: "TimeIn",
            date: date.split(' ')[0],
            hour: parseInt(date.split(' ')[1].split(':')[0])
        })
    return record
}

function createTimeOutEvent(record, date) {
    record.timeOutEvents.push(
        {
            type: "TimeOut",
            date: date.split(' ')[0],
            hour: parseInt(date.split(' ')[1].split(':')[0])
        })
    return record
}

function hoursWorkedOnDate(record, date) {
    let timeIn = record.timeInEvents.find(function(record){
        return record.date === date
    })

    let timeOut = record.timeOutEvents.find(function(record){
        return record.date === date
    })

    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record) {
    let allDates = record.timeInEvents.map(function(rtIE) {
        return rtIE.date
    })

    let payable = allDates.reduce(function(sum, date){
        return sum + wagesEarnedOnDate(record, date)
    }, 0)

    return payable
}

function findEmployeeByFirstName(records, name) {
    return records.find(function(record){
        return record.firstName === name
    })
}

function calculatePayroll(records) {
    return records.reduce(function(sum, record){
        return sum + allWagesFor(record)
    }, 0)
}