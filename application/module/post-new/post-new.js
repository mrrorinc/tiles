'use strict';
var postNew = angular.module('postNew', []).config(['$stateProvider',
  function($stateProvider) {

    $stateProvider.state('postNew', {
      url: '/post-new',
      views: {
        'panel': {
          templateUrl: './module/post-new/post-new.html',
          controller: 'postNewController',
          controllerAs: 'postNewController'
        }
      }
    })
  }
]);
