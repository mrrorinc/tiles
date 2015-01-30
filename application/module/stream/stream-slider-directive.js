application.directive('tlsStreamSlider', ['GridService', 'StreamService', '$timeout', 'configuration', '$window', function (GridService, StreamService, $timeout, configuration, $window) {
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
      scope.$watch(function () {
        return StreamService.getStream().length;
      },
      function (newValue) {
        $('tls-stream-slider').css('height', ($('body')[0].scrollHeight + $window.innerHeight) + 'px');
      });
      
      updateStreamContainer = function() {
        $('.stream-container').css('width', GridService.currentTileSize * GridService.currentColumnsSuggested + 1);
        $('.stream-container').css('left', GridService.currentMargin);
        $window.scrollTo(0, 0); 
        StreamService.renderStream();
        // console.log("render stream")
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
