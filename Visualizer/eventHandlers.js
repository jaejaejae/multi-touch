var disPageToCancasDiv;

function position(x, y){
	this.x = x;
	this.y = y;
}

function rangeTangent(n){
	this.end = [n];
	this.angles= [n];
	var temp;
	for (var i = 0; i < n; i++) {
		this.angles[i] = 2* Math.PI / n * (i+1);
	//	console.log("angle",this.angles[i]);
		if(i == 0)
			var pre = 0;
		else pre = this.angles[i-1];

		if(pre <= Math.PI/2 && this.angles[i] > Math.PI/2)
			this.posIndex = i;
		else if(pre < Math.PI/2*3 && this.angles[i] >= Math.PI*3/2)
			this.negIndex = i;

		if(this.angles[i] > Math.PI/2 && this.angles[i] < Math.PI*3/2){
			this.end[i] = this.angles[i] - Math.PI;
		}
		else if(this.angles[i] >= Math.PI*3/2 && this.angles[i] <= Math.PI * 2){
			this.end[i] = this.angles[i] - 2* Math.PI;
		}
		else
			this.end[i] =  this.angles[i];
		
		//this.end[i] = this.angles[i];
	//	console.log("range",i, this.end[i])
	};
}

//input is the canvas(center) point
rangeTangent.prototype.getDomain = function(point){
	var x = point.x;
	var y = point.y;
	var tan = y/x;
	var angle = Math.atan(tan);
	console.log("touch angle:", angle);
	for (var i = 0; i < this.end.length; i++) { //there are still some equal range number need to be considerate
		if(i == 0){
			if(i != this.posIndex && angle >=0 && angle<this.end[0]){
				if(this.checkCordinates(0, x,y))
					return 0;
			}
			else if(i == this.posIndex && ((angle >=0 && angle < Math.PI/2) || (angle > -Math.PI/2 && angle <= this.end[0]))  ){
				if(this.checkCordinates(0, x,y))
					return 0;
			}
		}
		//i != 0 
		else{
			if(i == this.posIndex || i == this.negIndex){
				if((angle > this.end[i-1] && angle < Math.PI/2)||(angle > -Math.PI/2 && angle <=this.end[i])){
					if(this.checkCordinates(i, x,y))
						return i;
				}

			}
			else if(i!=0 && angle> this.end[i-1] && angle < this.end[i]){
				if(this.checkCordinates(i, x,y))
					return i;
			}

		}
		
	};
	return -1;
}


//check cordinates (x,y) is inside the domain i
rangeTangent.prototype.checkCordinates = function(i, x, y) {
	var length = Math.sqrt(x*x + y*y);
	if(i == this.posIndex){
		if( y < 0)
			return false;
		else return true;
	}
	else if(i ==  this.negIndex){
		if(y > 0)
			return false;
		else return true;
	}
	//else if(Math.sin(this.angles[i]) * (y/length) < 0 || Math.cos(this.angles[i]) * (x/length) < 0)
	else if( Math.cos(this.angles[i]) * (x/length) < 0)
		return false;
	else
		return true;
	// body...
};

/*function dragHandler(event, ctx, element, tagsObj){
		var touch = event.targetTouches;
		 
		      // Place element where the finger is
		   //   event.target.style.left = touch.pageX + 'px';
		   //   event.target.style.top = touch.pageY + 'px';
		   console.log(touch[0].pageX, touch[0].pageY);
		   var touchX = touch[0].pageX - (element.width + element.clientLeft + 20)/2;
		   var touchY = touch[0].pageY - (element.height + element.clientTop + 20)/2;
		   console.log(touchX, touchY);
	for (var i = 0; i < tagsObj.length; i++) {
		console.log(tagsObj[i][0].x, tagsObj[i][0].y);
		console.log(tagsObj[i][0].hitTest(touchX,touchY));
	*	if(tagsObj[i][0].hitTest(touch[0].pageX,touch[0].pageY)){
			console.log(touch[0].pageX, touch[0].pageY);
		}
	};
}

function dragStartHandler(event, ctx, element, tagsObj){
	var touch = event.targetTouches;
	//for testing only
	x = (element.width + element.clientLeft)/2;
	y = (element.height + element.clientTop)/2;
	//end of testing
	console.log("canvas center:", element.width/2, element.height/2);
	console.log("touch point, : ",touch[0].pageX, touch[0].pageY);
	var touchX = touch[0].pageX - 20 - (element.width + element.clientLeft)/2;
	var touchY = touch[0].pageY - 20 - (element.height + element.clientTop)/2;
	console.log("tansform touch point in canvas", touchX, touchY);
}*/

