 var randColor = ['rgb(217,59,88)',
                  'rgba(244,92,147,0.6)',
                  'rgba(246,235,119,0.6)',
                  'rgba(171,224,255,0.6)',
                  'rgba(45,179,160,0.6)',
                  'rgba(183,282,158,0.6)',
                  'rgba(199,149,255,0.6)',
                  'rgba(152,17,217,0.6)'];
 var rankOpacity = [0.5, 0.5, 0.5, 0.5];
 var canvas = document.getElementById('myCanvas');
 var context = canvas.getContext('2d');

 function Drawer(n, tags){
      this.n = n; 
     // this.text = text;
      this.length = 0;
      this.tags = tags;//pased json object
 }


  function answer(tagsObj, length){
      this.tagsObj = tagsObj;
      this.length = length;
  }




Drawer.prototype.draw = function(){
      
    //  this.generateRandColor();

      this.init();

      this.drawCircles(this.length, this.context);

	this.drawLines(this.canvas.width/2, this.canvas.height/2,this.length, this.context);

      this.drawDomainName();
	  
      return new answer(this.drawTagsDomain(this.length, this.n,context),this.length);
}


Drawer.prototype.init =  function(){
      var n = this.n
   //   context.beginPath();
      context.textAlign = 'left';
      context.textBaseline = 'Bottom';
      var centerX = canvas.width/2;
      var centerY = canvas.height/2;
      this.length = Math.min(centerY,centerX) - 10;

 // translate context to center of canvas
      this.context.translate(centerX, centerY);
//	  this.drawLines(centerX, centerY, length, context);
    //  return length;
}

Drawer.prototype.drawLines = function(centerX,centerY,length,context){
	var lineLen = Math.min(centerX, centerY);
	for (var i = 0; i < this.n; i++) {
            var degree = 2*Math.PI/this.n;
         //   console.log(degree);

            this.drawLine(centerX,centerY,lineLen,context);
			context.rotate(degree);
      };
}

Drawer.prototype.drawTagsSingle = function(indexDomain, indexRank, ranks){
      var tagsObj = [];
      var startAngle = 2* Math.PI/this.n * indexDomain;
      var startLength = this.length/4 * indexRank + this.length/8;
      var unitAngle = 2* Math.PI/(this.n * (ranks.length+1));
      //console.log(indexDomain, startAngle);
      //for each rank
      for (var i = 0; i < ranks.length; i++) {
            //tags x and y cordinate relatived to the center of canvas
            x = Math.cos(startAngle + unitAngle*(i+1)) * startLength;
            y = Math.sin(startAngle + unitAngle*(i+1)) * startLength;

            this.context.font = 'bold 12px Helvetica';
            if(indexRank == -1) color = 'red';
            else color = 'black';
            var temp = new Tags(this.n, this.context.canvas, x,y,color,ranks[i], this.document, indexDomain, indexRank, this.length );
            tagsObj.push(temp);
      
       //     tagsObj[i].drawToContext(this.context, this.length/4); //dynamic size of the text
      //      temp.x -= temp.width/2;
       //     temp.y -= temp.size/2;
            // var tempDiv = this.createDiv(temp);
            // temp.div = tempDiv;
            // temp.updateAngle();

      };

      return tagsObj;
}



Drawer.prototype.drawTagsDomain = function(length, n, ctx){
     // var tags = JSON.parse(this.text);
      var domains = [];
      var tagsObj = [4]; 
      for (var i = 0; i < n; i++) {
            var singleDomain = [];
            for (var j = 0; j < 4; j++) {
                  var singleRank = [];
                  switch(j){
                        case 0:
                       //// singleDomain[0] = this.tags.Domains[i].Tags.Rank1;
                       singleRank = this.tags[i].Tags.Rank1;
                        break;

                        case 1:
                      ///  singleDomain[1] = this.tags.Domains[i].Tags.Rank2;
                      singleRank = this.tags[i].Tags.Rank2;
                        break;

                        case 2:
                      //  singleDomain[2] = this.tags.Domains[i].Tags.Rank3;
                      singleRank = this.tags[i].Tags.Rank3;
                        break;

                        case 3:
                      //  singleDomain[3] = this.tags.Domains[i].Tags.Rank4;
                      singleRank = this.tags[i].Tags.Rank4;
                        break;
                  }
                  if(singleRank == null)
                        singleRank = [];
                  else
                        singleRank = this.drawTagsSingle(i, j, singleRank);
                  singleDomain[j] = singleRank;
                  //singleDomain[j] = this.drawTagsSingle(i, j, singleDomain[j]);
            };
            domains.push(singleDomain);
      };

      return domains;
}//end of function drawtags


    




Drawer.prototype.drawCircles = function(length, ctx){
	ctx.beginPath();
      ctx.arc(0, 0, length, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(255,255, 255, 0.3)';
      ctx.fill();
	  ctx.beginPath();
      ctx.arc(0, 0, length/4 * 3, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(236,193, 244, 0.5)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, length/4 * 2, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(255, 138, 138, 0.5)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, length/4 , 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.fill();
}


Drawer.prototype.drawLine = function(x,y,length, ctx){
	ctx.moveTo(0,0);
	ctx.lineTo(length, 0);
	ctx.strokeStyle  = 'rgba(0,0,0, 0.3)';
	ctx.stroke();
}

// Drawer.prototype.createDiv = function (tag){
           
//       var top = context.canvas.height/2 + tag.y;
//       var left = context.canvas.width/2 + tag.x;
//       var div = this.document.createElement("div");
//       div.classList.add('tag');
//       div.style.width = tag.width + 'px';
//    //   div.style.height = tag.size +'px';
//       div.style.color = tag.color;
//       div.innerHTML = tag.text;
//       div.style.left = left;
//       div.style.top = top;
//       div.style.position = 'absolute';
//       div.style.fontSize = tag.size +'px';
//       div.style.backgroundColor = randColor[tag.domain] + rankOpacity[tag.rank-1]+ ')';
//       tagsDiv.push(div);
//       return div;

// }
          

function random(n){
      return Math.floor(Math.random()*n);
}
function getCol(r,g,b){
      return 'rgba('+r+','+g+','+b+',';
}
function randCol(){
      return getCol(random(255),random(255),random(255), 0.2);
}


Drawer.prototype.generateRandColor = function(){
      for (var i = this.n; i >= 0; i--) {
            randColor.push(randCol());
      }
}

Drawer.prototype.drawDomainName = function(){
      var circle = {
            x: canvas.width/2,
            y: canvas.height/2,
            radius: this.length
      };

      var unitAngle = Math.PI*2/(this.n * 5);
      for (var i = 0; i < this.n; i++) {
           var domName = this.tags[i].Name;
           var startAngle = Math.PI*2/this.n * i + unitAngle*2;
           var endAngle = Math.PI*2/this.n * i + unitAngle*3;
           drawCircularText(circle, domName, startAngle, endAngle);
      };
}

function drawCircularText(circle, string, startAngle, endAngle){
      var radius = circle.radius,
      angleDecrement = (startAngle - endAngle)/(string.length - 1),
      angle = startAngle,
      index = 0,
      character;

      context.save();

      context.fillStyle = 'rgba(0,0,0, 0.7)';
      context.font = 12 + 'px Lucida Sans';

      while(index < string.length){
            character = string.charAt(index);
            context.save();
            context.beginPath();
            context.translate( Math.cos(angle) * radius,  Math.sin(angle) * radius );
            context.rotate(Math.PI/2 + angle);
            context.fillText(character, 0, 0);
            angle -= angleDecrement;
            index++;
            context.restore();
      }

      context.restore();
}



