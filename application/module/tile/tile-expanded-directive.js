application.directive('tlsTileExpanded', [
  'GridService',
  'configuration',
  '$rootScope',
  '$state',
  '$window',
  '$timeout',
  function (
    GridService,
    configuration,
    $rootScope,
    $state,
    $window,
    $timeout
  ) {
  return {
    restrict :'E' ,
    scope: {
      previousstate: "=",
      previousstateparams: "=",
      tile: "=",
      streaminfo: "=",
      index: "="
    },
    templateUrl :'./module/tile/tile-expanded-directive.html', 
    link: function(scope, element, attrs) {
      scope.hoverover = false; 
      scope.down = false; 
      scope.linkHover = false; 
      scope.linkActive = false; 
      
      scope.$watch(function () {
        return scope.tile;
      },
      function (newValue) {
      });
      
      scope.mouseover = function() {
        scope.hoverover = true;
        if (scope.tile.linkURL)
        {
          scope.linkHover = true; 
        }
      }

      scope.mouseout = function() {
        scope.hoverover = false;
        if (scope.tile.linkURL)
        {
          scope.linkHover = false; 
        }
      }
      
      scope.mousedown = function() {
        scope.down = true;
        if (scope.tile.linkURL)
        {
          scope.linkActive = true; 
        }
      }

      scope.mouseup = function() {
        scope.down = false;
        if (scope.tile.linkURL)
        {
          scope.linkActive = false; 
        }
      }
      
      
      scope.click = function() {
        if (scope.tile.linkURL)
        {
          $window.open(scope.tile.linkURL);
        } else {
          scope.clickClose();
        }
      }
      
      scope.clickClose = function() {
        if (scope.previousstate)
        {
          $state.go(scope.previousstate, scope.previousstateparams);
        } else {
          $state.go('home');
        }
      }
      
      scope.clickLink = function() {
        $window.open(scope.tile.linkURL);
      }
      
      scope.clickStream = function() {
        $state.go(
          "memberStream",
          {
            username: scope.streaminfo.streamName
          }
        );
      };
      
      scope.loaded = function() {
        scope.loadedTimeout = $timeout(function() {
          $(element).children('.tile-wrapper-expanded').children('.tile-image-loader-expanded').fadeIn(320);
        }, configuration.RENDER_FORCE_DELAY);
      };
      $(element).hide();
      updateTileSize = function() {
      }
      element.ready(function() {
        scope.resizeTimeout = $timeout(function() {
          updateTileSize();
          $(element).fadeIn(360);
          $(element).children('.tile-wrapper-expanded').css('opacity', 0);
          if (!configuration.mobileScreen)
          {
            $(element).children('.tile-wrapper-expanded').css('marginLeft', GridService.currentTileSize * 2);
            $(element).children('.tile-wrapper-expanded').animate({ 'marginLeft': '0px', 'opacity': 1 }, 360, "easeOutCubic");
          } else {
            $(element).children('.tile-wrapper-expanded').animate({'opacity': 1 }, 360, "easeOutCubic");
          }
        }, configuration.RENDER_FORCE_DELAY);
      });
    }
    // controller :function ($scope) {}
  }
}]);
