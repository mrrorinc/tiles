'use strict';
angular.module('application')
.service('GridService', ['configuration', '$window', '$log',
  function(configuration, $window, $log) {

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
      var defaultSize = configuration.DEFAULT_TILE_SIZE;
      if ($window.innerWidth < 990) {
        defaultSize = defaultSize * 2;
        configuration.mobileScreen = true;
      } else {
        configuration.mobileScreen = false;
      }
      this.currentWidth = $window.innerWidth;
      this.currentColumnsSuggestedRaw = this.currentWidth / defaultSize;
      this.currentColumnsSuggestedHigh = Math.ceil(this.currentColumnsSuggestedRaw);
      this.currentColumnsSuggestedLow = Math.floor(this.currentColumnsSuggestedRaw);

      if ((this.currentColumnsSuggestedHigh - this.currentColumnsSuggestedRaw) > (this.currentColumnsSuggestedRaw - this.currentColumnsSuggestedLow)) {
        this.currentColumnsSuggested = this.currentColumnsSuggestedLow;
      } else {
        this.currentColumnsSuggested = this.currentColumnsSuggestedHigh;
      }

      this.currentTileSize = Math.ceil(this.currentWidth / this.currentColumnsSuggested);
      this.currentOffset = (this.currentTileSize * this.currentColumnsSuggested) - this.currentWidth;
      this.currentMargin = -Math.floor(this.currentOffset / 2);

      this.renderGuides();
    };

    this.getGuides = function() {
      if (!this.guides) {
        this.calculateGrid();
      }
      return this.guides;
    }

    this.getTileSize = function() {
      return this.currentTileSize;
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
  }
]);
