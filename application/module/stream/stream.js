'use strict';
/**
 * @module stream
 * */
var stream = angular.module('stream', []).config(['$stateProvider', function($stateProvider) {

  /** Routes configuration */
  $stateProvider.state('stream', {
    url :'/' ,
    resolve: {
      currentStream: function (StreamService) {
        return StreamService.getStream();
      }
    },
    views: {
      'main': {
        templateUrl: './module/stream/stream.html',
        controller: 'streamController',
        controllerAs: 'streamController'
      }
    }
  })
}]);