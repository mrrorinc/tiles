application.directive('tlsTile', ['GridService', 'configuration', '$timeout', function (GridService, configuration, $timeout) {
  return {
    restrict :'E' ,
    scope: {
      tile: "=",
      index: "="
    },
    templateUrl :'./module/stream/tile-directive.html', 
    link: function(scope, element, attrs) {
      scope.loaded = function() {
        scope.loadedTimeout = $timeout(function() {
          var imageWidth = $(element).children('.tile-wrapper').children('.tile-image-loader').width();
          var imageHeight = $(element).children('.tile-wrapper').children('.tile-image-loader').height();
          var tileWidth = $(element).children('.tile-wrapper').width();
          var tileHeight = $(element).children('.tile-wrapper').height();
        
          var targetWidth;
          var targetHeight;
          var offsetX;
          var offsetY;
          if (((imageWidth / imageHeight) * tileHeight) > tileWidth)
          {
            targetWidth = ((imageWidth / imageHeight) * tileHeight);
            targetHeight = tileHeight;
            offsetX = Math.floor((tileWidth - targetWidth) / 2);
            offsetY = 0;
          } else {
            targetWidth = tileWidth;
            targetHeight = ((imageHeight / imageWidth) * tileWidth);
            offsetX = 0;
            offsetY = Math.floor((tileHeight - targetHeight) / 2);
          }
          $(element).children('.tile-wrapper').children('.tile-image-loader').css('width', + targetWidth + 'px');
          $(element).children('.tile-wrapper').children('.tile-image-loader').css('height', + targetHeight + 'px');
          $(element).children('.tile-wrapper').children('.tile-image-loader').css('left', + offsetX + 'px');
          $(element).children('.tile-wrapper').children('.tile-image-loader').css('top', + offsetY + 'px');
          $(element).children('.tile-wrapper').children('.tile-image-loader').fadeIn(320);
        }, configuration.RENDER_FORCE_DELAY);
      };
      $(element).hide();
      updateTileSize = function() {
        $(element).children('.tile-wrapper').css('width', GridService.currentTileSize * scope.tile.aWidth);
        $(element).children('.tile-wrapper').css('height', GridService.currentTileSize * scope.tile.aHeight);
        $(element).children('.tile-wrapper').css('line-height', Math.floor((GridService.currentTileSize * Math.min(scope.tile.aWidth, scope.tile.aHeight)) / 8) + 'px');
        $(element).children('.tile-wrapper').css('font-size', Math.floor((GridService.currentTileSize * Math.min(scope.tile.aWidth, scope.tile.aHeight)) / 10) + 'px');
        $(element).children('.tile-wrapper').children('.tile-text').css('bottom', Math.floor(GridService.currentTileSize / 8) + 'px');
        $(element).children('.tile-wrapper').css('left', GridService.currentTileSize * scope.tile.aX + 'px');
        $(element).children('.tile-wrapper').css('top', GridService.currentTileSize * scope.tile.aY + 'px');
        $(element).children('.tile-wrapper').children('.tile-text').css('padding', Math.floor(GridService.currentTileSize / 8) + 'px');
      }
      element.ready(function() {
        scope.resizeTimeout = $timeout(function() {
          updateTileSize();
          $(element).fadeIn(360);
        }, configuration.RENDER_FORCE_DELAY);
      });
    }
    // controller :function ($scope) {}
  }
}]);
