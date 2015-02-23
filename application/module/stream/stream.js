'use strict';
/**
 * @module stream
 * */
var stream = angular.module('stream', []).config(['$stateProvider', function($stateProvider) {

  /** Routes configuration */
  $stateProvider.state('home', {
    url :'/' ,
    // resolve: {
    //   currentStream: function (StreamService) {
    //     return StreamService.getStream();
    //   }
    // },
    views: {
      'panel': {
        templateUrl: './module/stream/stream.html',
        controller: 'streamController',
        controllerAs: 'streamController'
      }
    }
  });
  
  $stateProvider.state('selfStream', {
    url :'/self' ,
    // resolve: {
    //   currentStream: function (StreamService) {
    //     return StreamService.getStream();
    //   }
    // },
    views: {
      'panel': {
        templateUrl: './module/stream/stream.html',
        controller: 'streamController',
        controllerAs: 'streamController'
      }
    }
  });

  $stateProvider.state('memberStream', {
    url :'/s/:username' ,
    // resolve: {
    //   currentStream: function (StreamService) {
    //     return StreamService.getStream();
    //   }
    // },
    views: {
      'panel': {
        templateUrl: './module/stream/stream.html',
        controller: 'streamController',
        controllerAs: 'streamController'
      }
    }
  });
  
}]);