function touchStartHandler(tag, event){
	var object = tag.div;
	if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
     //   var canvasPoint = pageToCanvas(touch.pageX, touch.pageY);
     //   updateTagCordinate(tag, canvasPoint);
     	disPageToCancasDiv = {x:touch.pageX - abstractNumberFromStyle(tag.div.style.left), y:touch.pageY - abstractNumberFromStyle(tag.div.style.top)};
        tag.originalRank = tag.updateRank();
        tag.lastRank = tag.originalRank;
        tag.updateAngle();
        createFullTextDiv(tag);
        }
    event.preventDefault();
}

function touchMoveHandler(range, tag, tagsObj, event){
	var object = tag.div;
	event.preventDefault();
    if (event.targetTouches.length == 1) {
      object.style.webkitTransition = 'left ease 0s';
        var touch = event.targetTouches[0];
        var posit = insideDomain(range, tag, touch.pageX, touch.pageY); //posit is the final position
        var newRank = tag.updateRank();  //update rank
        //put the tag in the correct location(touch point)
	    // object.style.left = posit.x + 'px';
	    // object.style.top = posit.y + 'px';
//check if the current rank exist the max number

	//	if(!isExistMaxNum(newRank, tag)){
			//some update
		    updateTagCordinate(tag, posit);
			tag.rank = newRank;
		    tag.updateColor();
		    tag.updateAngle();
		    sortByAngle(tag, tagsObj);
		    updateTagObjsDuringMove(tag, tagsObj);
		    tagsObj = collisionResolve(tag, tagsObj);
		    tag.lastRank = tag.rank;
//		}
		//else show warning
/*		else if(newRank != tag.rank && isExistMaxNum(newRank, tag)){
			showWarning(newRank, tag.domain);
			resetBackToOriginal(tag);
		}*/
    }
    return tagsObj;
}

function resetBackToOriginal(tag){
	var lastRank = tag.rank;
	tag.rank = tag.originalRank;
	tagsObj = updateTagObjs(lastRank, tag, tagsObj);
	eventlySpreadRank(tag.originalRank, tag, tagsObj); //////continue adding element to the original rank bug!!!!!!
	eventlySpreadRank(lastRank, this, tagsObj);
}

function showWarning(newRank,domain){
	var warningBar = $("#existWarining")[0];
	warningBar.innerHTML = "Maximun "+ Math.pow(2, newRank-1)+" tags are allowed in domain "+ domainNames[domain] +" rank "+ newRank;
	$("#existWarining").fadeIn("slow");
	setTimeout(function(){ $("#existWarining").fadeOut("slow"); }, 2000);
}


//tags obj contains all tags objects
function touchEndHandler(tagsObj, tag, event){
	var object = tag.div;
	var nofingerFlag = false;
	event.preventDefault();
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
  //	alert(nofingerFlag);
    return {obj: tagsObj, flag: nofingerFlag};
        
}


//give page cordinate, return the canvas (div)cordinate inside the domain
function insideDomain(range,tag, left, top){
	var anw =  new position(0, 0);
	var touchPoint = pageToCanvasCenter(tag, left, top);
	var object = tag.div;
	//var range = new rangeTangent(tag.n);
	//var standard = range.getDomain(new position(tag.x, tag.y));
	var standard = tag.domain;
	var topLeft = range.getDomain(new position(touchPoint.x, touchPoint.y)) == standard;
	var topRight = range.getDomain(new position(touchPoint.x + tag.width, touchPoint.y)) == standard;
	var lowLeft = range.getDomain(new position(touchPoint.x, touchPoint.y + tag.size)) == standard;
	var lowRight = range.getDomain(new position(touchPoint.x + tag.width, touchPoint.y + tag.size)) == standard;
	var touchDomain = range.getDomain(touchPoint);


	console.log("original domain", standard);
	console.log("touch domain", touchDomain);


//all points inside the range
	if(topLeft && topRight && lowLeft && lowRight){
		tag.x = touchPoint.x; //canvas center cordinate
		tag.y = touchPoint.y;
	}
/*	//horizontal out of range
	else if((topLeft && lowLeft && (!topRight || !lowRight)) ||(topRight && lowRight && (!topLeft || !lowLeft))) {
		tag.y = touchPoint.y;
	}
	//vertical out of range
	else if((topLeft && topRight && (!lowLeft || !lowRight))||(lowRight && lowLeft && (!topLeft || !topRight))){
		tag.x = touchPoint.x;
	}
*/		
	anw = centerToCanvas(tag.canvas, tag.x, tag.y);
	return anw;
	

}

