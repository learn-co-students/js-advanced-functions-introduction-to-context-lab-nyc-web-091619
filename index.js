// Your code here

// create a function to take in an array of four
// elements (firstName, familyName, title, payPerHour).
// The function creates a javascript Object and returns
// it after adding an empty array to hold timeInEvents
// and another for timeOutEvents javascript objects.
function createEmployeeRecord(employeeInfoArray) {
    return {
        firstName: employeeInfoArray[0], 
        familyName: employeeInfoArray[1], 
        title: employeeInfoArray[2], 
        payPerHour: employeeInfoArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// using the createEmployeeRecord function, this next
// function uses the .map method to iterate through 
// an array of 4-element arrays that contain the
// firstName, familyName, title and payPerHour for
// each individual.  The return is an array of employee
// javascript objects 
function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(function(employee) {
        // console.log(createEmployeeRecord(employee))
        return createEmployeeRecord(employee)
    });
}

// function createTimeInEvent takes in a Javascript
// object of an Employee and a date stamp in the 
// format ("YYYY-MM-DD HHMM").  We use the .split
// method for arrays and separate the string into 
// two separate strings and assign them to variables
// "date" (YYYY-MM-DD) and "hour" (HHMM).
// We then use the .push array method to add a new
// timeInEvent object into the employeeObj's 
// timeInEvent array.  This object contains 3 
// attributes, "type", "hour", and "date"
// The function the returns the employee Object to 
// caller.
function createTimeInEvent(employeeObj, dateStamp) {
    // console.log(dateStamp.split(" "))
    let [date, hour] = dateStamp.split(" ")
    // console.log(date)
    // console.log(time)
    
    employeeObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return employeeObj
}

// same as TimeIn event except for TimeOut.
function createTimeOutEvent(employeeObj, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    
    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return employeeObj
}

// hoursWorkedOnDate takes in arguments of an employee object and
// a date.  It uses the .find method on the employeeObj and 
// iterates through both the timeInEvents and the timeOutEvents
// arrays of the employee object and sets the value to any elements
// of those arrays that contain a date that matches the queryDate
// we passedd in as our second argument.
// We subtract the clockIn.hour (in 24 hour format) from the 
// clockOut.hour and then divide by 100 to get rid of the "minutes"
// (eg. 1600 - 800 = 800 / 100 = 8 hours).  The function the 
// returns the number of hours.
function hoursWorkedOnDate(employeeObj, queryDate) {
    let clockIn = employeeObj.timeInEvents.find(function (e) {
        return e.date === queryDate
    });

    let clockOut = employeeObj.timeOutEvents.find(function(e) {
        return e.date === queryDate
    })
    console.log(clockOut.hour)
    console.log(clockIn.hour)
    console.log((clockOut.hour - clockIn.hour) / 100)
    return (clockOut.hour - clockIn.hour) / 100
}

// 
function wagesEarnedOnDate(employeeObj, queryDate) {
        let wages = hoursWorkedOnDate(employeeObj, queryDate) 
        * employeeObj.payPerHour
        // console.log(parseFloat(wages.toString()) )
    return parseFloat(wages.toString()) 
}

function allWagesFor(employeeObj) {
    let allDaysWorked = employeeObj.timeInEvents.map(function(event){
        return event.date
    })

    let totalWages = allDaysWorked.reduce(function(sum, date){
        return sum + wagesEarnedOnDate(employeeObj, date)
    }, 0)

    return totalWages
}

function findEmployeeByFirstName(allEmployeeArray, firstNameQuery) {
    return allEmployeeArray.find(function(employee) {
        return employee.firstName == firstNameQuery
    })
}

function calculatePayroll (allEmployeeArray) {
    return allEmployeeArray.reduce(function(sum, el) {
        return sum + allWagesFor(el)
    }, 0)
}