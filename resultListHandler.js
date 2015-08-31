var tbody = document.getElementById("tableBody");

function parseResults(resultsObj) {
	removeExistingResults();
	for (var i = 0; i < resultsObj.length; i++) {
		var row = document.createElement("tr");
		//append image div
		row.appendChild(addFirstColumn(resultsObj[i]));
		//append info div
		row.appendChild(addSecondColumn(resultsObj[i]));
		//append score div
		row.appendChild(addThirdColumn(resultsObj[i]));

		tbody.appendChild(row);
	};
}

//create and return the first column with image
function addFirstColumn(result) {
	var tdImg = document.createElement("td");
	var firstDiv = document.createElement("div");
	var image = document.createElement("img");

	firstDiv.classList.add("rankedItemImage");
	image.src = result.Img;

	firstDiv.appendChild(image);
	tdImg.appendChild(firstDiv);

	return tdImg;

}


function addSecondColumn(result) {
	var tdInfo = document.createElement("td");
	var nameDiv = document.createElement("div");
	var attriDiv = document.createElement("div");
	var strongDiv = document.createElement("strong");


	nameDiv.innerHTML = result.Name + "   " + result.ID;
	nameDiv.classList.add("rankedItemInfo");

	var tagsString = "";
	var isMore = false;
	for (var j = 0; j < result.Attributes.length; j++) {
		if (j < 2) {
			tagsString += result.Attributes[j];
			tagsString += "  ";
		}
		//if exceed 2, display more 
		else if (j >= 2) {
			if (j == 2) {
				strongDiv.innerHTML = tagsString;
				tagsString = "";
			} else {
				isMore = true;
				tagsString += result.Attributes[j];
				tagsString += "  ";
			}
		}
	};
	strongDiv.classList.add("attributes");
	attriDiv.appendChild(strongDiv);

	//add the more tag
	if (isMore) {
		var moreInfo = document.createElement("a");
		moreInfo.href = "#";
		moreInfo.title = tagsString;
		moreInfo.innerHTML = "more";
		attriDiv.appendChild(moreInfo);
	}



	attriDiv.classList.add("attrBlock");
	//append child	
	tdInfo.appendChild(nameDiv);
	tdInfo.appendChild(attriDiv);

	return tdInfo;
}

function addThirdColumn(result) {
	var tdScore = document.createElement("td");
	tdScore.innerHTML = result.Score;

	return tdScore;
}

function removeExistingResults() {
	while (tbody.firstChild) {
		tbody.removeChild(tbody.firstChild);
	}
}