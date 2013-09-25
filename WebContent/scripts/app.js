var footballApp = angular.module('football',
//		[],
			['ngAnimate', 'ngRoute'],
			['$routeProvider', '$locationProvider',
    function ($routeProvider,  $locationProvider) {

//		// configure html5 to get links working on jsfiddle with html5Mode = true
//      // IE9 does not support History API see: http://caniuse.com/#search=history
//      $locationProvider.html5Mode(false);
			
				
// TODO: transform every URL params to routeParams member				
/*        $routeProvider
	        .when('/startup', {
		        templateUrl: 'view/startup/startup.html'
	        })

	        // if invoked from from CAWB or CBD
	        // {context}/app/debug.html#/startup/callerId=1&businessRelationSTID=2&locale=3
            .when('/startup?callerId=:callerId&businessRelationSTID=:businessRelationSTID&locale=:locale', {
                templateUrl: 'view/startup/startup.html'
            })

            // if invoked from from ASP
            // {context}/app/debug.html#/startup/callerId=1&businessRelationSTID=2&portfolioSTID=3&modeOfContact=4&locale=5&callbackURL=http%3A%2F%2Fwww.ubs.com%2Fch%2Fde.html
            .when('/startup?callerId=:callerId&businessRelationSTID=:businessRelationSTID&portfolioSTID=:portfolioSTID&modeOfContact=:modeOfContact&locale=:locale&callbackURL=:callbackURL', {
                templateUrl: 'view/startup/startup.html'
            })
	        .when('/main', {
	        	templateUrl: 'view/main/main.html'
	        })
	        .when('/main/portfolioSTID/:portfolioSTID', {
                templateUrl: 'view/main/main.html'
            })
            .when('/main/portfolioSTID/:portfolioSTID/issueId/:issueId', {
                templateUrl: 'view/main/main.html'
            })
            .when('/c54Test', {
                templateUrl: 'view/widget/c54-test.html'
            })
            .when('/uw4Test', {
                templateUrl: 'view/widget/uw4-test.html'
            })
            .when('/searchInstrumentTest', {
                templateUrl: 'view/widget/search-instrument-test.html'
            })
	        .when('/styleTest', {
		        templateUrl: 'view/widget/styling-test.html'
	        })
            .otherwise({ redirectTo: '/startup' });
*/
}]);

//register the interceptor as a service
footballApp.factory('jsonpHtmlHttpInterceptor',
	function($q) {
		return {
			// optional method
			response: function(response) {
				alert("respnse");
				// do something on success
				return response || $q.when(response);
			},
	 
			// optional method
			responseError: function(rejection) {
				alert("responseError");
				// do something on error
//				if (canRecover(rejection)) {
//					return responseOrNewPromise;
//				}
				return $q.reject(rejection);
			}
		};
	}
);
	 
/**
 * Configuring server side error handling with custom http interceptor.
 */
footballApp.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('jsonpHtmlHttpInterceptor');
}]);


