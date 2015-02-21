'use strict';
/**
 * @module stream
 * */
var join = angular.module('join', []).config(['$stateProvider', function($stateProvider) {

  /** Routes configuration */
  $stateProvider.state('join', {
    url :'/join' ,
    views: {
      'panel': {
        templateUrl: './module/join/join.html',
        controller: 'joinController',
        controllerAs: 'joinController'
      }
    }
  })
}]);