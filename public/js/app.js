var deutscheDemo = angular.module('BatDemo', ['ngResource','ngCookies',
  'ngRoute',
  'Page0Ctrl',
  'Page1Ctrl',
  'Page2Ctrl',
  'Page3Ctrl',
  'Page4Ctrl',
  'Page5Ctrl',
  'IndexCtrl'
]);


deutscheDemo.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

deutscheDemo.config(['$routeProvider', '$locationProvider',
                    function($routeProvider,$locationProvider) {
                      $routeProvider.
					  when('/login', {
                          templateUrl: 'views/login.html',
                          controller: 'logincontroller'
                        }).
                        when('/page0', {
                          templateUrl: 'views/page0.html',
                          controller: 'Page0Ctrl'
                        }).
                        when('/page1', {
                          templateUrl: 'views/page1.html',
                          controller: 'Page1Ctrl'
                        }).
                        when('/page2', {
                            templateUrl: 'views/page2.html',
                            controller: 'Page2Ctrl'
                          }).
                          when('/page3', {
                              templateUrl: 'views/page3.html',
                              controller: 'Page3Ctrl'
                            }).
                            when('/page4', {
                                templateUrl: 'views/page4.html',
                                controller: 'Page4Ctrl'
                              }).
                              when('/page5', {
                                  templateUrl: 'views/page5.html',
                                  controller: 'Page5Ctrl'
                                }).
                                
                            
                           
                            otherwise({redirectTo: '/login'});
                        
}]);

deutscheDemo.controller('logincontroller', ['$scope','$http','$resource','$location','AuthenticationService', function($scope,$http,$resource,$location,AuthenticationService){
	$scope.login = function() {
		/*    	$http({
            method: "POST",
            url: "/api/LoginCheck",
            header: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Headers': "Content-Type",
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Origin': '*'
            },
            data: "{\"username\":\""+$scope.username+"\",\"password\":\""+$scope.password+"\"}"
        }).success(function(data) {
            if(data.loginStatus==="success"){
//			alert("Success");
            	AuthenticationService.SetCredentials($scope.username, $scope.password);
		userid=$scope.username;
		$location.path('/globaltransfer');
		}else {
			alert("Invalid Username/Password. Please try again.");
		    $location.path('/login');
		}
        }).error(function(error) {
           alert("Network Connection failed"); 
        });	
		 */    	
		//To Bypass Login
		if ($scope.username==="nextgen"&&$scope.password==="nextgen"){
			AuthenticationService.SetCredentials($scope.username, $scope.password);
			userid=$scope.username;
			$location.path('/page0');
		}else
		{
			alert("Invalid Username/Password. Please try again.");
			$location.path('/login');
		}
	};
	AuthenticationService.ClearCredentials();
}]);




































deutscheDemo.run(['$rootScope', '$location', '$cookieStore',
          function ($rootScope, $location, $cookieStore) {
	// keep user logged in after page refresh
	$rootScope.globals = $cookieStore.get('globals') || {};
//	if ($rootScope.globals.currentUser) {
//	$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//	}

	$rootScope.$on('$locationChangeStart', function (event, next, current) {
		// redirect to login page if not logged in
		if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
			$location.path('/login');
		}
	});
}]);


deutscheDemo.factory('AuthenticationService',
		['Base64','$cookieStore', '$rootScope',
		 function (Base64,$cookieStore, $rootScope) {
			var service = {};

			service.SetCredentials = function (username, password) {
				var authdata = Base64.encode(username + ':' + password);

				$rootScope.globals = {
						currentUser: {
							username: username,
							authdata: authdata
						}
				};

//				$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
				$cookieStore.put('globals', $rootScope.globals);
			};

			service.ClearCredentials = function () {
				$rootScope.globals = {};
				$cookieStore.remove('globals');
//				$http.defaults.headers.common.Authorization = 'Basic ';
			};

			return service;
		}]);

deutscheDemo.factory('Base64', function () {
	/* jshint ignore:start */

	var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	return {
		encode: function (input) {
			var output = "";
			var chr1, chr2, chr3 = "";
			var enc1, enc2, enc3, enc4 = "";
			var i = 0;

			do {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);

				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;

				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}

				output = output +
				keyStr.charAt(enc1) +
				keyStr.charAt(enc2) +
				keyStr.charAt(enc3) +
				keyStr.charAt(enc4);
				chr1 = chr2 = chr3 = "";
				enc1 = enc2 = enc3 = enc4 = "";
			} while (i < input.length);

			return output;
		},

		decode: function (input) {
			var output = "";
			var chr1, chr2, chr3 = "";
			var enc1, enc2, enc3, enc4 = "";
			var i = 0;

			// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
			var base64test = /[^A-Za-z0-9\+\/\=]/g;
			if (base64test.exec(input)) {
				window.alert("There were invalid base64 characters in the input text.\n" +
						"Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
				"Expect errors in decoding.");
			}
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

			do {
				enc1 = keyStr.indexOf(input.charAt(i++));
				enc2 = keyStr.indexOf(input.charAt(i++));
				enc3 = keyStr.indexOf(input.charAt(i++));
				enc4 = keyStr.indexOf(input.charAt(i++));

				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;

				output = output + String.fromCharCode(chr1);

				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}

				chr1 = chr2 = chr3 = "";
				enc1 = enc2 = enc3 = enc4 = "";

			} while (i < input.length);

			return output;
		}
	};

	/* jshint ignore:end */
});
