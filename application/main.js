'use strict';

/**
 * Entry point of application
 * @module app
 *
 */
var application = angular.module('application' , [
  'ui.router',
  'restangular',
  'ngSanitize',
  'ngAnimate',
  'mgcrea.ngStrap',
  'stream',
  'login',
  'logout',
  'join',
  'postNew',
  'admin'
]);

application.config(function (
  $stateProvider,
  $urlRouterProvider,
  $httpProvider,
  configuration
) {
  $urlRouterProvider.otherwise('/');
  
  if (configuration.loadMockData) {
    configuration.baseURL = configuration.mockURL;
  } else {
    configuration.baseURL = configuration.apiURL;
  }
});

application.run(function(
  configuration,
  GridService,
  StreamService,
  APIService,
  $rootScope,
  $window,
  $timeout,
  $state
) {
  $rootScope.windowWidth = $window.innerWidth;
  angular.element($window).bind('resize',function(){
    $rootScope.windowWidth = $window.innerWidth;
    $rootScope.$apply('windowWidth');
    if ($rootScope.resizeTimeout)
    {
      $timeout.cancel($rootScope.resizeTimeout);
    }
    $rootScope.resizeTimeout = $timeout(function() {
      GridService.calculateGrid();
      StreamService.renderStream();
    }, configuration.WINDOW_RESIZE_DELAY);
  });
  
  APIService.get("/user/session").then(function(data) {
    $rootScope.currentUser = data.data;
  }, function(error) {
      alert("ERROR " + error);
    })
});
