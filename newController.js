

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
    this.visualizer.init(communicator.initJsonObj);
}