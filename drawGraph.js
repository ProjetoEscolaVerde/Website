

function DrawGraph(graphInfo){
  //This function helps the user to create a graph from data stored in firebase (easily)

  //Get information about the graph
  this.graphInfo = graphInfo;
  //----- store graph proprieties -----//
  const numGraphs   = this.graphInfo.data.length;
  const nameGraph   = this.graphInfo.nameGraph;
  const heightGraph = this.graphInfo.heightGraph;
  const labelGraph  = this.graphInfo.labelGraph;
  //----- global variables -----//
  let dataset = [];
  let run    = true;
  //----- Create graph types -----//
  let labelDay = [];
  for(let i=0;i<48;i++){// 00h00,00h30,01h00...
    let hour = parseInt(i/2);
    let min  = (i%2)*30;
    //change 0h30 to 00h30
    hour<10 ? hour='0'+hour : hour;
    min <10 ? min ='0'+min  : min;
    //update matrix
    let time = hour+'h'+min;
    labelDay[i] = time;
  }

  let labelMonth = [];
  for(let i=1;i<=31;i++){// 1,2,3...
    labelMonth[ i-1 ] = i;
  }
  //----- Set graph type -----//
  let labels;
  if(labelGraph=='hours'){
    labels=labelDay;
  }
  else if(labelGraph=='days'){
    labels=labelMonth;
  }
  else if(labelGraph=='weeks'){
    //@TODO ADICONAR AS SEMANAS DO ANO DE 2020 QUANDO CHEGAR 2020 OU CRIAR UM OUTRO GRÁFICO POR CIMA COM 2020
    //(SE ESTIVER COM MUITA DIFICULDADE CHAMA Breno Cunha Queiroz)
    labels= ["2019-jan-1","2019-jan-2","2019-jan-3","2019-jan-4",
            "2019-fev-1","2019-fev-2","2019-fev-3","2019-fev-4",
            "2019-mar-1","2019-mar-2","2019-mar-3","2019-mar-4","2019-mar-5",
            "2019-abr-1","2019-abr-2","2019-abr-3","2019-abr-4",
            "2019-mai-1","2019-mai-2","2019-mai-3","2019-mai-4",
            "2019-jun-1","2019-jun-2","2019-jun-3","2019-jun-4","2019-jun-5",
            "2019-jul-1","2019-jul-2","2019-jul-3","2019-jul-4",
            "2019-ago-1","2019-ago-2","2019-ago-3","2019-ago-4",
            "2019-set-1","2019-set-2","2019-set-3","2019-set-4","2019-set-5",
            "2019-out-1","2019-out-2","2019-out-3","2019-out-4",
            "2019-nov-1","2019-nov-2","2019-nov-3","2019-nov-4",
            "2019-dez-1","2019-dez-2","2019-dez-3","2019-dez-4",];

  }

  //----- Create canvas -----//
  //Canvas id: "[nameGraph]-canvas"
  document.getElementById(nameGraph).innerHTML = "<canvas id='"+nameGraph+"-canvas' height='"+ heightGraph +"'></canvas>";

  if(run){
    run=false;
    //---------- FOR EACH GRAPH ----------//
    for (let i=0;i<numGraphs;i++){
      //-- Create local variables --//
      let valuesY   = [];
      let transform = this.graphInfo.data[i].transform;
      //-- Set database firebase --//
      let addressFirebase = this.graphInfo.data[i].addressFirebase.split("/");
      let dbRefObject     = firebase.database().ref( addressFirebase[0] );

      if(addressFirebase.length>1){//If there is child
        for(let j=1;j<addressFirebase.length;j++){//Add each child to the address
        dbRefObject = dbRefObject.child( addressFirebase[j] );
        }
      }
      //----- Set chart dataset information -----//
      dataset[i]={
          label: this.graphInfo.data[i].name,
          data: valuesY,
          borderWidth: 3,
          borderColor: this.graphInfo.data[i].color,
          backgroundColor: 'transparent',
          fill: false
        };
      //-- generate graph --//
      dbRefObject.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          let childKey  = childSnapshot.key;//key of each element in firebase database
          let childData = childSnapshot.val();//value of each element in firebase database
          let index;//corresponds to X axis
          //-- values tratament to firebase (put them in the right index) --//
          if(labelGraph=='hours'){//index when data is hours

            let hour = childKey[0]+childKey[1];///get hours in the name in firebase database
            let min  = childKey[3]+childKey[4];//get minutes in the name in firebase database
            index    = hour*2+(min/30);//transform time to index

          }
          else if(labelGraph=='days'){//index when data is day

            index = childKey;

          }
          else if(labelGraph=='weeks'){//index when data is week
            //@TODO ADICONAR A QUANTIDADE DE SEMANAS POR MES QUANDO CHEGAR O ANO DE 2020 (mudar as labels tbm)
            let weeksPerMonth = [0,4,4,5,4,4,5,4,4,5,4,4,4];//starting with january 2019 (number of Sundays in the month)[0,jan,fev...]
            let year   = childKey[0]+childKey[1]+childKey[2]+childKey[3];
            let month  = childKey[10];
            let week   = childKey[16];
            let sumWeeks=0;//store the number of weeks until the actual month
            for(let j=1;j<month;j++)//update sumWeeks
              sumWeeks=sumWeeks+weeksPerMonth[j];
            index = parseInt(sumWeeks)+parseInt(week);//update index with right value
            console.log(childKey+'->'+sumWeeks+'+'+week+'='+index);

          }

          valuesY[index] = childData;//pass values from the database to the vector

          if(transform=='toFahrenheit'){
            valuesY[index] = (valuesY[index] * 1.8 + 32);
          }
          else if(transform=='toKelvin'){
            valuesY[index] = valuesY[index]+273;
          }

          let canvas = document.getElementById(nameGraph+'-canvas');

          let canvasChart = new Chart(canvas, {
            type: 'line', // bar,horizontalBar,pie,line,doughnut,radar,polarArea
            data: {
              labels: labels,
              datasets: dataset
            },
            options: {}
          });
        })
      })
    }
  }
}
