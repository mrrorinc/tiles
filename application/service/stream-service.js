'use strict';
application.service('StreamService', [
  'configuration',
  'APIService',
  'GridService',
  '$interval',
  function (
    configuration,
    APIService,
    GridService,
    $interval) {
  this.renderInterval = null;
  this.positionGrid = [];
  this.positionX = 0;
  this.positionY = 0;
  this.currentStream = [];
  this.remainingStream = [];
  this.streamRendered = [];
  this.shuffleBuffer = [];
  this.forward = 1;
  this.previousURL = "";
  
  var _this = this;
  
  this.getStream = function(streamURL) {
    if (streamURL != this.previousURL)
    {
      this.previousURL = streamURL;
      this.currentStream = [];
      this.remainingStream = [];
      this.streamRendered = [];
      return APIService.get('/stream' + streamURL).then(
        function(data) {
          var counter = 0;
          var loopLength = data.data.length;
          while (data.data.length < configuration.MOCK_STREAM_LENGTH) {
            data.data.push(angular.copy(data.data[counter]));
            counter++;
            if (counter >= loopLength)
            {
              counter = 0;
            }
          }
          return data;
        },
        function() {
          alert("couldn't load stream");
        }
      );
    } else {
      return new Promise(function() {
        return {};
      });
    }
  }
  
  this.clearStream = function() {
    this.previousURL = "";
  }
  
  this.getEditedStream = function(newTile) {
    this.currentStream = [];
    this.remainingStream = [];
    this.streamRendered = [];
    return APIService.get('/stream' + "/home").then(
      function(data) {
        var data = {
          data: [newTile]
        }
        return data;
      },
      function() {
        alert("couldn't load stream");
      }
    );
  }
  
  this.pickStream = function() {
    while ((this.shuffleBuffer.length < configuration.SHUFFLE_BUFFER_LENGTH) && this.remainingStream.length) {
      this.shuffleBuffer.push(this.remainingStream.shift());
      this.shuffleBuffer = _.shuffle(this.shuffleBuffer);
    }
    var tilePicked = this.shuffleBuffer.pop();
    if (tilePicked) {
      tilePicked = this.sizeAndPosition(tilePicked);
    }
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
    this.forward = 1;
    this.remainingStream = angular.copy(this.currentStream);
    this.renderInterval = $interval(function() {
      if (_this.remainingStream.length || _this.shuffleBuffer.length)
      {
        var tilePicked = _this.pickStream();
        if (tilePicked)
        {
          _this.streamRendered.push(tilePicked);
        }
      } else {
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
        this.positionX = this.positionX + this.forward;
        if ((this.positionX >= GridService.currentColumnsSuggested) || (this.positionX < 0))
        {
          this.positionY++;
          this.forward = - this.forward;
          this.positionX = this.positionX + this.forward;
        }
        return this.sizeAndPosition(tileToSizeAndPosition);
      } else {
        var span;
        if (this.forward > 0)
        {
          span = GridService.currentColumnsSuggested - this.positionX;
        } else {
          span = this.positionX + 1;
        }
        
        if (this.forward > 0)
        {
          for (var x = this.positionX; x < GridService.currentColumnsSuggested; x++) {
            if (this.positionGrid[this.positionY][x]) {
              span = x - this.positionX;
              break;
            }
          }
        } else {
          for (var x = this.positionX; x >= 0; x--) {
            if (this.positionGrid[this.positionY][x]) {
              span = this.positionX - x;
              break;
            }
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
        if (this.forward > 0)
        {
          tileToSizeAndPosition.aX = this.positionX;
          tileToSizeAndPosition.aY = this.positionY;
        } else {
          tileToSizeAndPosition.aX = this.positionX - tileToSizeAndPosition.aWidth + 1;
          tileToSizeAndPosition.aY = this.positionY;
        }
        
      
        for (var w = 0; w < tileToSizeAndPosition.aWidth; w++)
        {
          for (var h = 0; h < tileToSizeAndPosition.aHeight; h++)
          {
            if (!this.rowExists(this.positionY + h)) {
              this.createRow();
            }
            this.positionGrid[this.positionY + h][this.positionX + (w * this.forward)] = true;
          }
        }
    
        this.positionX = this.positionX + (tileToSizeAndPosition.aWidth * this.forward);
        if ((this.positionX >= GridService.currentColumnsSuggested) || (this.positionX < 0))
        {
          this.positionY++;
          this.forward = - this.forward;
          this.positionX = this.positionX + this.forward;
        }

        return tileToSizeAndPosition;
      }
    }
  }
}]);
