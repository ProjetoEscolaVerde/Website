//----- Initialize Firebase -----//

var titleNews="some title";
var userName="some name";
var userEmail="some email";
var userImage="some image";


// Listen for form submit
document.getElementById('contactForm').addEventListener('submit',submitForm);

//----- Submit Form -----//
function submitForm(e){
  e.preventDefault();

  //Get values
  var comment = getInputVal('comment');

  //Save message
  saveMessage(comment);

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
function saveMessage(comment){
    firebase.database().ref('News/'+titleNews).push().set({
      Name: userName,
      Email: userEmail,
      Image: userImage,
      Comment: comment,
      News: titleNews,
      Time:firebase.database.ServerValue.TIMESTAMP
    })
}

//Get user info
function userInfo(name,email,imageURL){
  userName=name;
  userEmail=email;
  userImage=imageURL;
}

//Get title news
function newsInfo(title){
  console.log('title: '+title);
  titleNews=title;
}
