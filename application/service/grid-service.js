'use strict';

application.service('GridService', ['configuration', '$window', '$log', function (configuration, $window, $log) {

  /**
\   */
  
  this.currentWidth = null;
  this.currentColumnsSuggested = null;
  this.currentColumnsSuggestedRaw = null;
  this.currentColumnsSuggestedHigh = null;
  this.currentColumnsSuggestedLow = null;
  this.currentTileSize = null;
  this.currentOffset = null;
  this.currentMargin = null;
  this.guides = null;

  this.calculateGrid = function() {
    this.currentWidth = $window.innerWidth;
    this.currentColumnsSuggestedRaw = this.currentWidth / configuration.DEFAULT_TILE_SIZE;
    this.currentColumnsSuggestedHigh = Math.ceil(this.currentColumnsSuggestedRaw);
    this.currentColumnsSuggestedLow = Math.floor(this.currentColumnsSuggestedRaw);
    
    if ((this.currentColumnsSuggestedHigh - this.currentColumnsSuggestedRaw) > (this.currentColumnsSuggestedRaw - this.currentColumnsSuggestedLow))
    {
      this.currentColumnsSuggested = this.currentColumnsSuggestedLow;
    } else {
      this.currentColumnsSuggested = this.currentColumnsSuggestedHigh;
    }
    
    this.currentTileSize = Math.ceil(this.currentWidth / this.currentColumnsSuggested);
    this.currentOffset =  (this.currentTileSize * this.currentColumnsSuggested) - this.currentWidth;
    this.currentMargin = - Math.floor(this.currentOffset / 2);
    
    $log.log("this.currentColumnsSuggested " + this.currentColumnsSuggested);
    $log.log("this.currentTileSize " + this.currentTileSize);
    $log.log("this.currentOffset " + this.currentOffset);
    
    this.renderGuides();
  };
  
  this.getGuides = function() {
    return this.guides;
  }
  
  this.renderGuides = function() {
    this.guides = {
      horizontalGuides: this.generateGuides('horizontal'),
      verticalGuides: this.generateGuides('vertical')
    };
  }
  
  this.generateGuides = function(guideOrientation) {
    var guidesGenerated = [];
    for (var i = 0; i < this.currentColumnsSuggested - 1; i++) {
      guidesGenerated.push({
        orientation: guideOrientation 
      });
    }
    return guidesGenerated;
  }

}]);
