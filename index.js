// The payroll system
// populates a record from an Array
//   ✓ has a function called createEmployeeRecord
//   createEmployeeRecord
//     ✓ populates a firstName field from the 0th element
//     ✓ populates a familyName field from the 1th element
//     ✓ populates a title field from the 2th element
//     ✓ populates a payPerHour field from the 3th element
//     ✓ initializes a field, timeInEvents, to hold an empty Array
//     ✓ initializes a field, timeOutEvents, to hold an empty Array

function createEmployeeRecord(info){
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }

}

// process an Array of Arrays into an Array of employee records
// ✓ has a function called createEmployeeRecords
// createEmployeeRecords
//   ✓ creates two records
//   ✓ correctly assigns the first names

// runs payroll using the mock data provided by Ultron data systems
// Dependent functions: createEmployeeRecords
//   takes CSV data, returns an array of employee records
//     ✓ exists
//     ✓ returns an Array with 2 records for Loki and Natalia
function createEmployeeRecords(info){
    let records = []
    info.forEach(info => records.push(createEmployeeRecord(info)))

    return records
}

// it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record
// ✓ has a function called createTimeInEvent
// createTimeInEvent
//   ✓ creates the correct type
//   ✓ extracts the correct date
//   ✓ extracts the correct hour

function createTimeInEvent(record, dateTime){
    let thisDate = dateTime.split(" ")[0]
    let time = dateTime.split(" ")[1]
    let thisHour = parseInt(time.split(":")[0])
    
    let timeObj = {
        date: thisDate,
        hour: thisHour,
        type: "TimeIn"
    }

    record.timeInEvents.push(timeObj)
    return record
}

// it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record
// ✓ has a function called createTimeOutEvent
// createTimeOutEvent
//   ✓ creates the correct type
//   ✓ extracts the correct date
//   ✓ extracts the correct hour


function createTimeOutEvent(record, dateTime){
    let thisDate = dateTime.split(" ")[0]
    let thisHour = parseInt(dateTime.split(" ")[1])
 
    
    let timeObj = {
        date: thisDate,
        hour: thisHour,
        type: "TimeOut"
    }

    record.timeOutEvents.push(timeObj)
    return record
}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
// ✓ hoursWorkedOnDate calculates the hours worked when given an employee record and a date
// hoursWorkedOnDate
// ✓ calculates that the employee worked 2 hours


function hoursWorkedOnDate(employee, date){
    let timeIn = employee.timeInEvents.find(event => event.date === date)
    let timeOut = employee.timeOutEvents.find(event => event.date === date)
    
    if(timeIn !== undefined && timeOut !== undefined){
        return (timeOut.hour - timeIn.hour)/100
    }else{
        return 0
    }

}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
// ✓ wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
// wagesEarnedOnDate
// ✓ calculates that the employee earned 54 dollars

function wagesEarnedOnDate(employee, date){
    return employee.payPerHour * hoursWorkedOnDate(employee, date)
}

// Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent
// ✓ allWagesFor aggregates all the dates' wages and adds them together
// allWagesFor
// ✓ calculates that the employee earned 378 dollars

function allWagesFor(employee){

    let dates = employee.timeInEvents.map(e => e.date)
   

    return dates.reduce((sum, date) => sum + wagesEarnedOnDate(employee, date), 0)
}


// runs payroll using the mock data provided by Ultron data systems
// Dependent functions: createEmployeeRecords
//   takes CSV data, returns an array of employee records
//     ✓ exists
//     ✓ returns an Array with 2 records for Loki and Natalia
// Dependent functions: findEmployeeByFirstName
//   ✓ exists
//   ✓ finds "Loki" 

function findEmployeeByFirstName(employees, name){
    return employees.find(e => e.firstName === name)
}


// Full Payroll Test
// from several imported CSV structures
//   calculatePayroll
//     ✓ exists
//     ✓ correctly sums the payroll burden to $11,880 when passed an array of employee records

function calculatePayroll(employees){
    return employees.reduce((sum, e) => sum + allWagesFor(e), 0)

}