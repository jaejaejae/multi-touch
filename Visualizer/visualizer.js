var dataName = "";
var domainNames = []; //an array of domain names
const PERMANANT_MODE = 0,
	  ELASTIC_MODE = 1;
Visualizer.MODE = PERMANANT_MODE;

function Visualizer(){
	this.drawer = null;
}

Visualizer.prototype.init = function(rankingWithResultObj){
	if(rankingWithResultObj != null) { 
		this.storeValues(rankingWithResultObj);
		initializationDriver(); //initialize canvas, context  
	    this.drawer = new Drawer(rankingWithResultObj.Num, rankingWithResultObj.Domains);
	    this.drawer.draw(); //start drawing
	    parseResults(rankingWithResultObj.Results);
  	}
	else{
		alert("error in laoding the json file from server");
	}
}

//store some golble varables for creating the json object which will be sent back to server for update.
Visualizer.prototype.storeValues = function(rankingWithResultObj){
	dataName = rankingWithResultObj.Name;
	for (var i = 0; i < rankingWithResultObj.Domains.length; i++) {
		domainNames.push(rankingWithResultObj.Domains[i].Name);
	};
}


Visualizer.prototype.thirdPhase = function(newRankingWithResult){
	if(newRankingWithResult != null){
		this.drawer.redraw(newRankingWithResult.Domains);
		parseResults(newRankingWithResult.Results);
	}
	else{
		alert("no update from the server");
	}
}

//the function called by the touchEnd event in initDrawing.js.
function notifyUpdate(obj){
	var backToServerJson = parseIntoJsonObj(obj);
	controller.secondPhase(backToServerJson); //notify the controller of the update
}



/*This function parse the tagsObj(3D array stores tags arrays for each rank of each domain)
  into a standardize json object as required in order to send back to server.
  Returns the standardize json object.
*/
function parseIntoJsonObj(jsonObj){
	var jsonData = {
		Name: dataName,
		Domains: []
	};


	for (var i = 0; i < jsonObj.length; i++) { //for each domain
		var domainObj = {Name: domainNames[i],
	              	 Tag: []};
		for (var j = 0; j < jsonObj[i].length; j++) { //for each rank
			for (var k = 0; k < jsonObj[i][j].length; k++) { //for each tag
				var tag = jsonObj[i][j][k];
				var tagObj = {
				  Name: tag.text,
				  OldRank: tag.serverRank,
				  NewRank: tag.rank
				}
				domainObj.Tag.push(tagObj);
			};//end of tag for
		};//end of rank for
		jsonData.Domains.push(domainObj);
	};//end of domain for

	return jsonData;
}

