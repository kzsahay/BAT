//http://oss.opensagres.fr/angularjs-eclipse/0.4.0-SNAPSHOT/
var Page3Ctrl = angular.module('Page3Ctrl', []);

Page3Ctrl.controller('Page3Ctrl', [ '$scope', '$location', '$http',
		'$rootScope', 'finalservice', function Page3Ctrl($scope, $location, $http, $rootScope, finalservice) {
	
	$scope.basePriceBody=[];
	var dataArry = [];
	
	
	$http({
		method: "GET",
		//url: "JSON/initialScenario.json",
		url: "https://BATobacco.mybluemix.net/loadtable"
		
	}).success(function(data) {
		
		var tabelJson = data.Data.marketshareForecasts;	
		console.log("tabelJson::  "+JSON.stringify(tabelJson));
				
		$scope.basePriceBody = [];
		$scope.baseHeader = {
				"account": data.Data.accountName,
				"header" : []
		};
		var initial_scenario_json = []; 
		var radioElm = [];
		
		for (var i = 0; i < tabelJson.length; i++) {
			var scenarioObj = {
					name: "",
					data: []
			};
			var radioObj = {
					name: "",
					val: ""
			}
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
				radioObj.name = "Base Case";
				radioObj.val = tabelJson[i].scenario;
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
				radioObj.name = "Corporate";
				radioObj.val = tabelJson[i].scenario;
			}else {
				//$scope.baseHeader.header.push(tabelJson[i].scenario);
			}
			for (var j = 0; j < mshareScenario.length; j++) {
				var wkNum = "Wk" + mshareScenario[j].weekNum;
				var marsVal = mshareScenario[j].mshare * 1;
				scenarioObj.data.push([wkNum, marsVal])
			}
			console.log("scenarioObj:==  "+JSON.stringify(scenarioObj));
			initial_scenario_json.push(scenarioObj);
			radioElm.push(radioObj);
		}
		$scope.baseHeader.header.push("Series 3");
		$scope.baseHeader.header.push("Series 4");
		$scope.baseHeader.header.push("Series 5");
		$scope.radioList = radioElm;
		
		console.log("baseHeader::  "+JSON.stringify($scope.baseHeader));
		console.log("baseBody::  "+JSON.stringify($scope.basePriceBody));	
		console.log("initial_scenario_json::  "+JSON.stringify(initial_scenario_json));		
		
		$scope.populateLineChart(initial_scenario_json);
	})
    .error(function(data) {
    	alert("The loadtable service is not available ");
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
			url: "JSON/finalScenario.json"
		}).success(function(data) {	
			$scope.radio_btn = true;
			$scope.mask_page = false;
			var final_scenario_json = []; 
			var radioElm = [];
			console.log("marketshareForecasts:==  "+JSON.stringify(data.Data.marketshareForecasts));
			
			for (var i = 0; i < data.Data.marketshareForecasts.length; i++) {
				var mshareScenario = data.Data.marketshareForecasts[i].mshareTrend;
				
				if (mshareScenario.length > 0){
					var scenarioObj = {
							name: "",
							data: []
					};
					var radioObj = {
							name: "",
							val: ""
					};
					if(data.Data.marketshareForecasts[i].scenario == "B"){
						scenarioObj.name = "Base Case";
						radioObj.name = scenarioObj.name;
						radioObj.val = data.Data.marketshareForecasts[i].scenario;
					}else if(data.Data.marketshareForecasts[i].scenario == "C"){
						scenarioObj.name = "Corporate";
						radioObj.name = scenarioObj.name;
						radioObj.val = data.Data.marketshareForecasts[i].scenario;
					}else {
						scenarioObj.name = data.Data.marketshareForecasts[i].scenario;
						var snNum = scenarioObj.name.slice(-1)*1 + 2;
						radioObj.name = "Series " + snNum;
						radioObj.val = scenarioObj.name;
					}					
					for (var j = 0; j < mshareScenario.length; j++) {
						var wkNum = "Wk" + mshareScenario[j].weekNum;
						var marsVal = mshareScenario[j].mshare * 1;
						scenarioObj.data.push([wkNum, marsVal]);
					}
					//console.log("scenarioObj:==  "+JSON.stringify(scenarioObj));
					final_scenario_json.push(scenarioObj);
					radioElm.push(radioObj);
				}
			}
			console.log("final_scenario_json:==  "+JSON.stringify(final_scenario_json));			
			$scope.populateLineChart(final_scenario_json);
			$scope.radioList = radioElm;
			//alert("$scope.radioList:==  "+JSON.stringify($scope.radioList));
		})
	    .error(function(data) {
	    	alert("The run scenario service is not available ");
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
                    text: "Forecast"
                },
                categories: []
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
	
	var selsctedRadio = "";
	$scope.change_radioVal = function (id) {
		selsctedRadio = id;
	};
	
	$scope.gotoFinalize = function () {
		//alert($scope.baseHeader.account +"  ::  "+selsctedRadio);
		
		var inputFnJSON = {
				"finalizeInput": {
					"account": $scope.baseHeader.account,
					"selectedScenario": $scope.radioSelect
				}
			};
		$scope.finalservice = finalservice;
		$http({
			method: "POST",
			//url: "JSON/initialScenario.json"
			url: "https://batobacco.mybluemix.net/finalize",
			data: inputFnJSON
		}).success(function(data) {
			
			$scope.finalservice.finalizeDt = data;
			console.log("finalize JSON::  "+JSON.stringify($scope.finalservice.finalizeDt));
			$location.path('/finalize');
		})
	    .error(function(data) {
	    	alert("Finalize Service is not avaible");
	    	console.log('Error '+data);
	    });
	};
	
}]);