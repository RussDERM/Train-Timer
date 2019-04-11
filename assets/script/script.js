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

trainData.ref().on('child_added')
