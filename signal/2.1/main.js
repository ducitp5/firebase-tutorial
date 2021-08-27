var stateLamp =false;
var stateFan =false;
var stateAir =false;
var valueLamp="OFF";
var valueFan="OFF";
var valueAir="OFF";
///// ham ghi du lieu len firebase
function WriteDataToFirebase(lamp,fan,air){
    firebase.database().ref("D305").set({
        Den:lamp,
        Quat:fan,
        MayLanh:air
    });
}
//change listen data
var dbRefLamp = firebase.database().ref('D305').child('Den');
dbRefLamp.on('value', snap =>{
    if(snap.val()=="ON"){
        stateLamp=true;
        valueLamp="ON";
    }else if(snap.val()=="OFF"){
        stateLamp=false;
        valueLamp="OFF";
    }
});
var dbRefFan = firebase.database().ref('D305').child('Quat');
dbRefFan.on('value', snap =>{
    if(snap.val()=="ON"){
        stateFan=true;
        valueFan="ON";
    }else if(snap.val()=="OFF"){
        stateFan=false;
        valueFan="OFF";
    }
});
var dbRefAir = firebase.database().ref('D305').child('MayLanh');
dbRefAir.on('value', snap =>{
    if(snap.val()=="ON"){
        stateAir=true;
        valueAir="ON";
    }else if(snap.val()=="OFF"){
        stateAir=false;
        valueAir="OFF";
    }
});
function ClickLamp(){
    stateLamp=!stateLamp;
    if(stateLamp){
        valueLamp="ON";
    }else{
        valueLamp="OFF";
    }
    WriteDataToFirebase(valueLamp,valueFan,valueAir);
}
function ClickFan(){
    stateFan=!stateFan;
    if(stateFan){
        valueFan="ON";
    }else{
        valueFan="OFF";
    }
    WriteDataToFirebase(valueLamp,valueFan,valueAir);
}
function ClickAir(){
    stateAir=!stateAir;
    if(stateAir){
        valueAir="ON";
    }else{
        valueAir="OFF";
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

