var Page0Ctrl = angular.module('Page0Ctrl', []);

Page0Ctrl.controller('Page0Ctrl', [ '$scope', '$location', '$http',
		'$rootScope', function($scope, $location, $http, $rootScope) {
		
$scope.linechart=$(function () {
	var processed_json = new Array();   
                //$.getJSON('http://localhost:6001/screen3.json', function(data) {
				$.getJSON('slide2.json', function(data) {
                    // Populate series
                    for (i = 0; i < data.length; i++){
                        processed_json.push([data[i].Account, data[i].Market]);
                    }
                    console.log("processed_json::  "+JSON.stringify(processed_json));
                    // draw chart
                    $('#container0').highcharts({
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
                            text: "Market Share"
                        }
                    },
                    series: [{
	                    name: 'Account',
                        data: processed_json
                    }]
                }); 
            });
        });
		
		
		
		
		$('#container1').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Parisienne'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                 innerSize: '50%',
                dataLabels: {
                    enabled: false
                },
                showInLegend: false
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Others',
                y: 40
            }, {
                name: 'Brand Share',
                y: 60,
                sliced: true,
                selected: true
            }]
        }]
    });
		// Build the chart
    $('#container2').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Pall Mall'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                 innerSize: '50%',
                dataLabels: {
                    enabled: false
                },
                showInLegend: false
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Others',
                y: 30
            }, {
                name: 'Brand Share',
                y: 70,
                sliced: true,
                selected: true
            }]
        }]
    });
		// Build the chart
    $('#container3').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Lucky Strike'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                 innerSize: '50%',
                dataLabels: {
                    enabled: false
                },
                showInLegend: false
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Others',
                y: 10
            }, {
                name: 'Brand Share',
                y: 90,
                sliced: true,
                selected: true
            }]
        }]
    });
		// Build the chart
    $('#container4').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Kent'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                 innerSize: '50%',
                dataLabels: {
                    enabled: false
                },
                showInLegend: false
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Others',
                y: 20
            }, {
                name: 'Brand Share',
                y: 80,
                sliced: true,
                selected: true
            }]
        }]
    });
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
} ]);		
		