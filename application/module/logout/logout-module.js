'use strict';
angular.module('logout', []).config(['$stateProvider',
  function($stateProvider) {

    $stateProvider.state('logout', {
      url: '/logout',
      views: {
        'panel': {
          templateUrl: 'module/logout/logout.html',
          controller: 'logoutController',
          controllerAs: 'logoutController'
        }
      }
    })
  }
]);
