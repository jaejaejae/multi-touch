      var canvas;
    	var context;
    	var hammerManag ;
    	var tagsObj = [4];
    	var tagsDiv = [4];
      var zIndex = [4]; //the zIndex of each tags
    	var length;
      var drawer;

      function Controller(document){
        this.document = document;
        init();
        var text = '{"Num": 4, "Domains" : [{"Name": "domain1","Tags": {"Rank1" : ["do1tag1"],"Rank2" : ["do1tag2"],"Rank3" : ["do1tag3"],"Rank4" : ["do1tag4"]}}, {"Name": "domain2","Tags": {"Rank1" : ["do2tag1"],"Rank2" : ["do2tag2"],"Rank3" : ["do2tag3"],"Rank4" : ["do2tag4"]}}, {"Name": "domain3","Tags": {"Rank1" : ["do3tag1"],"Rank2" : ["do3tag2"],"Rank3" : ["do3tag3"],"Rank4" : ["do3tag4"]}}, {"Name": "domain4","Tags": {"Rank1" : ["do4tag1"],"Rank2" : ["do4tag2"],"Rank3" : ["do4tag3"],"Rank4" : ["do4tag4"]}}] }';
        drawer = new Drawer(4, canvas,context,document,text);
        var anw = drawer.draw();
       // var anw = Drawer.drawDomains(4, canvas, context);
        tagsObj = anw.tagsObj;
        length = anw.length;
        createDiv();
        touchHandler();
      }
    	
    	

    	function init(){
		    canvas = this.document.getElementById('myCanvas');
	      context = canvas.getContext('2d');
	      context.canvas.width = window.innerWidth;
	      context.canvas.height = window.innerHeight;
	      
    	}

 /*   	function createDiv(){
    		var wrapDiv = this.document.getElementById('wrap');
    		for (var i = 0; i < tagsObj.length; i++) {
    			for (var j = 0; j < tagsObj[i].length; j++) {
    				var tag = tagsObj[i][j];
    				var top = context.canvas.height/2 + tag.y;
          			var left = context.canvas.width/2 + tag.x;
            		var div = this.document.createElement("div");
            		div.style.width = tag.width + 2 + 'px';
            		div.style.height = tag.size + 2 +'px';
            		div.style.color = tag.color;
            		div.innerHTML = tag.text;
            		div.style.left = left;
            		div.style.top = top;
            		div.style.position = 'absolute';
            		div.style.fontSize = tag.size +'px';
            		div.class = 'tag';
            		wrapDiv.appendChild(div);
            		tagsDiv.push(div);
            		console.log("width size left top x, y div");
            		console.log(tag.width, tag.size, left, top, tag.x,tag.y);
    			};
    		};
            
      	}*/

      function createDiv(){
          var wrapDiv = this.document.getElementById('wrap');
          for (var i = 0; i < tagsObj.length; i++) {
            for (var j = 0; j < tagsObj[i].length; j++) {
              for (var k = 0; k < tagsObj[i][j].length; k++) {
                var tag = tagsObj[i][j][k];
                var div = tag.div;
                wrapDiv.appendChild(div);
                addListener(tag);
              };
            }}
      }
     	
     	function touchHandler(){
     		var dragOption = {
     			drag: true,
			  	drag_min_distance: length/4,
			  	hold: true,
			  	release: true,
			  	swipe: false,
			  	tap: false,
			  	touch: false,
			  //	transform: false
     		}
			var hammer = new Hammer(canvas,dragOption);
			hammer.on('drag', function(ev){
			 	switch(ev.type){
			 		case 'drag':
			 			dragHandler(ev, context, canvas, tagsObj);
			 			break;
			 	}
				
			//    myElement.textContent += ev.type +" ";
			});


			 canvas.addEventListener('touchstart', function(event) {
			 	dragStartHandler(event, context, canvas, tagsObj);
		      	event.preventDefault();
		    }, false);

			 canvas.addEventListener('touchmove', function(event) {
			// 	dragHandler(event, context, canvas, tagsObj);
		      	event.preventDefault();
		    }, false);


			 canvas.addEventListener('touchend', function(event) {
		//	 	dragHandler(event, context, canvas, tagsObj);
		      	event.preventDefault();
		    }, false);
     	}


      

function addListener(tag){
  object = tag.div;
  var range = new rangeTangent(tag.n);
  object.addEventListener('touchstart', function(event){
      touchStartHandler(tag, event);
  },false);


  object.addEventListener('touchmove', function(event){
    tagsObj = touchMoveHandler(range, tag, tagsObj, event);
  },false);


  object.addEventListener('touchend',function(event){
     tagsObj = touchEndHandler(tagsObj, tag, event);
  },false); 
}
    
