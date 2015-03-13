      var canvas;
    	var context;
    	var hammerManag ;
    	var tagsObj = [];
    	var tagsDiv = [4];
      var zIndex = [4]; //the zIndex of each tags
    	var length;
      var drawer;
      var xmlhttp;
      var text = "";
      var numDom = 0;
      var jsonObj;

function Controller(document){
  this.document = document;
  init();
  buildConnection();
//   var text = '{"Num": 4, "Domains" : [{"Name": "domain1","Tags": {"Rank1" : ["do1tag1"],"Rank2" : ["do1tag2"],"Rank3" : ["do1tag3"],"Rank4" : ["do1tag4"]}}, {"Name": "domain2","Tags": {"Rank1" : ["do2tag1"],"Rank2" : ["do2tag2"],"Rank3" : ["do2tag3"],"Rank4" : ["do2tag4"]}}, {"Name": "domain3","Tags": {"Rank1" : ["do3tag1"],"Rank2" : ["do3tag2"],"Rank3" : ["do3tag3"],"Rank4" : ["do3tag4"]}}, {"Name": "domain4","Tags": {"Rank1" : ["do4tag1"],"Rank2" : ["do4tag2"],"Rank3" : ["do4tag3"],"Rank4" : ["do4tag4"]}}] }';
  if(text != "") {     
    drawer = new Drawer(numDom, canvas,context,document,jsonObj.Domains);
    var anw = drawer.draw();
    tagsObj = anw.tagsObj;
    length = anw.length;
    createDiv();
    parseResults(jsonObj.Results);
  }
  else{
    var touchdiv = document.getElementById("touch");
    touchdiv.innerHTML = "error in laoding the json file from server";
  }

  canvasTouchHandler();
}
 

 //prevent touch canvas from scrolling   	
function canvasTouchHandler(){
  canvas.addEventListener('touchstart', function(event){
    event.preventDefault();},false);
   canvas.addEventListener('touchmove', function(event){
    event.preventDefault();},false);
}


function jsonBasicParse(text) {
    jsonObj = JSON.parse(text);
    numDom = jsonObj.Num;
}


function buildConnection(){
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        text = xmlhttp.responseText;
        jsonBasicParse(text);
    }
  }

  //var url = "/fyp/rest.json";
  var url = "http://dbgpucluster-2.d1.comp.nus.edu.sg:8080/ranking/rest2?name=asdf";
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
}




function fitToContainer(canvas){
  // Make it visually fill the positioned parent
  canvas.style.width ='98%';
  canvas.style.height='98%';
  // ...then set the internal size to match
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}


function init(){
  canvas = this.document.getElementById('myCanvas');
  context = canvas.getContext('2d');
  fitToContainer(canvas);
}



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
    
