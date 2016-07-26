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
            type: 'column'
        },
        title: {
            text: 'ACCOUNT WISE CONTRIBUTION'
        },
        subtitle: {
          
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent market share',
                 gridLineWidth: 0
            }

        },
        legend: {
			align: "centre",
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
                y: 40,
                color:"#483D8B"
            }, {
                name: 'Brand Share',
                y: 60,
                sliced: true,
                selected: true,
                color:"#FFA500"
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
                y: 30,
                color:"#483D8B"
            }, {
                name: 'Brand Share',
                y: 70,
                sliced: true,
                selected: true,
                color:"#FFA500"
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
                 innerSize: '70%',
                dataLabels: {
                    enabled: false
                },
                showInLegend: false
            }
        },
        series: [{
            //name: 'Brands',
            //;colorByPoint: true,
            data: [{
                name: 'Others',
                y: 10,
                color:"#483D8B"
            }, {
                name: 'Brand Share',
                y: 90,
                sliced: true,
                selected: true,
                color:"#FFA500"
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
                y: 20,
                
                color:"#483D8B"
            }, {
                name: 'Brand Share',
                y: 80,
                sliced: true,
                selected: true,
                color:"#FFA500"
            }]
        }]
    });
		
    $(function () {
        // Create the chart
        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Brand contribution across my accounts'
            },
            subtitle: {
                text: 'Click the columns to view details.'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Total percent market share'
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
                name: 'Manufacturers',
                colorByPoint: true,
                data: [{
                    name: 'BAT',
                    y: 37.40,
                    drilldown: 'BAT'
                }, {
                    name: 'Phillip Morris',
                    y: 16.50,
                    drilldown: 'Ph Morris'
                }, {
                    name: 'JTI',
                    y: 41.40,
                    drilldown: 'JTI'
                }, {
                    name: 'Others',
                    y: 4.70,
                    drilldown: 'Others'
                }]
            }],
            drilldown: {
                series: [{
                    name: 'BAT',
                    id: 'BAT',
                    data: [{
                        name: 'DAVIDOFF',
                        y: 0.70,
                        drilldown: 'DAVIDOFF'
                    }, {
                        name: 'DUNHILL',
                        y: 0.30,
                        drilldown: 'DUNHILL'
                    }, {
                        name: 'FRANCAISE',
                        y: 0.10,
                        drilldown: 'FRANCAISE'
                    }, {
                        name: 'JPS',
                        y: 0.00,
                        drilldown: 'JPS'
                    }, {
                        name: 'KENT',
                        y: 5.70,
                        drilldown: 'KENT'
                    }, {
                        name: 'VOGUE',
                        y: 1.70,
                        drilldown: 'VOGUE'
                    }, {
                        name: 'SELECT',
                        y: 4.70,
                        drilldown: 'SELECT'
                    }, {
                        name: 'LUCKY STRIKE',
                        y: 1.20,
                        drilldown: 'LUCKY STRIKE'
                    }, {
                        name: 'GAULOISES BLONDES',
                        y: 1.00,
                        drilldown: 'GAULOISES BLONDES'
                    }, {
                        name: 'JPGAULOISES TRADS',
                        y: 0.60,
                        drilldown: 'GAULOISES TRAD'
                    }, {
                        name: 'GITANES',
                        y: 0.10,
                        drilldown: 'GITANES'
                    }, {
                        name: 'MAROCAINE',
                        y: 1.10,
                        drilldown: 'MAROCAINE'
                    }, {
                        name: 'MARYLONG',
                        y: 1.70,
                        drilldown: 'MARYLONG'
                    }, {
                        name: 'PALL MALL',
                        y: 2.70,
                        drilldown: 'PALL MALL'
                    }, {
                        name: 'PARISIENNE',
                        y: 18.40,
                        drilldown: 'PARISIENNE'
                    }]
                }, {
                    name: 'PARISIENNE',
                    id: 'PARISIENNE',
                    data: [
							{name: 'PARISIENNE BLEUE',
							y: 0.60,
							drilldown: 'PARISIENNE BLEUE'
							},
							{name: 'PARISIENNE FILTRE',
							y: 0.10,
							drilldown: 'PARISIENNE FILTRE'
							},
							{name: 'PARISIENNE CIEL',
							y: 0.80,
							drilldown: 'PARISIENNE CIEL'
							},
							{name: 'PARISIENNE JAUNE',
							y: 8.30,
							drilldown: 'PARISIENNE JAUNE'
							},
							{name: 'PARISIENNE OHNE/SANS',
							y: 4.00,
							drilldown: 'PARISIENNE OHNE/SANS'
							},
							{name: 'PARISIENNE ORANGE',
							y: 3.50,
							drilldown: 'PARISIENNE ORANGE'
							},
							{name: 'PARISIENNE PETITE',
							y: 0.20,
							drilldown: 'PARISIENNE PETITE'
							},
							{name: 'PARISIENNE PLUS',
							y: 0.40,
							drilldown: 'PARISIENNE PLUS'
							},
							{name: 'PARISIENNE ROUGE',
							y: 0.60,
							drilldown: 'PARISIENNE ROUGE'
							}
                    ]
                },
							{
								name: 'PARISIENNE JAUNE',
								id: 'PARISIENNE JAUNE',
								data: [
										{name: 'PARISIENNE JAUNE KF* C020HL',
										y: 7.30
										},
										{name: 'PARISIENNE JAUNE KF* C020SC',
										y: 1.00
										}
										]
							},
				
				
				
				
				{
                    name: 'Ph Morris',
                    id: 'Ph Morris',
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
                    name: 'JTI',
                    id: 'JTI',
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
                }, {
                    name: 'Others',
                    id: 'Others',
                    data: [
                        [
                            'v8.0',
                            2.56
                        ],
                        [
                            'v7.1',
                            0.77
                        ],
                        [
                            'v5.1',
                            0.42
                        ],
                        [
                            'v5.0',
                            0.3
                        ],
                        [
                            'v6.1',
                            0.29
                        ],
                        [
                            'v7.0',
                            0.26
                        ],
                        [
                            'v6.2',
                            0.17
                        ]
                    ]
                }]
            }
        });
    });	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
} ]);		
		