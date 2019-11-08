const createEmployeeRecord = arr => {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = arr => arr.map(createEmployeeRecord);

const createTimeInEvent = (employeeRecord, dateStamp) => {
  employeeRecord.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(dateStamp.slice(11), 10),
    date: dateStamp.slice(0, 10),
  });
  return employeeRecord;
};

const createTimeOutEvent = (employeeRecord, dateStamp) => {
  employeeRecord.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(dateStamp.slice(11), 10),
    date: dateStamp.slice(0, 10),
  });
  return employeeRecord;
};

const hoursWorkedOnDate = (employeeRecord, dateString) => {
  const timeIn = employeeRecord.timeInEvents.find(
    event => event.date === dateString,
  );
  const timeOut = employeeRecord.timeOutEvents.find(
    event => event.date === dateString,
  );

  return (timeOut.hour - timeIn.hour) / 100;
};

const wagesEarnedOnDate = (employeeRecord, dateString) => {
  return (
    hoursWorkedOnDate(employeeRecord, dateString) * employeeRecord.payPerHour
  );
};

const allWagesFor = employeeRecord => {
  const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  const allWages = datesWorked.reduce(
    (sum, date) => sum + wagesEarnedOnDate(employeeRecord, date),
    0,
  );
  return allWages;
};

const findEmployeeByFirstName = (arr, name) =>
  arr.find(employee => employee.firstName === name);
const calculatePayroll = arr => {
  const allWagesEver = arr.reduce(
    (sum, employee) => sum + allWagesFor(employee),
    0,
  );
  return allWagesEver;
};
