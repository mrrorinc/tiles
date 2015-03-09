'use strict';
angular.module('admin', []).config(['$stateProvider', function($stateProvider) {

  $stateProvider.state('admin', {
    url :'/admin' ,
    views: {
      'panel': {
        templateUrl: 'module/admin/admin.html',
        controller: 'adminController',
        controllerAs: 'adminController'
      }
    }
  })
}]);