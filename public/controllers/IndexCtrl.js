var IndexCtrl = angular.module('IndexCtrl', []);

IndexCtrl.controller('IndexCtrl', ['$scope','$location','$http','$rootScope',
  function ($scope, $location,$http,$rootScope) {
	$scope.selectedClass = 'target';
	
	$scope.gotoPage1 = function() {
		$scope.selectedClass = 'target';
		$location.path('/page1');
	}
		
	$scope.gotoPage2 = function (){
		$scope.selectedClass = 'pricing';
		$location.path('/page2');
	}
	
	$scope.gotoPage3 = function (){
		$scope.selectedClass = 'account';
		$location.path('/page3');
	}
	
	$scope.gotoPage4 = function (){
		$scope.selectedClass = 'competitor';
		$location.path('/page4');
	}
	
	$scope.gotoPage5 = function (){
		$scope.selectedClass = '';
		$location.path('/page5');
	}
	
}]);