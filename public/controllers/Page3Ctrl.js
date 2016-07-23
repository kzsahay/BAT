//http://oss.opensagres.fr/angularjs-eclipse/0.4.0-SNAPSHOT/
var Page3Ctrl = angular.module('Page3Ctrl', []);



Page3Ctrl.controller('Page3Ctrl', [ '$scope', '$location', '$http',
		'$rootScope', 'finalservice', function Page3Ctrl($scope, $location, $http, $rootScope, finalservice) {
	
	$scope.basePriceBody=[];
	
	$http({
		method: "GET",
		//url: "JSON/inScenario.json"
		url: "https://batobacco.mybluemix.net/loadtable"
		
	}).success(function(data) {
		
		//var tabelJson = data.Data.marketshareForecasts;	
		
                loadTableCallBack(data);

	})
    .error(function(data) {
    	alert("The loadtable service is not available!");
    	console.log('Error '+data);
    });
    
    
    loadTableCallBack = function(data) {
        var tabelJson = data.Data.marketshareForecasts;	
        console.log("tabelJson::  "+JSON.stringify(tabelJson));	
    		$scope.basePriceBody = [];
		$scope.baseHeader = {
				"account": data.Data.accountName,
				"header" : []
		};
                
                $scope.allBrandsChartData = [];
		var initial_scenario_json = []; 
		var radioElm = [];
                var chkBrandsElm = [];
		for (var i = 0; i < tabelJson.length; i++) {
                    if(tabelJson[i].scenario != "C") {
			var scenarioObj = {
					scenario:"",
                                        brand:"",
                                        name: "",
					data: []
			};
			var radioObj = {
					name: "",
					val: ""
			}
                        var allBrandScenarioObjData = {};
                        
			var mshareScenario = tabelJson[i].mshareTrend;
                        scenarioObj.brand = "Overall";
                        scenarioObj.scenario = tabelJson[i].scenario;
			if(tabelJson[i].scenario == "B"){
				$scope.baseHeader.header.push("Base Case");
				scenarioObj.name = "Base Case";
                                
				var priceScenario = tabelJson[i].priceScenario;
				for (var int = 0; int < priceScenario.length; int++) {
					var brandObj={};
					brandObj["brandName"]= priceScenario[int].brandName;
					brandObj["brandPrice"]= priceScenario[int].brandPrice.toFixed(2);
					$scope.basePriceBody.push(brandObj);
				}
				radioObj.name = "Base Case";
				radioObj.val = tabelJson[i].scenario;
                                // get the brands for marketshare checkboxes
                                var mshareTrend = tabelJson[i].mshareTrend;
                                if(mshareTrend.length > 0) {
                                        for (var int = 0; int < mshareTrend[0].brandsMarketShare.length; int++) {
                                            var brandNameObj = { name: ""}
                                            brandNameObj.name= mshareTrend[0].brandsMarketShare[int].brandName;
                                            chkBrandsElm.push(brandNameObj);
                                    }
                                    var brandNameObj = { name: "Overall"};
                                    chkBrandsElm.push(brandNameObj);
                                 }
                                 $scope.shareBrandList = chkBrandsElm;
                                
			}else if(tabelJson[i].scenario == "C"){
				/*$scope.baseHeader.header.push("Corporate");
				scenarioObj.name = "Corporate";
				var priceScenario = tabelJson[i].priceScenario;
				for (var int2 = 0; int2 < $scope.basePriceBody.length; int2++) {
					for (var int3 = 0; int3 < priceScenario.length; int3++) {
						if($scope.basePriceBody[int2].brandName == priceScenario[int3].brandName) {
							$scope.basePriceBody[int2]["corporatePrice"]=priceScenario[int3].brandPrice.toFixed(2);
						}
					}
				}
				radioObj.name = "Corporate";
				radioObj.val = tabelJson[i].scenario;*/
			}else {
				var snNum = tabelJson[i].scenario.slice(-1)*1 + 2;
				radioObj.name = tabelJson[i].scenario;  //"Scenario " + snNum;
				radioObj.val = tabelJson[i].scenario;	
				$scope.baseHeader.header.push(radioObj.name);
				scenarioObj.name = radioObj.name;
				
				var priceSc = tabelJson[i].priceScenario;
				for (var sc = 0; sc < $scope.basePriceBody.length; sc++) {
					for (var scp = 0; scp < priceSc.length; scp++) {
						if($scope.basePriceBody[sc].brandName == priceSc[scp].brandName) {
							$scope.basePriceBody[sc]["scPrice" + snNum] = priceSc[scp].brandPrice.toFixed(2);
						}
					}
				}
			}
                        
                            for (var j = 0; j < mshareScenario.length; j++) {
                                    var wkNum = "Wk" + mshareScenario[j].weekNum;
                                    var marsVal = mshareScenario[j].mshare * 1;
                                    scenarioObj.data.push([wkNum, marsVal])
                                    //populate market share for brands
                                    if(j == 0) {
                                        console.log("inside j=0; length = " + mshareScenario[j].brandsMarketShare.length);
                                        for(var k = 0; k < mshareScenario[j].brandsMarketShare.length; k++) {
                                            var brandScenarioObj = {
                                                                brand:"",
                                                                name: "",
                                                                data: []
                                                              };
                                                              console.log("inside k= " + k + "   value = " + mshareScenario[j].brandsMarketShare[k].brandName);
                                            allBrandScenarioObjData[mshareScenario[j].brandsMarketShare[k].brandName] = brandScenarioObj;
                                            //allScenarioObjArray.push(brandScenarioObj);
                                            //console.log(" allBrandScenarioObjData.length while creation = " + allBrandScenarioObjData.length);
                                            brandScenarioObj.name = scenarioObj.name;
                                            brandScenarioObj.brand = mshareScenario[j].brandsMarketShare[k].brandName;
                                            brandScenarioObj.scenario = tabelJson[i].scenario;
                                          //brandScenarioObj.brand = 
                                        }

                                    }
                                    for(var k = 0; k < mshareScenario[j].brandsMarketShare.length; k++) {

                                        var brandScenarioObj = allBrandScenarioObjData[mshareScenario[j].brandsMarketShare[k].brandName];
                                        brandScenarioObj.data.push([wkNum, mshareScenario[j].brandsMarketShare[k].brandShare * 1]);

                                          //brandScenarioObj.brand = 
                                    }


                            }
                        
                        
                            console.log("scenarioObj:==  "+JSON.stringify(scenarioObj));
                            initial_scenario_json.push(scenarioObj);  // overall market share data
                            $scope.allBrandsChartData.push(scenarioObj);
                            //console.log(" allBrandScenarioObjData.length = " + allBrandScenarioObjData.length);
                            for(var k = 0; k < mshareScenario[0].brandsMarketShare.length; k++) {
                                $scope.allBrandsChartData.push(allBrandScenarioObjData[mshareScenario[0].brandsMarketShare[k].brandName]);
                                console.log("brandshareObj:==  "+JSON.stringify(allBrandScenarioObjData[mshareScenario[0].brandsMarketShare[k].brandName]));
                            }
                    
                        

                        
			radioElm.push(radioObj);
                    }
		}
		
                
//		$scope.baseHeader.header.push("Scenario 4");
//		$scope.baseHeader.header.push("Scenario 5");
		$scope.radioList = radioElm;
                
		
		console.log("baseHeader::  "+JSON.stringify($scope.baseHeader));
		console.log("baseBody::  "+JSON.stringify($scope.basePriceBody));	
		console.log("initial_scenario_json::  "+JSON.stringify(initial_scenario_json));		
		$scope.selectedBrandName = "Overall";
                $scope.selectedScenarios = ['B', 'S1', 'S2', 'S3'];
		$scope.populateLineChart(initial_scenario_json);
    }
	
	$scope.validNumber = function (val) {
		if (isNaN(val)){
			alert("The input data should be numaric!");
			return false;
		}
		return true;
	}
	
	var fstcng = false;
	var sndcng = false;
	var trdcng = false;
	
	$scope.scenario_event = function (elm) {
		if(elm == "fst"){
			fstcng = true;
		}else if(elm == "snd"){
			sndcng = true;
		}else if(elm == "trd"){
			trdcng = true;
		}
	};
	
	$scope.run_scenario = function () {
		//console.log("accountName ++::  "+JSON.stringify($scope.baseHeader));	
		//alert("fstcng:: "+fstcng+"  ::  "+sndcng+"  ++  "+trdcng);
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
			if(!$scope.validNumber($("#fst_" + i).val())){return;}
			var fastBrand = {
					"brandName": $("#fst_" + i).attr("field"),
					"brandPrice": $("#fst_" + i).val()
			}
			fastContents.push(fastBrand);
		}
		if(fstCount >0 && fstCount < fastClass.length){
			alert("Please give all the brand data for Scenario 3");
			return;
		}
		if(fstCount > 0 && fstcng){
			var fastPrice = {
					"scenario": "S1",
					"priceScenario": fastContents
			};
			changMarkObj.marketPrices.push(fastPrice);
		}		
		//alert("fastPrice::  "+JSON.stringify(fastPrice));
		
		var sendClass = $(".sendClass");
		var sendContents = [];
		var sndCount = 0;
		for (i = 0; i < sendClass.length; i++) {
			if ($("#snd_" + i).val() != null && $("#snd_" + i).val() != ""){
				sndCount++;
			}
			if(!$scope.validNumber($("#snd_" + i).val())){return;}
			var sndBrand = {
					"brandName": $("#snd_" + i).attr("field"),
					"brandPrice": $("#snd_" + i).val()
			}
			sendContents.push(sndBrand);
		}
		if(sndCount > 0 && sndCount < fastClass.length){
			alert("Please give all the brand data for Scenario 4");
			return;
		}
		if(sndCount > 0 && sndcng){
			var sendPrice = {
					"scenario": "S2",
					"priceScenario": sendContents
			};
			changMarkObj.marketPrices.push(sendPrice);
		}
		var thrdClass = $(".thrdClass");
		var thrdContents = [];
		var trdCount = 0;
		for (i = 0; i < thrdClass.length; i++) {
			if ($("#trd_" + i).val() != null && $("#trd_" + i).val() != ""){
				trdCount++;
			}
			if(!$scope.validNumber($("#trd_" + i).val())){return;}
			var trdBrand = {
					"brandName": $("#trd_" + i).attr("field"),
					"brandPrice": $("#trd_" + i).val()
			}
			thrdContents.push(trdBrand);
		}
		if(trdCount >0 && trdCount < fastClass.length){
			alert("Please give all the brand data for Scenario 5");
			return;
		}
		if(trdCount > 0 && trdcng){
			var thrdPrice = {
					"scenario": "S3",
					"priceScenario": thrdContents
			};
			changMarkObj.marketPrices.push(thrdPrice);
		}
		
		if(changMarkObj.marketPrices.length > 0){
			var runMrkObj = {"accountMsScenarios": changMarkObj};
			console.log("runMrkObj::  "+JSON.stringify(runMrkObj));
			$scope.mask_page = true;
		}else {
			alert("There are no new Scenarios to run!");
			return;
		}
		
					
		$http({
//			method: "GET",
//			url: "JSON/scenario.json"			
			method: "POST",	
			url: "https://BATobacco.mybluemix.net/runscenario",
			data: runMrkObj
		}).success(function(respData) {		
			if(respData.Alert != null || respData.Alert != ""){
				$http({
					method: "GET",
					//url: "JSON/finalScenario.json"
					url: "https://BATobacco.mybluemix.net/loadtable"
				}).success(function(data) {			
					$scope.mask_page = false;
					//var final_scenario_json = []; 
					//var radioElm = [];
                                        //var tabelJson = data.Data.marketshareForecasts;	
					//console.log("marketshareForecasts:==  "+JSON.stringify(tabelJson));
                                        loadTableCallBack(data);
					/*for (var i = 0; i < data.Data.marketshareForecasts.length; i++) {
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
								//var snNum = scenarioObj.name.slice(-1)*1 + 2;
								//radioObj.name = "Scenario " + snNum;
								radioObj.name = scenarioObj.name;
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
					//alert("$scope.radioList:==  "+JSON.stringify($scope.radioList));*/
				})
			    .error(function(data) {
			    	alert("The run scenario service is not available!");
			    	$scope.mask_page = false;
			    	console.log('Error '+data);
			    });				
			}
		})
	    .error(function(respData) {
	    	alert("The run scenario service is not available!");
	    	$scope.mask_page = false;
	    	console.log('Error '+respData);
	    });
		
	};
	
	$scope.populateLineChart = function (json_scenario) {
		$('#scenario').highcharts({
			title: {
	            text: 'BAT Market Share Forecast',
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
                    text: "BAT Market Share"
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
	
        $scope.selectedScenarios = ['B', 'S1', 'S2', 'S3'];
        $scope.toggle_Scenario = function (scenario) {
            console.log ("clicked scenario = " + scenario);
            var index = $scope.selectedScenarios.indexOf(scenario);
            if(index > -1) {
                $scope.selectedScenarios.splice(index,1);
            } else {
                $scope.selectedScenarios.push(scenario);
            }
            console.log("selectedScenarios = " + $scope.selectedScenarios);
            plotChart();
        }
        
        $scope.selectedBrandName = "Overall";
        $scope.select_BrandVal = function (selBrandName) {
            //selectedBrands.push(brandName);
            //selectedBrands = brandName;
            console.log("before function select_BrandVal called " + $scope.selectedBrandName);
            $scope.selectedBrandName = selBrandName;
            console.log("function select_BrandVal called " + selBrandName);
            plotChart();
            
	};
        
        plotChart = function () {
            var dataToPlot = [];
            //console.log("$scope.allBrandsChartData = " + $scope.allBrandsChartData);
            console.log("plotting chart for " + $scope.selectedBrandName + "  and scenarios = " + $scope.selectedScenarios);
            for(var i =0; i < $scope.allBrandsChartData.length ; i++) {
                //console.log("$scope.allBrandsChartData[i] = " + $scope.allBrandsChartData[i]  );
                //console.log("$scope.allBrandsChartData[i].brand = " + $scope.allBrandsChartData[i].brand  + "  $scope.allBrandsChartData[i].scenario = " + $scope.allBrandsChartData[i].scenario  );
                if($scope.allBrandsChartData[i].brand == $scope.selectedBrandName
                        && $scope.selectedScenarios.indexOf($scope.allBrandsChartData[i].scenario) > -1
                        ) {
                    dataToPlot.push($scope.allBrandsChartData[i]);
                        }
            }
            //console.log("selected brand data to plot = " + JSON.stringify(dataToPlot));
            $scope.populateLineChart(dataToPlot);
        }
        /*$scope.unselect_ChkVal = function (brandName) {
            var index = selectedBrands.indexOf(brandName);
            if (index > -1) {
                selectedBrands.splice(index, 1);
            }
	};*/
        
        
	$scope.gotoFinalize = function () {
		//alert($scope.baseHeader.account +"  ::  "+selsctedRadio);
		if(selsctedRadio == null || selsctedRadio == ""){
			alert("Please select one option");
			return;
		}
		var inputFnJSON = {
				"finalizeInput": {
					"account": $scope.baseHeader.account,
					"selectedScenario": selsctedRadio
				}
			};
		$scope.finalservice = finalservice;
		$scope.finalservice.selectRd = selsctedRadio;
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
	    	alert("Finalize Service is not avaible!");
	    	console.log('Error '+data);
	    });
	};
	
}]);