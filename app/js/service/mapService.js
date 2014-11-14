"use strict";

angular.module("maineMap")
	.factory("MapService", ["$http", "$log", "$q", "appConfig", function($http, $log, $q, appConfig, $scope){
		var mapPaths, mapPromise, 
			cityPositions, cityPromise,
			mapData, dataPromise;

		return {
			getMapPaths : function(){

				mapPromise = $http.get(appConfig.maineCountyPaths)
									.success(function(data){
										mapPaths = data;
									});

				return {
					getData : function(){
						return mapPaths;
					},
					setData : function(data){
						mapPaths = data;
					},
					promise : mapPromise
				};
			},
			getCityPositions : function(){
				cityPromise = $http.get(appConfig.maineCityPositions)
									.success(function(data){
										cityPositions = data;
									});

				return {
					getData : function(){
						return cityPositions;
					},
					setData : function(data){
						cityPositions = data;
					},
					promise : cityPromise
				};
			},
			getMapData : function(){
				dataPromise = $http.get(appConfig.maineCountyData)
								.success(function(data){
									mapData = data;
								});

				return {
					getData : function(){
						return mapData;
					},
					setData : function(data){
						mapData = data;
					},
					promise : dataPromise
				};
			}
		};
	}]);