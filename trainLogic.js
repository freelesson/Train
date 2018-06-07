// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyCpeB9ZzLgHtzjRqR9-tzCAWuLYMvJWr2o",
    authDomain: "train-schedule-520cc.firebaseapp.com",
    databaseURL: "https://train-schedule-520cc.firebaseio.com",
    projectId: "train-schedule-520cc",
    storageBucket: "",
    messagingSenderId: "510057299631"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var timeStart = moment($("#time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");;
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        role: destination,
        tstart: timeStart,
        rate: frequency
    };

    database.ref().push(newTrain);

    // Logs everything to console for testing
    console.log(newTrain.name);
    console.log(newTrain.role);
    console.log("array: " + newTrain.tstart);
    console.log("input: " + timeStart);
    console.log(newTrain.rate);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});
//retreives the data from firebase
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().role;
    var timeStart = childSnapshot.val().tstart;
    var frequency = childSnapshot.val().rate;

    // time logic
    var diffTime = moment().diff(moment.unix(timeStart), "minutes");
    var timeRemainder = moment().diff(moment.unix(timeStart), "minutes") % frequency;
    var minutes = frequency - timeRemainder;

    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

    // test to make sure it works
    console.log(trainName);
    console.log(destination);
    console.log(timeStart);
    console.log(frequency);
    console.log("diffTime: " + diffTime);
    console.log("timeRemainder: " + timeRemainder);
    console.log("minutes: " + minutes);
    console.log("nextTrainArrival: " + nextTrainArrival);




    // create the table

    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("btn-remove-key");
    // Adding a data-attribute
    //a.attr("data-key", "xxx");
    // Providing the initial button text
    a.text("Delete");

    // $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    //     frequency + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td><td>" + "<button>Delete</button>" + "</td></tr>");
    $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
    // </td><td>"<a ref="#" class="btn-remove-key" data-key="-dsdsf-sample-key">Delete</a>"</td></tr>");


    var name = childSnapshot.prevChildKey;
    console.log("key: " + name);


});

//function to display the current time
$(document).ready(function () {
    // var currentTime = moment().format('MMMM Do, YYYY h:mm a');
    // console.log("current time: " + currentTime);
    // $(".current-time").append("<h5>Current Time: " + currentTime);
    displayCurrentTime();
});

//update the page every 2 minutes 
window.setInterval(function () {
    window.location.reload(1)
}, 120000);

// function to call current time
function displayCurrentTime() {
    currentTime = moment().format('MMMM Do, YYYY h:mm a');
    console.log("current time: " + currentTime);
    $(".current-time").append("<h4>Current Time: " + currentTime);
};