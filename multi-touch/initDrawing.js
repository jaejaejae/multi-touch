 function Drawer(n, canvas, ctx, document, text){
      this.n = n;
      this.canvas = canvas;
      this.context = ctx;
      this.document = document;
      this.text = text;
      this.length = 0;
 }


  function answer(tagsObj, length){
      this.tagsObj = tagsObj;
      this.length = length;
  }

Drawer.prototype.draw = function(){
      
      this.length = this.drawDomains();

      this.drawCircles(this.length, this.context);

      return new answer(this.drawTags(this.length, this.n,context),this.length);
}


Drawer.prototype.drawDomains =  function(){
      var n = this.n
      context.beginPath();
      var centerX = canvas.width/2;
      var centerY = canvas.height/2;
      var length = Math.min(centerY,centerX);

 // translate context to center of canvas
      this.context.translate(centerX, centerY);
      for (var i = 0; i < n; i++) {
            var degree = 2*Math.PI/n;
         //   console.log(degree);
            context.rotate(degree);
            this.drawLines(centerX,centerY,length,context);
      };
      return length;
}



Drawer.prototype.drawTagsSingle = function(indexDomain, indexRank, ranks){
      var tagsObj = [];
      var startAngle = 2* Math.PI/this.n * indexDomain;
      var startLength = this.length/4 * indexRank + this.length/8;
      //console.log(indexDomain, startAngle);
      //for each rank
//      for (var i = 0; i < ranks.length; i++) {
            //tags x and y cordinate relatived to the center of canvas
            x = Math.cos(startAngle + Math.PI/4) * startLength;
            y = Math.sin(startAngle + Math.PI/4) * startLength;

            this.context.font = 'bold 12px Helvetica';
            if(indexRank == 0) color = 'red';
            else color = 'black';
            var temp = new Tags(this.n, this.context.canvas, x,y,color,ranks[0], this.document, indexDomain, indexRank );
            tagsObj.push(temp);
        //    createDiv(x, y, ctx, temp);
            tagsObj[0].drawToContext(this.context, this.length/4); //dynamic size of the text
            temp.x -= temp.width/2;
            temp.y -= temp.size/2;
            var tempDiv = this.createDiv(temp);
            temp.div = tempDiv;
            temp.updateAngle();

//      };

      return tagsObj;
}



Drawer.prototype.drawTags = function(length, n, ctx){
      var tags = JSON.parse(this.text);
      var domains = [];
      var tagsObj = [4]; 
      for (var i = 0; i < n; i++) {
            var singleDomain = [4];
            for (var j = 0; j < 4; j++) {
                  switch(j){
                        case 0:
                        singleDomain[0] = tags.Domains[i].Tags.Rank1;
                        break;

                        case 1:
                        singleDomain[1] = tags.Domains[i].Tags.Rank2;
                        break;

                        case 2:
                        singleDomain[2] = tags.Domains[i].Tags.Rank3;
                        break;

                        case 3:
                        singleDomain[3] = tags.Domains[i].Tags.Rank4;
                        break;
                  }

                  singleDomain[j] = this.drawTagsSingle(i, j, singleDomain[j]);
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
      ctx.fillStyle = 'rgba(236,193, 244, 0.3)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, length/4 * 2, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(255, 138, 138, 0.4)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, length/4 , 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.fill();
}


Drawer.prototype.drawLines = function(x,y,length, ctx){
	ctx.moveTo(0,0);
	ctx.lineTo(length, 0);
	ctx.strokeStyle  = 'rgba(0,0,0, 0.4)';
	ctx.stroke();
}

Drawer.prototype.createDiv = function (tag){
           
      var top = context.canvas.height/2 + tag.y;
      var left = context.canvas.width/2 + tag.x;
      var div = this.document.createElement("div");
      div.classList.add('tag');
      div.style.width = tag.width + 'px';
      div.style.height = tag.size +'px';
      div.style.color = tag.color;
      div.innerHTML = tag.text;
      div.style.left = left;
      div.style.top = top;
      div.style.position = 'absolute';
      div.style.fontSize = tag.size +'px';
      tagsDiv.push(div);
      return div;

}
          