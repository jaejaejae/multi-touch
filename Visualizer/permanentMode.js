var permanentColor = 'rgba(250,230,217,0.5)';


function runPermanent(){
	intiPermanent();
}

function intiPermanent(){
	var warp = document.getElementById('wrap');
	var touch = document.getElementById('touch');
	touch.style.backgroundColor = permanentColor;
}

function permanentMove(range, tag, tagsObj, event){
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


function permanentEnd(range, tag, tagsObj, event){
	var object = tag.div;
	var nofingerFlag = false;
        // Place element where the finger is
    var posit = centerToCanvas(tag.canvas, tag.x, tag.y);
   // updateColor(tag, tag.rank);
  	tag.updateColor();
    object.style.webkitTransition = 'ease 1s';
    object.style.left = posit.x + 'px';
    object.style.top = posit.y + 'px';
    tag.updateAngle();
    sortByAngle(tag, tagsObj);
    eventlySpread(tag, tagsObj);


	if(isExistMaxNum(tag)){
		var oldRank = tag.rank;
		showWarning(oldRank, tag.domain);
		resetBackToOriginal(tag);
	}


  	if(event.touches.length == 0){
  		nofingerFlag = true; //all fingers are released
  	}

    return {obj: tagsObj, flag: nofingerFlag};

}