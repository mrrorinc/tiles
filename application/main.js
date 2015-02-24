'use strict';

/**
 * Entry point of application
 * @module application
 *
 */
var application = angular.module('application' , [
  'ui.router',
  'restangular',
  'ngSanitize',
  'ngAnimate',
  'mgcrea.ngStrap',
  'stream',
  'tile',
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
    if (configuration.loadLocalData) {
      configuration.baseURL = configuration.localApiURL;
    } else {
      configuration.baseURL = configuration.apiURL;
    }
  }
});