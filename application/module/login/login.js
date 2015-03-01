'use strict';
angular.module('login', []).config(['$stateProvider',
  function($stateProvider) {

    $stateProvider.state('login', {
      url: '/login',
      views: {
        'panel': {
          templateUrl: './module/login/login.html',
          controller: 'loginController',
          controllerAs: 'loginController'
        }
      }
    })
  }
]);
