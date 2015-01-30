'use strict';
application.service('StreamService', ['configuration', 'MockAPIService', 'GridService', '$interval', function (configuration, MockAPIService, GridService, $interval) {
  this.renderInterval = null;
  this.positionGrid = [];
  this.positionX = 0;
  this.positionY = 0;
  this.currentStream = MockAPIService.generateMockContentStream();
  this.remainingStream = angular.copy(this.currentStream);
  this.streamRendered = [];
  this.shuffleBuffer = [];
  var _this = this;
  
  this.getStream = function() {
    return this.streamRendered;
  }
  
  this.pickStream = function() {
    while ((this.shuffleBuffer.length < configuration.SHUFFLE_BUFFER_LENGTH) && this.remainingStream.length) {
      this.shuffleBuffer.push(this.remainingStream.pop());
      this.shuffleBuffer = _.shuffle(this.shuffleBuffer);
    }
    var tilePicked = this.sizeAndPosition(this.shuffleBuffer.pop());
    return tilePicked;
  }
  
  this.rowExists = function(rowNumber) {
    return angular.isDefined(this.positionGrid[rowNumber]);
  }
  
  this.createRow = function() {
    var newRow = [];
    for (var i = 1; i < GridService.currentColumnsSuggested; i++) {
      newRow.push(false);
    }
    this.positionGrid.push(newRow);
  }
  
  this.renderStream = function() {
    if (angular.isDefined(this.renderInterval)) {
      $interval.cancel(this.renderInterval);
    }
    this.positionGrid = [];
    this.positionX = 0;
    this.positionY = 0;
    this.remainingStream = angular.copy(this.currentStream);
    this.renderInterval = $interval(function() {
      _this.streamRendered.push(_this.pickStream());
      if (!_this.remainingStream.length)
      {
        $interval.cancel(_this.renderInterval);
        _this.renderInterval = undefined;
      }
    }, configuration.RENDER_UPDATE_DURATION);
  }
  
  this.sizeAndPosition = function(tileToSizeAndPosition) {
    if ((this.positionX == 0) && (this.positionY == 0))
    {
      while (this.streamRendered.length) {
        this.streamRendered.pop();
      }
    }
    if (!this.rowExists(this.positionY)) {
      this.createRow();
      return this.sizeAndPosition(tileToSizeAndPosition);
    } else {
      if (this.positionGrid[this.positionY][this.positionX])
      {
        this.positionX ++;
        if (this.positionX >= GridService.currentColumnsSuggested)
        {
          this.positionX = 0;
          this.positionY++;
        }
        return this.sizeAndPosition(tileToSizeAndPosition);
      } else {
        var span = GridService.currentColumnsSuggested - this.positionX;
        for (var x = this.positionX; x < GridService.currentColumnsSuggested; x++) {
          if (this.positionGrid[this.positionY][x]) {
            span = x - this.positionX;
            break;
          }
        }
        if (span >= tileToSizeAndPosition.pWidth)
        {
          //fits
          tileToSizeAndPosition.aWidth = tileToSizeAndPosition.pWidth;
          tileToSizeAndPosition.aHeight = tileToSizeAndPosition.pHeight;
        } else {
          //force shrink
          tileToSizeAndPosition.aWidth = span;
          tileToSizeAndPosition.aHeight = Math.max(Math.round((tileToSizeAndPosition.pHeight / tileToSizeAndPosition.pWidth) * span), 1);
        }
        tileToSizeAndPosition.aX = this.positionX;
        tileToSizeAndPosition.aY = this.positionY;
      
        for (var w = 0; w < tileToSizeAndPosition.aWidth; w++)
        {
          for (var h = 0; h < tileToSizeAndPosition.aHeight; h++)
          {
            if (!this.rowExists(this.positionY + h)) {
              this.createRow();
            }
            this.positionGrid[this.positionY + h][this.positionX + w] = true;
          }
        }
    
        this.positionX += tileToSizeAndPosition.aWidth;
        if (this.positionX >= GridService.currentColumnsSuggested)
        {
          this.positionX = 0;
          this.positionY++;
        }
        return tileToSizeAndPosition;
      }
    }
  }
}]);
