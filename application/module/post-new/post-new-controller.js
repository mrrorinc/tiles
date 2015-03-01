'use strict';
angular.module('postNew')
.controller('postNewController', [
  'APIService',
  'GridService',
  'StreamService',
  '$state',
  '$rootScope',
  function(
    APIService,
    GridService,
    StreamService,
    $state,
    $rootScope
  ) {
    this.updateStream = function(updatedTile) {
      StreamService.currentStream = [updatedTile];
      StreamService.remainingStream = StreamService.currentStream;
      StreamService.renderStream();
    }
    
    this.submit = function() {
      var tileToSend = angular.copy(this.streamRendered[0]);
      tileToSend.background = tileToSend.background ? tileToSend.background : "#444444";
      tileToSend.color = tileToSend.color ? tileToSend.color : "#cccccc";
      tileToSend.pWidth = tileToSend.pWidth ? tileToSend.pWidth : 2;
      tileToSend.pHeight = tileToSend.pHeight ? tileToSend.pHeight : 2;
      APIService.post("/tile", tileToSend).then(function(data) {
        if (data.data.success) {
          $state.go('selfStream');
        } else {
          $rootScope.notification = {
            caption: "ERROR: " + data.data.error,
            confirm: true
          };
        }
      }, function(error) {
        $rootScope.notification = {
          caption: "POST ERROR.",
          confirm: true
        };
      });
    }

    StreamService.clearStream();
    this.streamRendered = StreamService.streamRendered;
    $rootScope.streamRendered = StreamService.streamRendered;
    $rootScope.tilesize = GridService.getTileSize();
    this.newTile = {
      pWidth: 1,
      pHeight: 1,
      background: '#444444',
      color: '#cccccc'
    };
    this.updateStream(this.newTile);
  }
]);
