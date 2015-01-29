application.directive('tlsGridGuides', ['GridService', function (GridService) {
  return {
    restrict :'E' ,
    scope: {
    },
    templateUrl :'./components/grid-guides/grid-guides-directive.html',
    link: function (scope, element, attrs) {
      scope.$watch(function () {
        return GridService.getGuides();
      },
      function (newValue) {
        if (typeof newValue !== 'undefined') {
          $('.grid-guide.horizontal').css('height', GridService.currentTileSize);
          $('.grid-guide.vertical').css('width', GridService.currentTileSize);
          $('.grid-guides-container').css('left', GridService.currentMargin);
        }
      });
      _scope = scope;
      scope.$on('keypress:71', function(onEvent, keypressEvent) {
        scope.$apply(function (){
          scope.guidesShown = !scope.guidesShown;
        })
      });
                            
      scope.guides = GridService.guides;
      scope.guidesShown = false;
     },
    controller :function ($scope, GridService, $timeout, configuration) {
      GridService.calculateGrid();
      $scope.resizeTimeout = $timeout(function() {
        GridService.calculateGrid();
      }, configuration.WINDOW_INITIAL_DELAY);
    }
  }
}]);
