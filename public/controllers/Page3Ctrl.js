//http://oss.opensagres.fr/angularjs-eclipse/0.4.0-SNAPSHOT/
var Page3Ctrl = angular.module('Page3Ctrl', []);

Page3Ctrl.controller('Page3Ctrl', [ '$scope', '$location', '$http',
		'$rootScope', function Page3Ctrl($scope, $location, $http, $rootScope) {
	
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
	
}]);