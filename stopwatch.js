//button controls
const start = document.querySelector('button.start');
const stop = document.querySelector('button.stop');
const lap = document.querySelector('button.lap');
const reset = document.querySelector('button.reset');

//dom Element that i need to update
const lapList = document.querySelector('#lapList');
const stopwatchTime = document.querySelector('#stopwatchTime');

//constant that should never change
const laps = [];
const intervalRate = 10;

//values that will change often
let intervalId = null;
let rawTime = 0;

// turns the time into a human readable format
function formatTime(raw) {
    let seconds = Math.floor(raw / 1000)
    let fractionalSeconds = (raw % 1000) / 1000
    let minutes = Math.floor(seconds / 60)
    seconds = seconds - (60 * minutes) + fractionalSeconds

    return `${zeroPad(minutes)}:${zeroPad(seconds.toFixed(2))}`
}

//start recording time
function stopwatchStart(event) {
    event.preventDefault();
    console.log('Started');

    intervalId = setInterval(stopwatchUpdate, intervalRate);
}

//display the tine in HTML
function stopwatchUpdate() {
    rawTime += intervalRate;
    stopwatchTime.innerHTML = formatTime(rawTime);
}

//Stop or pause the time
function stopwatchStop(event) {
    event.preventDefault();
    console.log("stopped");

    clearInterval(intervalId);
}

//records the current time when button is clicked to a li list on webpage
function stopwatchLap(event) {
    event.preventDefault();
    let printLapList = document.getElementById("lapList");
    laps.push(formatTime(rawTime));
    lapList.innerHTML = "";
    for (var i = 0; i < laps.length; i++) {
        lapNumber = i + 1;
        nameList = "<li>" + "Lap "+ lapNumber + " time is " + laps[i] + "</li>";
        document.getElementById("lapList").innerHTML += nameList;
    }
}

//resets time and array values
function stopwatchReset(event) {
    clearInterval(intervalId);
    stopwatchTime.innerHTML = formatTime("0");
    lapList.innerHTML = "";
    while (laps.length > 0) {
        laps.pop();
    }
}

// adds a leading zero because humans like them
function zeroPad(value) {
    let pad = value < 10 ? '0' : ''
    return `${pad}${value}`
}

document.addEventListener("DOMContentLoaded", function () {
    console.log('ready!')
    stopwatchTime.innerHTML = formatTime(rawTime); //fromats the display for 0 to format time when page loads

    start.addEventListener("click", stopwatchStart);
    stop.addEventListener("click", stopwatchStop);
    lap.addEventListener("click", stopwatchLap);
    reset.addEventListener("click", stopwatchReset);
})
