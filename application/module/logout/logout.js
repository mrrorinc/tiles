'use strict';
/**
 * @module stream
 * */
var logout = angular.module('logout', []).config(['$stateProvider', function($stateProvider) {

  /** Routes configuration */
  $stateProvider.state('logout', {
    url :'/logout' ,
    views: {
      'panel': {
        templateUrl: './module/logout/logout.html',
        controller: 'logoutController',
        controllerAs: 'logoutController'
      }
    }
  })
}]);