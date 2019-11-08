// Your code here
function createEmployeeRecord(card){
    return {
        firstName: card[0],
        familyName: card[1],
        title: card[2],
        payPerHour: card[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(emplRecords){
    return emplRecords.map((record) => createEmployeeRecord(record))
}

function createTimeInEvent(empl, dateTime){
    empl.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateTime.split(" ")[1]),
        date: dateTime.split(" ")[0]
    })
    return empl
}

function createTimeOutEvent(empl, dateTime){
    empl.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateTime.split(" ")[1]),
        date: dateTime.split(" ")[0]
    })
    return empl
}

function hoursWorkedOnDate(empl, date){
    let tIn = empl.timeInEvents.find((timeIn) => timeIn.date === date)
    let tOut = empl.timeOutEvents.find((timeOut) => timeOut.date === date)
    return (tOut.hour - tIn.hour) / 100
}

function wagesEarnedOnDate(empl, date){
    return hoursWorkedOnDate(empl, date) * empl.payPerHour
}

function allWagesFor(empl){
    let daysWorked = empl.timeInEvents.map((timeIn) => timeIn.date)
    return daysWorked.reduce((total, date) => total + wagesEarnedOnDate(empl, date), 0)
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find((empl) => empl.firstName === firstName)
}

function calculatePayroll(emplArray){
    return emplArray.reduce((total, empl) => total + allWagesFor(empl), 0)
}