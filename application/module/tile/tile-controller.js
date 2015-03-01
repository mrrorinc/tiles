'use strict';
angular.module('tile')
.controller('tileController', [
  'APIService',
  '$state',
  '$stateParams',
  '$rootScope',
  function(
    APIService,
    $state,
    $stateParams,
    $rootScope
  ) {
    this.loadStreamInfo = function() {
      APIService.get("/stream-info", $rootScope.currentTile.streamID).then(function(data) {
        $rootScope.tileStreamInfo = data.data;
      }, function(error) {
        alert("ERROR " + error);
      });
    }

    this.checkForTile = function() {
      if (!$rootScope.currentTile._id) {
        APIService.callbackScope['tileController'] = this;
        APIService.get("/tile", $stateParams.tileID).then(function(data) {
          $rootScope.currentTile = data.data;
          APIService.callbackScope['tileController'].loadStreamInfo();
        }, function(error) {
          alert("ERROR " + error);
        });
      } else {
        this.loadStreamInfo();
      }
    }

    this.checkForTile();
  }
]);
