'use strict';
angular.module('application')
.directive('tlsTileExpanded', [
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
    templateUrl :'module/tile/tile-expanded-directive.html', 
    link: function(scope, element, attrs) {
      scope.hoverover = false; 
      scope.down = false; 
      scope.linkHover = false; 
      scope.linkActive = false; 
      
      scope.$watch(function () {
        return scope.tile;
      },
      function (newValue) {
        var imageLoader = $(element).children('.tile-image-wrapper-expanded').children('.tile-image-loader-expanded');
        imageLoader.hide();
      });
      
      scope.mouseover = function() {
        scope.hoverover = true;
      }

      scope.mouseout = function() {
        scope.hoverover = false;
      }
      
      scope.mousedown = function() {
        scope.down = true;
      }

      scope.mouseup = function() {
        scope.down = false;
      }

      scope.linkover = function() {
        if (scope.tile.linkURL)
        {
          scope.linkHover = true; 
        }
      }

      scope.linkout = function() {
        if (scope.tile.linkURL)
        {
          scope.linkHover = false; 
        }
      }
      
      scope.linkdown = function() {
        if (scope.tile.linkURL)
        {
          scope.linkActive = true; 
        }
      }

      scope.linkup = function() {
        if (scope.tile.linkURL)
        {
          scope.linkActive = false; 
        }
      }
      
      
      
      scope.clickLink = function() {
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
      
      scope.clickStream = function() {
        $state.go(
          "memberStream",
          {
            username: scope.streaminfo.streamName
          }
        );
      };
      
      scope.alignTile = function()
      {
        var slider = $(element).children('.tile-slider-expanded');
        var imageLoader = slider.children('.tile-image-wrapper-expanded').children('.tile-image-loader-expanded');
        var info = slider.children('.tile-info-expanded');
        var infoText = $(element).children('.tile-info-measure-expanded').children('.tile-info-bottom').children('.tile-text-expanded');
        var infoFooter = $(element).children('.tile-info-measure-expanded').children('.tile-info-bottom').children('.tile-footer-expanded');
        var sourceWidth = imageLoader.width();
        var sourceHeight = imageLoader.height();
        var maxWidth = $(element).width();
        var maxHeight = $(element).height();
        var targetWidth = 0;
        var targetHeight = 0;
        var wider = false;
        if (scope.tile.imageURL)
        {
          if (((sourceWidth / sourceHeight) * maxHeight) > maxWidth)
          {
            wider = true;
            targetWidth = maxWidth;
            targetHeight = Math.ceil(maxWidth * (sourceHeight / sourceWidth));
          } else {
            targetWidth = Math.ceil(maxHeight * (sourceWidth / sourceHeight));
            targetHeight = maxHeight;
          }
          imageLoader.width(targetWidth);
          imageLoader.height(targetHeight);
        }
        var infoRoom = maxWidth - targetWidth;
        var infoWidth = infoRoom;
        var infoHeight = maxHeight;
        var infoLeft = targetWidth;
        var infoTop = 0;
        if (wider)
        {
          infoRoom = maxHeight - targetHeight;
          infoWidth = maxWidth;
          infoHeight = infoRoom;
          infoLeft = 0;
          infoTop = targetHeight;
        }
          
        var expectedWidth = Math.ceil((infoText.outerHeight() + infoFooter.outerHeight()) * (maxWidth / maxHeight));
        var expectedHeight = infoText.outerHeight() + infoFooter.outerHeight();
        
        if (infoWidth != Math.max(Math.max(infoWidth, expectedWidth, 192)))
        {
          infoWidth = Math.max(Math.max(infoWidth, expectedWidth, 192));
          slider.css('overflowX', 'scroll');
        } else {
          slider.css('overflowX', 'hidden');
        }
        if (infoHeight != Math.max(infoHeight, expectedHeight))
        {
          infoHeight = Math.max(infoHeight, expectedHeight);
          slider.css('overflowY', 'scroll');
        } else {
          slider.css('overflowY', 'hidden');
        }
        
        info.width(infoWidth);
        info.height(infoHeight);
        info.css('left', infoLeft + 'px');
        info.css('top', infoTop + 'px');
        
        $timeout(function() {
          
        }, 64);
      }
      
      scope.loaded = function() {
        scope.loadedTimeout = $timeout(function() {
          scope.alignTile();
          var imageLoader = $(element).children('.tile-slider-expanded').children('.tile-image-wrapper-expanded').children('.tile-image-loader-expanded');
          imageLoader.fadeIn(320);
        }, configuration.RENDER_FORCE_DELAY);
      };

      angular.element($window).bind('resize',function(){
        if (scope.resizeTimeout)
        {
          $timeout.cancel(scope.resizeTimeout);
        }
        scope.resizeTimeout = $timeout(function() {
          scope.alignTile();
        }, configuration.WINDOW_RESIZE_DELAY);
      });

      $(element).hide();
      $(element).ready(function() {
        scope.resizeTimeout = $timeout(function() {
          scope.alignTile();
          $(element).fadeIn(360);
          var tileWrapper = $(element).children('.tile-wrapper-expanded');
          tileWrapper.css('opacity', 0);
          if (!configuration.mobileScreen)
          {
            tileWrapper.css('marginLeft', GridService.currentTileSize * 2);
            tileWrapper.animate({ 'marginLeft': '0px', 'opacity': 1 }, 360, "easeOutCubic");
          } else {
            tileWrapper.animate({'opacity': 1 }, 360, "easeOutCubic");
          }
        }, configuration.RENDER_FORCE_DELAY);
      });
    }
    // controller :function ($scope) {}
  }
}]);
