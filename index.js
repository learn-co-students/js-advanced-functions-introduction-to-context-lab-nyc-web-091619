// Your code here
array = []
function createEmployeeRecord(array) {
    let object = {
        firstName: array[0], 
        familyName: array[1], 
        title: array[2], 
        payPerHour: array[3], 
        timeInEvents: [], 
        timeOutEvents: []
    }

    return object 

}
twoRows = [] 

function createEmployeeRecords (twoRows) {

   let newArray =  twoRows.map(function(array) {
       return  createEmployeeRecord(array)
    })

    return newArray
}

function createTimeInEvent (record, dateStamp) {
    
    let times = dateStamp.split(" ")

    
  
    record.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(times[1]), 
        date: times[0]
    })

    return record

}

function createTimeOutEvent(record, dateStamp) {
      
    let times = dateStamp.split(" ")

    
  
    record.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(times[1]), 
        date: times[0]
    })

    return record

}

function hoursWorkedOnDate(record, dateStamp) {
    let times = dateStamp.split(" ")
    debugger
    let date = times[0]
    let hour = times[1]
    
    let timeInTime = record.timeInEvents.find(function(event) {
        return event.date === dateStamp
    })

    let outTime = record.timeOutEvents.find(function(event) {
        return event.date === dateStamp
    })

    return (outTime.hour - timeInTime.hour) / 100

}

function wagesEarnedOnDate(record, dateStamp) {
   let hours =  hoursWorkedOnDate(record, dateStamp)
   let rate = parseInt(record.payPerHour)
   return hours*rate
}

function allWagesFor(record) {
    let allDates = record.timeInEvents.map(function(event) {
        return event.date
    })

    let totalWage = allDates.reduce(function(total, date) {
        return total + wagesEarnedOnDate(record, date)
    },0 )

    return totalWage
}

function findEmployeeByFirstName (srcArray, firstName) {
    let search = srcArray.find(function (record) {
        return record.firstName === firstName
    })

    return search 
}

function  calculatePayroll(array) {
    let sum =  array.reduce(function(total, record) {
        return total + allWagesFor(record)
    }, 0)

    return sum 

}

