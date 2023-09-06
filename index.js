// Your code here
function createEmployeeRecord([a, b, c, d]) {
    const array = [a, b, c, d];
    const [firstName, familyName, title, payPerHour] = array;
    const employeeRecord = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []

    }
    return employeeRecord;
}

function createEmployeeRecords(records) {
    const employeeRecordsArray = [];
    records.map(record => employeeRecordsArray.push(createEmployeeRecord(record)));
    return employeeRecordsArray;

}


function createTimeInEvent(employeeRecord, dateStamp) {

    const dateTime = dateStamp.split(" ");
    const date = dateTime[0];
    const time = parseInt(dateTime[1]);

    employeeRecord.timeInEvents.push({ type: "TimeIn", hour: time, date: date });
    return employeeRecord;

}


function createTimeOutEvent(employeeRecord, dateStamp) {

    const dateTime = dateStamp.split(" ");
    const date = dateTime[0];
    const time = parseInt(dateTime[1]);

    employeeRecord.timeOutEvents.push({ type: "TimeOut", hour: time, date: date });
    return employeeRecord;

}



function hoursWorkedOnDate(employeeRecords, dateStamp) {
    const inWork = employeeRecords.timeInEvents.find(employeeRecord => employeeRecord.date === dateStamp);
    const outWork = employeeRecords.timeOutEvents.find(employeeRecord => employeeRecord.date === dateStamp);
    const hoursOfWork = (outWork.hour - inWork.hour) * 0.01;
    return hoursOfWork;

}


function wagesEarnedOnDate(employeeRecords, dateStamp) {
    const hours = hoursWorkedOnDate(employeeRecords, dateStamp);
    return hours * employeeRecords.payPerHour;
}

function allWagesFor(employeeRecords) {

    const earningPerday = employeeRecords.timeInEvents.map(timeInEvent => wagesEarnedOnDate(employeeRecords, timeInEvent.date));
    const allEarnings = earningPerday.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return allEarnings;
}

function calculatePayroll(employeeRecords) {
    const payrolls = employeeRecords.map(employeeRecord => allWagesFor(employeeRecord))
    const sum = payrolls.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum;
}



