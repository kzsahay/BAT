var finalizeCtrl = angular.module('finalizeCtrl', []);

finalizeCtrl.controller('finalizeCtrl', ['$scope','$location','$rootScope','$http',
  function finalizeCtrl  ($scope, $location, $rootScope, $http) {
	
	$scope.finalizeChart = $(function () {
		var finalize_json = []; 
		$.getJSON('JSON/finalize.json', function(data) {
			
			console.log("final marketshareForecasts:==  "+JSON.stringify(data.marketshareForecasts));
			for (var i = 0; i < data.marketshareForecasts.length; i++) {
				var mshareFinalize = data.marketshareForecasts[i].forecasts;
				if (mshareFinalize.length > 0){
					var finalizeObj = {
							name: "",
							data: []
					};
					if(data.marketshareForecasts[i].scenario == "B"){
						finalizeObj.name = "Base Case";
					}else if(data.marketshareForecasts[i].scenario == "C"){
						finalizeObj.name = "Corporate";
					}else {
						finalizeObj.name = data.marketshareForecasts[i].scenario;
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
		            text: 'Account wise market share forecast'
		        },
		        xAxis: {
		            crosshair: true
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: 'Market Share'
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
		});    
		
	});	
	
}]);