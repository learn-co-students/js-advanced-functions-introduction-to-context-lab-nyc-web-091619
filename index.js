// Your code here
function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    let employeeRecords = [];
    employees.forEach(emp => employeeRecords.push(createEmployeeRecord(emp)));
    return employeeRecords;
}

function createTimeInEvent(employee, eventDate) {
    let parsedDate = eventDate.split(' ');
    employee.timeInEvents.push({ type: "TimeIn", date: parsedDate[0], hour: parseInt(parsedDate[1]) });
    return employee;
}

function createTimeOutEvent(employee, eventDate) {
    let parsedDate = eventDate.split(' ');
    employee.timeOutEvents.push({ type: "TimeOut", date: parsedDate[0], hour: parseInt(parsedDate[1]) });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
    let allWages = 0;
    let datesWorked = employee.timeOutEvents.map(event => event.date)
    for (let i = 0; i < datesWorked.length; i++) {
        allWages += wagesEarnedOnDate(employee, datesWorked[i]);
    }
    return allWages;
}

function calculatePayroll(employees) {
    let totalWagesForEmployees = 0;
    employees.forEach(employee => totalWagesForEmployees += allWagesFor(employee));
    return totalWagesForEmployees;
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(employee => employee.firstName === name);
}