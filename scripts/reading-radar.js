$(document).ready(function(){
	//todo : see if browser understands html5
	var canvas = $("#radar")[0];

	drawQuadrants(canvas);
	drawCircles(canvas);
	renderData(canvas);
});

