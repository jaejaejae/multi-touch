function Communicator(){

	
}


Communicator.prototype.run = function(){
	this.init();//initial state
}

Communicator.prototype.init = function(){
	this.initURL = "http://dbgpucluster-2.d2.comp.nus.edu.sg:8080/ranking/rest2?name=asdf";
	this.initJsonObj = null;
	this.buildConnection(this.initURL); //return the JSON object with 
}


/*
This function build the initial connection to the server and get the initial JSON file
*/
Communicator.prototype.buildConnection = function(initURL){
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        text = xmlhttp.responseText;
        this.initJsonObj = JSON.parse(text);
        return this.initJsonObj;
    }
  }

  var url = "/fyp/restWithResults.json";
  xmlhttp.open("GET", initURL, false);
  xmlhttp.send();
}
