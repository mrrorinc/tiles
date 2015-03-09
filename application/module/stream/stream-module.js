'use strict';
angular.module('stream', []).config(['$stateProvider',
  function($stateProvider) {

    $stateProvider.state('home', {
      url: '/',
      views: {
        'panel': {
          templateUrl: 'module/stream/stream.html'
        }
      }
    });

    $stateProvider.state('selfStream', {
      url: '/self',
      views: {
        'panel': {
          templateUrl: 'module/stream/stream.html'
        }
      }
    });

    $stateProvider.state('memberStream', {
      url: '/s/:username',
      views: {
        'panel': {
          templateUrl: 'module/stream/stream.html'
        }
      }
    });

  }
]);