//checking for rank limitation;
function isExistMaxNum(tag){
	var isExist = false;
	switch(tag.rank){
		case 1:
			if(tagsObj[tag.domain][tag.rank-1].length -1 >= 1)
				isExist = true;
			break;
		case 2:
			if(tagsObj[tag.domain][tag.rank-1].length -1 >= 2)
				isExist = true;
			break;
		case 3:
			if(tagsObj[tag.domain][tag.rank-1].length -1 >= 4)
				isExist = true;
			break;
		case 4:
			if(tagsObj[tag.domain][tag.rank-1].length -1 >= 8)
				isExist = true;
			break;
		default:
			isExist = true; //invalid rank
	}
	return isExist;
}


function updateTagObjs(originalRank, tag, tagsObj){
	var tempObj;
	for (var i = 0; i < tagsObj[tag.domain][originalRank - 1].length; i++) {
		 if (tagsObj[tag.domain][originalRank - 1][i].text == tag.text){
		 	tagsObj[tag.domain][originalRank - 1].splice(i,1); //remove the tags
		 	break;
		 }
	};
	tagsObj[tag.domain][tag.rank - 1].push(tag);
	return tagsObj;
}


function updateTagObjsDuringMove(tag, tagsObj){
	//update the tagsObj before collision detection
	if(tag.lastRank != tag.rank){
		tagsObj = updateTagObjs(tag.lastRank, tag, tagsObj);
		sortByAngle(tag, tagsObj);
		eventlySpreadRank(tag.lastRank, tag, tagsObj);
	}
}

/*
function updateRank(tag){	
	//take center as x and y
	var x = tag.x + tag.width/2;
	var y = tag.y + tag.size/2;
	dis = Math.sqrt(x*x + y * y); //the distance from the tag center to canvas center
	if(dis >= length) return 4;
	for (var i = 0; i < 4; i++) { //4 range
		if(dis >= length/4 * i && dis < length/4 *(i+1)){
			return (i+1);
		}
	};

	return -1;
	
}

function updateColor(tag, rank){
	if(rank == 1){
		tag.div.style.color = 'red';
	}
	else
		tag.div.style.color = 'black';
}
*/
//new position is the position to the canvas, div position
function updateTagCordinate(tag, newPos){
	tag.div.style.left = newPos.x + 'px';
	tag.div.style.top = newPos.y + 'px';
	var centerPos = canvasToCenter(tag.canvas, newPos.x, newPos.y);
	tag.x = centerPos.x;
	tag.y = centerPos.y;
}

//convert page point to canvas center point
function pageToCanvasCenter(tag, x, y){
	var anw = new position(0,0);
	anw = pageToCanvas(x,y);
	anw = canvasToCenter(tag.canvas, anw.x, anw.y);
	return anw;
}


//given a touch point in page, change to canvas point
function pageToCanvas(x, y){
	var bbox = canvas.getBoundingClientRect();
	var anw = new position(0,0);
//	anw.x = x - 20 - 7; //-7 IT WORKS----UNBELIEVABLE
//	anw.y = y - 20 - 7;

	anw.x = x - disPageToCancasDiv.x;  //it also works
	anw.y = y - disPageToCancasDiv.y;

	return anw;
}

//given canvas point of div, convert to the point to the center of the canvas
function canvasToCenter(canvas, x, y ){
	var anw = new position(0,0);
	anw.x = x - canvas.width/2;
	anw.y = y - canvas.height/2;
	return anw;
}

