'use strict';
application.service('StreamService', ['configuration', 'MockAPIService', '$interval', function (configuration, MockAPIService, $interval) {
  this.currentStream = MockAPIService.generateMockStream();
  this.remainingStream = angular.copy(this.currentStream);
  this.streamRendered = [];
  this.renderInterval = null;
  var _this = this;
  
  this.getStream = function() {
    return this.streamRendered;
  }
  
  this.pickStream = function() {
    var tilePicked = this.remainingStream.pop();
    tilePicked.aWidth = tilePicked.pWidth;
    tilePicked.aHeight = tilePicked.pHeight;
    tilePicked.aX = Math.floor(Math.random() * 800);
    tilePicked.aY = Math.floor(Math.random() * 800);

    // this.sizeAndPosition(tilePicked);
    return tilePicked;
  }
  
  this.sizeAndPosition = function(tileToSizeAndPosition) {
  }
  
  this.renderInterval = $interval(function() {
    _this.streamRendered.push(_this.pickStream());
    if (!_this.remainingStream.length)
    {
      $interval.cancel(_this.renderInterval);
      _this.renderInterval = undefined;
    }
  }, configuration.RENDER_UPDATE_DURATION);
}]);
