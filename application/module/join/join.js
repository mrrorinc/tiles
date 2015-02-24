'use strict';
var join = angular.module('join', []).config(['$stateProvider',
  function($stateProvider) {

    $stateProvider.state('join', {
      url: '/join',
      views: {
        'panel': {
          templateUrl: './module/join/join.html',
          controller: 'joinController',
          controllerAs: 'joinController'
        }
      }
    })
  }
]);
