var finalizeCtrl = angular.module('finalizeCtrl', []);

finalizeCtrl.controller('finalizeCtrl', ['$scope','$location','$rootScope','$http', 'finalservice',
  function finalizeCtrl  ($scope, $location, $rootScope, $http, finalservice) {
	$scope.finalservice = finalservice;
	var finalize_json = []; 
	
	console.log("finalmarketshareForecasts:++  "+JSON.stringify($scope.finalservice.finalizeDt));
	
	var finalizeVal = $scope.finalservice.finalizeDt.Data;
	$scope.accountName = finalizeVal.accountName;
	
	for (var i = 0; i < finalizeVal.marketshareForecasts.length; i++) {
		var mshareFinalize = finalizeVal.marketshareForecasts[i].forecasts;
		if (mshareFinalize.length > 0){
			var finalizeObj = {
					name: "",
					data: []
			};
			if(finalizeVal.marketshareForecasts[i].scenario == "B"){
				finalizeObj.name = "Base Case";
			}else if(finalizeVal.marketshareForecasts[i].scenario == "C"){
				finalizeObj.name = "Corporate";
			}else if(finalizeVal.marketshareForecasts[i].scenario.charAt(0) == "S"){
				var snNum = $scope.finalservice.selectRd.slice(-1)*1 + 2; 
				finalizeObj.name = "Scenario " + snNum;
				
			}
			for (var j = 0; j < mshareFinalize.length; j++) {
				var sumVal = mshareFinalize[j].sum_share * 1;
				finalizeObj.data.push([mshareFinalize[j].brandName, sumVal]);
			}
			finalize_json.push(finalizeObj);
		}
	}			
	console.log("finalize_json:==  "+JSON.stringify(finalize_json));
	
	$('#finalize').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Account wise BAT market share forecast'
        },
        xAxis: {
            crosshair: true,
            categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: 'BAT Market Share'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0
        },
        series: finalize_json
    });
	
}]);