// Your code here


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


function createEmployeeRecords(info){
    let records = []
    info.forEach(info => records.push(createEmployeeRecord(info)))

    return records
}

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

function hoursWorkedOnDate(employee, date){
    let timeIn = employee.timeInEvents.find(event => event.date === date)
    let timeOut = employee.timeOutEvents.find(event => event.date === date)
    
    if(timeIn !== undefined && timeOut !== undefined){
        return (timeOut.hour - timeIn.hour)/100
    }else{
        return 0
    }

}

function wagesEarnedOnDate(employee, date){
    return employee.payPerHour * hoursWorkedOnDate(employee, date)
}


function allWagesFor(employee){

    let dates = employee.timeInEvents.map(e => e.date)
   

    return dates.reduce((sum, date) => sum + wagesEarnedOnDate(employee, date), 0)
}

function findEmployeeByFirstName(employees, name){
    return employees.find(e => e.firstName === name)
}

function calculatePayroll(employees){
    return employees.reduce((sum, e) => sum + allWagesFor(e), 0)

}
