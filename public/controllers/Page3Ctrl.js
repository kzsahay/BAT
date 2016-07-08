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
	
	$scope.scenarioLineChart = $(function () {alert("mon");
		$('#scenario').highcharts({
			title: {
	            text: 'Monthly Average Temperature',
	            x: -20 //center
	        },
	        subtitle: {
	            text: 'Source: WorldClimate.com',
	            x: -20
	        },
	        xAxis: {
	            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	        },
	        yAxis: {
	            title: {
	                text: 'Temperature (°C)'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: '°C'
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: [{
	            name: 'Tokyo',
	            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
	        }, {
	            name: 'New York',
	            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
	        }, {
	            name: 'Berlin',
	            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
	        }, {
	            name: 'London',
	            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
	        }]
			
		}); 
		
	});
	
	
	
	
}]);