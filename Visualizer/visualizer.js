function Visualizer(){
	this.drawer = null;
}

Visualizer.prototype.init = function(rankingWithResultObj){
	if(rankingWithResultObj != null) {     
	    this.drawer = new Drawer(rankingWithResultObj.Num, rankingWithResultObj.Domains);
	    this.drawer.draw();
	    // tagsObj = anw.tagsObj;
	    // length = anw.length;
	    // createDiv();
	    parseResults(rankingWithResultObj.Results);
  	}
	else{
		var touchdiv = document.getElementById("touch");
		touchdiv.innerHTML = "error in laoding the json file from server";
	}
}


