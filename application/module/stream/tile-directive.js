application.directive('tlsTile', ['GridService', 'configuration', '$timeout', function (GridService, configuration, $timeout) {
  return {
    restrict :'E' ,
    scope: {
      tile: "=",
      index: "="
    },
    templateUrl :'./module/stream/tile-directive.html', 
    link: function(scope, element, attrs) {
      $(element).hide();
      updateTileSize = function() {
        $(element).children('.tile-wrapper').css('width', GridService.currentTileSize * scope.tile.aWidth);
        $(element).children('.tile-wrapper').css('height', GridService.currentTileSize * scope.tile.aHeight);
        $(element).children('.tile-wrapper').css('line-height', GridService.currentTileSize * scope.tile.aHeight + 'px');
        $(element).children('.tile-wrapper').css('left', scope.tile.aX + 'px');
        $(element).children('.tile-wrapper').css('top', scope.tile.aY + 'px');
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
