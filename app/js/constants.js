"use strict";

angular.module("configuration", [])
	.constant("appConfig", {
		maineCountyPaths : "data/maine.json",
		maineCityPositions : "data/maine_cities.json",
		maineCountyData : "data/maine_properties.json",
		mapHeight : 650,
		mapWidth : 600,
		defaultTooltip : "<div id = 'county_name' class = 'county_record'>County: <span id = 'county'></span></div>" + 
                        "<div id = 'county_fips' class = 'county_record'>FIPS: <span id = 'fips'></span></div>" +
                        "<div class = 'extra_data'><span class = 'pop_year'>2000</span> Population: <span id = 'county_population'</span></div>" + 
                        "<div class = 'extra_data'><span class = 'pop_year'>2000</span> Density (Sq Mi): <span id = 'county_density'</span></div>" +
                        "<div>Click for 2000 & 2010 Census Data</div>",
        cityTooltip : "<div id = 'city_info' class = city_record'>City: <span id = 'city_name'></span></div>",
        mapScale : 5500,
        getScale : function(max, min, step){
        	var stepRange = (max - min)/steps;

	        var scale = [stepRange];
	        min += stepRange;

	        for (var i = 1; i <=steps; i++)
	            scale[i] = min += stepRange;

	        return scale;
        },
        getDomain : function(n){
        	switch(n){
	            case 1: 
	                //return population total domain
	                return [0, 100000];
	                break;

	            case 2: 
	                //return population density domain
	                return [0, 300];
	                break;
	        }
        }

	});