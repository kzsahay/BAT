var batapp = angular.module('batapp', ['ngRoute','ngResource']); 
    
	batapp.config(['$routeProvider',function( $routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'pages/scenario.html',
                controller  : 'mainController'
            })
            .otherwise({ 
            		//	redirectTo: '/signup' 
            });
    }]);
    
	batapp.controller('mainController',['$scope', '$route', '$resource', '$http', '$location', function($scope, $route, $resource, $http, $location) {
		$scope.selectedClass = "account";
    }]);
    
    
    