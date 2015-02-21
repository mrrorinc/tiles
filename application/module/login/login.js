'use strict';
/**
 * @module stream
 * */
var login = angular.module('login', []).config(['$stateProvider', function($stateProvider) {

  /** Routes configuration */
  $stateProvider.state('login', {
    url :'/login' ,
    views: {
      'panel': {
        templateUrl: './module/login/login.html',
        controller: 'loginController',
        controllerAs: 'loginController'
      }
    }
  })
}]);