function centerToCanvas(canvas, x, y ){
	var anw = new position(0,0);
	//10 is the margin from canvas to touch div
	anw.x = x + canvas.width/2;
	anw.y = y + canvas.height/2;
	return anw;
}


function sortByAngle(tag, tagsObj){
	var domain = tag.domain;
	var rank = tag.rank;
	var array = tagsObj[domain][rank-1]; //the array of objects that in a specific domain and rank
	var n = array.length;
	var swapped;
	do{
		swapped = false;
		for (var i = 1; i < n; i++) {
			//if(array[i-1].angle > array[i].angle){
			if(sortCondition(tag,array[i-1], array[i])){
				//swap
				var temp = array[i-1];
				array[i-1] = array[i];
				array[i] = temp;
				//mark
				swapped = true;
			}
		};
		n--;
	}while(swapped == true);

	tagsObj[domain][rank-1] = array;
}


//return true if a > b; false otherwise
function sortCondition(tag, a, b){
	if (tag.angle >=0 && tag.angle <= Math.PI) {
		if(a.x < b.x)
			return true;
		else if(a.x == b.x){
			if(a.x + a.div.clientWidth < b.x + b.div.clientWidth) //left side equal, right side a shorter
				return true;
		}
		else 
			return false;
	}
	else{
		if (a.x > b.x) 
			return true;
		else if(a.x == b.x){
			if (a.x + a.div.clientWidth > b.x + b.div.clientWidth) {return true; };
		}
		else
			return false;
	}
}


function eventlySpread(tag, tagsObj){
/*	var startIndex = 0;
	var endIndex1 = tagsObj[tag.domain][tag.rank-1].length - 1;
	var startAngle = Math.PI*2/tag.n * tag.domain; //start from the domain starting angle
	var endAngle = Math.PI*2/tag.n * (tag.domain + 1); 
	eventlySpreadInRang(true, tag.rank, tag, tagsObj, startIndex, endIndex1, startAngle, endAngle);

	if(tagsObj[tag.domain][tag.originalRank-1].length != 0){
		var endIndex2 = tagsObj[tag.domain][tag.originalRank-1].length- 1;	
		eventlySpreadInRang(true, tag.originalRank, tag, tagsObj,startIndex, endIndex2, startAngle, endAngle);
	}
	*/
	eventlySpreadRank( tag.rank, tag, tagsObj);
	eventlySpreadRank(tag.originalRank, tag, tagsObj);

}

function eventlySpreadRank(rank,tag, tagsObj){
	var startIndex = 0;
	var endIndex = tagsObj[tag.domain][rank-1].length - 1;
	var startAngle = Math.PI*2/tag.n * tag.domain; //start from the domain starting angle
	var endAngle = Math.PI*2/tag.n * (tag.domain + 1); 
	if(endIndex >= 0){
		eventlySpreadInRang(true, rank, tag, tagsObj, startIndex, endIndex, startAngle, endAngle);
	}

}

/*This function evently spread the tags in a specified range
	all: is a boolean that indicate weather all the tags are envetly spead inside the range
	rank : the rank to be spread]
	tag: the moving tag(the target of the touchMove event)
	tagsObj: the arrays that contains all tags
	startIndex/endIndex: the start/end index that to be evently spread
*/
function eventlySpreadInRang(all, rank, tag, tagsObj, startIndex, endIndex, startAngle, endAngle){
	var domain = tag.domain;
	var rank = rank;
	var array = tagsObj[domain][rank-1];
	//var n = array.length;
	var n = endIndex - startIndex + 1;
	var unitLength = tag.length/4;
	var distance = unitLength*(rank-1) + unitLength/2; //center distance

	var unitAngle = (endAngle - startAngle)/(n+1);

	var index = startIndex;
	for(var i = 0; i < n; i++){

		array[index].angle = startAngle + unitAngle*(i+1);
		array[index].x = Math.cos(array[index].angle) * distance - array[index].width/2; //put into center
		array[index].y = Math.sin(array[index].angle) * distance - array[index].size/2;
		var posit = centerToCanvas(tag.canvas, array[index].x, array[index].y);
		array[index].div.style.left = posit.x;
		array[index].div.style.top = posit.y;
		array[index].updateAngle();
		index++;

	};
}


