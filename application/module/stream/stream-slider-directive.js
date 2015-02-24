application.directive('tlsStreamSlider', [
  'GridService',
  'StreamService',
  '$timeout',
  'configuration',
  '$window',
  '$rootScope',
  function (
    GridService,
    StreamService,
    $timeout,
    configuration,
    $window,
    $rootScope
  ) {
  return {
    restrict :'E' ,
    scope: {
      stream: '=',
      tilesize: '='
    },
    templateUrl :'./module/stream/stream-slider-directive.html' ,
    link: function(scope, element, attrs) {
      scope.$watch(function () {
        return scope.tilesize;
      },
      function (newValue) {
        if (typeof newValue !== 'undefined') {
          updateStreamContainer();
        }
      });
      scope.$watch(function () {
        return scope.stream.length;
      },
      function (newValue) {
        if (newValue < 2)
        {
          $window.scrollTo(0, 0);
        }
      });
      
      updateStreamContainer = function() {
        $('.stream-container').css('width', GridService.currentTileSize * GridService.currentColumnsSuggested + 1);
        $('.stream-container').css('left', GridService.currentMargin);
        $window.scrollTo(0, 0); 
      }
      
      scope.adjustPadding = function() {
        $('tls-stream-slider').css('paddingTop', Math.floor(($window.innerHeight / 100) * 12) + 'px');
      }
      
      element.ready(function() {
        angular.element($window).bind('resize', scope.adjustPadding);
        scope.adjustPadding();
      });
    },
    controller :function ($scope) {
    }
  }
}]);
