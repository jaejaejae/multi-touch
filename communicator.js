function Communicator(){
    this.dataName = "dress"; //data set name    
 // this.dataName = "indian_tweet"; //data set name    
   this.numOfResults = 10;
 // this.URL = "http://dbgpucluster-2.d2.comp.nus.edu.sg:8080/ranking.interface/ranking?";
    this.URL = "http://192.168.1.41:9080/ranking.interface/ranking?";
	
}


Communicator.prototype.run = function(){
	this.init();//initial state
}

Communicator.prototype.init = function(){
	// this.initURL = "http://dbgpucluster-2.d2.comp.nus.edu.sg:8080/ranking/rest2?name=asdf";
  this.initURL = this.URL+"init=true&name="+this.dataName+"&k="+this.numOfResults;
	this.initJsonObj = null;
	this.buildConnection(); //return the JSON object with 
 // alert(this.initJsonObj);
}


/*
This function build the initial connection to the server and get the initial JSON file
*/

Communicator.prototype.buildConnection = function(){
  var xmlhttp = new XMLHttpRequest();
  var obj = this;
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var text = xmlhttp.responseText;
        obj.initJsonObj = JSON.parse(text);
    }
  }

  //var url = "/fyp/restWithResults.json";
  xmlhttp.open("GET", this.initURL, false);
  xmlhttp.send();
 // alert(this.initJsonObj);
}

// Communicator.prototype.buildConnection = function(){
//   // alert(this.initURL);
//   $.get(this.initURL, function(data){
//       alert(data);
//       this.initJsonObj = JSON.parse(data);
//   },false);
// }


Communicator.prototype.secondPhase = function(jsonObj){
  var tempurl = "http://dbgpucluster-2.d2.comp.nus.edu.sg:8080/ranking.interface/ranking?";
  var jsonToSend = JSON.stringify(jsonObj);
  this.backURL = this.URL+"name="+this.dataName+"&k="+this.numOfResults;
  console.log("send to server");
  //send to server
  $.post(this.backURL, jsonToSend, function(data){
      //  alert("Data: " + data + "\nStatus: " + status);
      console.log("received");
        var object = data; 
        controller.thirdPhase(object);

    });
  //waiting for response from the server
  //return back the responsed parsed json object


  //temp testing code
  
  tempConnection();
}


function tempConnection(){
/*  $.getJSON("/multi-touch/received.json", function(json) {
    console.log(json); // this will show the info it in firebug console
    var object = json; 
    controller.thirdPhase(object);
  });*/

}
