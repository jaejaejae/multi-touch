function Visualizer(){
	this.drawer = null;
}

Visualizer.prototype.init = function(rankingWithResultObj){
	if(rankingWithResultObj != null) {  
		initializationDriver(); //initialize canvas, context  
	    this.drawer = new Drawer(rankingWithResultObj.Num, rankingWithResultObj.Domains);
	    this.drawer.draw(); //start drawing
	    parseResults(rankingWithResultObj.Results);
  	}
	else{
		alert("error in laoding the json file from server");
	}
}


