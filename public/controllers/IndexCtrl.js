var IndexCtrl = angular.module('IndexCtrl', []);

IndexCtrl.controller('IndexCtrl', ['$scope','$location','$http','$rootScope',
  function ($scope, $location,$http,$rootScope) {
	
	$scope.page1 = 'clock1';
	$scope.page2 = 'new2';
	$scope.page3 = 'pig2';
	$scope.page4 = 'chick2';
	
	$scope.gotoPage1 = function(){
		$scope.page1 = 'clock1';
		$scope.page2 = 'new2';
		$scope.page3 = 'pig2';
		$scope.page4 = 'chick2';
		$location.path('/page1');
	}
		
	$scope.gotoPage2 = function (){
		$scope.page1 = 'clock2';
		$scope.page2 = 'new1';
		$scope.page3 = 'pig2';
		$scope.page4 = 'chick2';
		$location.path('/page2');
	}
	
	$scope.gotoPage3 = function (){
		$scope.page1 = 'clock2';
		$scope.page2 = 'new2';
		$scope.page3 = 'pig1';
		$scope.page4 = 'chick2';
		$location.path('/page3');
	}
	
	$scope.gotoPage4 = function (){
		$scope.page1 = 'clock2';
		$scope.page2 = 'new2';
		$scope.page3 = 'pig2';
		$scope.page4 = 'chick1';
		$location.path('/page4');
	}
	
	$scope.gotoPage5 = function (){
		$scope.page1 = 'clock1';
		$scope.page2 = 'new2';
		$scope.page3 = 'pig2';
		$scope.page4 = 'chick2';
		$location.path('/page5');
	}
	
}]);