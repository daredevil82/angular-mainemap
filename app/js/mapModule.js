"use strict";

angular.module("maineMap", ["ngResource", "ngRoute", "configuration"])
	.config(["$routeProvider", function($routeProvider){
		$routeProvider.when("/", {
			templateUrl : "views/main.html",
			controller : "MapCtrl",
			resolve : {
				"PathData" : function(MapService){
					return MapService.getMapPaths().promise;
				},
				"CityData" : function(MapService){
					return MapService.getCityPositions().promise;
				},
				"MapData" : function(MapService){
					return MapService.getMapData().promise;
				}
			}
		});
	}]);



