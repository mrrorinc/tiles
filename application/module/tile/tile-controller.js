tile.controller('tileController', [
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
    tileControllerScope = this;

    this.loadStreamInfo = function() {
      APIService.get("/stream-info", $rootScope.currentTile.streamID).then(function(data) {
        $rootScope.tileStreamInfo = data.data;
      }, function(error) {
        alert("ERROR " + error);
      });
    }

    this.checkForTile = function() {
      if (!$rootScope.currentTile._id) {
        APIService.get("/tile", $stateParams.tileID).then(function(data) {
          $rootScope.currentTile = data.data;
          tileControllerScope.loadStreamInfo();
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
