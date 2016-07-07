var Page1Ctrl = angular.module('Page1Ctrl', []);

Page1Ctrl.controller('Page1Ctrl', [ '$scope', '$location', '$http',
		'$rootScope', function($scope, $location, $http, $rootScope) {
		
$scope.linechart=$(function () {
	var processed_json = new Array();   
                //$.getJSON('http://localhost:6001/screen3.json', function(data) {
				$.getJSON('screen3.json', function(data) {
                    // Populate series
                    for (i = 0; i < data.length; i++){
                        processed_json.push([data[i].Date, data[i].Sale_hist]);
                    }
                    // draw chart
                    $('#container1').highcharts({
                    chart: {
                        type: "line"
                    },
                    title: {
                        text: "BAT market "
                    },
                    xAxis: {
                        type: 'category',
                        //allowDecimals: false,
                        title: {
                            text: ""
                        }
                    },
                    yAxis: {
                        title: {
                            text: "Sale figures"
                        }
                    },
                    series: [{
	                    name: 'Date',
                        data: processed_json
                    }]
                }); 
            });
        });

	/**$scope.piechart=$(function () {
		 $.getJSON('screen31.json', function(json) {
		console.log(JSON.stringify(json));
    chart = new Highcharts.Chart({
      chart: {
        renderTo: 'container2',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: 'Interactive Pie'
      },
      tooltip: {
        formatter: function() {
          return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
      },
      innerSize: '50%',
      series: [{
        type: 'pie',
        name: 'Browser share',
        data: json
      }]
    }
  });
});
});**/

$scope.piechart=$(function () {
var processedpie_json = new Array();   
//var processedpie_json = []; 
                //$.getJSON('http://localhost:6001/screen3.json', function(data) {
				$.getJSON('screen31.json', function(data) {
                    // Populate series
                    for (i = 0; i < data.length; i++){
                        processedpie_json.push([data[i].Brand, data[i].Sale_hist]);
                    }
					 $('#container2').highcharts({
                    chart: {
						type: 'pie',
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false
							},
					title: {
						text: 'BAT Brand Share'
							},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
							},
				plotOptions: {
					pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
								}
						},
						showInLegend: true
						}
					},
				series: [{
					name:processedpie_json.Brand,
					data:processedpie_json,
					innerSize: '50%'
						}]
                });

});
});



} ]);