function collisionResolve(tag, tagsObj){
	var rank = tag.rank - 1;
	var domain = tag.domain;
	var array = tagsObj[domain][rank];



	for (var i = 0; i < array.length; i++) {
		var _Case = collisionCase(tag, array[i]);
		console.log("i and touch case", i, _Case);
		switch(_Case){
			case 1:
				leftCollisionResolve(tag, tagsObj, i);
				break;
			case 2:
				rightCollisionResolve(tag, tagsObj, i);
				break;
			case 3:
				break;
			case -1:
				break;
			default:
				break;

		}
	};

	return tagsObj;
}


function spreadLastRank(tag, tagsObj){
	if(tag.lastRank == tag.originalRank){
		//create a new array to evently spread


	}
	else{
		//just evently spread the last rank array
	}
}


function leftCollisionResolve(tag, tagsObj, i){
	var rank = tag.rank;
	var domain = tag.domain;
	var array = tagsObj[domain][rank -1];
	var distance = tag.length/4*(rank-1) + tag.length/8;
	var collidedRect = array[i];
	//evently spread 0 to i
//	if(tag.angle > collidedRect.angle){
	if(tag.angle > 0 && tag.angle < Math.PI){
		var startAngle = Math.PI*2/tag.n * domain; //start from the domain starting angle
		var endAngle =  tag.getAngle(tag.x + tag.div.clientWidth, tag.y,domain);
		eventlySpreadInRang(false,rank, tag, tagsObj, 0, i, startAngle, endAngle);
	}
	//evently spread i to end
	else{
		var startAngle = tag.getAngle(tag.x + tag.div.clientWidth, tag.y,domain); // start from the touch moved tags angle
		var endAngle = Math.PI*2/tag.n * (domain + 1); 
		eventlySpreadInRang(false,rank, tag, tagsObj, i, array.length-1, startAngle, endAngle);
	}

}



function rightCollisionResolve(tag, tagsObj, i){
	var rank = tag.rank;
	var domain = tag.domain;
	var array = tagsObj[domain][rank -1];
	var distance = tag.length/4*(rank-1) + tag.length/8;
	var collidedRect = array[i];
	//evently spread i to end
	//if(tag.angle < collidedRect.angle){
	if(tag.angle > 0 && tag.angle < Math.PI){
		var startAngle = tag.angle; // start from the touch moved tags angle
		var endAngle = Math.PI*2/tag.n * (domain + 1); 
		eventlySpreadInRang(false,rank, tag, tagsObj, i, array.length-1, startAngle, endAngle);
	}
	//evently spread 0 to i
	else{
		var startAngle = Math.PI*2/tag.n * domain; //start from the domain starting angle
		var endAngle =  tag.angle;
		eventlySpreadInRang(false,rank, tag, tagsObj, 0, i, startAngle, endAngle);
	}
}

/*RETURN the case of collision
	case 1: left collision -the collided objects should move to right
	case 2: right collision -the collided objects should move to the left
	case 3： both side collision - the collided object move to the side with more objects
	case -1： no collision detected
*/
function collisionCase(rect1, rect2){
	 Number((rect1.div.style.left).substr(0,3))
	 var rect1X = abstractNumberFromStyle(rect1.div.style.left);
	 var rect1Y = abstractNumberFromStyle(rect1.div.style.top);

	var collided = false;

	if(rect2 != rect1){
		
		var rect2X = abstractNumberFromStyle(rect2.div.style.left);
		var rect2Y = abstractNumberFromStyle(rect2.div.style.top);
		collided = (rect1X < rect2X + rect2.width)&&(rect2X < rect1X + rect1.width)&&(rect1Y < rect2Y + rect2.div.clientHeight)&&(rect2Y < rect1Y + rect1.div.clientHeight);
		if(collided){
			if(rect1X < rect2X && ((rect1X + rect1.div.clientWidth) <= (rect2X + rect2.div.clientWidth)))//left collision case 1
				return 1;
			if(rect1X >= rect2X && ((rect1X + rect1.div.clientWidth) > (rect2X+rect2.div.clientWidth)))//right collision case 2
				return 2;
			else
				return 3;//both side collision
		}

	}
//	else//no collison	
		return -1;	

}


function abstractNumberFromStyle(style){
	return Number(style.substr(0, (style).length-2));
}