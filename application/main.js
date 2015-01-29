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
  'stream']);

application.config(function ($stateProvider , $urlRouterProvider , RestangularProvider, configuration) {
  $urlRouterProvider.otherwise('/')
});

application.run(function(configuration, GridService, $rootScope, $window, $timeout) {
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
    }, configuration.WINDOW_RESIZE_DELAY);
  });
});
