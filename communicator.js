function Communicator(){

	
}


Communicator.prototype.run = function(){
	this.init();//initial state
}

Communicator.prototype.init = function(){
	this.initURL = "http://dbgpucluster-2.d2.comp.nus.edu.sg:8080/ranking/rest2?name=asdf";
	this.initJsonObj = null;
	this.buildConnection(); //return the JSON object with 
  alert(this.initJsonObj);
}


/*
This function build the initial connection to the server and get the initial JSON file
*/

Communicator.prototype.buildConnection = function(){
  xmlhttp = new XMLHttpRequest();
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
  var jsonToSend = JSON.stringify(jsonObj);
  //send to server
  //waiting for response from the server
  //return back the responsed parsed json object
}

