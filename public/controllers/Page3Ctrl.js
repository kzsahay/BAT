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
		var initial_scenario_json = []; 
		
		for (var i = 0; i < tabelJson.length; i++) {
			var scenarioObj = {
					name: "",
					data: []
			};
			var mshareScenario = tabelJson[i].mshareTrend;
			if(tabelJson[i].scenario == "B"){
				$scope.baseHeader.header.push("Base Case");
				scenarioObj.name = "Base Case";
				var priceScenario = tabelJson[i].priceScenario;
				for (var int = 0; int < priceScenario.length; int++) {
					var brandObj={};
					brandObj["brandName"]= priceScenario[int].brandName;
					brandObj["brandPrice"]= priceScenario[int].brandPrice;
					$scope.basePriceBody.push(brandObj);
				}
			}else if(tabelJson[i].scenario == "C"){
				$scope.baseHeader.header.push("Corporate");
				scenarioObj.name = "Corporate";
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
			for (var j = 0; j < mshareScenario.length; j++) {
				var wkNum = "Wk" + mshareScenario[j].weekNum;
				var marsVal = mshareScenario[j].mshare * 1;
				scenarioObj.data.push([wkNum, marsVal])
			}
			console.log("scenarioObj:==  "+JSON.stringify(scenarioObj));
			initial_scenario_json.push(scenarioObj);
		}
		console.log("baseHeader::  "+JSON.stringify($scope.baseHeader));
		console.log("baseBody::  "+JSON.stringify($scope.basePriceBody));	
		console.log("initial_scenario_json::  "+JSON.stringify(initial_scenario_json));		
		
		$scope.populateLineChart(initial_scenario_json);
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
		$scope.mask_page = true;	
		
		var changMarkObj = {
				"accountName": $scope.baseHeader.account,
				"marketPrices": []
		};
		var fastClass = $(".fastClass");
		var fastContents = [];
		var fstCount = 0;
		for (i = 0; i < fastClass.length; i++) {
			if ($("#fst_" + i).val() != null && $("#fst_" + i).val() != ""){
				fstCount++;
			}
			//alert("fstCount   "+fstCount);
			//alert("Please give all the brand data");
			
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
		
		$http({
			method: "GET",
			url: "JSON/finalScenario.json",
			headers: {
	            'Access-Control-Allow-Origin': '*',
	            'Access-Control-Request-Method': 'GET',
	            'Content-Type': "application/json",
	            'Access-Control-Allow-Headers': "Content-Type"
	        }
		}).success(function(data) {	
			$scope.radio_btn = true;
			$scope.mask_page = false;
			var final_scenario_json = []; 			
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
					final_scenario_json.push(scenarioObj);
				}				
			}
			console.log("final_scenario_json:==  "+JSON.stringify(final_scenario_json));			
			$scope.populateLineChart(final_scenario_json);
		})
	    .error(function(data) {
	    	alert("Invalide userId or password");
	    	console.log('Error '+data);
	    });
	};
	
	$scope.populateLineChart = function (json_scenario) {
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
	        series: json_scenario				
		});
	};
	
	$scope.gotoFinalize = function () {
		var radioVal = $scope.radioSelect;
		$location.path('/finalize');
	};
	
}]);