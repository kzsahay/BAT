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
                    console.log("processed_json::  "+JSON.stringify(processed_json));
                    // draw chart
                    $('#container1').highcharts({
                    chart: {
                        type: "line"
                    },
                    color: '#FFA500',
                    title: {
                        text: "BAT market "
                    },
                    xAxis: {
                        type: 'category',
                        //allowDecimals: false,
                        title: {
                            text: "Date"
                        }
                    },
                    yAxis: {
                        title: {
                            text: "Market Share"
                        }
                    },
                    series: [{
	                    name: 'Market Share',
	                    color:'#FFA500',
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

$scope.productbullet=$(function () {
    $('#container3').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Products'
        },
        
        xAxis: {
            categories: ['Parisienne', 'Pall Mall', 'Lucky Strike', 'Kent'],
            title: {
                text: 'Brand Name'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Sales',
                align: 'middle'
            },
            labels: {
                overflow: 'justify'
            }
        },
		legend: {
            enabled: false
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: false
                }
            }
        },
       /*legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'black'),
            shadow: true,
			text:''
        },*/
        credits: {
            enabled: false
        },
        series: [{
		color:'#FFA500',
            data: [50, 70, 60, 30]
        }]
    });
});



} ]);