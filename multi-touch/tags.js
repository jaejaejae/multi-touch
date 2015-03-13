// Simple class example

function Tags(n, canvas, posX, posY, color, text, document, domain, rank) {
		this.n = n;
		this.x = posX;
		this.y = posY;
		this.color = color;
		this.size = 18; //default size 12
		this.text = text;
		this.width = 0;
		this.div = document.createElement("div");
		this.zIndex = [];
		this.canvas = canvas;
		this.domain = domain; //start from 0
		this.rank = rank + 1; //start from 1
		this.originalRank = this.rank; //start from 1
		this.lastRank = this.originalRank;
		this.angle = 0;
}

Tags.prototype.updateAngle = function(){
/*	var tan = this.y/this.x;
	var angle = Math.atan(tan);
	var startAngle = this.domain * 2*Math.PI/this.n;
	var endAngle = startAngle + 2*Math.PI/this.n;
	if(angle < 0){
		angle += 2*Math.PI;
		if(startAngle < angle && angle < endAngle)//whithin the range
			this.angle = angle;
		else
			this.angle = angle - Math.PI;
	}
	else{
		if(startAngle < angle && angle < endAngle)//whithin the range
			this.angle = angle;
		else
			this.angle = angle + Math.PI;
	}
	*/
	this.angle = this.getAngle(this.x, this.y, this.domain);
}


Tags.prototype.getAngle = function(x, y, domain){
	var answer;
	var tan = y/x;
	var angle = Math.atan(tan);
	var startAngle = domain * 2*Math.PI/this.n;
	var endAngle = startAngle + 2*Math.PI/this.n;
	if(angle < 0){
		angle += 2*Math.PI;
		if(startAngle < angle && angle < endAngle)//whithin the range
			answer = angle;
		else
			answer = angle - Math.PI;
	}
	else{
		if(startAngle < angle && angle < endAngle)//whithin the range
			answer = angle;
		else
			answer = angle + Math.PI;
	}
	return answer;
}


Tags.prototype.measureDimension = function(theContext){
	//this.size = theContext.measureText(this.text).height;
	this.width = theContext.measureText(this.text).width;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
Tags.prototype.hitTest = function(hitX,hitY) {
	return((hitX > this.x)&&(hitX < this.x + this.width)&&(hitY < this.y)&&(hitY < this.y - this.size));
}

//A function for drawing the particle.
Tags.prototype.drawToContext = function(theContext, maxLength) {
	theContext.fillStyle = this.color;
	do{
		this.size--;
		theContext.font = this.size+'px Helvetica';
		this.measureDimension(theContext);
	}while(this.width > maxLength && this.size > 10);
	this.width += 4;
	//theContext.fillText(this.text, x,y,maxLength);
}

Tags.prototype.updateRank = function(length){	
	//take center as x and y
	var x = this.x + this.width/2;
	var y = this.y + this.size/2;
	var dis = Math.sqrt(x*x + y * y); //the distance from the tag center to canvas center
	if(dis >= length) return 4;
	for (var i = 0; i < 4; i++) { //4 range
		if(dis >= length/4 * i && dis < length/4 *(i+1)){
			return (i+1);
			//return;
		}
	};

	return -1;
	
}

Tags.prototype.updateColor = function(){
	if(this.rank == 1){
		this.div.style.color = 'red';
	}
	else
		this.div.style.color = 'black';
}