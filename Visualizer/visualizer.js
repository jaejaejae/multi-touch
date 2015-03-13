function Visualizer(){
	this.drawer = null;
}

Visualizer.prototype.init = function(rankingWithResultObj){
	if(rankingWithResultObj != null) {     
	    this.drawer = new Drawer(rankingWithResultObj.Num, rankingWithResultObj.Domains);
	    var anw = drawer.draw();
	    tagsObj = anw.tagsObj;
	    length = anw.length;
	  //  createDiv();
	    parseResults(jsonObj.Results);
  	}
	else{
		var touchdiv = document.getElementById("touch");
		touchdiv.innerHTML = "error in laoding the json file from server";
	}
}


function fitToContainer(canvas){
  // Make it visually fill the positioned parent
  canvas.style.width ='98%';
  canvas.style.height='98%';
  // ...then set the internal size to match
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}


function init(){
  canvas = document.getElementById('myCanvas');
  context = canvas.getContext('2d');
  fitToContainer(canvas);
}