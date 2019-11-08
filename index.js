// Your code here
let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeData) {
    return employeeData.map((row) => {
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, workedDate) {
    let inEvent = employee.timeInEvents.find(function(e) {
        return e.date === workedDate
    })

    let outEvent = employee.timeOutEvents.find(function(e) {
        return e.date === workedDate
    })

    return (outEvent.hour - inEvent.hour) / 100

}

let wagesEarnedOnDate = function(employee, workedDate) {
    let rawWage = hoursWorkedOnDate(employee, workedDate) * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee) {
    let datesWorked = employee.timeInEvents.map( e => e.date)

    let payable = datesWorked.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(employeeArray, firstName) {
    return employeeArray.find(function(employees) {
        return employees.firstName === firstName
    })
}

let calculatePayroll = function(employeeArray) {
    return employeeArray.reduce(function(memo, employees) {
        return memo + allWagesFor(employees)
    }, 0)
}