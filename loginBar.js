firebase.auth().onAuthStateChanged(function(user) {
    if (user) {//----- USER CONNECTED -----//
      console.log("User sign in");
      //show name and photo
      var noUser = document.getElementsByClassName("NoUserLogin");//show
      var yesUser =  document.getElementsByClassName("YesUserLogin");//hide
      for(var i=0;i!=noUser.length;i++){
        noUser[i].style.display = "none";//hide
      }
      for(var i=0;i!=yesUser.length;i++){
        yesUser[i].style.display = "block";//show
      }
      user.providerData.forEach(function (profile) {
      document.getElementById("UserPhoto").src= profile.photoURL;
      document.getElementById("UserName").innerHTML = profile.displayName;

      //----- ADMINISTRATOR -----//
      var adm=["breno1423@gmail.com","escolaverdeportinari@gmail.com","bia.jandiroba@gmail.com","finalarrow92@gmail.com","juninho92878797@gmail.com","lucavieiraa@gmail.com","juze.zx13@gmail.com", "lizmczeno@gmail.com"];
      var isAdm=false;
      for(var i=0;i<adm.length;i++){
        if(profile.email==adm[i]){
          isAdm=true;
        }
      }

      if(isAdm){
        console.log("Is Administrator");
          var seeAdm =  document.getElementsByClassName("SeeAdm");//show
          for(var i=0;i!=seeAdm.length;i++){
            seeAdm[i].style.display = "block";//show
          }
      }else{
        console.log("Normal user");
        var seeAdm =  document.getElementsByClassName("SeeAdm");//show
        for(var i=0;i!=seeAdm.length;i++){
          seeAdm[i].style.display = "none";//show
        }
      }
    });
  } else {  //----- NO USER -----//
    console.log("No user");
    var seeAdm =  document.getElementsByClassName("SeeAdm");//show
    for(var i=0;i!=seeAdm.length;i++){
      seeAdm[i].style.display = "none";//show
    }

    var noUser = document.getElementsByClassName("NoUserLogin");//show
    var yesUser =  document.getElementsByClassName("YesUserLogin");//hide

    for(var i=0;i!=noUser.length;i++){
      noUser[i].style.display = "block";//show
    }
    for(var i=0;i!=yesUser.length;i++){
      yesUser[i].style.display = "none";//hide
    }

    }
  });
