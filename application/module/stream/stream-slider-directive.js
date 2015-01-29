application.directive('tlsStreamSlider', ['GridService', 'StreamService', '$timeout', 'configuration', '$rootScope', function (GridService, StreamService, $timeout, configuration, $rootScope) {
  return {
    restrict :'E' ,
    scope: {
    },
    templateUrl :'./module/stream/stream-slider-directive.html' ,
    link: function(scope, element, attrs) {
      scope.stream = StreamService.getStream();
      scope.$watch(function () {
        return GridService.getTileSize();
      },
      function (newValue) {
        if (typeof newValue !== 'undefined') {
          updateStreamContainer();
        }
      });
      
      updateStreamContainer = function() {
        $('.stream-container').css('width', GridService.currentTileSize * GridService.currentColumnsSuggested + 1);
        $('.stream-container').css('left', GridService.currentMargin);
      }
      
      element.ready(function() {
        scope.resizeTimeout = $timeout(function() {
          updateStreamContainer();
        }, configuration.RENDER_FORCE_DELAY);
      });
    },
    controller :function ($scope) {
    }
  }
}]);
