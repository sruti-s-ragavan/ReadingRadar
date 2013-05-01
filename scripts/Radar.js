function Radar(renderOnCanvas, dataToRender) {
	var canvas = renderOnCanvas;
	var data = dataToRender;
	var quadrantMap = {};
	var radarRange;
	
	var initQuadrants = function(){
		quadrantMap = {
			1 : {
				"Name" : "Quadrant 1",
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
				"Name" : "Quadrant 2",
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
				"Name" : "Quadrant 3",
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
				"Name" : "Quadrant IV",
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

		};
	};
	initQuadrants();
	
	this.render = function(){
		this.drawQuadrantAxes();
		this.drawCircles();
		this.renderData();
	};

	this.drawQuadrantAxes = function(){
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

		//todo : quadrant size same as circle size , margins to be added
		var largestCircleRadius = (canvas.width < canvas.height ? canvas.width : canvas.height) / 2.0;
		radarRange = largestCircleRadius; //todo : hacky , needs clean up
		var distanceBetweenCircles = Math.floor(largestCircleRadius / 3.0);

		for(var radius=largestCircleRadius; radius > 0; radius -= distanceBetweenCircles){
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);	
			context.stroke();
		}
	};

	this.renderData = function(){
		var that = this;
		_.each(data, function(radarPoint){
			//assumes : r in range 0 to 100 ; theta in degrees
			var radius = radarPoint.pc.r;
			var theta = radarPoint.pc.t;

			var coordinates = that.transformToXY(radius, theta);

			var context = canvas.getContext("2d");
			context.beginPath();
			//todo : magic number radius : 8
			context.arc(coordinates.X, coordinates.Y, 8, 0, 2 * Math.PI, false);
			context.fillStyle = (radarPoint.rating === 'recommended') ? 'orange' : 'green';
      		context.fill();
			context.stroke();
		});
	};

	this.drawQuadrantNames = function(){
		var quadrants = _.keys(quadrantMap);
		var context = canvas.getContext("2d");

		_.each(quadrants, function(quadrantId){
			
			var quadrant = quadrantMap[quadrantId];
			var quadrantName = quadrant.Name;
						
			var xOffset = (quadrantName.length * 5) + 10; //todo : magic number
			var farXEdge = quadrant[quadrant.FarEdges.X];

			var textX = farXEdge.dimension + (farXEdge.direction * xOffset); //todo : fix offset for +ve direction values

			var yOffset= 10; 							//todo : magic number
			var farYEdge = quadrant[quadrant.FarEdges.Y];
			var textY = farYEdge.dimension + (farYEdge.direction * yOffset); //todo : fix offset for +ve direction values

			context.fillText(quadrantName, textX, textY);
		})

	};

	this.transformToXY = function(radius, theta){

		var scaledRadius = (radius / 100 )* radarRange;
		var thetaInRadians = (theta * 3.14159) / 90.0;
		XFromRadarCenter = scaledRadius * Math.cos(thetaInRadians);
		YFromRadarCenter = scaledRadius * Math.sin(thetaInRadians);

		var xFromCanvasOrigin = canvas.width / 2.0 + XFromRadarCenter;
		var yFromCanvasOrigin = canvas.height / 2.0 - YFromRadarCenter;

		return {
			"X" : Math.round(xFromCanvasOrigin),
			"Y" : Math.round(yFromCanvasOrigin)
		};
	}

}