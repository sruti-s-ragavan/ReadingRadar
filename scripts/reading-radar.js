function initCanvas(){
	var canvas = $("#radar")[0];

	drawQuadrants(canvas);
	drawCircles(canvas);
	renderData(canvas);
}

function drawQuadrants(canvas){
	
	var width = canvas.width;
	var height = canvas.height;

	var context = canvas.getContext("2d");
	context.beginPath();
	context.lineWidth = 1;
	
	context.moveTo(width/2, 0);
	context.lineTo(width/2, height);

	context.moveTo(0, height/2);
	context.lineTo(width, height/2);

	context.stroke();
}

function drawCircles (canvas) {
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;

	context = canvas.getContext("2d");
	context.beginPath();

	var largestCircleRadius = (canvas.width < canvas.height ? canvas.width : canvas.height) / 2.0;
	var distanceBetweenCircles = Math.floor(largestCircleRadius / 3.0);

	for(var radius=largestCircleRadius; radius > 0; radius -= distanceBetweenCircles){
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);	
		context.stroke();
	}
}

$(document).ready(function(){
	//todo : check if html5 is supported by browser
	initCanvas();
});

function renderData	(canvas) {
	//todo : data render logic
}