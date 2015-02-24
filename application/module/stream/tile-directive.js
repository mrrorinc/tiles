application.directive('tlsTile', [
  'GridService',
  'configuration',
  '$rootScope',
  '$state',
  '$stateParams',
  '$timeout',
  function (
    GridService,
    configuration,
    $rootScope,
    $state,
    $stateParams,
    $timeout
  ) {
  return {
    restrict :'E' ,
    scope: {
      tile: "=",
      index: "="
    },
    templateUrl :'./module/stream/tile-directive.html', 
    link: function(scope, element, attrs) {
      scope.mouseover = function() {
        $(element).children('.tile-wrapper').children('.tile-slider').stop( true, true );
        $(element).children('.tile-wrapper').children('.tile-slider').animate({ 'marginTop': '-16px'  }, 240, "easeOutCubic");
        $(element).children('.tile-wrapper').children('.tile-indicator').stop( true, true );
        $(element).children('.tile-wrapper').children('.tile-indicator').animate({ 'left': '0'  }, 360, "easeOutCubic");
      }
      scope.mouseout = function() {
        $(element).children('.tile-wrapper').children('.tile-slider').stop( true, true );
        $(element).children('.tile-wrapper').children('.tile-slider').animate({ 'marginTop': '0px'  }, 360, "easeOutCubic");
        $(element).children('.tile-wrapper').children('.tile-indicator').stop( true, true );
        $(element).children('.tile-wrapper').children('.tile-indicator').animate({ 'left': '100%'  }, 240, "easeOutCubic");
      }
      scope.click = function() {
        $rootScope.currentTile = scope.tile;
        if ($state.current.name != "viewTile")
        {
          $rootScope.previousState = $state.current.name;
          $rootScope.previousStateParams = angular.copy($stateParams);
          $state.go('viewTile', { tileID: scope.tile._id });
        }
      }

      scope.loaded = function() {
        scope.loadedTimeout = $timeout(function() {
          var imageWidth = $(element).children('.tile-wrapper').children('.tile-slider').children('.tile-image-loader').width();
          var imageHeight = $(element).children('.tile-wrapper').children('.tile-slider').children('.tile-image-loader').height();
          var tileWidth = $(element).children('.tile-wrapper').children('.tile-slider').width();
          var tileHeight = $(element).children('.tile-wrapper').children('.tile-slider').height();
        
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
          $(element).children('.tile-wrapper').children('.tile-slider').children('.tile-image-loader').css('width', + targetWidth + 'px');
          $(element).children('.tile-wrapper').children('.tile-slider').children('.tile-image-loader').css('height', + targetHeight + 'px');
          $(element).children('.tile-wrapper').children('.tile-slider').children('.tile-image-loader').css('left', + offsetX + 'px');
          $(element).children('.tile-wrapper').children('.tile-slider').children('.tile-image-loader').css('top', + offsetY + 'px');
          $(element).children('.tile-wrapper').children('.tile-slider').children('.tile-image-loader').fadeIn(320);
        }, configuration.RENDER_FORCE_DELAY);
      };
      $(element).hide();
      updateTileSize = function() {
        $(element).children('.tile-wrapper').css('left', GridService.currentTileSize * scope.tile.aX + 'px');
        $(element).children('.tile-wrapper').css('top', GridService.currentTileSize * scope.tile.aY + 'px');
        $(element).children('.tile-wrapper').css('width', GridService.currentTileSize * scope.tile.aWidth);
        $(element).children('.tile-wrapper').css('height', GridService.currentTileSize * scope.tile.aHeight);
        $(element).children('.tile-wrapper').children('.tile-slider').css('line-height', Math.floor((GridService.currentTileSize * Math.min(scope.tile.aWidth, scope.tile.aHeight)) / 8) + 'px');
        $(element).children('.tile-wrapper').children('.tile-slider').css('font-size', Math.floor((GridService.currentTileSize * Math.min(scope.tile.aWidth, scope.tile.aHeight)) / 10) + 'px');
        $(element).children('.tile-wrapper').children('.tile-slider').children('.tile-text').css('bottom', Math.floor(GridService.currentTileSize / 8) + 'px');
        $(element).children('.tile-wrapper').children('.tile-slider').children('.tile-text').css('padding', Math.floor(GridService.currentTileSize / 8) + 'px');
      }
      element.ready(function() {
        scope.resizeTimeout = $timeout(function() {
          updateTileSize();
          $(element).fadeIn(360);
          $(element).children('.tile-wrapper').children('.tile-slider').css('opacity', 0);
          if (!configuration.mobileScreen)
          {
            $(element).children('.tile-wrapper').children('.tile-slider').css('marginTop', GridService.currentTileSize * 2);
            $(element).children('.tile-wrapper').children('.tile-slider').animate({ 'marginTop': '0px', 'opacity': 1 }, 360, "easeOutCubic");
          } else {
            $(element).children('.tile-wrapper').children('.tile-slider').animate({'opacity': 1 }, 360, "easeOutCubic");
          }
        }, configuration.RENDER_FORCE_DELAY);
      });
    }
    // controller :function ($scope) {}
  }
}]);
