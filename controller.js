function Controller(){    
    this.communicator = null;
    this.visualizer = null;
    this.visualizerSummary = null;
    this.run();
}

Controller.prototype.run = function(){
    this.initialPhase();
}

/*
This function impelement the initial phase of the system by creating
a new object of Visualizer and Communicator.
Calling Communicator to request JSON from the server,
pass the JSON object back to Visualizer to visualize and display to the user
*/
Controller.prototype.initialPhase = function(){
    this.communicator = new Communicator();
    this.visualizer = new Visualizer();
    this.communicator.numOfResults = 10;
    this.communicator.init();
    this.visualizer.init(this.communicator.initJsonObj);

    /* D3 visualization
    */
    openVisualizerSummary(this.communicator.initJsonObj);
}

function openVisualizerSummary(rankingWithResultObj) {
    var newWindowRoot = window.open('');
    var jsonToPrint = JSON.stringify(rankingWithResultObj);
    // newWindowRoot.document.write(jsonToPrint);
    newWindowBody = d3.select(newWindowRoot.document.body)
            .attr("width","1060px")
            .attr("margin","50px auto");

    // newWindowBody
    //     .append("button")
    //     .text("hi")
    //     .attr("width", 100)
    //     .attr("height", 100);

    // newWindowBody.append('svg').append("circle")
    //     .style("stroke", "gray")
    //     .style("fill", "red")
    //     .attr("r", 40)
    //     .attr("cx", 50)
    //     .attr("cy", 50)
    //     .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
    //     .on("mouseout", function(){d3.select(this).style("fill", "white");});

    // newWindowBody.append('p').html(jsonToPrint);

    plotScatter(rankingWithResultObj, newWindowBody);

    newWindowBody.append('p').html(JSON.stringify(rankingWithResultObj.Domains));
}


/*In the second phase, the Visualizer return back the updated object and
	update back to the server through the Communicator.
*/
Controller.prototype.secondPhase = function(jsonObj){
	var parsedJsonObj = this.communicator.secondPhase(jsonObj); //communicator will return the updated parsed json file back.
   // this.thirdPhase(parsedJsonObj);
}


Controller.prototype.thirdPhase = function(parsedJsonObj){
    this.visualizer.thirdPhase(parsedJsonObj);
}