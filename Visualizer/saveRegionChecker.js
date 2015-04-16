function isWithinSaveRegion(tagsObj){
	var isWithin = true;
	for (var i = 0; i < tagsObj.length; i++) {//domain
		for (var j = 0; j <  tags Obj[i].length; j++) {//rank
			 for (var k = 0; k < tagsObj[i][j].length; k++) { //each tag
			 	var tag = tagsObj[i][j][k];
			 	if (tag.rank < tag.saveRegion[0] || tag.rank > tag.saveRegion[1])//not within save region
			 		return false;
			 };
		};
		
	};

	return isWithin;
}