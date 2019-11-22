//----- Initialize Firebase -----//

//Reference messages collection
var messagesRef = firebase.database().ref('Contact');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit',submitForm);

//----- Submit Form -----//
function submitForm(e){
  e.preventDefault();

  //Get values
  var name = getInputVal('contact-name');
  var email = getInputVal('contact-email');
  var subject = getInputVal('contact-subject');
  var message = getInputVal('contact-message');

  //Save message
  saveMessage(name, email, subject, message);

  //Show alert
  document.querySelector('.contactAlert').style.display='block';
  //Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.contactAlert').style.display='none';
  },3000);

  document.getElementById('contactForm').reset();
}

//Function to get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

//Save message to firebaseio
function saveMessage(name, email, subject, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    Name: name,
    Email: email,
    Subject: subject,
    Message: message,
    Time:firebase.database.ServerValue.TIMESTAMP
  });
}
