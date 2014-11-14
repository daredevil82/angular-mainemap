"use strict";

angular.module("maineMap")
	.directive("ngMap", ["appConfig", function(config){

		var g,
			projection,
			path,
			zoom,
			svg,
			tooltip,
			cityTooltip,
			data,
			pop,
			default_tooltip = true;

		//Handles the zoom and panning of the map element
	    function zoom(){
	        g.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
	    }

	    function countyClickHandler(d, i, scope){
	    	scope.$apply(function(){
	    		scope.currentCounty(d.properties.name);
	    	});
			
	    	//console.log(scope.countySelection);
	    }

	    function cityClickHandler(d, i, scope){
	    	scope.$apply(function(){
	    		scope.citySelection = d.properties.name;
	    	});

	    	//console.log(scope.citySelection);
	    }

	    function toggleCountyTooltip(val, scope, d, i){
	    	if (val){
	    		countyClickHandler(d, i, scope);
		    } 

		    toggleTooltip(val, this, tooltip);
	    }

	    function toggleCityTooltip(val, scope, d, i){
    		if (val){
    			cityClickHandler(d, i, scope);    		
    		}
    		toggleTooltip(val, this, cityTooltip);
	    }

	    function updateTooltip(d, i){
	    	tooltip.style("left", (d3.event.pageX - 75) + "px")
	    			.style("top", (d3.event.pageY + 11) + "px");
	    }

	    function toggleTooltip(val, svgElem, tooltipElem){
	    	if (val){
	    		tooltipElem.style("left", (d3.event.pageX - 75) + "px")
		    			.style("top", (d3.event.pageY + 11) + "px")
		    			.transition()
		    			.duration(300)
		    			.attr("class", "tooltip tooltip-show");

		    	$(svgElem).removeClass(".count-path-normal")
		    		.addClass(".county-path-hover");
	    	} else {
	    		tooltipElem.transition()
		    			.duration(200)
		    			.attr("class", "tooltip tooltip-hide");

		    	$(svgElem).removeClass(".county-path-hover")
		    			.addClass(".county-path-normal");

	    	}
	    }	    

	    //Initialize map elements and required d3 settings
	    function initMap(scope, el){
	    	projection = d3.geo.mercator()
								.scale(config.mapScale)
								.translate([0,0])
								.center([-71.8, 47.5])
								.precision(0);

			path = d3.geo.path()
						.projection(projection);

			zoom = d3.behavior.zoom()
						.scaleExtent([1, 3])
						.on("zoom", zoom);

			svg = d3.select(el[0])
						.append("svg")
						.attr("width", config.mapWidth)
						.attr("height", config.mapHeight)
						.attr("transform", "translate(-5, -5)")
						.call(zoom);


			svg.append("rect")
				.attr("class", "background")
				.attr("width", config.mapWidth)
				.attr("height", config.mapHeight);

			tooltip = d3.select("#countyTooltip");
			cityTooltip = d3.select("#cityTooltip");

			g = svg.append("g");

			g.append("g")
				.attr("class", "counties")
				.selectAll("path")
				.data(scope.mapData.features)
				.enter()
				.append("path")
				.attr("d", path)
				.attr("class", function(d){
					return d.properties.name + " county";
				})
				.on("click", function(d, i){
					countyClickHandler(d, i, scope);
				})
				.on("mouseover", function(d, i){
					toggleCountyTooltip(true, scope, d, i);
				})
				.on("mouseout", function(d, i){
					toggleCountyTooltip(false, scope, d, i);
				}).
				on("mousemove", updateTooltip);


			g.append("g")
				.attr("class", "cities")
				.selectAll("circle")
				.data(scope.cityData.features)
				.enter()
				.append("circle")
				.attr("class", "city")
				.attr("id", function(d){
					return d.properties.name;
				})
				.attr("transform", function(d){
					return "translate(" + projection([d.geometry.coordinates[1], d.geometry.coordinates[0]]) + ")";
				})
				.attr("r", 5)
				.on("click", function(d, i){
					cityClickHandler(d, i, scope);
				})
				.on("mouseover", function(d, i){
					toggleCityTooltip(true, scope, d, i);
				})
				.on("mouseout", function(d, i){
					toggleCityTooltip(false, scope, d, i);
				});

	    }

		return {
			restrict : "E",
			link : function(scope, el, attrs){
				initMap(scope, el);
			}
		};
	}])
	.directive("donutChart", function(){
		return {
			restrict : "E",
			link : function(scope, el, attrs){
				var color = d3.scale.category10(),
					data = [10, 20, 30],
					width = 300,
					height = 300,
					min = Math.min(width, height),
					svg = d3.select(el[0]).append("svg"),
					pie = d3.layout.pie().sort(null),
					arc = d3.svg.arc()
							.outerRadius(min / 2 * 0.9)
							.innerRadius(min / 2 * 0.5);

					svg.attr({
						width : width,
						height : height
					});

					var g = svg.append("g")
								.attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")");

					g.selectAll("path")
						.data(pie(data))
						.enter()
						.append("path")
						.style("stroke", "white")
						.attr("d", arc)
						.attr("fill", function(d, i){
							return color(i);
						});
			}
		};
	});