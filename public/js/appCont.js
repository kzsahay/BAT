var batapp = angular.module('batapp', ['ngRoute','ngResource']); 
    
	batapp.config(['$routeProvider',function( $routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'pages/scenario.html',
                controller  : 'mainController'
            })
            .otherwise({ 
            		//	redirectTo: '/signup' 
            });
    }]);
    
	batapp.controller('mainController',['$scope', '$route', '$resource', '$http', '$location', function($scope, $route, $resource, $http, $location) {
		$scope.selectedClass = "account";
		$scope.basePriceBody=[];
		
		$http({
			method: "GET",
			url: "JSON/baseScenario.json",
			headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': 'GET',
                'Content-Type': "application/json",
                'Access-Control-Allow-Headers': "Content-Type"
            }
		}).success(function(data) {
			$scope.baseHeader = data.marketshareForecasts;
			$scope.basePriceBody = [];
			//alert($scope.baseHeader.length);
			
			for (var int = 0; int < $scope.baseHeader.length; int++) {
				if($scope.baseHeader[int].scenario=="Base"){
					var priceScenario =$scope.baseHeader[int].priceScenario;
					for (var int2 = 0; int2 < priceScenario.length; int2++) {
						var brandObj={};
						brandObj["brandName"]= priceScenario[int2].brandName;
						brandObj["brandPrice"]= priceScenario[int2].brandPrice;
						$scope.basePriceBody.push(brandObj);
					}
				}else if($scope.baseHeader[int].scenario=="Corporate"){
					var priceScenario =$scope.baseHeader[int].priceScenario;
					for (var int3 = 0; int3 < $scope.basePriceBody.length; int3++) {
						for (var int = 0; int < priceScenario.length; int++) {
							if($scope.basePriceBody[int3].brandName == priceScenario[int].brandName) {
								$scope.basePriceBody[int3]["corporatePrice"]=priceScenario[int].brandPrice;
							}
						}
					}
				}
			}
			
			console.log("baseBody::  "+JSON.stringify($scope.basePriceBody));					
		})
        .error(function(data) {
        	alert("Invalide userId or password");
        	console.log('Error '+data);
        });
		
		/*
		$http({
			method: "GET",
			url: "JSON/scenario.json",
			headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': 'GET',
                'Content-Type': "application/json",
                'Access-Control-Allow-Headers': "Content-Type"
            }
		}).success(function(data) {
			console.log("report::  "+JSON.stringify(data));
			var bands = data.Brands;
			var weekLngth=0;
			for (var int = 0; int < bands.length; int++) {
				if(int ==0){
					weekLngth = bands[int].Weeks.length;
				}else{
					if(weekLngth< bands[int].Weeks.length){
						weekLngth = bands[int].Weeks.length;
					}
				}
			}
			var weeks =[];
			weeks.push("Brands");
			weeks.push("Pricing Scenario");
			for (var i = 1; i <= weekLngth; i++) {
				weeks.push("Week "+i);
			}
			$scope.newBandList = {
					"BrandHead": weeks,
					"Brands": []
				};
			$scope.newBandList.Brands = bands;
			console.log("weekLngth::  "+weekLngth);
			console.log("newJSON::  "+JSON.stringify($scope.newBandList));
			
		})
        .error(function(data) {
        	alert("Invalide userId or password");
        	console.log('Error '+data);
        });
		
		*/
    }]);
    
    
    