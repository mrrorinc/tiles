'use strict';
angular.module('application')
.directive('tlsGridGuides', [
  'GridService',
  'configuration',
  '$timeout',
  function (
    GridService,
    configuration,
    $timeout
  ) {
  return {
    restrict :'E' ,
    scope: {
    },
    templateUrl :'./components/grid-guides/grid-guides-directive.html',
    link: function (scope, element, attrs) {
      scope.guidesShown = false;
      scope.guideColor = '#00ff00';
      scope.toggleGuides = function() {
        scope.guidesShown = !scope.guidesShown;
        if (scope.guidesShown)
        {
          scope.guides = GridService.getGuides();
        }
      };
      scope.toggleColor = function() {
        if (scope.guideColor == '#00ff00')
        {
          scope.guideColor = '#ffff00';
        } else {
          scope.guideColor = '#00ff00'
        }
        $('.grid-guide').css('borderColor', scope.guideColor);
      }
      scope.adjustGuides = function() {
        $('.grid-guide.horizontal').css('height', GridService.currentTileSize);
        $('.grid-guide.vertical').css('width', GridService.currentTileSize);
        $('.grid-guides-container').css('left', GridService.currentMargin);
      }            
      scope.handleKeyPress = function(keyCode) {
        if (keyCode == 71)
        {
          scope.toggleGuides();
        }
        if (keyCode == 67)
        {
          scope.toggleColor();
        }
      }
      
      scope.$watch(function () {
        return GridService.currentTileSize;
      },
      function (newValue) {
        if (typeof newValue !== 'undefined') {
          scope.adjustGuides();
        }
      });
      
      scope.guides = GridService.getGuides();
      scope.adjustTimeout = $timeout(scope.adjustGuides, configuration.RENDER_UPDATE_DURATION);      
     },
    controller :function ($scope, GridService, $timeout, configuration) {
    }
  }
}]);
