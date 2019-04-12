// Initialize Firebase
var config = {
  apiKey: "AIzaSyAluhsWAYE7uz_3Ykmj3-Bc6bAjsM-Aumw",
  authDomain: "train-timer-900e5.firebaseapp.com",
  databaseURL: "https://train-timer-900e5.firebaseio.com",
  projectId: "train-timer-900e5",
  storageBucket: "train-timer-900e5.appspot.com",
  messagingSenderId: "868356216752"
};
firebase.initializeApp(config);

// var to reference database
var trainData = firebase.database();

//click function to store input data in firebase database
$("#submit").on("click", function () {
  // on click, grab input and stick in variables
  var name = $('#train-name').val().trim();
  var destination = $('#destination').val().trim();
  var startTime = $('#start-time').val().trim();
  var frequency = $('#frequency').val().trim();
  console.log(name);
  console.log(destination);
  console.log(startTime);
  console.log(frequency);

  // use variables to create an object to push to firebase
  var train = {
    trainName: name,
    destination: destination,
    startTime: startTime,
    frequency: frequency,
  }

  console.log(train);

  //sets databse references, for persistance
  trainData.ref().push(train);

  //empty input boxes
  $('#train-name').val('');
  $('#destination').val('');
  $('#start-time').val('');
  $('#frequency').val('');
});

//function to append train objects to the display table, when a child object is added to the trainData array

trainData.ref().on('child_added', function (snapshot) {
  var name = snapshot.val().trainName;
  var destination = snapshot.val().destination;
  var startTime = snapshot.val().startTime;
  var frequency = snapshot.val().frequency;

  //current time to measure against
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  //startTime must be converted to a date in the past, to avoid errors
  var startTimeConvert = moment(startTime, 'HH:mm').subtract(1, 'day');
  console.log(startTimeConvert);

  //methods to calculate required values
  //calculates time remaining until next train

  //isolate how long it has been since the first train, 
  var timeDiff = moment().diff(moment(startTimeConvert), 'minutes');
  console.log(timeDiff);
  //divide timeDiff by frequency, using modulus to capture remained. Remainder is how long ago last train left.
  var timeRemaining = timeDiff % frequency;
  console.log(timeRemaining);
  //take timeDiff, and subtract is from the frequency to see how long until the next trian
  var nextTrain = frequency - timeRemaining;
  console.log(nextTrain);
  //Take nextTrain, and add it to current time to see an arrival time
  var arrivalTime = moment().add(nextTrain, 'minutes');
  //convert arrivalTime into hh:mm
  var arrivalTimeConvert = moment(arrivalTime).format('hh:mm');


  //append data to #train-data
  //$('train-data').append(name);
  $('#train-data').append(' <tr><td>' + name + '</td><td>' + destination + '</td><td>' + frequency + '</td><td>' + arrivalTimeConvert + '</td><td>' + nextTrain + '</td></tr>');
});
