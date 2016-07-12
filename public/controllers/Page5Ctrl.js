var Page5Ctrl = angular.module('Page5Ctrl', []);

Page5Ctrl.controller('Page5Ctrl', [ '$scope', '$location', '$http',
		'$rootScope', function($scope, $location, $http, $rootScope) {


    // Build the chart
    $('#container1').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'BAT 60%'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                 innerSize: '70%',
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
                name: 'BAT',
                y: 60,
				color:'#483D8B'
            }, {
                name: 'Competitors ',
                y: 40,
               color:'#FFA500'
               
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
            text: 'PMI 70%'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                 innerSize: '70%',
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
                name: 'PMI',
				color:'#483D8B',
                y: 70
            }, {
                name: 'Competitors',
				color:'#FFA500',
                y: 30
               
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
            text: 'JTI 30%' 
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                 innerSize: '70%',
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
                name: 'JTI',
				color:'#483D8B',
                y: 30
            }, {
                name: 'Competitors',
                y: 70,
               color:'#FFA500',
                
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
            text: 'Others 23%'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                 innerSize: '70%',
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
				color:'#483D8B',
                y: 23
            }, {
                name: 'Competitors',
                y: 77,
               color:'#FFA500'
               
            }]
        }]
    });



	


}]);