var tbody = document.getElementById("tableBody");

function parseResults(resultsObj){
	removeExistingResults();
	for (var i = 0; i < resultsObj.length; i++) {
		var row = document.createElement("tr");
		var tdInfo =  document.createElement("td");
		var nameDiv =  document.createElement("div");
		var attriDiv =  document.createElement("div");
		var strongDiv = document.createElement("strong");

		nameDiv.innerHTML = resultsObj[i].Name + "   " + resultsObj[i].ID;
		nameDiv.classList.add("rankedItemInfo");

		var tagsString = "";
		for (var j = 0; j < resultsObj[i].Attributes.length; j++) {
			tagsString += resultsObj[i].Attributes[j];
			tagsString += "  ";
		};

		strongDiv.innerHTML = tagsString;
		strongDiv.classList.add("price");
		attriDiv.classList.add("priceBlock");
		//append child
		attriDiv.appendChild(strongDiv);
		tdInfo.appendChild(nameDiv);
		tdInfo.appendChild(attriDiv);
		row.appendChild(tdInfo);
		tbody.appendChild(row);
	};
}

function addFirstColumn(resultsObj){
	var firstDiv = document.createElement("div");
	var image = document.createElement("img");

	firstDiv.classList.add("rankedItemImage");
	//image.src = resultsObj.img;
}


function removeExistingResults(){
	while (tbody.firstChild) {
	    tbody.removeChild(tbody.firstChild);
	}
}