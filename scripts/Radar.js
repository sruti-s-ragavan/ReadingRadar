function Radar(renderOnCanvas, dataToRender) {
	var canvas = renderOnCanvas;
	var data = dataToRender;

	this.render = function(){
		this.drawQuadrants();
		this.drawCircles();
		this.renderData();
	};

	this.drawQuadrants = function(){
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

		this.drawQuadrantNames();
	};

	this.drawCircles = function() {
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
	this.renderData = function(){
		//todo  : render data logic here
	}

	this.drawQuadrantNames = function(){
		var quadrantMap = {
			1 : {
				"left" : {
					"dimension" : canvas.width / 2.0,
					"direction" : 0
				},
				"right" : {
					"dimension" : canvas.width,
					"direction" : -1
				},
				"top" : {
					"dimension" : 0,
					"direction" : +1
				},
				"bottom" : {
					"dimension" : canvas.height / 2.0,
					"direction" : 0
				},
				"FarEdges" : {
					"X" : "right",
					"Y" : "top"
				}
			},

			2 : {
				"left" : {
					"dimension" : canvas.width / 2.0,
					"direction" : 0
				},
				"right" : {
					"dimension" : canvas.width,
					"direction" : -1
				},
				"top" : {
					"dimension" : canvas.height / 2.0,
					"direction" : 0
				},
				"bottom" : {
					"dimension" : canvas.height,
					"direction" : -1
				},
				"FarEdges" : {
					"X" : "right",
					"Y" : "bottom"
				}			
			},

			3 : {
				"left" : {
					"dimension" : 0,
					"direction" : +1
				},
				"right" : {
					"dimension" : canvas.width / 2.0,
					"direction" : 0
				},
				"top" : {
					"dimension" : canvas.height / 2.0,
					"direction" : 0
				},
				"bottom" : {
					"dimension" : canvas.height,
					"direction" : -1
				},
				"FarEdges" : {
					"X" : "left",
					"Y" : "bottom"
				}				
			},

			4 : {
				"left" : {
					"dimension" : 0,
					"direction" : +1
				},
				"right" : {
					"dimension" : canvas.width / 2.0,
					"direction" : 0
				},
				"top" : {
					"dimension" : 0,
					"direction" : +1
				},
				"bottom" : {
					"dimension" : canvas.height / 2.0,
					"direction" : 0
				},
				"FarEdges" : {
					"X" : "left",
					"Y" : "top"
				}				
			}

		}

		var quadrants = _.keys(quadrantMap);
		var context = canvas.getContext("2d");

		_.each(quadrants, function(quadrant){
			var quadrantName = data[quadrant].quadrantName;
			var edges = quadrantMap[quadrant];
			
			//todo : hard-coded number 5 
			var xOffset = (quadrantName.length * 5) + 10;
			var farXEdge = edges[edges.FarEdges.X];
			var textX = farXEdge.dimension + (farXEdge.direction * xOffset);

			//todo : hard-coded number 10
			var yOffset= 10;
			var farYEdge = edges[edges.FarEdges.Y];
			var textY = farYEdge.dimension + (farYEdge.direction * yOffset);

			context.fillText(quadrantName, textX, textY);

		})

	}

}