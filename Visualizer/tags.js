// Simple class example


function Tags(n, canvas, posX, posY, color, text, document, domain, rank, length) {
		this.n = n;
		this.x = posX;
		this.y = posY;
		this.divX = 0;
		this.divY = 0;
		this.color = color;
		this.backColor = "";
		this.size = 18; //default size 12
		this.text = text;
		this.width = 0;
		this.div = document.createElement("div");
		this.zIndex = [];
		this.canvas = canvas;
		this.domain = domain; //start from 0
		this.rank = rank + 1; //current rank, start from 1
		this.originalRank = this.rank; //the originalRank before touchstart
		this.lastRank = this.originalRank;//the previous rank during touchmove
		this.serverRank = this.originalRank;//the rank that stored in server
		this.angle = 0;
		this.length = length;
		this.drawToContext(context,this.length/4); 
		this.x -= this.width/2;
        this.y -= this.size/2;
        this.div = this.createDiv(this);
        this.updateAngle();
        this.setBackgroundColor();

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
	}while((this.width > maxLength && this.size > 10)||(this.width > 66));
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
	if(this.rank == -1){  //no change of color
		this.div.style.color = 'red';
		this.color = 'red';
	}
	else{
		this.div.style.color = 'black';
		this.color = 'black';
	}
}


Tags.prototype.setBackgroundColor = function(){
	 this.backColor = randColor[this.domain];
}

Tags.prototype.createDiv = function (tag){
           
      this.divY = context.canvas.height/2 + tag.y;
      this.divX = context.canvas.width/2 + tag.x;
      var div = document.createElement("div");
      div.classList.add('tag');
      div.style.width = tag.width + 'px';
   //   div.style.height = tag.size +'px';
      div.style.color = tag.color;
      div.innerHTML = tag.text;
      div.style.left = this.divX;
      div.style.top = this.divY;
      div.style.position = 'absolute';
      div.style.fontSize = tag.size +'px';
  //    div.style.backgroundColor = randColor[tag.domain] + rankOpacity[tag.rank-1]+ ')';
      div.style.backgroundColor = randColor[tag.domain];
    //  tagsDiv.push(div);
      return div;

}


