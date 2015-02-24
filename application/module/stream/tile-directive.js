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
        var tileSlider = $(element).children('.tile-wrapper').children('.tile-slider');
        var tileIndicator = $(element).children('.tile-wrapper').children('.tile-indicator');

        tileSlider.stop( true, true );
        tileSlider.animate({ 'marginTop': '-16px'  }, 240, "easeOutCubic");
        tileIndicator.stop( true, true );
        tileIndicator.animate({ 'left': '0'  }, 360, "easeOutCubic");
      }
      scope.mouseout = function() {
        var tileSlider = $(element).children('.tile-wrapper').children('.tile-slider');
        var tileIndicator = $(element).children('.tile-wrapper').children('.tile-indicator');

        tileSlider.stop( true, true );
        tileSlider.animate({ 'marginTop': '0px'  }, 360, "easeOutCubic");
        tileIndicator.stop( true, true );
        tileIndicator.animate({ 'left': '100%'  }, 240, "easeOutCubic");
      }
      scope.click = function() {
        $rootScope.currentTile = scope.tile;
        if ($state.current.name != "viewTile")
        {
          $rootScope.previousState = $state.current.name;
          $rootScope.previousStateParams = angular.copy($stateParams);
        }
        $state.go('viewTile', { tileID: scope.tile._id });
      }

      scope.loaded = function() {
        scope.loadedTimeout = $timeout(function() {
          var tileSlider = $(element).children('.tile-wrapper').children('.tile-slider');
          var tileImageLoader = $(element).children('.tile-wrapper').children('.tile-slider').children('.tile-image-loader');
          
          
          var imageWidth = tileImageLoader.width();
          var imageHeight = tileImageLoader.height();
          var tileWidth = tileSlider.width();
          var tileHeight = tileSlider.height();
        
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
          tileImageLoader.css('width', + targetWidth + 'px');
          tileImageLoader.css('height', + targetHeight + 'px');
          tileImageLoader.css('left', + offsetX + 'px');
          tileImageLoader.css('top', + offsetY + 'px');
          tileImageLoader.fadeIn(320);
        }, configuration.RENDER_FORCE_DELAY);
      };
      $(element).hide();
      scope.updateTileSize = function() {
        var tileWrapper = $(element).children('.tile-wrapper');
        var tileSlider = $(element).children('.tile-wrapper').children('.tile-slider');
        var tileText = $(element).children('.tile-wrapper').children('.tile-slider').children('.tile-text');

        tileWrapper.css('left', GridService.currentTileSize * scope.tile.aX + 'px');
        tileWrapper.css('top', GridService.currentTileSize * scope.tile.aY + 'px');
        tileWrapper.css('width', GridService.currentTileSize * scope.tile.aWidth);
        tileWrapper.css('height', GridService.currentTileSize * scope.tile.aHeight);
        tileSlider.css('line-height', Math.floor((GridService.currentTileSize * Math.min(scope.tile.aWidth, scope.tile.aHeight)) / 8) + 'px');
        tileSlider.css('font-size', Math.floor((GridService.currentTileSize * Math.min(scope.tile.aWidth, scope.tile.aHeight)) / 10) + 'px');
        tileText.css('bottom', Math.floor(GridService.currentTileSize / 8) + 'px');
        tileText.css('padding', Math.floor(GridService.currentTileSize / 8) + 'px');
      }
      element.ready(function() {
        scope.resizeTimeout = $timeout(function() {
          scope.updateTileSize();
          $(element).fadeIn(360);
          var tileSlider = $(element).children('.tile-wrapper').children('.tile-slider');
          tileSlider.css('opacity', 0);
          if (!configuration.mobileScreen)
          {
            tileSlider.css('marginTop', GridService.currentTileSize * 2);
            tileSlider.animate({ 'marginTop': '0px', 'opacity': 1 }, 360, "easeOutCubic");
          } else {
            tileSlider.animate({'opacity': 1 }, 360, "easeOutCubic");
          }
        }, configuration.RENDER_FORCE_DELAY);
      });
    }
    // controller :function ($scope) {}
  }
}]);
