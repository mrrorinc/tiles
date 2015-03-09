'use strict';
angular.module('application')
.directive('tlsStreamSlider', [
  'GridService',
  'StreamService',
  'APIService',
  '$timeout',
  'configuration',
  '$window',
  '$state',
  '$rootScope',
  function (
    GridService,
    StreamService,
    APIService,
    $timeout,
    configuration,
    $window,
    $state,
    $rootScope
  ) {
  return {
    restrict :'E' ,
    scope: {
      stream: '=',
      tilesize: '='
    },
    templateUrl :'module/stream/stream-slider-directive.html' ,
    link: function(scope, element, attrs) {
      scope.updateStreamContainer = function() {
        $('.stream-container').css('width', GridService.currentTileSize * GridService.currentColumnsSuggested + 1);
        $('.stream-container').css('left', GridService.currentMargin);
        $window.scrollTo(0, 0); 
      }
      
      scope.adjustPadding = function() {
        $('tls-stream-slider').css('paddingTop', Math.floor(($window.innerHeight / 100) * 12) + 'px');
      }
      
      
      scope.$watch(function () {
        return GridService.currentMargin;
      },
      function (newValue) {
        if (typeof newValue !== 'undefined') {
          scope.updateStreamContainer();
        }
      });
      scope.$watch(function () {
        return GridService.currentTileSize;
      },
      function (newValue) {
        if (typeof newValue !== 'undefined') {
          scope.updateStreamContainer();
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
      
      angular.element($window).bind('resize',function(){
        if (scope.resizeTimeout)
        {
          $timeout.cancel(scope.resizeTimeout);
        }
        scope.resizeTimeout = $timeout(function() {
          scope.adjustPadding();
          scope.updateStreamContainer();
          GridService.calculateGrid();
          StreamService.renderStream();
        }, configuration.WINDOW_RESIZE_DELAY);
      });
      
      element.ready(function() {
        scope.adjustPadding();
      });
    },
    controller :function ($scope) {
    }
  }
}]);
