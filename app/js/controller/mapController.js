"use strict";

angular.module("maineMap")
	.controller('MapCtrl', ['$scope','MapService', function($scope, MapService){
		$scope.mapData = MapService.getMapPaths().getData();
		$scope.cityData = MapService.getCityPositions().getData();
		$scope.countyData = MapService.getMapData().getData();
		$scope.citySelection = null;
		$scope.countySelection = {};
		$scope.showCityTooltip = false;
		$scope.showCountyTooltip = false;

		$scope.currentCounty = function(countyName){
			$scope.countySelection = getCountyData($scope, countyName);
		};

	}]);


function getCountyData($scope, countyName){
	for(var i = 0; i < $scope.countyData.properties.length; i++) {
		if ($scope.countyData.properties[i].NAME === countyName){
			return $scope.countyData.properties[i];
		}
	}
}