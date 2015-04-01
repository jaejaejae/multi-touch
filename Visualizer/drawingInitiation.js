 //prevent touch canvas from scrolling   	
 function canvasTouchHandler(){
 	canvas.addEventListener('touchstart', function(event){
 		event.preventDefault();},false);
 	canvas.addEventListener('touchmove', function(event){
 		event.preventDefault();},false);
 }

 function fitToContainer(canvas){
	// Make it visually fill the positioned parent
	canvas.style.width ='98%';
	canvas.style.height='98%';
	// ...then set the internal size to match
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
}


function canvasInitialization(){
	//initialize gloable variable canvas, context
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	fitToContainer(canvas);
}

function contextInit(){
	context.textAlign = 'left';
	context.textBaseline = 'Bottom';
 // translate context to center of canvas
 context.translate(canvas.width/2, canvas.height/2);
}

function initializationDriver(){
	canvasInitialization(); //resize canvas
	contextInit(); //resize context
	canvasTouchHandler(); //disable canvas from scrolling
	toggleAddEvent();
}


function toggleAddEvent(){
	 $('#switchContainer').on('change', function() {
	 	if(Visualizer.MODE == PERMANENT_MODE){
	 		Visualizer.MODE = ELASTIC_MODE;
	 		runElastic();
	 	}
	 	else{
	 		Visualizer.MODE = PERMANENT_MODE;
	 		runPermanent();
	 	}
        
    });
}