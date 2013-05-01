$(document).ready(function(){
	//todo : see if browser understands html5

	var canvas = $("#radar")[0];
	var radar = new Radar(canvas, Data);

	radar.render();
	
});




