var elasticModeColor = 'rgba(173, 214, 255,0.5)';
var timer;
var canMove = true;

function runElastic(){
	initElastic();
}

function initElastic(){
	var warp = document.getElementById('wrap');
	var touch = document.getElementById('touch');
	var result = document.getElementById('result');
	touch.style.backgroundColor = elasticModeColor;
	result.style.backgroundColor = elasticModeColor;
}


function setTimer(){
	if(timer != undefined){
		clearTimeout(timer);	
	}
	console.log("timer set");
	timer = setTimeout(function(){
		//alert("stop");
		canMove = false;
		notifyUpdate(tagsObj);}, 2000);
}


function elasticMove(range, tag, tagsObj, event){

	var object = tag.div;
    if (event.targetTouches.length == 1) {
      	object.style.webkitTransition = 'left ease 0s';
        var touch = event.targetTouches[0];
        var posit = insideDomain(range, tag, touch.pageX, touch.pageY); //posit is the final position
        var newRank = tag.updateRank();  //update rank

			//some update
			tag.rank = newRank;
			updateTagCordinate(tag, posit);
			if(tag.rank != tag.lastRank){
				//check for timer
				setTimer();

			    tag.updateColor();
			    tag.updateAngle();
			    sortByAngle(tag, tagsObj);
			    updateTagObjsDuringMove(tag, tagsObj);
			}
		    tagsObj = collisionResolve(tag, tagsObj);
		    tag.lastRank = tag.rank;

    }
  
    return tagsObj;
}

function elasticEnd(tagsObj, tag, event){
	clearTimeout(timer);
	var isSend = false;

	var object = tag.div;
	//var sendUpdateFlag = true;//in elastic mode, update for every finger released
    // Place element where the finger is
  /*  var posit = centerToCanvas(tag.canvas, tag.x, tag.y);
   // updateColor(tag, tag.rank);
  	tag.updateColor();
    object.style.webkitTransition = 'ease 1s';
    object.style.left = posit.x + 'px';
    object.style.top = posit.y + 'px';*/
    object.style.webkitTransition = 'ease 1s';
    tag.updateAngle();
    sortByAngle(tag, tagsObj);
    eventlySpread(tag, tagsObj);



	resetBackToOriginal(tag);

	//check within save region
	var isWithin = isWithinSaveRegion(tagsObj);
	isSend = (!isWithin);//send when there are some tags are not within save region

 

    return {obj: tagsObj, isSend: isSend};

}


