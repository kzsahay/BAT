var Page2Ctrl = angular.module('Page2Ctrl', []);

Page2Ctrl.controller('Page2Ctrl', ['$scope','$location','$rootScope','$http', 
  function Page2Ctrl  ($scope, $location, $rootScope, $http) {
	$(function () {
    $('#container').highcharts({

        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        title: {
            text: 'Price change across brands'
        },

        xAxis: {
            gridLineWidth: 0
        },

        yAxis: {
            startOnTick: false,
            endOnTick: false,
			 gridLineWidth: 0
        },

        series: [{
			  name: 'Old Price',
			   color: '#FFA500',
            data: [
                [1, 0.5, 33],
                [2, 0.6, 33],
                [3, 0.32, 33],
                [4, 0.3, 33],
                [5, 0.5, 33],
                [6, 0.3, 33],
                [7, 0.4, 33],
                [8, 0.34, 33],
               
            ],
            marker: {
                fillColor: {
                	 radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                    stops: [
                        [0, '#FFA500']
                      
                    ]
                }
            }
        }, {
			 name: 'New Price',
			  color: '#483D8B',
            data: [
                [1, 0.3, 33],
                [2, 0.7, 33],
                [3, 0.34, 33],
                [4, 0.4, 33],
                [5, 0.7, 33],
                [6, 0.2, 33],
                [7, 0.5, 33],
                [8, 0.32, 33],
             
            ],
            marker: {
                fillColor: {
                    radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                    stops: [
                        [0, '#483D8B']
                        
                    ]
                }
            }
        }]

    });
});
$(function () {

    var gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: "#483D8B",
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
               
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#FFA500'], // green
                [0.5, '#FFA500'], // yellow
                [0.9, '#FFA500'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The speed gauge
    $('#container-speed').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 10,
            title: {
                text: 'Market share impact for my accounts'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Market share impact for my accounts',
            data: [9],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver">%</span></div>'
            },
            tooltip: {
                valueSuffix: 'percent'
            }
        }]

    }));

   
$(function () {
    // Create the chart
    $('#bar-container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Account wise contribution'
        },
        subtitle: {
          
        },
        xAxis: {
            type: 'category',
             gridLineWidth: 0
        },
        yAxis: {
            title: {
                text: 'Total percent market share',
                 gridLineWidth: 0
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Account 1',
                y: 56.33,
                drilldown: 'Account 1',
                color:"#483D8B"
            }, {
                name: 'Account 2',
                y: 24.03,
                drilldown: 'Account 2',
                color:"#483D8B"
            }, {
                name: 'Account 3',
                y: 10.38,
                drilldown: 'Account 3',
                color:"#483D8B"
            }]
        }],
        drilldown: {
            series: [{
                name: 'Acoount1',
                id: 'Acoount1',
                data: [
                    [
                        'v11.0',
                        24.13
                    ],
                    [
                        'v8.0',
                        17.2
                    ],
                    [
                        'v9.0',
                        8.11
                    ],
                    [
                        'v10.0',
                        5.33
                    ],
                    [
                        'v6.0',
                        1.06
                    ],
                    [
                        'v7.0',
                        0.5
                    ]
                ]
            }, {
                name: 'Acoount2',
                id: 'Acoount2',
                data: [
                    [
                        'v40.0',
                        5
                    ],
                    [
                        'v41.0',
                        4.32
                    ],
                    [
                        'v42.0',
                        3.68
                    ],
                    [
                        'v39.0',
                        2.96
                    ],
                    [
                        'v36.0',
                        2.53
                    ],
                    [
                        'v43.0',
                        1.45
                    ],
                    [
                        'v31.0',
                        1.24
                    ],
                    [
                        'v35.0',
                        0.85
                    ],
                    [
                        'v38.0',
                        0.6
                    ],
                    [
                        'v32.0',
                        0.55
                    ],
                    [
                        'v37.0',
                        0.38
                    ],
                    [
                        'v33.0',
                        0.19
                    ],
                    [
                        'v34.0',
                        0.14
                    ],
                    [
                        'v30.0',
                        0.14
                    ]
                ]
            }, {
                name: 'Acoount3',
                id: 'Acoount3',
                data: [
                    [
                        'v35',
                        2.76
                    ],
                    [
                        'v36',
                        2.32
                    ],
                    [
                        'v37',
                        2.31
                    ],
                    [
                        'v34',
                        1.27
                    ],
                    [
                        'v38',
                        1.02
                    ],
                    [
                        'v31',
                        0.33
                    ],
                    [
                        'v33',
                        0.22
                    ],
                    [
                        'v32',
                        0.15
                    ]
                ]
            }]
        }
    });
});

});
  }]);
  
