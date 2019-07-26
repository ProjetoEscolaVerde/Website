
/*
console.log(firebase);

var addButton = document.getElementById('addButton');

function setup(){
    // Initialize Firebase
      var config = {
        apiKey: "AIzaSyBeTQnufXiBSfgHhFOiSLeT-RSI9NQUzEY",
        authDomain: "escolaverde-portinari.firebaseapp.com",
        databaseURL: "https://escolaverde-portinari.firebaseio.com",
        projectId: "escolaverde-portinari",
        storageBucket: "escolaverde-portinari.appspot.com",
        messagingSenderId: "787796894461"
      };
      firebase.initializeApp(config);
      console.log(firebase)
    
    var database = firebase.database();
    var ref = database.ref('SensorTemperature');

    var data={
        potato:43
    }
    ref.push(data);
}


addButton.addEventListener('click',function(){
create(23);
});

function create(number){
  var data={
    number: number,
    other: 50
  };
  return firebase.database().ref().child('users').push(data);
}

function getTempDay(){
  console.log(data.val())
}*/