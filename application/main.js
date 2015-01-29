'use strict';

/**
 * Entry point of application
 * @module app
 *
 */
var application = angular.module('application' , ['ui.router', 'restangular', 'ngSanitize', 'ngAnimate', 'mgcrea.ngStrap']); //,'stream']

application.config(function ($stateProvider , $urlRouterProvider , RestangularProvider, configuration) {

  /** Configuration of restangular service */
  // if (config.loadMockData) {
  //   RestangularProvider.setBaseUrl(config.devURL);
  //   config.urlAddition = config.mockDataURLAddition;
  // } else {
  //   RestangularProvider.setBaseUrl(config.apiURL);
  // }

  // RestangularProvider.setResponseExtractor(function (response , operation) {
  //   if (operation === 'get') {
  //     return response;
  //   } else {
  //     return response.data;
  //   }
  // });

  /** Configuration of ui-router entry point */
    // For any unmatched url, send to TODO:set spesific page
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
