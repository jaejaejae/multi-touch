var tbody = document.getElementById("tableBody");

function parseResults(resultsObj){
	removeExistingResults();
	for (var i = 0; i < resultsObj.length; i++) {
		var row = document.createElement("tr");
		var td =  document.createElement("td");
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
		td.appendChild(nameDiv);
		td.appendChild(attriDiv);
		row.appendChild(td);
		tbody.appendChild(row);
	};
}

function removeExistingResults(){
	while (tbody.firstChild) {
	    tbody.removeChild(tbody.firstChild);
	}
}