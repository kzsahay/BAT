var app=angular.module('LoginCtrl',[]);
app.controller('LoginCtrl',['$scope','$http','$location','$rootScope', function LoginCtrl($scope,$http,$location,$rootScope) {
        // reset login status
        //$scope.username="john";
		//$scope.password="hdhdh";
	$rootScope.dashboard = false;
		$scope.login = function() {
		if ($scope.username == "nextgen"&& $scope.password == "nextgen"){			
			$location.path('/page1');
			$rootScope.dashboard = true;
		}else
		{
			alert("Invalid Username/Password. Please try again.");
			$location.path('/login');
		}		
		};				
    }]);