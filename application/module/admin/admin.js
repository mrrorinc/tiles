'use strict';
/**
 * @module stream
 * */
var admin = angular.module('admin', []).config(['$stateProvider', function($stateProvider) {

  /** Routes configuration */
  $stateProvider.state('admin', {
    url :'/admin' ,
    views: {
      'panel': {
        templateUrl: './module/admin/admin.html',
        controller: 'adminController',
        controllerAs: 'adminController'
      }
    }
  })
}]);