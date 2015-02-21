'use strict';
/**
 * @module stream
 * */
var postNew = angular.module('postNew', []).config(['$stateProvider', function($stateProvider) {

  /** Routes configuration */
  $stateProvider.state('postNew', {
    url :'/post-new' ,
    views: {
      'panel': {
        templateUrl: './module/post-new/post-new.html',
        controller: 'postNewController',
        controllerAs: 'postNewController'
      }
    }
  })
}]);