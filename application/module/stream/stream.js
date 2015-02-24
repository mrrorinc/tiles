'use strict';
var stream = angular.module('stream', []).config(['$stateProvider',
  function($stateProvider) {

    $stateProvider.state('home', {
      url: '/',
      views: {
        'panel': {
          templateUrl: './module/stream/stream.html',
          controller: 'streamController',
          controllerAs: 'streamController'
        }
      }
    });

    $stateProvider.state('selfStream', {
      url: '/self',
      views: {
        'panel': {
          templateUrl: './module/stream/stream.html',
          controller: 'streamController',
          controllerAs: 'streamController'
        }
      }
    });

    $stateProvider.state('memberStream', {
      url: '/s/:username',
      views: {
        'panel': {
          templateUrl: './module/stream/stream.html',
          controller: 'streamController',
          controllerAs: 'streamController'
        }
      }
    });

  }
]);
