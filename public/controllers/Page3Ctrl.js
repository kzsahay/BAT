//http://oss.opensagres.fr/angularjs-eclipse/0.4.0-SNAPSHOT/
var Page3Ctrl = angular.module('Page3Ctrl', []);

Page3Ctrl.controller('Page3Ctrl', [ '$scope', '$location', '$http',
		'$rootScope', function Page3Ctrl($scope, $location, $http, $rootScope) {
	
	$scope.basePriceBody=[];
	var dataArry = [];
	
	$http({
		method: "GET",
		url: "JSON/initialScenario.json",
		headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Request-Method': 'GET',
            'Content-Type': "application/json",
            'Access-Control-Allow-Headers': "Content-Type"
        }
	}).success(function(data) {
		
		var tabelJson = data.marketshareForecasts;	
		console.log("tabelJson::  "+JSON.stringify(tabelJson));
				
		$scope.basePriceBody = [];
		$scope.baseHeader = {
				"account": data.accountName,
				"header" : []
		};
		
		for (var i = 0; i < tabelJson.length; i++) {			
			if(tabelJson[i].scenario == "B"){
				$scope.baseHeader.header.push("Base Case");
				var priceScenario = tabelJson[i].priceScenario;
				for (var int = 0; int < priceScenario.length; int++) {
					var brandObj={};
					brandObj["brandName"]= priceScenario[int].brandName;
					brandObj["brandPrice"]= priceScenario[int].brandPrice;
					$scope.basePriceBody.push(brandObj);
				}
			}else if(tabelJson[i].scenario == "C"){
				$scope.baseHeader.header.push("Corporate");
				var priceScenario = tabelJson[i].priceScenario;
				for (var int2 = 0; int2 < $scope.basePriceBody.length; int2++) {
					for (var int3 = 0; int3 < priceScenario.length; int3++) {
						if($scope.basePriceBody[int2].brandName == priceScenario[int3].brandName) {
							$scope.basePriceBody[int2]["corporatePrice"]=priceScenario[int3].brandPrice;
						}
					}
				}
			}else {
				$scope.baseHeader.header.push(tabelJson[i].scenario);
			}
		}
		console.log("baseHeader::  "+JSON.stringify($scope.baseHeader));
		console.log("baseBody::  "+JSON.stringify($scope.basePriceBody));					
	})
    .error(function(data) {
    	alert("Invalide userId or password");
    	console.log('Error '+data);
    });
	
	$scope.validNumber = function (val) {
		if (isNaN(val)){
			alert("The input data should be numaric!");
			return false;
		}
		return true;
	}
	
	$scope.run_scenario = function () {
		console.log("accountName ++::  "+JSON.stringify($scope.baseHeader));
		$scope.radio_btn = true;
		
		var changMarkObj = {
				"accountName": $scope.baseHeader.account,
				"marketPrices": []
		};
		var fastClass = $(".fastClass");
		var fastContents = [];
		for (i = 0; i < fastClass.length; i++) {
			if(!$scope.validNumber($("#fst_" + i).val())){return;}
			var fastBrand = {
					"brandName": $("#fst_" + i).attr("field"),
					"brandPrice": $("#fst_" + i).val()
			}
			fastContents.push(fastBrand);
		}
		var fastPrice = {
				"scenario": "S1",
				"priceScenario": fastContents
		};
		changMarkObj.marketPrices.push(fastPrice);
		//alert("fastPrice::  "+JSON.stringify(fastPrice));
		
		var sendClass = $(".sendClass");
		var sendContents = [];
		for (i = 0; i < sendClass.length; i++) {
			if(!$scope.validNumber($("#snd_" + i).val())){return;}
			var sndBrand = {
					"brandName": $("#snd_" + i).attr("field"),
					"brandPrice": $("#snd_" + i).val()
			}
			sendContents.push(sndBrand);
		}
		var sendPrice = {
				"scenario": "S2",
				"priceScenario": sendContents
		};
		changMarkObj.marketPrices.push(sendPrice);
		
		var thrdClass = $(".thrdClass");
		var thrdContents = [];
		for (i = 0; i < thrdClass.length; i++) {
			if(!$scope.validNumber($("#trd_" + i).val())){return;}
			var trdBrand = {
					"brandName": $("#trd_" + i).attr("field"),
					"brandPrice": $("#trd_" + i).val()
			}
			thrdContents.push(trdBrand);
		}
		var thrdPrice = {
				"scenario": "S3",
				"priceScenario": thrdContents
		};
		changMarkObj.marketPrices.push(thrdPrice);		
		console.log("changMarkObj::  "+JSON.stringify(changMarkObj));
		
		
		
		$scope.scenarioLineChart = $(function () {
			var scenario_json = []; 
			$.getJSON('JSON/finalScenario.json', function(data) {			
				console.log("marketshareForecasts:==  "+JSON.stringify(data.marketshareForecasts));
				
				for (var i = 0; i < data.marketshareForecasts.length; i++) {
					var mshareScenario = data.marketshareForecasts[i].mshareTrend;
					if (mshareScenario.length > 0){
						var scenarioObj = {
								name: "",
								data: []
						};
						if(data.marketshareForecasts[i].scenario == "B"){
							scenarioObj.name = "Base Case";
						}else if(data.marketshareForecasts[i].scenario == "C"){
							scenarioObj.name = "Corporate";
						}else {
							scenarioObj.name = data.marketshareForecasts[i].scenario;
						}
						
						for (var j = 0; j < mshareScenario.length; j++) {
							var wkNum = "Wk" + mshareScenario[j].weekNum;
							var marsVal = mshareScenario[j].mshare * 1;
							scenarioObj.data.push([wkNum, marsVal]);
						}
						//console.log("scenarioObj:==  "+JSON.stringify(scenarioObj));
						scenario_json.push(scenarioObj);
					}				
				}
				console.log("scenario_json:==  "+JSON.stringify(scenario_json));
				
				$('#scenario').highcharts({
					title: {
			            text: 'Overall Market Share Forecast',
			            x: -20 //center
			        },
			        xAxis: {
			        	title: {
		                    text: "Forecast for the next 3 months"
		                }
			        },
			        yAxis: {
			        	title: {
		                    text: "Overall Market Share"
		                }
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'right',
			            verticalAlign: 'top',
			            borderWidth: 0
			        },
			        series: scenario_json				
				}); 			
			});
		});
	};
	
	$scope.scenarioLineChart = $(function () {
		var scenario_json = []; 
		$.getJSON('JSON/initialScenario.json', function(data) {			
			console.log("marketshareForecasts:==  "+JSON.stringify(data.marketshareForecasts));
			
			for (var i = 0; i < data.marketshareForecasts.length; i++) {
				var mshareScenario = data.marketshareForecasts[i].mshareTrend;
				if (mshareScenario.length > 0){
					var scenarioObj = {
							name: "",
							data: []
					};
					if(data.marketshareForecasts[i].scenario == "B"){
						scenarioObj.name = "Base Case";
					}else if(data.marketshareForecasts[i].scenario == "C"){
						scenarioObj.name = "Corporate";
					}else {
						scenarioObj.name = data.marketshareForecasts[i].scenario;
					}
					
					for (var j = 0; j < mshareScenario.length; j++) {
						var wkNum = "Wk" + mshareScenario[j].weekNum;
						var marsVal = mshareScenario[j].mshare * 1;
						scenarioObj.data.push([wkNum, marsVal])
					}
					console.log("scenarioObj:==  "+JSON.stringify(scenarioObj));
					scenario_json.push(scenarioObj);
				}				
			}
			console.log("scenario_json:==  "+JSON.stringify(scenario_json));
			
			$('#scenario').highcharts({
				title: {
		            text: 'Overall Market Share Forecast',
		            x: -20 //center
		        },
		        xAxis: {
		        	title: {
	                    text: "Forecast for the next 3 months"
	                }
		        },
		        yAxis: {
		        	title: {
	                    text: "Overall Market Share"
	                }
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'top',
		            borderWidth: 0
		        },
		        series: scenario_json				
			}); 			
		});
	});	
	
	$scope.gotoFinalize = function () {
		var radioVal = $scope.radioSelect;
		$location.path('/finalize');
	};
	
}]);