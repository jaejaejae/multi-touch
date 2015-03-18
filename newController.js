

function Controller(){    
    this.communicator = null;
    this.visualizer = null;
    this.run();
}

Controller.prototype.run = function(){
    this.initialPhase();
}

/*
This function impelement the initial phase of the system by creating
a new object of Visualizer and Communicator.
Calling Communicator to request JSON from the server,
pass the JSON object back to Visualizer to visualize and display to the user
*/
Controller.prototype.initialPhase = function(){
    this.communicator = new Communicator();
    this.visualizer = new Visualizer();
    this.communicator.init();
    var rankingWithResultsObj = this.communicator.initJsonObj;
    this.visualizer.init(this.communicator.initJsonObj);
}

/*In the second phase, the Visualizer return back the updated object and
	update back to the server through the Communicator.
*/
Controller.prototype.secondPhase = function(jsonObj){
	this.communicator.secondPhase(jsonObj); //communicator will return the updated parsed json file back.
}