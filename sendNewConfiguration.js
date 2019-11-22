//----- Initialize Firebase -----//

// Listen for form submit
document.getElementById('updateSectorForm1').addEventListener("submit", function(e){e.preventDefault();submitConfig(1);});
document.getElementById('updateSectorForm2').addEventListener("submit", function(e){e.preventDefault();submitConfig(2);});
document.getElementById('updateSectorForm3').addEventListener("submit", function(e){e.preventDefault();submitConfig(3);});
document.getElementById('updateSectorForm4').addEventListener("submit", function(e){e.preventDefault();submitConfig(4);});
document.getElementById('updateSectorForm5').addEventListener("submit", function(e){e.preventDefault();submitConfig(5);});
document.getElementById('updateSectorForm6').addEventListener("submit", function(e){e.preventDefault();submitConfig(6);});
document.getElementById('updateSectorForm7').addEventListener("submit", function(e){e.preventDefault();submitConfig(7);});

//----- Submit Form -----//
function submitConfig(sector){
  console.log("hey! aqui é o setor "+sector);
  //Show alert
  document.querySelector('.contactAlert').style.display='block';
  document.querySelector('.updatedSector'+sector).style.display='block';
  //Hide alert after 3 seconds
  setTimeout(function(){
  document.querySelector('.contactAlert').style.display='none';
  document.querySelector('.updatedSector'+sector).style.display='none';
},3000);

var cultura = getInputVal('cultura-setor'+sector);
var plantado = getInputVal('plantado-setor'+sector);
var horaIrrig = getInputVal('horaIrrig-setor'+sector);
var freqIrrig = getInputVal('freqIrrig-setor'+sector);
var adubo = getInputVal('fertilizer-setor'+sector);
var praga = getInputVal('praga-setor'+sector);
var foto = getInputVal('foto-setor'+sector);

saveConfig(sector,cultura,plantado, horaIrrig, freqIrrig,adubo, praga, foto);

  resetForm('.updateSectorForm'+sector);
}

//Function to get form values
function getInputVal(id){
  return document.getElementById(id).value;
}
function resetForm(id){
  document.querySelector(id).reset();
}

//Save message to firebaseio
function saveConfig(sector,cultura,plantado, horaIrrig, freqIrrig, adubo, praga, foto){
//----- Change directory in RealTimeDataBase to right sector -----//
  var newConfigRef='ConfigSectors/Sector-'+sector;


if(cultura!='' && cultura!='x'&& cultura!='X')
  firebase.database().ref(newConfigRef+"/Culture").set(cultura);
if(plantado!='' && plantado!='x'&& plantado!='X')
  firebase.database().ref(newConfigRef+"/Planted").set(plantado);
if(horaIrrig!='' && horaIrrig!='x'&& horaIrrig!='X')
  firebase.database().ref(newConfigRef+"/Hour").set(horaIrrig);
if(freqIrrig!='' && freqIrrig!='x'&& freqIrrig!='X')
  firebase.database().ref(newConfigRef+"/Frequency").set(freqIrrig);
if(adubo!='' && adubo!='x'&& adubo!='X')
  firebase.database().ref(newConfigRef+"/Fertilizer").set(adubo);
if(praga!='' && praga!='x'&& praga!='X')
  firebase.database().ref(newConfigRef+"/Plague").set(praga);
if(foto!='' && foto!='x'&& foto!='X')
  firebase.database().ref(newConfigRef+"/Image").set(foto);

  if(cultura=='x' || cultura=='X')
    firebase.database().ref(newConfigRef+"/Culture").remove();
  if(plantado=='x' || plantado=='X')
    firebase.database().ref(newConfigRef+"/Planted").remove();
  if(horaIrrig=='x' || horaIrrig=='X')
    firebase.database().ref(newConfigRef+"/Hour").remove();
  if(freqIrrig=='x' || freqIrrig=='X')
    firebase.database().ref(newConfigRef+"/Frequency").remove();
  if(adubo=='x' || adubo=='X')
    firebase.database().ref(newConfigRef+"/Fertilizer").remove();
  if(praga=='x' || praga=='X')
    firebase.database().ref(newConfigRef+"/Plague").remove();
  if(foto=='x' || foto=='X')
    firebase.database().ref(newConfigRef+"/Image").remove();
}
