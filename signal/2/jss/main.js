var stateLamp 	;
var stateFan 	=false;
var stateAir 	=false;

var valueLamp;
var valueFan;
var valueAir;


function WriteDataToFirebase(lamp,fan,air){
	
	firebase.database().ref("D305").set({
		
        Den		:lamp,
        Quat	:fan,
        MayLanh	:air
    });
}


// listen data

var dbRefLamp = firebase.database().ref('D305').child('Den');

dbRefLamp.on('value', snap => {
		
    if(snap.val()=="ON"){
  	
      	stateLamp	= true;
      	valueLamp	= "ON";
  	}
  	else{
  	
      	stateLamp	=false;
      	valueLamp	="OFF";
  	}
  
  	if(stateLamp){
      	document.getElementById("imgLamp").setAttribute("src","./image/lampbulbon.png");
  	}
  	else{
      	document.getElementById("imgLamp").setAttribute("src","./image/lampbulboff.png");
  	}
});


function ClickLamp(){
	
    stateLamp	=!	stateLamp;
    
    if(stateLamp){
    	
        document.getElementById("imgLamp").setAttribute("src" , "./image/lampbulbon.png");
        valueLamp = "ON";
    }
    else{
        document.getElementById("imgLamp").setAttribute("src" , "./image/lampbulboff.png");
        valueLamp = "OFF";
    }
    
    WriteDataToFirebase( valueLamp , valueFan , valueAir);
}


var dbRefAir = firebase.database().ref('D305').child('MayLanh');

dbRefAir.on('value', snap =>{
    if(snap.val()=="ON"){
        stateAir=true;
        valueAir="ON";
    }else if(snap.val()=="OFF"){
        stateAir=false;
        valueAir="OFF";
    }
    if(stateAir){
        document.getElementById("imgAir").setAttribute("src",".//image/aircondition.png");
    }else{
        document.getElementById("imgAir").setAttribute("src",".//image/airconditionoff.png");
    }
});


function ClickAir(){
	
    stateAir=!stateAir;
    if(stateAir){
        document.getElementById("imgAir").setAttribute("src",".//image/aircondition.png");
        valueAir="ON";
    }else{
        document.getElementById("imgAir").setAttribute("src",".//image/airconditionoff.png");
        valueAir="OFF";
    }
    WriteDataToFirebase(valueLamp,valueFan,valueAir);
}


var dbRefFan = firebase.database().ref('D305').child('Quat');

dbRefFan.on('value', snap =>{
    if(snap.val()=="ON"){
        stateFan=true;
        valueFan="ON";
    }else if(snap.val()=="OFF"){
        stateFan=false;
        valueFan="OFF";
    }
    if(stateFan){
        document.getElementById("imgFan").setAttribute("src",".//image/electricfanon.png");
    }else{
        document.getElementById("imgFan").setAttribute("src",".//image/electricfanoff.png");
    }
});

function ClickFan(){
    stateFan=!stateFan;
    if(stateFan){
        document.getElementById("imgFan").setAttribute("src",".//image/electricfanon.png");
        valueFan="ON";
    }else{
        document.getElementById("imgFan").setAttribute("src",".//image/electricfanoff.png");
        valueFan="OFF";
    }
    WriteDataToFirebase(valueLamp,valueFan,valueAir);
}




////////////////// get value Temperature and Humidity from firebase/////

var valueTemp = firebase.database().ref('DHT11').child('Temperature');

valueTemp.on('value', snap =>{
	
    console.log("Nhiet do :  "+snap.val());
    
    document.getElementById("tvTemp").innerHTML = snap.val()+" C";
});

var valueHumid = firebase.database().ref('DHT11').child('Humid');

valueHumid.on('value', snap =>{
	
    console.log("Do am :  "+snap.val());
    
    document.getElementById("tvHumid").innerHTML = snap.val()+" %";
});


///// check connect internet//////

window.addEventListener("online",function(){
	
    this.alert("Bạn đã trở lại với thế giới!");
});

window.addEventListener("offline",function(){
	
    this.alert("Opp! Kiểm tra lại đường truyền!");
});


function tempchange(){
	
	var temp = document.getElementById("inputTemp").value;
	
	firebase.database().ref("DHT11").set({
		
        Temperature : temp,
        Humid 		: 75
    });
}