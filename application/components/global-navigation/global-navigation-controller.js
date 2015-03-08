'use strict';
angular.module('application')
.controller('globalNavigationController' , [
  'APIService',
  'GridService',
  '$rootScope',
  function (
    APIService,
    GridService,
    $rootScope
  ) {
    APIService.get("/user/session").then(function(data) {
      $rootScope.currentUser = data.data;
    }, function(error) {
        alert("ERROR " + error);
    });        
  }
]);
