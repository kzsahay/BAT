var app=angular.module('LoginCtrl',[]);
app.controller('LoginCtrl',['$scope','$http','$location', function LoginCtrl($scope,$http,$location) {
        // reset login status
        //$scope.username="john";
		//$scope.password="hdhdh";
		$scope.login = function() {
		if ($scope.username == "nextgen"&& $scope.password == "nextgen"){			
			$location.path('/page1');
		}else
		{
			alert("Invalid Username/Password. Please try again.");
			$location.path('/');
		}		
		};				
    }]);