'use strict';
/**
 * @module stream
 * */
var tile = angular.module('tile', []).config(['$stateProvider', function($stateProvider) {

  /** Routes configuration */
  $stateProvider.state('viewTile', {
    url :'/tile/:tileID' ,
    views: {
      'panel': {
        templateUrl: './module/tile/tile.html',
        controller: 'tileController',
        controllerAs: 'tileController'
      }
    }
  })
}]);