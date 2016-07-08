

var deutscheDemo = angular.module('BatDemo', [
  'ngRoute',
  'LoginCtrl',
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

deutscheDemo.config(['$routeProvider',
                    function($routeProvider) {
                      $routeProvider.
                       when('/', {
                          templateUrl: 'views/login.html',
                          controller: 'LoginCtrl'
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
                                
                            
                           
                            otherwise({redirectTo: '/'});
                        
}]);